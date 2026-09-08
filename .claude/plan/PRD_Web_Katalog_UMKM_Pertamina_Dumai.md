# Product Requirement Document (PRD)
## Web Direktori & Mini-Marketplace Katalog UMKM Binaan CSR Pertamina Patra Niaga Unit Dumai

| Dokumen Info | Detail |
| :--- | :--- |
| **Judul Program PKM** | Pemberdayaan Kelompok Binaan CSR Pertamina Patra Niaga Unit Dumai melalui Literasi Digital sebagai Upaya Penguatan Branding dan Peningkatan Akses Pasar |
| **Mitra CSR** | PT Pertamina Patra Niaga Unit Dumai / Fuel Terminal Dumai |
| **Penerima Manfaat** | Kelompok Usaha Mikro, Kecil, dan Menengah (UMKM) Binaan CSR di Kota Dumai |
| **Tech Stack** | Laravel 11 (PHP 8.2+), Inertia.js, React 18, Tailwind CSS, Lucide Icons |
| **Gaya UI/UX** | Pertamina Corporate Clean Style (Dominan Putih Bersih `#FFFFFF`, Aksen Red `#ED1C24`, Blue `#005BAC`, Green `#00A651`) |

---

## 1. Latar Belakang & Urgensi Program

Kota Dumai sebagai salah satu sentra industri energi strategis di Provinsi Riau memiliki potensi ekonomi lokal yang tinggi melalui UMKM binaan Corporate Social Responsibility (CSR) PT Pertamina Patra Niaga Unit Dumai. Kelompok-kelompok binaan ini memproduksi berbagai komoditas unggulan seperti produk olahan nanas khas Dumai, madu hutan mangrove, kerajinan kriya lokal, tenun/batik mangrove, serta produk kuliner khas pesisir.

Namun, banyak kelompok binaan menghadapi kendala dalam:
1. **Branding Digital & Keabsahan:** Kurangnya wadah resmi yang mengintegrasikan branding kelompok binaan dengan legitimasi program CSR Pertamina Patra Niaga secara profesional.
2. **Keterbatasan Akses Pasar:** Ketergantungan pada penjualan konvensional atau pameran tatap muka yang terbatas secara waktu dan jangkauan geografis.
3. **Kesiapan Transaksi Digital:** Penggunaan marketplace nasional membutuhkan alur pendaftaran toko dan komisi yang cukup rumit bagi sebagian kelompok, sehingga transaksi cepat berbasis chat WhatsApp menjadi media paling efektif dan ramah pengguna bagi pelaku usaha lokal.

Platform web ini dibangun sebagai wujud luaran program **Pengabdian Kepada Masyarakat (PKM)** untuk memberikan solusi digital berupa **Direktori Resmi & Mini-Marketplace Katalog Produk** yang langsung menghubungkan calon konsumen dengan nomor WhatsApp pelaku usaha binaan dan toko Shopee mereka.

---

## 2. Tujuan & Sasaran Produk (Goals & Objectives)

1. **Penguatan Citra & Branding:** Memberikan wadah publikasi resmi dan kredibel yang menaungi seluruh profil kelompok binaan CSR Pertamina Patra Niaga Unit Dumai.
2. **Katalog Produk Terpusat:** Menyediakan antarmuka etalase produk modern, responsif, dan mudah dijelajahi oleh masyarakat lokal maupun calon mitra korporat yang membutuhkan cinderamata/produk UMKM Dumai.
3. **Konversi Transaksi Cepat (Direct-to-WhatsApp Checkout):** Memungkinkan pengunjung memilih aneka produk ke dalam keranjang belanja, kemudian mengirimkan rincian pesanan terformat rapi secara otomatis ke nomor WhatsApp UMKM pemilik produk tanpa beban biaya potongan komisi.
4. **Ekspansi Marketplace Eksternal:** Mendukung tautan langsung ke toko resmi Shopee milik UMKM bagi pembeli yang menginginkan opsi pembayaran dan pengiriman marketplace nasional.
5. **Kemandirian Pengelolaan Konten (Admin CMS):** Menyediakan panel admin yang intuitif bagi pengelola CSR / tim pendamping untuk memperbarui data UMKM dan inventaris produk secara berkala.

---

## 3. Persona Pengguna (User Personas)

