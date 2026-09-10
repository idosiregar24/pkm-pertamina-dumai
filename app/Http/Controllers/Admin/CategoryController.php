<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategoryRequest;
use App\Http\Requests\Admin\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Database\QueryException;
use Illuminate\Support\Str;
use Inertia\Inertia;

/**
 * CRUD master kategori produk — khusus Admin CSR (authorizeResource ->
 * CategoryPolicy, ditambah middleware `role:admin_csr` di routes/web.php
 * sebagai lapis kedua). Admin Kelompok hanya membaca daftar ini lewat
 * ProductController saat memilih kategori produk mereka sendiri.
 */
class CategoryController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Category::class, 'kategori');
    }

    public function index()
    {
        $categories = Category::withCount('products')->orderBy('name')->get();

        return Inertia::render('Admin/Category/Index', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Category/Create');
    }

    public function store(StoreCategoryRequest $request)
    {
        $validated = $request->validated();
        $validated['slug'] = Str::slug($validated['name']);

        Category::create($validated);

        return redirect()->route('admin.kategori.index')
            ->with('success', 'Kategori "' . $validated['name'] . '" berhasil ditambahkan.');
    }

    public function edit(Category $kategori)
    {
        $kategori->loadCount('products');

        return Inertia::render('Admin/Category/Edit', [
            'category' => $kategori,
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $kategori)
    {
        $validated = $request->validated();
        $validated['slug'] = Str::slug($validated['name']);

        $kategori->update($validated);

        // Produk yang merujuk kategori ini otomatis ikut ter-sync (lihat
        // Product::booted()) begitu masing-masing baris produk disimpan lagi —
        // untuk sinkronisasi SEKETIKA pada seluruh produk terkait, lakukan di sini:
        $kategori->products()->update([
            'category' => $kategori->name,
            'category_slug' => $kategori->slug,
        ]);

        return redirect()->route('admin.kategori.index')
            ->with('success', 'Kategori "' . $kategori->name . '" berhasil diperbarui.');
    }

    public function destroy(Category $kategori)
    {
        $name = $kategori->name;

        try {
            $kategori->delete();
        } catch (QueryException) {
            // FK restrictOnDelete() menolak penghapusan selama masih ada produk terkait.
            // redirect() eksplisit ke index (bukan back()) — back() bergantung pada
            // header Referer yang tidak selalu ada/bisa diandalkan.
            return redirect()->route('admin.kategori.index')
                ->with('error', 'Kategori "' . $name . '" masih dipakai oleh produk lain dan tidak bisa dihapus. Pindahkan atau hapus produk tersebut terlebih dahulu.');
        }

        return redirect()->route('admin.kategori.index')
            ->with('success', 'Kategori "' . $name . '" berhasil dihapus.');
    }
}
