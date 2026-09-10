<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Umkm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('umkm:id,name,district')->latest()->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        $umkms = Umkm::select('id', 'name', 'district')->orderBy('name')->get();

        return Inertia::render('Admin/Products/Create', [
            'umkms' => $umkms,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'umkm_id'     => 'required|exists:umkms,id',
            'name'        => 'required|string|max:255',
            'price'       => 'required|numeric|min:0',
            'unit'        => 'required|string|max:100',
            'category'    => 'required|string|max:100',
            'description' => 'nullable|string',
            'shopee_url'  => 'nullable|string|max:512',
            'is_featured' => 'sometimes',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        // Multipart form mengirim boolean sebagai string — cast manual
        $validated['is_featured'] = filter_var($request->input('is_featured', false), FILTER_VALIDATE_BOOLEAN);

        // Bersihkan URL Shopee
        $shopeeUrl = trim($request->input('shopee_url', ''));
        $validated['shopee_url'] = ($shopeeUrl && str_starts_with($shopeeUrl, 'https://shopee.co.id/'))
            ? $shopeeUrl
            : null;

        $validated['slug']          = Str::slug($validated['name']) . '-' . Str::random(5);
        $validated['category_slug'] = Str::slug($validated['category']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        Product::create($validated);

        return redirect()->route('admin.produk.index')
            ->with('success', 'Produk berhasil ditambahkan.');
    }

    /**
     * Nama parameter HARUS cocok dengan route parameter {produk}
     * untuk Laravel implicit route model binding bekerja dengan benar.
     */
    public function edit(Product $produk)
    {
        $umkms = Umkm::select('id', 'name', 'district')->orderBy('name')->get();

        return Inertia::render('Admin/Products/Edit', [
            'product' => $produk->load('umkm:id,name,district'),
            'umkms'   => $umkms,
        ]);
    }

    public function update(Request $request, Product $produk)
    {
        $validated = $request->validate([
            'umkm_id'     => 'required|exists:umkms,id',
            'name'        => 'required|string|max:255',
            'price'       => 'required|numeric|min:0',
            'unit'        => 'required|string|max:100',
            'category'    => 'required|string|max:100',
            'description' => 'nullable|string',
            'shopee_url'  => 'nullable|string|max:512',
            'is_featured' => 'sometimes',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        // Cast boolean dari multipart string
        $validated['is_featured'] = filter_var($request->input('is_featured', false), FILTER_VALIDATE_BOOLEAN);

        // Bersihkan URL Shopee kosong
        $shopeeUrl = trim($request->input('shopee_url', ''));
        $validated['shopee_url'] = ($shopeeUrl && str_starts_with($shopeeUrl, 'https://shopee.co.id/'))
            ? $shopeeUrl
            : null;

        // Update category slug
        $validated['category_slug'] = Str::slug($validated['category']);

        // Upload foto baru jika ada
        if ($request->hasFile('image')) {
            // Hapus foto lama
            if ($produk->image_url && str_starts_with($produk->image_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $produk->image_url));
            }
            $path = $request->file('image')->store('products', 'public');
            $validated['image_url'] = '/storage/' . $path;
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
