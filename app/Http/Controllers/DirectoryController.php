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
                        ->orderByDesc('id');
                }
            ])
            ->orderByDesc('id')
            ->get();

        $products = Product::with('umkm:id,name,district,phone')
            ->orderByDesc('id')
            ->get();

        return Inertia::render('Directory', [
            'umkms' => $umkms,
            'products' => $products,
        ]);
    }

    public function show(Umkm $umkm): Response
    {
        $umkm->load([
            'products' => function ($query) {
                $query->orderByDesc('id');
            },
        ]);

        $products = $umkm->products->map(function ($product) use ($umkm) {
            return array_merge($product->toArray(), [
                'umkm' => [
                    'id' => $umkm->id,
                    'name' => $umkm->name,
                    'district' => $umkm->district,
                    'phone' => $umkm->phone,
                ],
            ]);
        })->values();

        return Inertia::render('DirectoryShow', [
            'umkm' => $umkm,
            'products' => $products,
        ]);
    }
}
