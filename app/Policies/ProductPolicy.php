<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;

/**
 * Semua method di bawah ini HANYA dievaluasi untuk Admin Kelompok.
 * Admin CSR selalu lolos lebih dulu lewat Gate::before() di AppServiceProvider,
 * sehingga aturan di sini cukup fokus mendeskripsikan kepemilikan tenant.
 */
class ProductPolicy
{
    public function viewAny(User $user): bool
    {
        // Admin Kelompok BOLEH membuka listing /admin/produk — isinya sudah
        // otomatis terfilter ke tenant sendiri lewat Product::visibleTo() di controller.
        return true;
    }

    public function view(User $user, Product $product): bool
    {
        return $user->umkm_id === $product->umkm_id;
    }

    public function create(User $user): bool
    {
        return $user->isAdminKelompok() && $user->umkm_id !== null;
    }

    public function update(User $user, Product $product): bool
    {
        return $user->umkm_id === $product->umkm_id;
    }

    public function delete(User $user, Product $product): bool
    {
        return $user->umkm_id === $product->umkm_id;
    }
}
