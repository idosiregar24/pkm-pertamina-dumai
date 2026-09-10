<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\KelompokAdminController;
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
Route::get('/direktori/{umkm}', [DirectoryController::class, 'show'])->name('directory.show');

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

// ── Admin Panel (Protected + RBAC) ──
// Semua route di bawah ini wajib login DAN aktif (dicek middleware `role`).
// Isolasi data antar-UMKM ditegakkan di lapisan Policy (UmkmPolicy/ProductPolicy)
// dan query scope (visibleTo), bukan cuma di sini — lihat .claude/rules untuk detail arsitektur.
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {

    // Dashboard: satu route untuk kedua role, isinya sudah otomatis terisolasi
    // per-tenant di dalam AdminDashboardController.
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Admin CSR & Admin Kelompok — Produk. Isolasi antar-tenant ditegakkan oleh
    // ProductPolicy (per-object) dan visibleTo() scope (listing), bukan di sini.
    Route::middleware('role:admin_csr,admin_kelompok')->group(function () {
        Route::resource('produk', AdminProductController::class)->names([
            'index'   => 'produk.index',
            'create'  => 'produk.create',
            'store'   => 'produk.store',
            'show'    => 'produk.show',
            'edit'    => 'produk.edit',
            'update'  => 'produk.update',
            'destroy' => 'produk.destroy',
        ]);

        // UMKM: Admin CSR mengelola seluruh kelompok (index/create/destroy dijamin
        // UmkmPolicy khusus admin_csr). Admin Kelompok memakai route edit/update
        // yang sama persis untuk mengelola profil kelompoknya sendiri —
        // UmkmPolicy::update menolak jika umkm_id bukan miliknya.
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

    // Khusus Admin CSR — mendaftarkan & mengelola akun Admin Kelompok.
    Route::middleware('role:admin_csr')->group(function () {
        Route::resource('kelompok-admin', KelompokAdminController::class)->names([
            'index'   => 'kelompok-admin.index',
            'create'  => 'kelompok-admin.create',
            'store'   => 'kelompok-admin.store',
            'edit'    => 'kelompok-admin.edit',
            'update'  => 'kelompok-admin.update',
            'destroy' => 'kelompok-admin.destroy',
        ]);
    });
});

require __DIR__ . '/auth.php';
