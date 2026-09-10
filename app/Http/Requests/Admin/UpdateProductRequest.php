<?php

namespace App\Http\Requests\Admin;

use App\Rules\ValidShopeeUrl;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        // {produk} di-resolve dari route model binding, dicek lewat ProductPolicy::update.
        return $this->user()->can('update', $this->route('produk'));
    }

    public function rules(): array
    {
        return [
            'umkm_id' => [Rule::requiredIf(fn () => $this->user()->isAdminCsr()), 'nullable', 'exists:umkms,id'],
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'unit' => ['required', 'string', 'max:100'],
            'category_id' => ['required', 'exists:categories,id'],
            'description' => ['nullable', 'string'],
            'shopee_url' => ['nullable', 'url', new ValidShopeeUrl()],
            'is_featured' => ['sometimes'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:4096'],
        ];
    }

    /**
     * Admin Kelompok TIDAK PERNAH bisa memindahkan produk ke umkm_id lain —
     * hanya Admin CSR yang boleh mengubah kepemilikan produk lewat field ini.
     */
    public function resolvedUmkmId(int $currentUmkmId): int
    {
        return $this->user()->isAdminCsr() && $this->filled('umkm_id')
            ? (int) $this->validated('umkm_id')
            : $currentUmkmId;
    }
}
