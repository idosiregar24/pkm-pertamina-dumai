<?php

use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\UmkmController as AdminUmkmController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\DirectoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ── Public Routes ──
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/katalog', [CatalogController::class, 'index'])->name('catalog');
Route::get('/direktori', [DirectoryController::class, 'index'])->name('directory');

Route::get('/program-csr', function () {
    return Inertia::render('CsrProgram');
})->name('csr-program');

// ── Legacy Dashboard (redirect to admin) ──
Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// ── Auth Profile ──
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ── Admin Panel (Protected) ──
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/', function () {
        $stats = [
            'total_products' => \App\Models\Product::count(),
            'total_umkms'    => \App\Models\Umkm::count(),
            'featured_count' => \App\Models\Product::where('is_featured', true)->count(),
            'total_sold'     => \App\Models\Product::sum('sold_count'),
        ];
        $recent_products = \App\Models\Product::with('umkm:id,name,district')->latest()->take(5)->get();
        $recent_umkms    = \App\Models\Umkm::latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', compact('stats', 'recent_products', 'recent_umkms'));
    })->name('dashboard');

    // Produk CRUD
    Route::resource('produk', AdminProductController::class)->names([
        'index'   => 'produk.index',
        'create'  => 'produk.create',
        'store'   => 'produk.store',
        'show'    => 'produk.show',
        'edit'    => 'produk.edit',
        'update'  => 'produk.update',
        'destroy' => 'produk.destroy',
    ]);

    // UMKM CRUD
    Route::resource('umkm', AdminUmkmController::class)->names([
        'index'   => 'umkm.index',
        'create'  => 'umkm.create',
        'store'   => 'umkm.store',
        'show'    => 'umkm.show',
        'edit'    => 'umkm.edit',
        'update'  => 'umkm.update',
        'destroy' => 'umkm.destroy',
    ]);
});

require __DIR__ . '/auth.php';
