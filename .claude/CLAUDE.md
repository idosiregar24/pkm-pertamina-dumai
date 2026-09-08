# Panduan AI Agent — PKM Kelompok Binaan CSR Pertamina Patra Niaga Unit Dumai

Entry point utama yang **WAJIB** dibaca dan dipatuhi AI Agent sebelum melakukan perancangan arsitektur, modifikasi, maupun penulisan kode pada repositori ini.

---

## 1. Konteks & Objektif Proyek

* **Judul Program PKM:**  
  *"Pemberdayaan Kelompok Binaan CSR Pertamina Patra Niaga Unit Dumai melalui Literasi Digital sebagai Upaya Penguatan Branding dan Peningkatan Akses Pasar"*
* **Latar Belakang & Peran:**  
  Sistem ini bertindak sebagai portal resmi direktori dan showcase produk UMKM binaan Corporate Social Responsibility (CSR) PT Pertamina Patra Niaga Fuel Terminal Dumai / Unit Dumai. Menggabungkan branding korporasi BUMN yang terpercaya dengan fungsionalitas e-katalog modern.
* **Objektif Utama:**
  1. **Direktori & Profil UMKM Binaan:** Menampilkan informasi usaha lokal binaan CSR Pertamina Patra Niaga Dumai, cerita pemberdayaan, legalitas usaha, kontak, dan lokasi fisik di Dumai.
  2. **Katalog Produk & Mini-Marketplace:** Etalase produk unggulan (kuliner lokal, kerajinan, fashion, produk olahan khas Dumai/Riau) dengan filter kategori, harga, dan varian.
  3. **Keranjang Belanja Interaktif (Cart Drawer):** Pengalaman belanja instan tanpa keharusan registrasi akun pembeli yang rumit.
  4. **Multi-Channel Checkout:**
     - **WhatsApp Order Direct:** Redirect checkout langsung ke nomor WhatsApp resmi UMKM dengan auto-generated text yang rapi dan terstruktur.
     - **Shopee External Link:** Integrasi tombol langsung menuju toko resmi UMKM di marketplace Shopee.
  5. **Admin Panel CMS:** Manajemen data kelompok binaan, kategori usaha, dan katalog produk.

---

## 2. Brand Identity & Panduan UI Theme (Pertamina Corporate Clean Style)

Tampilan antarmuka mengadopsi standar visual resmi Pertamina dengan pendekatan **Clean White Corporate & Modern E-Commerce**:

### Visual Tokens & Color Palette
* **Background & Base Surface:**
  - `Base Background`: `#FFFFFF` (Putih bersih dominan, lapang / *generous whitespace*).
  - `Surface / Secondary BG`: `#F8FAFC` (Slate 50) atau `#F1F5F9` (Slate 100) untuk kontras kartu dan seksi pendukung.
  - `Border / Divider`: `#E2E8F0` (Slate 200) atau `#CBD5E1` (Slate 300) — tegas, tipis, presisi.
  - `Text Primary`: `#0F172A` (Slate 900 — tajam, tingkat keterbacaan tinggi).
  - `Text Secondary / Muted`: `#475569` (Slate 600) / `#64748B` (Slate 500).
* **Brand Accent Colors (Tri-Color Pertamina):**
  - **Pertamina Red (`#ED1C24`)**: Warna aksi primer (*Primary Brand Accent*). Digunakan untuk CTA utama, tombol Tambah ke Keranjang, badge diskon/promo, dan penekanan krusial.
  - **Pertamina Blue (`#005BAC`)**: Warna identitas korporasi (*Corporate Blue*). Digunakan untuk navbar branding, link navigasi, header sekunder, dan badge resmi program binaan CSR.
  - **Pertamina Green (`#00A651`)**: Warna vitalitas & aksi direct (*Eco / Success / WA Accent*). Digunakan khusus untuk tombol checkout direct WhatsApp, badge produk ramah lingkungan/aktif, dan status sukses.
* **E-Commerce Secondary Color:**
  - **Shopee Orange (`#EE4D2D`)**: Tombol alternatif untuk "Beli di Shopee".

### Aset Logo Resmi
Aset logo resmi telah tersedia di direktori `public/asset/logo/`:
- `public/asset/logo/logo-pertamina-patra-niaga.png` *(Logo Utama untuk Header & Dokumen)*
- `public/asset/logo/Pertamina_Logo.svg.webp`
- `public/asset/logo/logo-utama.webp`
- `public/asset/logo/pertamiona-dumai-logo.png`

