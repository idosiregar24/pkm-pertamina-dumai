<?php

namespace App\Models;

use App\Enums\UserRole;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use InvalidArgumentException;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'umkm_id',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Default in-memory (bukan cuma default kolom di migration) — supaya instance
     * `new User` / `User::make()` yang belum di-refresh dari DB tetap konsisten
     * `is_active = true`, alih-alih null/falsy yang salah dibaca EnsureUserHasRole.
     */
    protected $attributes = [
        'is_active' => true,
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
            'is_active' => 'boolean',
        ];
    }

    /**
     * Jaga invariant peran & tenant di level model — lapisan terakhir, berlaku
     * di manapun baris users ditulis (controller, seeder, tinker, dsb).
     */
    protected static function booted(): void
    {
        static::saving(function (User $user) {
            if ($user->role === UserRole::ADMIN_CSR) {
                // Super Admin tidak terikat ke UMKM manapun.
                $user->umkm_id = null;
            } elseif ($user->role === UserRole::ADMIN_KELOMPOK && blank($user->umkm_id)) {
                throw new InvalidArgumentException('Admin Kelompok wajib terhubung ke satu UMKM (umkm_id).');
            }
        });
    }

    public function umkm(): BelongsTo
    {
        return $this->belongsTo(Umkm::class);
    }

    public function isAdminCsr(): bool
    {
        return $this->role === UserRole::ADMIN_CSR;
    }

    public function isAdminKelompok(): bool
    {
        return $this->role === UserRole::ADMIN_KELOMPOK;
    }
}
