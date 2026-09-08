# Roadmap & Milestone Implementasi Bertahap

Dokumen rencana kerja bertahap (*Step-by-Step Implementation Roadmap*) untuk proyek:
**"Pemberdayaan Kelompok Binaan CSR Pertamina Patra Niaga Unit Dumai melalui Literasi Digital sebagai Upaya Penguatan Branding dan Peningkatan Akses Pasar"**

---

## Ringkasan 4 Tahapan Utama

```
┌─────────────────────────┐     ┌─────────────────────────┐
│        TAHAP 1          │     │        TAHAP 2          │
│ Setup Struktur, Theme,  │ ──> │ State Katalog & Cart    │
│ & UI Landing/Direktori  │     │ Drawer Reaktif          │
└─────────────────────────┘     └─────────────────────────┘
             │                               │
             ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│        TAHAP 3          │     │        TAHAP 4          │
│ Checkout WhatsApp Multi-│ ──> │ Panel Admin / CMS       │
│ UMKM & Link Shopee      │     │ Kelompok Binaan CSR     │
└─────────────────────────┘     └─────────────────────────┘
```

---

## Tahap 1: Setup Struktur, Design Token, & Layout UI Landing/Direktori

**Fokus Utama:** Membangun fondasi visual Pertamina Corporate Clean Style, konfigurasi tema Tailwind, komponen atomik, header/footer berlogo resmi, dan layout utama direktori binaan.

### Sub-Task & Deliverables:
- [ ] **1.1. Konfigurasi Tailwind & Theme Tokens:**
  - Tambahkan konfigurasi warna resmi di `tailwind.config.js`:
    - `pertamina-red`: `#ED1C24`
    - `pertamina-blue`: `#005BAC`
    - `pertamina-green`: `#00A651`
    - `shopee-orange`: `#EE4D2D`
    - Palette surface putih bersih & slate modern (`#FFFFFF`, `#F8FAFC`, `#F1F5F9`).
- [ ] **1.2. Public Master Layout (`PublicLayout.jsx`):**
  - Navbar putih bersih (`bg-white/95 backdrop-blur border-b border-slate-200`) dengan:
    - Logo resmi Pertamina Patra Niaga dari `/asset/logo/logo-pertamina-patra-niaga.png`.
    - Menu navigasi: *Beranda*, *Katalog Produk*, *Direktori UMKM*, *Tentang PKM & CSR*.
    - Tombol Ikon Keranjang Belanja dengan Badge Counter reaktif.
  - Footer korporat resmi mencantumkan identitas Unit CSR Pertamina Patra Niaga Dumai, program PKM, alamat, dan kontak informasi.
- [ ] **1.3. Halaman Landing Page (`Welcome.jsx` / `Home.jsx`):**
  - **Hero Section:** Headline visual elegan program PKM & CSR Pertamina Patra Niaga Unit Dumai dengan CTA "Jelajahi Produk Binaan" dan "Lihat Profil UMKM".
  - **Banner Program Binaan:** Narasi literasi digital dan pemberdayaan ekonomi lokal Kota Dumai.
  - **Kategori Pilihan:** Grid kategori produk (Kuliner, Olahan Nanas, Kerajinan, Madu & Herbal).
  - **Featured Products Section:** Etalase produk-produk unggulan terpilih.
- [ ] **1.4. Halaman Direktori UMKM Binaan (`Directory/Index.jsx` & `Show.jsx`):**
  - Grid kartu kelompok binaan (`UmkmCard.jsx`) dilengkapi Badge Resmi *"Binaan CSR Pertamina Patra Niaga Unit Dumai"*.
  - Detail profil UMKM (`Directory/Show.jsx`) memuat sejarah usaha, nama ketua kelompok, lokasi kecamatan di Dumai, galeri usaha, dan etalase produk buatan UMKM tersebut.

---

## Tahap 2: Manajemen State Katalog & Keranjang Belanja

**Fokus Utama:** Katalog produk mini-marketplace yang responsif, filter & sorting kategori produk, serta keranjang belanja reaktif (*Cart Drawer*) dengan penyimpanan lokal.

### Sub-Task & Deliverables:
- [ ] **2.1. Halaman Katalog Produk (`Products/Index.jsx`):**
  - Grid produk minimalis modern dengan layout kartu bersih dan foto tajam.
  - Komponen `FilterBar.jsx`: Tab filter kategori instan, pencarian nama produk debounced, dan pengurutan harga (terendah/tertinggi).
  - Badge kategori, harga Rupiah yang jelas (`formatRupiah`), dan tombol "Tambah ke Keranjang".
