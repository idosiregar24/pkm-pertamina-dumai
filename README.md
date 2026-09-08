# pkm-pertamina-dumai

## Program Pengabdian Kepada Masyarakat (PKM)
> **"Pemberdayaan Kelompok Binaan CSR Pertamina Patra Niaga Unit Dumai melalui Literasi Digital sebagai Upaya Penguatan Branding dan Peningkatan Akses Pasar"**

Portal Web Direktori & Mini-Marketplace Katalog Produk Kelompok Usaha Mikro, Kecil, dan Menengah (UMKM) binaan CSR PT Pertamina Patra Niaga Unit Dumai / Fuel Terminal Dumai.

---

### Dikembangkan Oleh
* **Lead Developer / Pengabdi:** [@Ido Refael Siregar](https://github.com/idosiregar24)
* **Mitra Program:** CSR PT Pertamina Patra Niaga Unit Dumai

---

### Tech Stack & Architecture
* **Backend:** Laravel 11.x (PHP 8.2+)
* **Adapter / Glue:** Inertia.js v2
* **Frontend:** React 18.x (Functional Components & Hooks)
* **Styling:** Tailwind CSS v3 (Pertamina Corporate Clean Style)
* **Icons:** Lucide React (`lucide-react`)
* **Typography:** Noir Pro Semi Bold

---

### Fitur Utama
1. **Direktori & Profil UMKM:** Profil lengkap kelompok binaan, biodata pengelola, lokasi kecamatan di Kota Dumai, dan cerita pemberdayaan.
2. **Katalog Mini-Marketplace:** Etalase produk unggulan khas Dumai (olahan nanas, kerajinan mangrove, batik/tenun, madu hutan) dengan filter kategori instan.
3. **Keranjang Belanja Reaktif (Cart Drawer):** Pengaturan kuantitas, kalkulasi total Rupiah otomatis, dan penyimpanan lokal (`localStorage`).
4. **Direct WhatsApp Checkout:** Menghasilkan pesan terformat otomatis ke WhatsApp pemilik UMKM tanpa potongan komisi.
5. **Integrasi Shopee:** Tautan resmi toko/produk di marketplace eksternal Shopee.

---

### Cara Menjalankan Project

1. **Clone repository:**
   ```bash
   git clone https://github.com/idosiregar24/pkm-pertamina-dumai.git
   cd pkm-pertamina-dumai
   ```

2. **Install dependensi PHP & Node.js:**
   ```bash
   composer install
   npm install
   ```

3. **Konfigurasi Environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Jalankan Migration & Server:**
   ```bash
   php artisan migrate
   npm run dev
   ```
