<?php

namespace App\Enums;

/**
 * Peran pengguna Admin Panel CMS.
 *
 * - ADMIN_CSR      : Super Admin. Mengelola seluruh kelompok binaan, seluruh produk,
 *                    dan mendaftarkan akun Admin Kelompok baru.
 * - ADMIN_KELOMPOK : Terikat pada satu UMKM (umkm_id). Hanya boleh mengelola profil
 *                    dan produk milik kelompoknya sendiri.
 */
enum UserRole: string
{
    case ADMIN_CSR = 'admin_csr';
    case ADMIN_KELOMPOK = 'admin_kelompok';

    public function label(): string
    {
        return match ($this) {
            self::ADMIN_CSR => 'Admin CSR (Super Admin)',
            self::ADMIN_KELOMPOK => 'Admin Kelompok UMKM',
        };
    }
}