- [ ] **2.2. Halaman Detail Produk (`Products/Show.jsx`):**
  - Foto produk beresolusi tinggi dengan thumbnail preview.
  - Badge resmi binaan CSR Pertamina Patra Niaga Unit Dumai.
  - Profil mini UMKM pembuat produk lengkap dengan tautan ke halaman profil UMKM-nya.
  - Deskripsi produk, satuan kemasan, dan ketersediaan stok.
  - Kontrol jumlah pesanan (stepper kuantitas) dan aksi checkout langsung.
- [ ] **2.3. Reactive Cart State (`CartContext.jsx`):**
  - Context & custom hook `useCart` untuk mengelola item belanja secara global:
    - Simpan state ke `localStorage` (`pertamina_dumai_cart`).
    - Fungsi tambah, kurangi, hapus, dan reset keranjang.
    - Kalkulasi otomatis total kuantitas dan total nominal rupiah.
- [ ] **2.4. Komponen Keranjang Belanja (`CartDrawer.jsx`):**
  - Slide-over drawer di sisi kanan layar saat ikon keranjang di-klik.
  - Tampilan item dengan thumbnail, nama produk, kuantitas stepper `[-] [qty] [+]`, subtotal, dan tombol hapus.
  - Empty state ramah dengan tombol ajakan "Mulai Belanja".
  - Form ringkas data pemesan: Nama, No. WhatsApp, Alamat Pengiriman, Catatan.

---

## Tahap 3: Logika Checkout WhatsApp Multi-UMKM & Integrasi Shopee

**Fokus Utama:** Menghubungkan pembeli langsung ke penjual UMKM via WhatsApp dengan format pesan pemesanan terstruktur serta integrasi toko Shopee.

### Sub-Task & Deliverables:
- [ ] **3.1. Helper Normalisasi Kontak & URL Generator:**
  - Utilitas `formatWhatsAppNumber` untuk membersihkan nomor telepon lokal ke format internasional `628...`.
  - Utilitas `generateWhatsAppOrderUrl` untuk menyusun template teks pesanan yang rapi dan ter-encode URL (`encodeURIComponent`).
- [ ] **3.2. Penanganan Checkout Multi-UMKM:**
  - Pemisahan item pesanan jika pembeli memilih produk dari beberapa UMKM berbeda (*Grouping by UMKM*).
  - Tampilan rincian subtotal per-UMKM di dalam Cart Drawer.
  - Tombol aksi WhatsApp langsung ke pemilik UMKM yang bersangkutan dengan pesan spesifik produk UMKM tersebut.
- [ ] **3.3. Integrasi Tautan Marketplace Luar (Shopee):**
  - Tombol "Beli di Shopee" (`ShopeeButton.jsx`) dengan warna oranye `#EE4D2D` pada kartu produk dan detail produk.
  - Validasi URL Shopee aman (`https://shopee.co.id/...`) dan pembukaan tab baru (`target="_blank"` + `rel="noopener noreferrer"`).

---

## Tahap 4: Halaman Admin / CMS Kelompok Binaan CSR

**Fokus Utama:** Panel manajemen konten bagi admin CSR Pertamina Patra Niaga Dumai / tim PKM untuk mengelola data UMKM, kategori, dan produk secara mandiri.

### Sub-Task & Deliverables:
- [ ] **4.1. Skema Database & Migrations:**
  - Migration tabel `categories`, `umkms`, dan `products` dengan foreign key dan index yang tepat.
  - Seeder data awal (`CategorySeeder`, `UmkmSeeder`, `ProductSeeder`, `UserSeeder`) berisi data realistis UMKM Dumai.
- [ ] **4.2. Manajemen Kelompok Binaan UMKM (`Admin/Umkm`):**
  - Formulir input/edit profil UMKM: Nama usaha, nama pemilik, nomor WhatsApp, kecamatan di Dumai, deskripsi pembinaan CSR, tahun angkatan binaan, link Shopee, upload logo & foto tempat usaha.
- [ ] **4.3. Manajemen Inventaris Produk (`Admin/Product`):**
  - Formulir input/edit produk: Pilihan UMKM binaan, kategori, nama produk, deskripsi, harga, satuan, upload foto produk, link produk Shopee, dan toggle produk unggulan (`is_featured`).
- [ ] **4.4. Dashboard & Statistik Ringkas:**
  - Kartu statistik total UMKM binaan aktif, total katalog produk, dan distribusi kategori.
  - Akses cepat untuk melihat preview website publik langsung dari dashboard admin.

---

## Status Verifikasi Milestone
Setiap tahap harus melalui pengujian UI/UX (desktop & mobile) serta fungsionalitas sebelum berlanjut ke tahap berikutnya.
