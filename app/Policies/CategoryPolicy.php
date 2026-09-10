<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;

/**
 * Admin CSR selalu lolos lewat Gate::before(). Admin Kelompok boleh MELIHAT
 * daftar kategori (dibutuhkan untuk memilih kategori di form produk mereka
 * sendiri), tapi tidak boleh membuat, mengubah, atau menghapus kategori —
 * itu wewenang khusus Admin CSR sebagai kurator taksonomi katalog.
 */
class CategoryPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Category $category): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return false;
    }

    public function update(User $user, Category $category): bool
    {
        return false;
    }

    public function delete(User $user, Category $category): bool
    {
        return false;
    }
}
