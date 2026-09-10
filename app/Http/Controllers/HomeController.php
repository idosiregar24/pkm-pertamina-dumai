<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Umkm;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        // Ambil produk unggulan (is_featured = true), jika kurang dari 6 lengkapi dengan produk terbaru
        $featuredProducts = Product::with('umkm:id,name,district,phone,shopee_shop_url')
            ->where('is_featured', true)
            ->latest()
            ->take(6)
            ->get();

        if ($featuredProducts->count() < 6) {
            $excludeIds = $featuredProducts->pluck('id');
            $additional = Product::with('umkm:id,name,district,phone,shopee_shop_url')
                ->whereNotIn('id', $excludeIds)
                ->latest()
                ->take(6 - $featuredProducts->count())
                ->get();

            $featuredProducts = $featuredProducts->concat($additional);
        }

        $stats = [
            'total_products' => Product::count(),
            'total_umkms' => Umkm::count(),
            'featured_count' => Product::where('is_featured', true)->count(),
            'total_districts' => Umkm::distinct('district')->count('district'),
        ];

        return Inertia::render('Welcome', [
            'featuredProducts' => $featuredProducts,
            'totalProducts' => $stats['total_products'],
            'stats' => $stats,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
