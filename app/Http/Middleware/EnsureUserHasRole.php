<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Guard route-level (kasar): tolak sebelum request menyentuh controller sama sekali
 * kalau role pengguna tidak ada di daftar yang diizinkan untuk grup route tsb.
 *
 * Penggunaan: Route::middleware('role:admin_csr')->group(...)
 *             Route::middleware('role:admin_csr,admin_kelompok')->group(...)
 */
class EnsureUserHasRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        abort_unless($user, 401);
        abort_unless($user->is_active, 403, 'Akun Anda telah dinonaktifkan. Hubungi Admin CSR Pertamina Patra Niaga Dumai.');
        abort_unless(in_array($user->role->value, $roles, true), 403, 'Anda tidak memiliki hak akses ke halaman ini.');

        return $next($request);
    }
}
