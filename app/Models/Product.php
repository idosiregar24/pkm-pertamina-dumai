<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory, BelongsToTenant;

    protected $fillable = [
        'umkm_id',
        'category_id',
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

    /**
     * `category` / `category_slug` (string) adalah CACHE denormalisasi yang
     * di-sync otomatis dari relasi category_id -> categories setiap kali
     * category_id berubah — bukan sumber kebenaran. Dipertahankan (bukan
     * dihapus) supaya seluruh halaman publik yang sudah membaca
     * `product.category` langsung (ProductCard, Catalog, Welcome, Directory)
     * tidak perlu diubah. Sumber kebenaran & satu-satunya yang bisa diedit
     * dari form admin sekarang adalah category_id, yang WAJIB merujuk baris
     * nyata di tabel categories (FK) — kelas bug lama (kategori string bebas
     * yang bisa "hilang" diam-diam) sudah tidak mungkin terjadi lagi.
     */
    protected static function booted(): void
    {
        static::saving(function (Product $product) {
            if ($product->isDirty('category_id') && $product->category_id) {
                // Selalu query langsung, JANGAN baca lewat $product->category —
                // itu nama kolom string (lihat $fillable), bukan relasi
                // categoryModel() di bawah. Karena keduanya berbagi nama
                // "category", accessor Eloquent SELALU memprioritaskan atribut
                // kolom asli; $product->category tidak akan pernah mengembalikan
                // model Category walau relasinya di-eager-load.
                $category = Category::find($product->category_id);

                if ($category) {
                    $product->category = $category->name;
                    $product->category_slug = $category->slug;
                }
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

    /**
     * Sengaja BUKAN bernama category() — kolom string `category` di atas akan
     * selalu menang lewat accessor Eloquent kalau nama relasi sama persis,
     * membuat relasi ini diam-diam tidak pernah bisa diakses lewat
     * $product->category. Pakai categoryModel() secara eksplisit.
     */
    public function categoryModel()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
