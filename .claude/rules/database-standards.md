# Database Standards

Standar perancangan basis data, skema tabel, migration, dan seeder untuk direktori & katalog UMKM Binaan CSR Pertamina Patra Niaga Dumai.

---

## 1. Konvensi Penamaan & Kolom

- Nama tabel jamak dan `snake_case`: `umkms`, `categories`, `products`, `users`.
- Primary key: `id` (bigint, unsigned, auto-increment).
- Foreign key: `<singular_table>_id` (`umkm_id`, `category_id`).
- Boolean flags menggunakan prefix `is_` atau `has_`: `is_active`, `is_available`, `is_featured`.
- Timestamp bawaan `created_at` dan `updated_at` wajib ada pada setiap tabel utama.

---

## 2. Struktur Skema Tabel Inti

### A. Tabel `umkms` (Data Kelompok Binaan CSR)
Menyimpan profil UMKM mitra binaan CSR Pertamina Patra Niaga Unit Dumai:
- `id`: Bigint unsigned (PK)
- `name`: Varchar(255) — Nama brand atau kelompok usaha
- `slug`: Varchar(255) unique — URL friendly identifier
- `owner_name`: Varchar(255) — Nama ketua kelompok / penanggung jawab
- `phone`: Varchar(30) — Nomor WhatsApp resmi usaha (disimpan dalam format 628...)
- `address`: Text — Alamat fisik tempat usaha/produksi
- `district`: Varchar(100) — Kecamatan di Kota Dumai (Dumai Timur, Dumai Barat, Dumai Kota, Dumai Selatan, Bukit Kapur, Medang Kampai, Sungai Sembilan)
- `description`: Text — Profil sejarah usaha, dampak pemberdayaan CSR, keunggulan produk
- `csr_batch_year`: Year/Integer nullable — Tahun mulai bergabung menjadi binaan CSR Pertamina
- `logo_path`: Varchar(255) nullable — Path foto logo UMKM
- `banner_path`: Varchar(255) nullable — Path banner tempat produksi / foto kelompok
- `shopee_shop_url`: Varchar(500) nullable — Link official shop di Shopee
- `instagram_handle`: Varchar(100) nullable — Akun Instagram usaha
- `is_active`: Boolean default true — Status aktif tampil di direktori publik
- `timestamps`

### B. Tabel `categories` (Master Kategori Produk)
- `id`: Bigint unsigned (PK)
- `name`: Varchar(100) — Contoh: "Kuliner & Olahan Nanas", "Kerajinan Khas Dumai", "Batik & Tenun", "Kesehatan & Herbal"
- `slug`: Varchar(100) unique
- `icon_name`: Varchar(50) nullable — Identifikasi icon Lucide (misal: `Utensils`, `ShoppingBag`, `Sparkles`)
- `description`: Text nullable
- `timestamps`

### C. Tabel `products` (Katalog Produk UMKM)
- `id`: Bigint unsigned (PK)
- `umkm_id`: Bigint unsigned (FK -> `umkms.id`, `onDelete('cascade')`)
- `category_id`: Bigint unsigned (FK -> `categories.id`, `onDelete('restrict')`)
- `name`: Varchar(255) — Nama produk
- `slug`: Varchar(255) — Slug unik produk
- `description`: Text — Deskripsi komposisi, rasa, varian, atau spesifikasi
- `price`: Unsigned Big Integer / Decimal — Harga satuan dalam Rupiah
- `unit`: Varchar(50) default 'pcs' — Satuan (kemasan, bungkus, toples, botol, porsi)
- `image_path`: Varchar(255) nullable — Foto produk utama
- `gallery_paths`: Json nullable — Foto-foto tambahan/varian produk
- `shopee_url`: Varchar(500) nullable — Link langsung pembelian di Shopee
- `is_available`: Boolean default true — Status ketersediaan produk (Ready / Habis)
- `is_featured`: Boolean default false — Tampil di highlight seksi Hero/Beranda
- `timestamps`

---

## 3. Aturan Migration

1. Migration yang sudah dijalankan di environment kerja **TIDAK BOLEH** diubah manual. Buat migration baru jika ada modifikasi skema.
2. Setiap foreign key wajib memiliki constraint dan aksi penghapusan yang jelas:
   - Penghapusan UMKM menghapus produk terkait (`cascadeOnDelete()`).
   - Kategori yang masih memiliki produk tidak boleh terhapus sembarangan (`restrictOnDelete()`).
3. Tambahkan index untuk kolom yang sering dijadikan filter atau pencarian:
   - `umkms`: `name`, `district`, `is_active`
   - `products`: `name`, `category_id`, `umkm_id`, `is_available`, `is_featured`

---

## 4. Seeder Data Otentik

- Sediakan seeder `DatabaseSeeder` yang mengeksekusi:
  - `CategorySeeder`: Kategori khas Dumai & Riau.
  - `UmkmSeeder`: Contoh kelompok binaan CSR Pertamina Patra Niaga Dumai (misal: UMKM Olahan Nanas Bukit Kapur, Batik Mangrove Dumai, Keripik Pisang Berkah, Madu Hutan Dumai).
  - `ProductSeeder`: Produk lengkap dengan harga realistis, foto placeholder berkualitas, nomor WhatsApp dummy berformat `628...`, dan status `is_featured`.
  - `UserSeeder`: Akun Administrator sistem default untuk akses CMS (`admin@pertamina-dumai.id`).
- Seluruh seeder wajib bersifat idempotent menggunakan `firstOrCreate` atau `updateOrCreate`.