### Persona A: Pelanggan / Masyarakat Umum (Buyer)
- **Karakteristik:** Konsumen lokal Dumai, wisatawan, instansi, atau pecinta produk lokal yang mencari oleh-oleh khas Dumai.
- **Kebutuhan:** Mencari produk lokal terpercaya, melihat harga, mengecek legalitas binaan Pertamina, dan memesan dengan cepat tanpa harus mendaftar akun atau mengingat password.
- **Alur Utama:** Buka web -> Jelajahi katalog -> Masukkan produk ke keranjang -> Klik Checkout WhatsApp -> Pesan terkirim otomatis di chat WhatsApp penjual.

### Persona B: Pelaku UMKM Binaan CSR (Seller)
- **Karakteristik:** Ketua atau anggota kelompok usaha binaan CSR di Kota Dumai.
- **Kebutuhan:** Menerima notifikasi pesanan yang terstruktur jelas di aplikasi WhatsApp tanpa kebingungan detail barang yang dipesan konsumen, serta mempromosikan toko Shopee mereka.

### Persona C: Tim Pendamping PKM & Admin CSR Pertamina Patra Niaga (Admin)
- **Karakteristik:** Pengelola program CSR Pertamina Patra Niaga Unit Dumai dan akademisi pelaksana PKM.
- **Kebutuhan:** Mengelola daftar UMKM binaan aktif, memantau variasi produk, mengunggah foto produk baru, dan menyajikan laporan visual perkembangan UMKM binaan.

---

## 4. Panduan Desain Antarmuka (Pertamina Corporate Clean Style)

### A. Filosofi Visual
- **Dominan Putih Bersih (`#FFFFFF`):** Memberikan impresi keteraturan, profesionalitas, kemewahan modern, dan kenyamanan visual maksimal.
- **Generous Whitespace:** Spasi yang lapang antar-seksi untuk menonjolkan foto produk dan narasi binaan.
- **Soft Shadows & Crisp Borders:** Shadow lembut (`shadow-sm`, hover `shadow-md`) dengan garis tepi abu-abu tipis (`border-slate-200`).
- **Badge Resmi:** Badge eksklusif *"Binaan CSR Pertamina Patra Niaga Unit Dumai"* hadir sebagai tanda mutu dan legitimasi.

### B. Palet Warna Resmi
```
┌─────────────────────────────────────────────────────────────┐
│                      PALET WARNA RESMI                      │
├───────────────────┬─────────────┬───────────────────────────┤
│ Peran             │ Kode Hex    │ Penggunaan Utama          │
├───────────────────┼─────────────┼───────────────────────────┤
│ Pure White        │ #FFFFFF     │ Background dasar, card    │
│ Light Surface     │ #F8FAFC     │ Container latar seksi     │
│ Dark Slate Text   │ #0F172A     │ Judul & teks utama        │
│ Pertamina Red     │ #ED1C24     │ Primary CTA & Tombol Cart │
│ Pertamina Blue    │ #005BAC     │ Navbar, CSR Badge, Link   │
│ Pertamina Green   │ #00A651     │ Direct WhatsApp Button    │
│ Shopee Orange     │ #EE4D2D     │ Tautan Beli di Shopee     │
└───────────────────┴─────────────┴───────────────────────────┘
```

### C. Aset Logo Resmi
- Path file: `public/asset/logo/logo-pertamina-patra-niaga.png`
- Tampil di header navbar (tinggi `h-10 md:h-12`) bersanding dengan judul portal atau sub-identitas "Unit Dumai".

---

## 5. Ruang Lingkup Fitur Fungsional

### Fitur 1: Beranda & Showcase PKM (Landing Page)
1. **Top Navbar:**
   - Logo Pertamina Patra Niaga.
   - Menu: *Beranda*, *Katalog Produk*, *Direktori UMKM*, *Tentang PKM*.
   - Floating/Sticky Cart Button dengan counter item reaktif.
2. **Hero Section:**
   - Visual foto kegiatan pemberdayaan atau produk unggulan.
   - Tagline resmi program PKM.
   - Dual Call-to-Action: *"Lihat Katalog Produk"* (Merah) & *"Jelajahi UMKM Binaan"* (Outline Biru).
3. **Statistik Program CSR:**
   - Counter jumlah UMKM binaan, total varian produk lokal, dan wilayah kecamatan binaan di Kota Dumai.
4. **Seksi Produk Unggulan (Featured Products):**
   - Grid produk pilihan berlabel rekomendasi.
5. **Footer:**
   - Informasi resmi CSR Pertamina Patra Niaga Unit Dumai, disclaimer program PKM, peta/alamat, dan media sosial.

