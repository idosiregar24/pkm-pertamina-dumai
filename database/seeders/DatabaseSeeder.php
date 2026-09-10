<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Umkm;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Kategori dulu (UmkmProductSeeder butuh category_id-nya), baru UMKM & produk,
        // supaya akun Admin Kelompok contoh di bawah punya umkm_id yang valid.
        $this->call(CategorySeeder::class);
        $this->call(UmkmProductSeeder::class);

        // Admin CSR — Super Admin, umkm_id selalu null (dijamin oleh User::booted()).
        // updateOrCreate (bukan firstOrCreate) supaya idempotent SEKALIGUS mengoreksi
        // role/umkm_id kalau seeder dijalankan ulang di atas data lama.
        User::updateOrCreate(
            ['email' => 'admin@pertamina-dumai.id'],
            [
                'name' => 'Administrator CSR Pertamina Dumai',
                'role' => UserRole::ADMIN_CSR,
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
            ]
        );

        // Contoh akun Admin Kelompok — terikat ke UMKM pertama hasil UmkmProductSeeder.
        $contohUmkm = Umkm::first();

        if ($contohUmkm) {
            User::updateOrCreate(
                ['email' => 'kelompok@pertamina-dumai.id'],
                [
                    'name' => 'Admin ' . $contohUmkm->name,
                    'role' => UserRole::ADMIN_KELOMPOK,
                    'umkm_id' => $contohUmkm->id,
                    'email_verified_at' => now(),
                    'password' => Hash::make('password'),
                ]
            );
        }

        // Akun bawaan Breeze yang tidak relevan dengan RBAC proyek ini (bukan
        // admin_csr maupun terhubung ke UMKM manapun) — dibersihkan agar tidak
        // tersangkut invariant role/umkm_id.
        User::where('email', 'test@example.com')->delete();
    }
}
