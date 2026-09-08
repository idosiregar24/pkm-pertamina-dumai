# Design Standards — Pertamina Corporate Clean Style

Pedoman desain antarmuka (*Design System & Visual Guideline*) untuk portal web:
**"Direktori & Katalog Produk Kelompok Binaan CSR Pertamina Patra Niaga Unit Dumai"**

---

## 1. Filosofi & Karakter Visual

Karakter visual sistem ini menggabungkan integritas korporat BUMN Pertamina yang kredibel, modern, dan profesional, dengan keramahan e-commerce direktori UMKM lokal:
- **Clean & Spacious:** Dominan warna putih bersih dengan *generous whitespace* (lapang), memberikan kesan premium, tertata rapi, dan mudah dibaca oleh masyarakat maupun mitra bisnis.
- **Subtle & Refined:** Menghindari shadow pekat yang kotor. Gunakan *soft subtle shadows* (`shadow-sm` saat diam, `shadow-md` saat hover) dengan radius lengkung modern (`rounded-xl` atau `rounded-2xl`).
- **Crisp Borders:** Menggunakan garis pembatas tipis berpresisi tinggi (`border border-slate-200` atau `border-gray-100`).
- **Authoritative Identity:** Menegaskan status binaan resmi melalui penyematan logo resmi Pertamina Patra Niaga dan badge khusus program CSR.

---

## 2. Color Palette & Token Warna

### A. Base & Background
| Token | Hex Code | Kelas Tailwind | Penggunaan |
| :--- | :--- | :--- | :--- |
| **Pure White** | `#FFFFFF` | `bg-white` | Latar belakang halaman utama, card produk, modal container, navbar |
| **Light Surface** | `#F8FAFC` | `bg-slate-50` | Latar seksi sekunder, filter bar, container preview detail |
| **Surface Alt** | `#F1F5F9` | `bg-slate-100` | Placeholder gambar produk, skeleton loader, background badge |
| **Border Normal** | `#E2E8F0` | `border-slate-200` | Border kartu produk, pembatas list item, garis input form |
| **Border Subtle** | `#F1F5F9` | `border-slate-100` | Pemisah horizontal halus |

### B. Typography Colors
| Token | Hex Code | Kelas Tailwind | Penggunaan |
| :--- | :--- | :--- | :--- |
| **Text Heading** | `#0F172A` | `text-slate-900` | Judul produk, nama UMKM, heading section, nominal harga |
| **Text Body** | `#334155` | `text-slate-700` | Deskripsi produk, profil pemilik usaha, paragraf informasi |
| **Text Muted** | `#64748B` | `text-slate-500` | Label kategori, alamat, metadata produk, satuan kuantitas |
| **Text Inverted** | `#FFFFFF` | `text-white` | Teks di atas tombol Red, Blue, atau Green |

### C. Tri-Color Brand Accent (Pertamina Official)
| Token | Hex Code | Kelas Tailwind / Utility | Penggunaan |
| :--- | :--- | :--- | :--- |
| **Pertamina Red** | `#ED1C24` | `bg-[#ED1C24]`, `text-[#ED1C24]`, `border-[#ED1C24]` | **Aksen Utama:** Tombol Checkout utama, "Tambah ke Keranjang", banner promo, harga diskon, highlight CTA |
| **Pertamina Blue** | `#005BAC` | `bg-[#005BAC]`, `text-[#005BAC]`, `border-[#005BAC]` | **Identitas Korporat:** Navbar aksen, header badge binaan, link navigasi aktif, filter terpilih |
| **Pertamina Green** | `#00A651` | `bg-[#00A651]`, `text-[#00A651]`, `border-[#00A651]` | **Direct WhatsApp & Eco:** Tombol checkout langsung WhatsApp, badge UMKM terverifikasi, status aktif |

### D. Marketplace Partner
| Token | Hex Code | Kelas Tailwind | Penggunaan |
| :--- | :--- | :--- | :--- |
| **Shopee Orange** | `#EE4D2D` | `bg-[#EE4D2D]`, `hover:bg-[#d73217]` | Tombol alternatif "Beli di Shopee" |