### Fitur 2: Direktori & Profil UMKM Binaan
1. **Daftar UMKM:**
   - Filter berdasarkan kecamatan (Dumai Timur, Dumai Barat, Dumai Kota, Bukit Kapur, Medang Kampai, Sungai Sembilan, Dumai Selatan).
   - Pencarian berdasarkan nama usaha atau nama produk.
2. **Kartu UMKM (`UmkmCard`):**
   - Logo usaha, nama UMKM, nama penanggung jawab, badge binaan CSR resmi, lokasi, dan cuplikan deskripsi.
3. **Halaman Profil UMKM (`Directory/Show`):**
   - Banner foto usaha/tempat produksi.
   - Narasi lengkap sejarah usaha dan dampak pembinaan CSR.
   - Informasi kontak WhatsApp, alamat fisik, dan link Shopee toko.
   - Etalase seluruh produk yang diproduksi oleh UMKM yang bersangkutan.

### Fitur 3: Katalog Mini-Marketplace Produk
1. **Grid Produk:**
   - Tampilan responsif (1 kolom mobile, 2 kolom tablet, 3-4 kolom desktop).
   - Komponen filter kategori produk instan (Kuliner, Kerajinan, Sandang, dll).
   - Sorting berdasarkan harga dan keterkinian.
2. **Kartu Produk (`ProductCard`):**
   - Foto produk tajam dengan efek hover zoom halus.
   - Nama UMKM pembuat + Badge Binaan.
   - Nama produk dan harga Rupiah berbobot tebal.
   - Tombol cepat: *"Tambah ke Keranjang"* & *"Detail"*.
3. **Detail Produk (`Products/Show`):**
   - Galeri foto produk, spesifikasi, varian ukuran/rasa, ketersediaan stok.
   - Tombol aksi: *"Tambah ke Keranjang"*, *"Beli Langsung via WhatsApp"*, dan *"Beli di Shopee"* (jika tersedia).

### Fitur 4: Keranjang Belanja Reaktif (Cart Drawer)
1. **Slide-over Panel:**
   - Terbuka otomatis saat produk ditambahkan atau saat ikon keranjang di-klik.
2. **Pengaturan Item:**
   - Penambahan/pengurangan kuantitas `[-] [qty] [+]`.
   - Tombol hapus item individu atau kosongkan keranjang.
   - Kalkulasi otomatis total biaya (IDR).
3. **Form Data Pembeli Cepat:**
   - Input Nama Lengkap, Nomor WhatsApp, Alamat Lengkap Pengiriman, dan Catatan Khusus.
   - Disimpan sementara di memori browser agar pembeli tidak perlu mengisi ulang.
4. **Penanganan Multi-UMKM:**
   - Jika keranjang berisi barang dari 2 UMKM berbeda, sistem mengelompokkan pesanan per-UMKM dan menyediakan tombol WhatsApp Checkout spesifik untuk masing-masing UMKM.

### Fitur 5: Multi-Channel Checkout (WhatsApp & Shopee)
1. **WhatsApp Order Direct:**
   - Menghasilkan URL `https://wa.me/628xxx?text=...`.
   - Teks memuat salam hormat, rincian pesanan, total harga, alamat kirim, dan catatan pembeli.
2. **Shopee External Link:**
   - Tautan langsung ke toko/produk Shopee dengan validasi keamanan.

### Fitur 6: Manajemen Konten Admin (CMS)
1. **Autentikasi Admin:**
   - Login aman berbasis Laravel Breeze untuk tim pengelola CSR / PKM.
2. **Kelola UMKM Binaan:**
   - Form tambah, edit, nonaktifkan, dan hapus profil kelompok binaan beserta upload logo dan banner.
3. **Kelola Produk:**
   - Form tambah, edit, ubah status ketersediaan, upload foto, isi link Shopee, dan toggle produk unggulan.
4. **Kelola Kategori:**
   - Master data klasifikasi produk lokal.

---

## 6. Persyaratan Non-Fungsional (NFR)

1. **Kecepatan & Performa:** Load time halaman awal di bawah 1.5 detik dengan optimasi bundle Vite dan kompresi gambar.
2. **Responsivitas:** Tampilan optimal di semua layar dari ponsel cerdas (360px) hingga layar monitor lebar (1920px+).
3. **Keamanan:** Bebas dari celah XSS, CSRF, insecure open-redirect, dan kebocoran data sensitif admin.
4. **SEO & Meta Tag:** Halaman memiliki Open Graph tags, meta deskripsi, dan judul halaman yang informatif untuk mempermudah penyebaran tautan di media sosial dan WhatsApp.
