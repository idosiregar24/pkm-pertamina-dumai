<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Umkm;
use Inertia\Inertia;
use Inertia\Response;

class DirectoryController extends Controller
{
    public function index(): Response
    {
        $umkms = Umkm::withCount('products')
            ->with([
                'products' => function ($query) {
                    $query->select('id', 'umkm_id', 'name', 'slug', 'price', 'unit', 'image_url', 'category', 'category_slug', 'is_featured')
                        ->latest();
                }
            ])
            ->orderBy('name')
            ->get();

        $products = Product::with('umkm:id,name,district,phone')
            ->latest()
            ->get();

        return Inertia::render('Directory', [
            'umkms' => $umkms,
            'products' => $products,
        ]);
    }
}
