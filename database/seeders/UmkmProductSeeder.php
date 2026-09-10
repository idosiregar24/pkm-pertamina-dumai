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
        $umkms = [
            [
                'name' => 'Kelompok Tani Nanas Maju Mandiri',
                'owner_name' => 'Ibu Siti Aminah',
                'district' => 'Bukit Kapur',
                'phone' => '081268421099',
                'established_year' => 2018,
                'csr_batch_year' => 2021,
                'banner_url' => 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=1200&q=80',
                'logo_url' => 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=400&q=80',
                'shopee_shop_url' => 'https://shopee.co.id',
                'description' => 'Kelompok tani binaan CSR Pertamina Patra Niaga Dumai yang mengolah nanas madu khas Bukit Kapur menjadi produk olahan berkualitas dan siap dipasarkan.',
                'members_count' => 24,
                'certification' => 'P-IRT, Halal MUI, Binaan CSR TJSL',
                'products' => [
                    ['name' => 'Keripik Nanas Madu Bukit Kapur Crispy', 'price' => 25000, 'unit' => 'pouch 100g', 'category' => 'Olahan Nanas & Kuliner', 'image_url' => 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=900&q=80', 'description' => 'Keripik nanas hasil vacuum frying dengan rasa manis alami dan tekstur renyah.', 'is_featured' => true, 'rating' => 4.9, 'sold_count' => 340],
                    ['name' => 'Selai Nanas Premium Glass Jar', 'price' => 32000, 'unit' => 'jar 250g', 'category' => 'Olahan Nanas & Kuliner', 'image_url' => 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&w=900&q=80', 'description' => 'Selai nanas dengan tekstur lembut, aroma khas, dan tanpa bahan pengawet.', 'is_featured' => true, 'rating' => 5.0, 'sold_count' => 210],
                    ['name' => 'Sirup Nanas Dumai Segar', 'price' => 35000, 'unit' => 'botol 500ml', 'category' => 'Olahan Nanas & Kuliner', 'image_url' => 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80', 'description' => 'Sirup nanas konsentrat kaya vitamin C yang cocok untuk minuman keluarga.', 'is_featured' => false, 'rating' => 4.8, 'sold_count' => 155],
                    ['name' => 'Dodol Nanas Khas Dumai', 'price' => 28000, 'unit' => 'kotak 200g', 'category' => 'Olahan Nanas & Kuliner', 'image_url' => 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=900&q=80', 'description' => 'Dodol nanas dengan cita rasa gurih manis dan aroma kelapa tradisional.', 'is_featured' => false, 'rating' => 4.7, 'sold_count' => 98],
                ],
            ],
            [
                'name' => 'Rumah Kriya Mangrove Lestari',
                'owner_name' => 'Bapak Hendra Saputra',
                'district' => 'Dumai Barat',
                'phone' => '085271890044',
                'established_year' => 2019,
                'csr_batch_year' => 2022,
                'banner_url' => 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80',
                'logo_url' => 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80',
                'shopee_shop_url' => 'https://shopee.co.id',
                'description' => 'Kelompok pengrajin di Dumai Barat yang memanfaatkan serat alam dan ranting mangrove menjadi produk kerajinan unik dan ramah lingkungan.',
                'members_count' => 18,
                'certification' => 'Ecolabel Indonesia, Binaan CSR TJSL',
                'products' => [
                    ['name' => 'Tas Anyaman Serat Mangrove', 'price' => 85000, 'unit' => 'pcs', 'category' => 'Kerajinan & Kriya', 'image_url' => 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', 'description' => 'Tas anyaman handmade dengan motif khas pesisir Dumai yang kuat dan tahan lama.', 'is_featured' => true, 'rating' => 4.9, 'sold_count' => 140],
                    ['name' => 'Dompet Serat Alam Mangrove', 'price' => 65000, 'unit' => 'pcs', 'category' => 'Kerajinan & Kriya', 'image_url' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', 'description' => 'Dompet kecil berbahan serat alam dengan desain urban dan sentuhan etnik.', 'is_featured' => false, 'rating' => 4.8, 'sold_count' => 81],
                    ['name' => 'Plakat Hiasan Dinding Mangrove', 'price' => 75000, 'unit' => 'pcs', 'category' => 'Kerajinan & Kriya', 'image_url' => 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80', 'description' => 'Hiasan dinding bertema flora dan fauna pesisir dengan sentuhan ukir khas Dumai.', 'is_featured' => false, 'rating' => 4.7, 'sold_count' => 42],
                    ['name' => 'Miniatur Kapal Pinisi Kayu', 'price' => 150000, 'unit' => 'set', 'category' => 'Kerajinan & Kriya', 'image_url' => 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80', 'description' => 'Miniatur kapal pinisi hasil ukiran kayu daur ulang yang cocok sebagai cinderamata.', 'is_featured' => false, 'rating' => 5.0, 'sold_count' => 65],
                ],
            ],
            [
                'name' => 'Batik & Tenun Dumai Berkah',
                'owner_name' => 'Ibu Nurhayati',
                'district' => 'Dumai Kota',
                'phone' => '081374552211',
                'established_year' => 2020,
                'csr_batch_year' => 2023,
                'banner_url' => 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
                'logo_url' => 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
                'shopee_shop_url' => 'https://shopee.co.id',
                'description' => 'Pusat tenun dan batik khas Dumai yang menonjolkan motif pesisir, warna alam, dan sentuhan lokal berkelas.',
                'members_count' => 15,
                'certification' => 'HAKI Motif Dumai, Binaan CSR TJSL',
                'products' => [
                    ['name' => 'Kain Tenun Songket Dumai', 'price' => 350000, 'unit' => 'lembar 2 meter', 'category' => 'Batik & Tenun', 'image_url' => 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=900&q=80', 'description' => 'Songket Melayu Dumai tenun manual dengan benang emas dan warna khas pesisir.', 'is_featured' => true, 'rating' => 5.0, 'sold_count' => 85],
                    ['name' => 'Selendang Batik Tulis Alami', 'price' => 180000, 'unit' => 'lembar', 'category' => 'Batik & Tenun', 'image_url' => 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', 'description' => 'Selendang batik tulis dengan motif bendungan laut dan warna alami mangrove.', 'is_featured' => false, 'rating' => 4.9, 'sold_count' => 110],
                    ['name' => 'Sarung Batik Motif Pesisir', 'price' => 210000, 'unit' => 'lembar', 'category' => 'Batik & Tenun', 'image_url' => 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=900&q=80', 'description' => 'Sarung batik dengan corak motif pesisir dan kualitas jahitan rapi.', 'is_featured' => false, 'rating' => 4.8, 'sold_count' => 70],
                    ['name' => 'Blouse Batik Dumai', 'price' => 240000, 'unit' => 'pcs', 'category' => 'Batik & Tenun', 'image_url' => 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80', 'description' => 'Blouse batik modern dengan sentuhan tradisi Dumai untuk kebutuhan sehari-hari.', 'is_featured' => true, 'rating' => 4.9, 'sold_count' => 95],
                ],
            ],
            [
                'name' => 'Madu Hutan & Herbal Dumai Sejahtera',
                'owner_name' => 'Bapak Ruslan Efendi',
                'district' => 'Medang Kampai',
                'phone' => '082169883355',
                'established_year' => 2017,
                'csr_batch_year' => 2020,
                'banner_url' => 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80',
                'logo_url' => 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80',
                'shopee_shop_url' => 'https://shopee.co.id',
                'description' => 'Kelompok peternak dan pengolah madu hutan asal Medang Kampai yang fokus pada produk herbal dan kesehatan alami.',
                'members_count' => 20,
                'certification' => 'Uji Laboratorium Kemurnian, P-IRT, Halal',
                'products' => [
                    ['name' => 'Madu Hutan Sialang Asli', 'price' => 120000, 'unit' => 'botol 500g', 'category' => 'Madu Hutan & Herbal', 'image_url' => 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80', 'description' => 'Madu hutan sialang murni dari pohon alami yang dipanen langsung di wilayah Dumai.', 'is_featured' => true, 'rating' => 5.0, 'sold_count' => 420],
                    ['name' => 'Madu Propolis Trigona', 'price' => 85000, 'unit' => 'botol 250ml', 'category' => 'Madu Hutan & Herbal', 'image_url' => 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=900&q=80', 'description' => 'Campuran madu hutan dengan propolis lebah trigona yang kaya manfaat.', 'is_featured' => false, 'rating' => 4.9, 'sold_count' => 230],
                    ['name' => 'Herbal Jahe Madu', 'price' => 45000, 'unit' => 'botol 250ml', 'category' => 'Madu Hutan & Herbal', 'image_url' => 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80', 'description' => 'Minuman herbal rasa jahe dan madu yang cocok untuk menjaga stamina.', 'is_featured' => false, 'rating' => 4.8, 'sold_count' => 114],
                    ['name' => 'Teh Herbal Rimpang Dumai', 'price' => 30000, 'unit' => 'pack 20 sachet', 'category' => 'Madu Hutan & Herbal', 'image_url' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80', 'description' => 'Teh herbal rempah tradisional dengan campuran jahe, kunyit dan rimpang lokal.', 'is_featured' => false, 'rating' => 4.7, 'sold_count' => 130],
                ],
            ],
            [
                'name' => 'Pesisir Segar Dumai Nusantara',
                'owner_name' => 'Bapak Rahmat Hidayat',
                'district' => 'Dumai Timur',
                'phone' => '081220599440',
                'established_year' => 2021,
                'csr_batch_year' => 2024,
                'banner_url' => 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
                'logo_url' => 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=400&q=80',
                'shopee_shop_url' => 'https://shopee.co.id',
                'description' => 'Kelompok usaha hasil laut dari Dumai Timur yang mengolah ikan dan produk pesisir menjadi makanan siap jual dengan kualitas higienis.',
                'members_count' => 22,
                'certification' => 'BPOM, Halal MUI, Binaan CSR TJSL',
                'products' => [
                    ['name' => 'Kerupuk Ikan Tenggiri Dumai', 'price' => 22000, 'unit' => 'kemasan 250g', 'category' => 'Olah Laut & Seafood', 'image_url' => 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=80', 'description' => 'Kerupuk ikan tenggiri gurih khas hasil laut Dumai yang renyah dan menggugah selera.', 'is_featured' => true, 'rating' => 4.9, 'sold_count' => 260],
                    ['name' => 'Abon Ikan Cakalang Dumai', 'price' => 30000, 'unit' => 'kemasan 150g', 'category' => 'Olah Laut & Seafood', 'image_url' => 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80', 'description' => 'Abon ikan cakalang dengan rasa gurih dan aroma asap yang khas.', 'is_featured' => false, 'rating' => 4.8, 'sold_count' => 180],
                    ['name' => 'Ikan Asap Tanjung Medang', 'price' => 28000, 'unit' => 'pack 200g', 'category' => 'Olah Laut & Seafood', 'image_url' => 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80', 'description' => 'Ikan asap khas Dumai yang diolah dengan metode tradisional dan higienis.', 'is_featured' => false, 'rating' => 4.7, 'sold_count' => 145],
                    ['name' => 'Pempek Dumai Original', 'price' => 26000, 'unit' => 'porsi 10 pcs', 'category' => 'Olah Laut & Seafood', 'image_url' => 'https://images.unsplash.com/photo-1625944230945-1b7d8a6f4f7d?auto=format&fit=crop&w=900&q=80', 'description' => 'Pempek Dumai dengan cita rasa kenyal ala kota pesisir dan camilan favorit lokal.', 'is_featured' => false, 'rating' => 4.9, 'sold_count' => 205],
                ],
            ],
            [
                'name' => 'Wirani Rejosari',
                'owner_name' => 'Ibu Wira Ningsih',
                'district' => 'Sungai Sembilan',
                'phone' => '082277481234',
                'established_year' => 2021,
                'csr_batch_year' => 2024,
                'banner_url' => 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80',
                'logo_url' => 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=400&q=80',
                'shopee_shop_url' => 'https://shopee.co.id',
                'description' => 'UMKM Wirani Rejosari adalah usaha rumahan di Sungai Sembilan yang mengolah produk olahan lokal seperti singkong, nanas, dan rempah khas Dumai menjadi makanan siap jual dengan cita rasa tradisional.',
                'members_count' => 12,
                'certification' => 'P-IRT, Halal MUI, Binaan CSR TJSL',
                'products' => [
                    ['name' => 'Keripik Singkong Rejosari Renyah', 'price' => 18000, 'unit' => 'kemasan 150g', 'category' => 'Olahan Singkong & Cemilan', 'image_url' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80', 'description' => 'Keripik singkong renyah hasil olahan rumahan dengan rasa gurih dan cita rasa khas Dumai.', 'is_featured' => true, 'rating' => 4.8, 'sold_count' => 230],
                    ['name' => 'Sambal Nanas Rejosari', 'price' => 22000, 'unit' => 'botol 250ml', 'category' => 'Olahan Nanas & Kuliner', 'image_url' => 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80', 'description' => 'Sambal nanas home made dengan rasa pedas sedikit manis cocok menemani hidangan lokal.', 'is_featured' => false, 'rating' => 4.9, 'sold_count' => 185],
                    ['name' => 'Sirup Jahe Rejosari Segar', 'price' => 26000, 'unit' => 'botol 500ml', 'category' => 'Minuman Herbal', 'image_url' => 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80', 'description' => 'Sirup jahe tradisional dengan aroma rempah hangat dan rasa yang menyehatkan.', 'is_featured' => false, 'rating' => 4.7, 'sold_count' => 142],
                    ['name' => 'Kue Kacang Rejosari', 'price' => 20000, 'unit' => 'kemasan 200g', 'category' => 'Kue Kering & Tradisional', 'image_url' => 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=80', 'description' => 'Kue kacang renyah buatan rumah yang cocok untuk oleh-oleh khas Dumai.', 'is_featured' => false, 'rating' => 4.8, 'sold_count' => 168],
                    ['name' => 'Sorju Rejosari Original', 'price' => 24000, 'unit' => 'botol 350ml', 'category' => 'Minuman Herbal', 'image_url' => 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80', 'description' => 'Sorju khas Rejosari dengan rasa segar dan rempah alami, cocok untuk minuman sehari-hari.', 'is_featured' => true, 'rating' => 4.8, 'sold_count' => 175],
                ],
            ],
        ];

        foreach ($umkms as $umkmData) {
            $umkm = Umkm::firstOrCreate(
                ['name' => $umkmData['name']],
                [
                    'owner_name' => $umkmData['owner_name'],
                    'district' => $umkmData['district'],
                    'phone' => $umkmData['phone'],
                    'established_year' => $umkmData['established_year'],
                    'csr_batch_year' => $umkmData['csr_batch_year'],
                    'banner_url' => $umkmData['banner_url'],
                    'logo_url' => $umkmData['logo_url'],
                    'shopee_shop_url' => $umkmData['shopee_shop_url'],
                    'description' => $umkmData['description'],
                    'members_count' => $umkmData['members_count'],
                    'certification' => $umkmData['certification'],
                ]
            );

            foreach ($umkmData['products'] as $productData) {
                $slug = Str::slug($productData['name']);

                Product::updateOrCreate(
                    ['slug' => $slug],
                    [
                        'umkm_id' => $umkm->id,
                        'name' => $productData['name'],
                        'slug' => $slug,
                        'price' => $productData['price'],
                        'unit' => $productData['unit'],
                        'category' => $productData['category'],
                        'category_slug' => Str::slug($productData['category']),
                        'description' => $productData['description'],
                        'image_url' => $productData['image_url'],
                        'shopee_url' => $umkmData['shopee_shop_url'],
                        'is_featured' => $productData['is_featured'],
                        'rating' => $productData['rating'],
                        'sold_count' => $productData['sold_count'],
                    ]
                );
            }
        }
    }
}
