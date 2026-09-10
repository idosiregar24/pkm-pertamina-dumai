<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUmkmRequest;
use App\Http\Requests\Admin\UpdateUmkmRequest;
use App\Models\Umkm;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UmkmController extends Controller
{
    public function __construct()
    {
        // Setiap action resource otomatis dicek ke UmkmPolicy berdasarkan model
        // yang di-resolve dari route model binding {umkm}. Admin CSR lolos semua
        // lewat Gate::before; Admin Kelompok hanya boleh sentuh profilnya sendiri.
        $this->authorizeResource(Umkm::class, 'umkm');
    }

    /**
     * Khusus Admin CSR (dijamin oleh authorizeResource -> UmkmPolicy::viewAny).
     */
    public function index()
    {
        $umkms = Umkm::withCount('products')->latest()->get();

        return Inertia::render('Admin/Umkm/Index', [
            'umkms' => $umkms,
        ]);
    }

    /**
     * Khusus Admin CSR (dijamin oleh authorizeResource -> UmkmPolicy::create).
     */
    public function create()
    {
        return Inertia::render('Admin/Umkm/Create');
    }

    public function store(StoreUmkmRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('banner')) {
            $validated['banner_url'] = '/storage/' . $request->file('banner')->store('umkm/banners', 'public');
        }

        if ($request->hasFile('logo')) {
            $validated['logo_url'] = '/storage/' . $request->file('logo')->store('umkm/logos', 'public');
        }

        Umkm::create($validated);

        return redirect()->route('admin.umkm.index')
            ->with('success', 'Data UMKM berhasil ditambahkan.');
    }

    /**
     * Admin CSR bisa mengedit kelompok manapun; Admin Kelompok hanya profilnya sendiri
     * (dijamin oleh authorizeResource -> UmkmPolicy::update sebelum method ini jalan).
     */
    public function edit(Umkm $umkm)
    {
        return Inertia::render('Admin/Umkm/Edit', [
            'umkm' => $umkm,
        ]);
    }

    public function update(UpdateUmkmRequest $request, Umkm $umkm)
    {
        $validated = $request->validated();

        if ($request->hasFile('banner')) {
            if ($umkm->banner_url && Str::startsWith($umkm->banner_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $umkm->banner_url));
            }
            $validated['banner_url'] = '/storage/' . $request->file('banner')->store('umkm/banners', 'public');
        }

        if ($request->hasFile('logo')) {
            if ($umkm->logo_url && Str::startsWith($umkm->logo_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $umkm->logo_url));
            }
            $validated['logo_url'] = '/storage/' . $request->file('logo')->store('umkm/logos', 'public');
        }

        $umkm->update($validated);

        // Admin Kelompok tidak berhak melihat listing /admin/umkm (UmkmPolicy::viewAny
        // selalu false untuk mereka) — redirect ke index akan 403 tepat setelah berhasil
        // menyimpan. Kembalikan mereka ke halaman profil kelompoknya sendiri; hanya
        // Admin CSR yang diarahkan ke listing seperti biasa.
        $redirect = $request->user()->isAdminCsr()
            ? redirect()->route('admin.umkm.index')
            : redirect()->route('admin.umkm.edit', $umkm);

        return $redirect->with('success', 'Data UMKM berhasil diperbarui.');
    }

    /**
     * Khusus Admin CSR (dijamin oleh authorizeResource -> UmkmPolicy::delete).
     */
    public function destroy(Umkm $umkm)
    {
        if ($umkm->banner_url && Str::startsWith($umkm->banner_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $umkm->banner_url));
        }
        if ($umkm->logo_url && Str::startsWith($umkm->logo_url, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $umkm->logo_url));
        }

        $umkm->delete();

        return redirect()->route('admin.umkm.index')
            ->with('success', 'Data UMKM berhasil dihapus.');
    }
}
