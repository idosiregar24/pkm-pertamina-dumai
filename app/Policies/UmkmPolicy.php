<?php

namespace App\Policies;

use App\Models\Umkm;
use App\Models\User;

/**
 * Admin CSR selalu lolos lewat Gate::before() (lihat AppServiceProvider).
 * Admin Kelompok hanya boleh melihat/mengubah PROFIL miliknya sendiri —
 * tidak pernah boleh membuat, menghapus, atau melihat daftar seluruh kelompok.
 */
class UmkmPolicy
{
    public function viewAny(User $user): bool
    {
        return false; // listing seluruh kelompok binaan khusus Admin CSR
    }

    public function view(User $user, Umkm $umkm): bool
    {
        return $user->umkm_id === $umkm->id;
    }

    public function create(User $user): bool
    {
        return false; // hanya Admin CSR yang boleh mendaftarkan kelompok binaan baru
    }

    public function update(User $user, Umkm $umkm): bool
    {
        return $user->umkm_id === $umkm->id;
    }

    public function delete(User $user, Umkm $umkm): bool
    {
        return false; // hanya Admin CSR yang boleh menghapus kelompok binaan
    }
}
