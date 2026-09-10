<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Menambahkan kolom RBAC & multi-tenancy pada tabel users.
     *
     * - role     : peran pengguna ('admin_csr' super admin, 'admin_kelompok' scoped ke satu UMKM).
     * - umkm_id  : tenant pemilik akun. WAJIB diisi untuk admin_kelompok, NULL untuk admin_csr.
     * - is_active: memungkinkan Admin CSR menonaktifkan akun Admin Kelompok tanpa hard-delete.
     *
     * Default role sengaja 'admin_kelompok' (privilese terendah) — prinsip least privilege,
     * supaya baris users yang lupa di-set role-nya tidak otomatis menjadi Super Admin.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('admin_kelompok')->after('password');
            $table->foreignId('umkm_id')->nullable()->after('role')
                ->constrained('umkms')->cascadeOnDelete();
            $table->boolean('is_active')->default(true)->after('umkm_id');

            $table->index(['role', 'umkm_id']);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('umkm_id');
            $table->dropColumn(['role', 'is_active']);
        });
    }
};
