<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'umkm_id',
        'name',
        'slug',
        'price',
        'unit',
        'category',
        'category_slug',
        'description',
        'image_url',
        'shopee_url',
        'is_featured',
        'rating',
        'sold_count',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'price'       => 'float',
        'rating'      => 'float',
    ];

    public function umkm()
    {
        return $this->belongsTo(Umkm::class);
    }
}
