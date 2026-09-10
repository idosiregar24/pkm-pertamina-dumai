<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Umkm;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UmkmProductSeeder extends Seeder
{
    public function run(): void
    {
        // ── UMKM Data ──
        $umkm1 = Umkm::create([
            'name'             => 'Kelompok Tani Nanas Maju Mandiri',
            'owner_name'       => 'Ibu Siti Aminah',
            'district'         => 'Kec. Bukit Kapur',
            'phone'            => '081268421099',
            'established_year' => 2018,
            'csr_batch_year'   => 2021,
            'banner_url'       => 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop&q=80',
            'logo_url'         => 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=200&auto=format&fit=crop&q=80',
            'shopee_shop_url'  => 'https://shopee.co.id',
            'description'      => 'Kelompok tani binaan CSR Pertamina Patra Niaga Dumai yang mengolah komoditas nanas madu khas lahan gambut Bukit Kapur menjadi aneka kuliner bernilai tambah tinggi.',
            'members_count'    => 24,
            'certification'    => 'P-IRT, Halal MUI, Binaan CSR TJSL',
        ]);

        $umkm2 = Umkm::create([
            'name'             => 'Rumah Kriya Mangrove Lestari',
            'owner_name'       => 'Bapak Hendra Saputra',
            'district'         => 'Kec. Dumai Barat',
            'phone'            => '085271890044',
            'established_year' => 2019,
            'csr_batch_year'   => 2022,
            'banner_url'       => 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80',
            'logo_url'         => 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=200&auto=format&fit=crop&q=80',
            'shopee_shop_url'  => 'https://shopee.co.id',
            'description'      => 'Kelompok pengrajin ramah lingkungan di pesisir Dumai Barat yang mengolah limbah ranting mangrove dan serat alami menjadi cinderamata serta produk kerajinan bernilai seni.',
            'members_count'    => 18,
            'certification'    => 'Ecolabel Indonesia, Binaan CSR TJSL',
        ]);

        $umkm3 = Umkm::create([
            'name'             => 'Batik & Tenun Dumai Berkah',
            'owner_name'       => 'Ibu Nurhayati',
            'district'         => 'Kec. Dumai Kota',
            'phone'            => '081374552211',
            'established_year' => 2020,
            'csr_batch_year'   => 2023,
            'banner_url'       => 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80',
            'logo_url'         => 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=200&auto=format&fit=crop&q=80',
            'shopee_shop_url'  => 'https://shopee.co.id',
            'description'      => 'Pemberdayaan ibu-ibu pengrajin tenun songket dan batik khas Dumai dengan pewarna alami ekstrak mangrove dan motif ikonik Kota Dumai.',
            'members_count'    => 15,
            'certification'    => 'HAKI Motif Dumai, Binaan CSR TJSL',
        ]);

        $umkm4 = Umkm::create([
            'name'             => 'Madu Hutan & Herbal Dumai Sejahtera',
            'owner_name'       => 'Bapak Ruslan Efendi',
            'district'         => 'Kec. Medang Kampai',
            'phone'            => '082169883355',
            'established_year' => 2017,
            'csr_batch_year'   => 2020,
            'banner_url'       => 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80',
            'logo_url'         => 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&auto=format&fit=crop&q=80',
            'shopee_shop_url'  => 'https://shopee.co.id',
            'description'      => 'Kelompok pembudidaya lebah madu sialang dan hutan akasia di Medang Kampai, menghasilkan madu murni tanpa campuran serta olahan herbal kesehatan.',
            'members_count'    => 20,
            'certification'    => 'Uji Laboratorium Kemurnian, P-IRT, Halal',
        ]);

        // ── Product Data ──
        $products = [
            ['umkm_id' => $umkm1->id, 'name' => 'Keripik Nanas Madu Bukit Kapur Crispy', 'price' => 25000, 'unit' => 'pouch 100g', 'category' => 'Olahan Nanas & Kuliner', 'category_slug' => 'olahan-nanas', 'is_featured' => true, 'rating' => 4.9, 'sold_count' => 340, 'image_url' => 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&auto=format&fit=crop&q=80', 'description' => 'Keripik nanas olahan vacuum frying dari nanas madu kualitas super khas lahan gambut Bukit Kapur Dumai.'],
            ['umkm_id' => $umkm1->id, 'name' => 'Selai Nanas Dumai Premium Glass Jar', 'price' => 32000, 'unit' => 'jar 250g', 'category' => 'Olahan Nanas & Kuliner', 'category_slug' => 'olahan-nanas', 'is_featured' => true, 'rating' => 5.0, 'sold_count' => 210, 'image_url' => 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=600&auto=format&fit=crop&q=80', 'description' => 'Selai nanas segar dengan tekstur serat buah asli dan aroma cengkeh kayu manis yang kaya.'],
            ['umkm_id' => $umkm1->id, 'name' => 'Sirup Konsentrat Nanas Gambut Segar', 'price' => 35000, 'unit' => 'botol 500ml', 'category' => 'Olahan Nanas & Kuliner', 'category_slug' => 'olahan-nanas', 'is_featured' => false, 'rating' => 4.8, 'sold_count' => 155, 'image_url' => 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80', 'description' => 'Konsentrat sari nanas murni kaya vitamin C.'],
            ['umkm_id' => $umkm1->id, 'name' => 'Dodol Nanas Lembut Khas Dumai', 'price' => 28000, 'unit' => 'kotak 200g', 'category' => 'Olahan Nanas & Kuliner', 'category_slug' => 'olahan-nanas', 'is_featured' => false, 'rating' => 4.7, 'sold_count' => 98, 'image_url' => 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=600&auto=format&fit=crop&q=80', 'description' => 'Dodol nanas khas pesisir Riau dengan perpaduan santan kelapa murni.'],
            ['umkm_id' => $umkm2->id, 'name' => 'Tas Anyaman Serat Mangrove Ramah Lingkungan', 'price' => 85000, 'unit' => 'pcs', 'category' => 'Kerajinan & Kriya', 'category_slug' => 'kerajinan', 'is_featured' => true, 'rating' => 4.9, 'sold_count' => 140, 'image_url' => 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80', 'description' => 'Tas jinjing etnik buatan tangan pengrajin pesisir Dumai Barat.'],
            ['umkm_id' => $umkm2->id, 'name' => 'Miniatur Kapal Pinisi Kayu Pesisir Dumai', 'price' => 150000, 'unit' => 'set', 'category' => 'Kerajinan & Kriya', 'category_slug' => 'kerajinan', 'is_featured' => false, 'rating' => 5.0, 'sold_count' => 65, 'image_url' => 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80', 'description' => 'Cinderamata miniatur kapal tradisional berbahan kayu daur ulang.'],
            ['umkm_id' => $umkm2->id, 'name' => 'Plakat Hiasan Dinding Ukir Mangrove', 'price' => 75000, 'unit' => 'pcs', 'category' => 'Kerajinan & Kriya', 'category_slug' => 'kerajinan', 'is_featured' => false, 'rating' => 4.8, 'sold_count' => 42, 'image_url' => 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80', 'description' => 'Hiasan dinding berukir motif flora fauna pesisir Dumai.'],
            ['umkm_id' => $umkm3->id, 'name' => 'Kain Tenun Songket Dumai Motif Pucuk Rebung', 'price' => 350000, 'unit' => 'lembar (2 meter)', 'category' => 'Batik & Tenun', 'category_slug' => 'batik-tenun', 'is_featured' => true, 'rating' => 5.0, 'sold_count' => 85, 'image_url' => 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80', 'description' => 'Songket Melayu Dumai tenun manual tangan (ATBM) dengan benang emas berkualitas tinggi.'],
            ['umkm_id' => $umkm3->id, 'name' => 'Selendang Batik Tulis Pewarna Alami Mangrove', 'price' => 180000, 'unit' => 'lembar', 'category' => 'Batik & Tenun', 'category_slug' => 'batik-tenun', 'is_featured' => false, 'rating' => 4.9, 'sold_count' => 110, 'image_url' => 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80', 'description' => 'Selendang batik tulis eksklusif dengan warna cokelat tanah alami.'],
            ['umkm_id' => $umkm4->id, 'name' => 'Madu Hutan Sialang Asli Medang Kampai Murni', 'price' => 120000, 'unit' => 'botol 500g', 'category' => 'Madu Hutan & Herbal', 'category_slug' => 'madu-herbal', 'is_featured' => true, 'rating' => 5.0, 'sold_count' => 420, 'image_url' => 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80', 'description' => 'Madu murni mentah (raw honey) dipanen langsung dari pohon sialang hutan Medang Kampai Dumai.'],
            ['umkm_id' => $umkm4->id, 'name' => 'Madu Propolis Lebah Trigona Klanceng Dumai', 'price' => 85000, 'unit' => 'botol 250ml', 'category' => 'Madu Hutan & Herbal', 'category_slug' => 'madu-herbal', 'is_featured' => false, 'rating' => 4.9, 'sold_count' => 230, 'image_url' => 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&auto=format&fit=crop&q=80', 'description' => 'Kombinasi madu hutan dengan ekstrak propolis lebah trigona asli Dumai.'],
            ['umkm_id' => $umkm4->id, 'name' => 'Madu Sarang Hutan Alami Fresh Honeycomb', 'price' => 95000, 'unit' => 'box 250g', 'category' => 'Madu Hutan & Herbal', 'category_slug' => 'madu-herbal', 'is_featured' => false, 'rating' => 5.0, 'sold_count' => 175, 'image_url' => 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=600&auto=format&fit=crop&q=80', 'description' => 'Sarang lebah madu hutan asli dalam kemasan higienis.'],
        ];

        foreach ($products as $product) {
            $product['slug'] = Str::slug($product['name']) . '-' . Str::random(4);
            Product::create($product);
        }
    }
}
