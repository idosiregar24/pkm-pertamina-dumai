<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Umkm;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(): Response
    {
        $products = Product::with('umkm:id,name,district,phone,shopee_shop_url')
            ->orderByDesc('id')
            ->get();

        $totalCount = $products->count();

        // Ambil kategori secara dinamis dari produk yang ada di database
        $categories = Product::selectRaw('category, count(*) as count')
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->groupBy('category')
            ->get()
            ->map(function ($row) {
                return [
                    'name' => $row->category,
                    'slug' => Str::slug($row->category),
                    'count' => (int) $row->count,
                ];
            })
            ->values();

        $categories->prepend([
            'name' => 'Semua Kategori',
            'slug' => 'all',
            'count' => $totalCount,
        ]);

        return Inertia::render('Catalog', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}
