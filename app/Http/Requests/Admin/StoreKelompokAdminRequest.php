<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreKelompokAdminRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Hanya Admin CSR yang boleh mendaftarkan akun Admin Kelompok.
        return $this->user()?->isAdminCsr() ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', Password::defaults()],
            'umkm_id' => ['required', 'exists:umkms,id'],
        ];
    }
}
