<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Umkm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct()
    {
        // Setiap action resource otomatis dicek ke ProductPolicy berdasarkan model
        // yang di-resolve dari route model binding {produk}. Admin CSR lolos semua
        // lewat Gate::before; Admin Kelompok hanya boleh sentuh produk miliknya sendiri.
        $this->authorizeResource(Product::class, 'produk');
    }

    public function index(Request $request)
    {
        $products = Product::query()
            ->visibleTo($request->user())
            ->with('umkm:id,name,district')
            ->latest()
            ->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create(Request $request)
    {
        // Admin Kelompok tidak perlu (dan tidak boleh) memilih UMKM — form-nya
        // disembunyikan di React berdasarkan auth.user.role, dan server tetap
        // memaksa umkm_id dari sesi terlepas dari apa yang dikirim client.
        $umkms = $request->user()->isAdminCsr()
            ? Umkm::select('id', 'name', 'district')->orderBy('name')->get()
            : [];

        return Inertia::render('Admin/Products/Create', [
            'umkms' => $umkms,
            // Sumber kebenaran kategori sekarang tabel `categories`, dikurasi
            // Admin CSR lewat /admin/kategori — bukan lagi daftar hardcoded
            // atau string bebas per-produk (lihat riwayat bug: <select> tertutup
            // pernah diam-diam menimpa kategori yang tidak ada di opsinya).
            'categories' => Category::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();
        $validated['umkm_id'] = $request->resolvedUmkmId(); // paksa server-side, abaikan payload client

        // shopee_url sudah tervalidasi & aman lewat ValidShopeeUrl di StoreProductRequest.
        // category/category_slug di-sync otomatis dari category_id lewat Product::booted().
        $validated['is_featured'] = filter_var($request->input('is_featured', false), FILTER_VALIDATE_BOOLEAN);
        $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(5);

        if ($request->hasFile('image')) {
            $validated['image_url'] = '/storage/' . $request->file('image')->store('products', 'public');
        }

        Product::create($validated);

        return redirect()->route('admin.produk.index')
            ->with('success', 'Produk berhasil ditambahkan.');
    }

    /**
     * Nama parameter HARUS cocok dengan route parameter {produk}
     * untuk Laravel implicit route model binding bekerja dengan benar.
     */
    public function edit(Request $request, Product $produk)
    {
        $umkms = $request->user()->isAdminCsr()
            ? Umkm::select('id', 'name', 'district')->orderBy('name')->get()
            : [];

        return Inertia::render('Admin/Products/Edit', [
            'product' => $produk->load('umkm:id,name,district'),
            'umkms' => $umkms,
            'categories' => Category::select('id', 'name')->orderBy('name')->get(),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $produk)
    {
        $validated = $request->validated();
        $validated['umkm_id'] = $request->resolvedUmkmId($produk->umkm_id);

        // shopee_url sudah tervalidasi & aman lewat ValidShopeeUrl di UpdateProductRequest.
        // category/category_slug di-sync otomatis dari category_id lewat Product::booted().
        $validated['is_featured'] = filter_var($request->input('is_featured', false), FILTER_VALIDATE_BOOLEAN);

        if ($request->hasFile('image')) {
            if ($produk->image_url && str_starts_with($produk->image_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $produk->image_url));
            }
            $validated['image_url'] = '/storage/' . $request->file('image')->store('products', 'public');
        }

        $produk->update($validated);

        return redirect()->route('admin.produk.index')
            ->with('success', 'Produk "' . $produk->name . '" berhasil diperbarui.');
    }

    public function destroy(Product $produk)
    {
        $name = $produk->name;

        if ($produk->image_url && str_starts_with($produk->image_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $produk->image_url));
        }

        $produk->delete();

        return redirect()->route('admin.produk.index')
            ->with('success', 'Produk "' . $name . '" berhasil dihapus.');
    }
}
