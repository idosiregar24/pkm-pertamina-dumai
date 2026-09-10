<?php

namespace App\Http\Requests\Admin;

use App\Models\Umkm;
use App\Rules\ValidShopeeUrl;
use Illuminate\Foundation\Http\FormRequest;

class StoreUmkmRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Hanya Admin CSR yang boleh mendaftarkan kelompok binaan baru (via UmkmPolicy::create).
        return $this->user()->can('create', Umkm::class);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'owner_name' => ['required', 'string', 'max:255'],
            'district' => ['required', 'string', 'max:100'],
            'phone' => ['nullable', 'string', 'max:30'],
            'established_year' => ['nullable', 'integer', 'min:1990', 'max:' . now()->year],
            'csr_batch_year' => ['nullable', 'integer', 'min:2010', 'max:' . now()->year],
            'shopee_shop_url' => ['nullable', 'url', new ValidShopeeUrl()],
            'certification' => ['nullable', 'string', 'max:255'],
            'members_count' => ['nullable', 'integer', 'min:1'],
            'description' => ['nullable', 'string'],
            'banner' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }
}
