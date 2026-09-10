<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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

    protected static function booted(): void
    {
        static::saving(function (Product $product) {
            if (empty($product->category_slug) && !empty($product->category)) {
                $product->category_slug = Str::slug($product->category);
            }
            if (empty($product->slug) && !empty($product->name)) {
                $product->slug = Str::slug($product->name) . '-' . Str::random(5);
            }
        });
    }

    public function umkm()
    {
        return $this->belongsTo(Umkm::class);
    }
}
