<?php

namespace App\Http\Requests\Admin;

use App\Models\Product;
use App\Rules\ValidShopeeUrl;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Product::class);
    }

    public function rules(): array
    {
        return [
            // Hanya Admin CSR yang wajib (dan boleh) memilih umkm_id secara manual.
            // Admin Kelompok tidak mengirim field ini — nilainya dipaksa dari sesi, lihat resolvedUmkmId().
            'umkm_id' => [Rule::requiredIf(fn () => $this->user()->isAdminCsr()), 'nullable', 'exists:umkms,id'],
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'unit' => ['required', 'string', 'max:100'],
            'category' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'shopee_url' => ['nullable', 'url', new ValidShopeeUrl()],
            'is_featured' => ['sometimes'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:4096'],
        ];
    }

    /**
     * Sumber kebenaran tunggal untuk umkm_id — TIDAK PERNAH percaya input client
     * untuk Admin Kelompok, meski field umkm_id disisipkan manual di request.
     */
    public function resolvedUmkmId(): int
    {
        return $this->user()->isAdminCsr()
            ? (int) $this->validated('umkm_id')
            : (int) $this->user()->umkm_id;
    }
}
