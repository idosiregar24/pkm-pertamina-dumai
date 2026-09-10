<?php

namespace App\Models\Concerns;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

/**
 * Trait untuk model yang datanya harus terisolasi per-UMKM (multi-tenancy sederhana).
 *
 * Sengaja berupa local scope eksplisit (bukan Global Scope) supaya query publik
 * (katalog/direktori untuk pengunjung anonim) tidak ikut ter-filter diam-diam oleh
 * sesi Auth — filtering tenant hanya berlaku ketika dipanggil eksplisit di controller admin.
 *
 * Pakai di model: `use BelongsToTenant;` lalu panggil `Model::query()->visibleTo($user)`.
 */
trait BelongsToTenant
{
    /**
     * Batasi query hanya pada data milik tenant user (jika Admin Kelompok).
     * Admin CSR tidak difilter — melihat seluruh data.
     */
    public function scopeVisibleTo(Builder $query, User $user): Builder
    {
        return $user->isAdminKelompok()
            ? $query->where('umkm_id', $user->umkm_id)
            : $query;
    }
}
