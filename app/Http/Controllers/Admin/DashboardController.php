<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Umkm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Ringkasan dashboard yang otomatis terisolasi:
     * - Admin CSR: melihat statistik seluruh kelompok & produk.
     * - Admin Kelompok: hanya melihat statistik miliknya sendiri.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $products = Product::query()->visibleTo($user);

        $stats = [
            'total_products' => (clone $products)->count(),
            'total_umkms' => $user->isAdminKelompok() ? 1 : Umkm::count(),
            'featured_count' => (clone $products)->where('is_featured', true)->count(),
            'total_sold' => (clone $products)->sum('sold_count'),
        ];

        $recent_products = (clone $products)->with('umkm:id,name,district')->latest()->take(5)->get();
        $recent_umkms = $user->isAdminCsr() ? Umkm::latest()->take(5)->get() : collect();

        return Inertia::render('Admin/Dashboard', compact('stats', 'recent_products', 'recent_umkms'));
    }
}
