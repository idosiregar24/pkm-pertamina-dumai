<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Umkm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UmkmController extends Controller
{
    public function index()
    {
        $umkms = Umkm::withCount('products')->latest()->get();

        return Inertia::render('Admin/Umkm/Index', [
            'umkms' => $umkms,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Umkm/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'owner_name'       => 'required|string|max:255',
            'district'         => 'required|string|max:100',
            'phone'            => 'nullable|string|max:30',
            'established_year' => 'nullable|integer|min:1990|max:' . now()->year,
            'csr_batch_year'   => 'nullable|integer|min:2010|max:' . now()->year,
            'shopee_shop_url'  => 'nullable|string|max:512',
            'certification'    => 'nullable|string|max:255',
            'members_count'    => 'nullable|integer|min:1',
            'description'      => 'nullable|string',
            'banner'           => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'logo'             => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('banner')) {
            $path = $request->file('banner')->store('umkm/banners', 'public');
            $validated['banner_url'] = '/storage/' . $path;
        }

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('umkm/logos', 'public');
            $validated['logo_url'] = '/storage/' . $path;
        }

        Umkm::create($validated);

        return redirect()->route('admin.umkm.index')
            ->with('success', 'Data UMKM berhasil ditambahkan.');
    }

    public function edit(Umkm $umkm)
    {
        return Inertia::render('Admin/Umkm/Edit', [
            'umkm' => $umkm,
        ]);
    }

    public function update(Request $request, Umkm $umkm)
    {
        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'owner_name'       => 'required|string|max:255',
            'district'         => 'required|string|max:100',
            'phone'            => 'nullable|string|max:30',
            'established_year' => 'nullable|integer|min:1990|max:' . now()->year,
            'csr_batch_year'   => 'nullable|integer|min:2010|max:' . now()->year,
            'shopee_shop_url'  => 'nullable|string|max:512',
            'certification'    => 'nullable|string|max:255',
            'members_count'    => 'nullable|integer|min:1',
            'description'      => 'nullable|string',
            'banner'           => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'logo'             => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('banner')) {
            if ($umkm->banner_url && Str::startsWith($umkm->banner_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $umkm->banner_url));
            }
            $path = $request->file('banner')->store('umkm/banners', 'public');
            $validated['banner_url'] = '/storage/' . $path;
        }

        if ($request->hasFile('logo')) {
            if ($umkm->logo_url && Str::startsWith($umkm->logo_url, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $umkm->logo_url));
            }
            $path = $request->file('logo')->store('umkm/logos', 'public');
            $validated['logo_url'] = '/storage/' . $path;
        }

        $umkm->update($validated);

        return redirect()->route('admin.umkm.index')
            ->with('success', 'Data UMKM berhasil diperbarui.');
    }

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
