<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreKelompokAdminRequest;
use App\Http\Requests\Admin\UpdateKelompokAdminRequest;
use App\Models\Umkm;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

/**
 * CRUD akun Admin Kelompok — khusus Admin CSR (digerbangi middleware
 * `role:admin_csr` di routes/web.php, bukan Policy, karena resource ini
 * bukan data tenant melainkan hak untuk *membuat* tenant lain punya akses).
 */
class KelompokAdminController extends Controller
{
    public function index()
    {
        $admins = User::where('role', UserRole::ADMIN_KELOMPOK)
            ->with('umkm:id,name,district')
            ->latest()
            ->get();

        return Inertia::render('Admin/KelompokAdmin/Index', [
            'admins' => $admins,
        ]);
    }

    public function create()
    {
        $umkms = Umkm::select('id', 'name', 'district')->orderBy('name')->get();

        return Inertia::render('Admin/KelompokAdmin/Create', [
            'umkms' => $umkms,
        ]);
    }

    public function store(StoreKelompokAdminRequest $request)
    {
        $validated = $request->validated();

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => UserRole::ADMIN_KELOMPOK,
            'umkm_id' => $validated['umkm_id'],
            'email_verified_at' => now(),
        ]);

        return redirect()->route('admin.kelompok-admin.index')
            ->with('success', 'Akun Admin Kelompok berhasil dibuat.');
    }

    public function edit(User $kelompok_admin)
    {
        $umkms = Umkm::select('id', 'name', 'district')->orderBy('name')->get();

        return Inertia::render('Admin/KelompokAdmin/Edit', [
            'admin' => $kelompok_admin->load('umkm:id,name,district'),
            'umkms' => $umkms,
        ]);
    }

    public function update(UpdateKelompokAdminRequest $request, User $kelompok_admin)
    {
        $validated = $request->validated();

        $kelompok_admin->fill([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'umkm_id' => $validated['umkm_id'],
            'is_active' => $request->boolean('is_active', true),
        ]);

        if (!empty($validated['password'])) {
            $kelompok_admin->password = Hash::make($validated['password']);
        }

        $kelompok_admin->save();

        return redirect()->route('admin.kelompok-admin.index')
            ->with('success', 'Akun Admin Kelompok "' . $kelompok_admin->name . '" berhasil diperbarui.');
    }

    public function destroy(User $kelompok_admin)
    {
        // Jaga-jaga: pastikan endpoint ini tidak pernah dipakai untuk menghapus Admin CSR.
        abort_if($kelompok_admin->isAdminCsr(), 403);

        $name = $kelompok_admin->name;
        $kelompok_admin->delete();

        return redirect()->route('admin.kelompok-admin.index')
            ->with('success', 'Akun Admin Kelompok "' . $name . '" berhasil dihapus.');
    }
}
