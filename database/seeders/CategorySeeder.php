<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Kategori khas Dumai & Riau yang dipakai UmkmProductSeeder. Icon merujuk
     * nama komponen Lucide React (dipakai FE bila diperlukan nanti).
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Olahan Nanas & Kuliner', 'icon_name' => 'Utensils'],
            ['name' => 'Kerajinan & Kriya', 'icon_name' => 'Sparkles'],
            ['name' => 'Batik & Tenun', 'icon_name' => 'Shirt'],
            ['name' => 'Madu Hutan & Herbal', 'icon_name' => 'Leaf'],
            ['name' => 'Olah Laut & Seafood', 'icon_name' => 'Fish'],
            ['name' => 'Olahan Singkong & Cemilan', 'icon_name' => 'Cookie'],
            ['name' => 'Minuman Herbal', 'icon_name' => 'CupSoda'],
            ['name' => 'Kue Kering & Tradisional', 'icon_name' => 'Cake'],
            ['name' => 'Pertanian & Pangan Lokal', 'icon_name' => 'Sprout'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['name' => $category['name']],
                [
                    'slug' => Str::slug($category['name']),
                    'icon_name' => $category['icon_name'],
                ]
            );
        }
    }
}
