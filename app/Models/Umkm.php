<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Umkm extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'owner_name',
        'district',
        'phone',
        'established_year',
        'csr_batch_year',
        'shopee_shop_url',
        'certification',
        'members_count',
        'description',
        'banner_url',
        'logo_url',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /** Akun Admin Kelompok yang terhubung ke UMKM ini. */
    public function admins()
    {
        return $this->hasMany(User::class);
    }
}
