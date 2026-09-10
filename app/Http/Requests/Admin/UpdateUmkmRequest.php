<?php

namespace App\Http\Requests\Admin;

use App\Rules\ValidShopeeUrl;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUmkmRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Admin CSR boleh mengubah kelompok manapun; Admin Kelompok hanya profilnya sendiri.
        // {umkm} di-resolve dari route model binding, dicek lewat UmkmPolicy::update.
        return $this->user()->can('update', $this->route('umkm'));
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
