# Skill: Pola Controller Laravel 11 ↔ Halaman Inertia (Katalog UMKM)

Pola arsitektur standar untuk pengembangan controller dan integrasi Inertia pada portal web Binaan CSR Pertamina Patra Niaga Unit Dumai.

---

## 1. Route Publik & Admin (`routes/web.php`)

```php
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DirectoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Admin\UmkmController as AdminUmkmController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;

// Rute Publik (Direktori & Katalog Mini-Marketplace)
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/umkm', [DirectoryController::class, 'index'])->name('directory.index');
Route::get('/umkm/{umkm:slug}', [DirectoryController::class, 'show'])->name('directory.show');

Route::get('/produk', [ProductController::class, 'index'])->name('products.index');
Route::get('/produk/{product:slug}', [ProductController::class, 'show'])->name('products.show');

// Rute Admin CMS (Terproteksi Autentikasi)
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('umkm', AdminUmkmController::class);
    Route::resource('products', AdminProductController::class);
});
```

---

## 2. Controller Listing Katalog dengan Filter Debounce

```php
namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Http\Resources\ProductResource;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::query()
            ->with(['umkm:id,name,slug,phone,district', 'category:id,name,slug'])
            ->where('is_available', true)
            ->when($request->search, function ($q, $search) {
                $q->where(function ($sub) use ($search) {
                    $sub->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->category, function ($q, $categorySlug) {
                $q->whereHas('category', fn ($c) => $c->where('slug', $categorySlug));
            })
            ->when($request->sort, function ($q, $sort) {
                if ($sort === 'price_asc') $q->orderBy('price', 'asc');
                elseif ($sort === 'price_desc') $q->orderBy('price', 'desc');
                else $q->latest();
            }, fn ($q) => $q->latest())
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => ProductResource::collection($products),
            'categories' => CategoryResource::collection(Category::orderBy('name')->get()),
            'filters' => $request->only(['search', 'category', 'sort']),
        ]);
    }

    public function show(Product $product)
    {
        $product->load(['umkm', 'category']);

        // Ambil produk rekomendasi lain dari UMKM yang sama
        $relatedProducts = Product::where('umkm_id', $product->umkm_id)
            ->where('id', '!=', $product->id)
            ->where('is_available', true)
            ->limit(4)
            ->get();

        return Inertia::render('Products/Show', [
            'product' => new ProductResource($product),
            'relatedProducts' => ProductResource::collection($relatedProducts),
        ]);
    }
}
```

---

## 3. Pola Halaman React dengan URL Filter Sync

```jsx
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import ProductCard from '@/Components/ProductCard';
import { useDebounce } from '@/Hooks/useDebounce';

export default function Index({ products, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const debouncedSearch = useDebounce(search, 400);

    useEffect(() => {
        router.get(
            route('products.index'),
            { search: debouncedSearch, category: selectedCategory },
            { preserveState: true, preserveScroll: true, replace: true }
        );
    }, [debouncedSearch, selectedCategory]);

    return (
        <PublicLayout title="Katalog Produk UMKM Binaan CSR Dumai">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Search & Filter Bar */}
                <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari produk khas Dumai..."
                        className="rounded-xl border-slate-200 px-4 py-2 text-sm focus:border-[#ED1C24] focus:ring-[#ED1C24]"
                    />
                </div>

                {/* Grid Produk */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}
```