Path di komponen React menggunakan: `/asset/logo/logo-pertamina-patra-niaga.png`.

---

## 3. Tech Stack Wajib

* **Backend:** Laravel 11.x (PHP 8.2+) dengan arsitektur MVC & Eloquent ORM.
* **Adapter / Glue:** Inertia.js v2 — SPA tanpa perlunya REST API endpoint terpisah untuk halaman internal.
* **Frontend:** React 18.x (Functional Components & Hooks only, tidak ada class component).
* **Styling & Icons:** Tailwind CSS v3 + Lucide React (`lucide-react`).
* **Database:** MySQL / MariaDB (Laragon local environment).
* **Authentication:** Laravel Breeze (untuk modul Admin CMS).

---

## 4. Urutan Referensi Rules & Dokumen

Sebelum mengeksekusi fitur atau task, wajib membaca panduan spesifik:
1. **Aturan Desain & UI/UX:** `.claude/rules/design-standards.md`
2. **Aturan Logika (WhatsApp, Telepon, Format IDR):** `.claude/rules/logic-standards.md`
3. **Standar Frontend (React, State Keranjang, Inertia):** `.claude/rules/frontend-standards.md`
4. **Standar Backend (Controller, Service, Resource):** `.claude/rules/backend-standards.md`
5. **Standar Database (Migration, Relasi, Skema):** `.claude/rules/database-standards.md`
6. **Keamanan & Validasi (Sanitasi URL Shopee, Form, Anti-XSS):** `.claude/rules/security-standards.md`
7. **Roadmap & PRD:**
   - `.claude/plan/PRD_Web_Katalog_UMKM_Pertamina_Dumai.md`
   - `.claude/plan/ROADMAP_MILESTONES.md`
8. **Skill Tambahan:**
   - `.claude/skills/laravel-inertia-skill.md`
   - `.claude/skills/react-component-skill.md`

---

## 5. Batasan Keras Arsitektur (Hard Constraints)

1. **State Keranjang Belanja:** Keranjang belanja dikelola secara reaktif pada sisi klien (Context API / Custom Hook dengan persistensi `localStorage`) sehingga pengunjung anonim dapat langsung memasukkan produk tanpa harus login.
2. **Pemisahan Keranjang Multi-UMKM:** Jika pembeli memilih barang dari 2 atau lebih UMKM berbeda, sistem checkout WhatsApp wajib mengelompokkan pesanan per-UMKM (checkout split per UMKM atau peringatan terarah) karena nomor WhatsApp tujuan adalah pemilik usaha masing-masing.
3. **Format Nomor WhatsApp:** Wajib dinormalisasi ke format internasional Indonesia (`628xxxxxxxxxx`). Dilarang membiarkan awalan `08...`, `+62...`, atau spasi/strip masuk ke URL `wa.me`.
4. **Sanitasi URL Marketplace:** Tautan Shopee wajib divalidasi harus berawalan `https://shopee.co.id/` demi keamanan pengunjung.
5. **No Broken Links / No Hardcoded Secret:** Dilarang menaruh credential atau URL hardcoded lokal di file produksi; gunakan env dan route helper.
6. **FormRequest Validation:** Seluruh aksi POST/PUT/PATCH/DELETE wajib menggunakan `FormRequest`.

---

## 6. Definisi "Selesai" (Definition of Done)

1. Desain sesuai dengan identitas Pertamina Corporate Clean Style (Putih bersih, aksen Red/Blue/Green, font Figtree/Inter, shadow halus, mobile responsive).
2. Badge resmi *"Binaan CSR Pertamina Patra Niaga Unit Dumai"* disematkan pada setiap card UMKM dan kartu produk.
3. Fitur filter & pencarian produk berfungsi responsif dan sinkron dengan query parameter URL.
4. Drawer keranjang dapat menambah kuantitas, mengurangi, menghapus item, dan menghitung total harga (IDR) secara akurat.
5. Tombol WhatsApp Checkout menghasilkan URL `https://wa.me/...` dengan teks pesanan yang rapi dan ter-encode sempurna (`encodeURIComponent`).
6. Tidak ada error console di browser dan tidak ada N+1 query di Laravel Eloquent.