---

## 3. Tipografi

- **Font Family:** `Figtree`, `Inter`, atau `sans-serif` sistem yang clean.
- **Hierarki Skala Tipografi:**
  - **H1 (Hero Title):** `text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900`
  - **H2 (Section Title):** `text-2xl md:text-3xl font-bold text-slate-900`
  - **H3 (Card Title / Subtitle):** `text-lg md:text-xl font-semibold text-slate-900`
  - **Body Regular:** `text-sm md:text-base text-slate-600 leading-relaxed`
  - **Caption / Badge:** `text-xs font-medium tracking-wide`
  - **Price Display:** `text-lg md:text-xl font-bold text-[#ED1C24]`

---

## 4. Spesifikasi Komponen UI Kunci

### A. Badge Resmi Binaan CSR
Setiap profil UMKM dan card produk yang memenuhi program pembinaan wajib menampilkan badge resmi:
```jsx
// Contoh implementasi Badge Resmi
<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#005BAC] text-xs font-semibold">
  <span className="w-1.5 h-1.5 rounded-full bg-[#005BAC] animate-pulse" />
  Binaan CSR Pertamina Patra Niaga Unit Dumai
</div>
```

### B. Card Produk (Clean Minimalist Grid)
- **Container:** `bg-white rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:shadow-lg hover:border-slate-300 flex flex-col justify-between`
- **Image Aspect Ratio:** `aspect-square rounded-xl overflow-hidden bg-slate-100 relative`
- **Hover Zoom:** Gambar menggunakan `transition-transform duration-500 group-hover:scale-105`.
- **Informasi Card:**
  1. Kategori produk (Badge halus `bg-slate-100 text-slate-600 text-[11px] font-medium px-2 py-0.5 rounded-md`)
  2. Nama UMKM (`text-xs text-slate-500 truncate`)
  3. Judul Produk (`font-bold text-slate-900 text-base line-clamp-2 mt-1`)
  4. Harga dalam format Rupiah (`text-[#ED1C24] font-extrabold text-lg`)
  5. Action Row: Tombol "Tambah ke Keranjang" (`bg-[#ED1C24]`) & tombol cepat WhatsApp / Shopee.

### C. Button Variants
1. **Primary Action (Pertamina Red):**
   `bg-[#ED1C24] hover:bg-[#c9141b] text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow active:scale-[0.98] transition-all`
2. **WhatsApp Direct Checkout (Pertamina Green):**
   `bg-[#00A651] hover:bg-[#008f45] text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow flex items-center justify-center gap-2 active:scale-[0.98] transition-all`
3. **Shopee Marketplace (Shopee Orange):**
   `bg-[#EE4D2D] hover:bg-[#d73217] text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow flex items-center justify-center gap-2 active:scale-[0.98] transition-all`
4. **Secondary / Outline (Pertamina Blue):**
   `border border-[#005BAC] text-[#005BAC] hover:bg-blue-50 font-semibold px-4 py-2 rounded-xl transition-all`
5. **Ghost Button:**
   `text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium px-3 py-2 rounded-lg transition-all`

### D. Cart Drawer / Modal
- **Overlay:** `fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50`
- **Drawer Panel:** `fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 z-50`
- **Header:** Title "Keranjang Belanja", total item badge, dan tombol tutup (X).
- **Body:** Scrollable list produk dengan thumbnail, nama, kuantitas stepper `[-] [qty] [+]`, dan harga item.
- **Footer:** Rincian subtotal, peringatan multi-UMKM (jika ada), dan tombol WhatsApp Checkout.

---

## 5. Micro-Interactions & Feedback
- Semua tombol dan kartu memiliki transisi `transition-all duration-200`.
- Tombol aksi memiliki feedback click `active:scale-[0.98]`.
- Counter keranjang pada navbar memiliki badge animasi saat item bertambah: `animate-bounce` singkat atau *badge pop*.
- Loading state menggunakan skeleton placeholder berwarna abu-abu muda (`animate-pulse bg-slate-100`).