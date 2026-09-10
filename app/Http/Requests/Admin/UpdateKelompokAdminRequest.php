<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateKelompokAdminRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdminCsr() ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($this->route('kelompok_admin'))],
            // Password opsional saat update — kosongkan jika tidak ingin mengganti.
            'password' => ['nullable', Password::defaults()],
            'umkm_id' => ['required', 'exists:umkms,id'],
            'is_active' => ['boolean'],
        ];
    }
}
