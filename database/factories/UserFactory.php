<?php

namespace Database\Factories;

use App\Enums\UserRole;
use App\Models\Umkm;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * Default role: Admin CSR. Kenapa bukan Admin Kelompok? Karena role itu
     * WAJIB punya umkm_id (lihat User::booted()) — default yang butuh data
     * tambahan bukan default yang aman untuk factory generik. Test yang
     * butuh Admin Kelompok memakai state adminKelompok() di bawah.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'role' => UserRole::ADMIN_CSR,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Jadikan akun ini Admin Kelompok yang terikat ke satu UMKM tertentu.
     * Wajib mengoper $umkm supaya invariant "Admin Kelompok wajib punya umkm_id" terpenuhi.
     */
    public function adminKelompok(Umkm|int $umkm): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::ADMIN_KELOMPOK,
            'umkm_id' => $umkm instanceof Umkm ? $umkm->id : $umkm,
        ]);
    }
}
