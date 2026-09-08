# Frontend Standards (React + Inertia.js + Tailwind CSS)

Standar pengembangan frontend untuk portal web PKM Kelompok Binaan CSR Pertamina Patra Niaga Unit Dumai.

---

## 1. Struktur Halaman & Routing Inertia

- Halaman publik dan admin diorganisir rapi di bawah folder `resources/js/Pages/`:
  - `Pages/Home/Index.jsx` atau `Pages/Welcome.jsx` — Halaman beranda utama (Hero, Seksi Binaan CSR, Kategori Unggulan, Callout Literasi Digital).
  - `Pages/Directory/Index.jsx` — Halaman direktori seluruh kelompok binaan CSR.
  - `Pages/Directory/Show.jsx` — Halaman profil detail satu kelompok UMKM (biodata, cerita binaan, kontak, daftar produk mereka).
  - `Pages/Products/Index.jsx` — Halaman katalog mini-marketplace produk UMKM (filter kategori, search, sorting).
  - `Pages/Products/Show.jsx` — Detail produk lengkap, galeri foto, deskripsi, harga, tombol add-to-cart, tombol Shopee.
  - `Pages/Admin/` — Halaman dashboard dan pengelolaan data (Breeze / Authenticated).
- Setiap halaman wajib dibungkus layout konsisten:
  - `AppLayout.jsx` / `PublicLayout.jsx` — Navbar korporasi putih bersih dengan logo resmi Pertamina Patra Niaga, drawer keranjang belanja, dan footer CSR.
  - `AuthenticatedLayout.jsx` — Layout panel admin.

---

## 2. Manajemen State Keranjang Belanja (Reactive Cart)

- Keranjang belanja dikelola via **React Context** (`CartContext.jsx` di `resources/js/Contexts/CartContext.jsx`) atau custom hook `useCart`.
- **Persistensi:** Simpan state keranjang ke `localStorage` (key: `pertamina_dumai_cart`) agar data tidak hilang saat pengguna me-refresh halaman atau berpindah menu.
- **Operasi Wajib pada Keranjang:**
  - `addToCart(product, quantity = 1)` — Menambah item atau increment kuantitas jika sudah ada.
  - `removeFromCart(productId)` — Menghapus item dari keranjang.
  - `updateQuantity(productId, quantity)` — Mengubah jumlah pesanan (kuantitas minimum 1).
  - `clearCart()` — Mengosongkan keranjang belanja.
  - `cartTotalCount` — Jumlah total item (untuk indikator badge counter pada navbar).
  - `cartTotalPrice` — Total nominal rupiah belanja.
  - `groupedByUmkm` — Helper getter untuk mengelompokkan item belanja per ID UMKM.

---

## 3. Komponen UI Reusable (`resources/js/Components`)

Hindari duplikasi kode antarhalaman. Seluruh elemen berulang wajib dibuat menjadi komponen independen:
1. `ProductCard.jsx`: Menampilkan thumbnail produk, nama produk, nama UMKM, badge kategori, harga rupiah, dan tombol aksi.
2. `UmkmCard.jsx`: Menampilkan kartu UMKM binaan, foto profil/tempat usaha, badge resmi *"Binaan CSR Pertamina Patra Niaga Unit Dumai"*, kategori usaha, dan link ke profil.
3. `BadgeCsr.jsx`: Komponen badge resmi dengan warna Pertamina Blue (`#005BAC`) dan indikator dot.
4. `CartDrawer.jsx`: Slide-over panel yang menampilkan isi keranjang, form input pembeli ringkas (nama, no HP, alamat), tombol checkout WhatsApp, dan subtotal.
5. `FilterBar.jsx`: Input pencarian debounced + filter pill kategori produk.
6. `EmptyState.jsx`: Tampilan ilustrasi/pesan ramah saat pencarian kosong atau keranjang belum memiliki item.
7. `WhatsAppButton.jsx`: Tombol CTA WhatsApp dengan warna hijau resmi (`#00A651`) dan icon WhatsApp/MessageCircle.
8. `ShopeeButton.jsx`: Tombol tautan ke toko Shopee dengan warna oranye `#EE4D2D`.

---

## 4. Pola Pencarian & Filter Realtime (Inertia Sync)

Untuk filter kategori dan pencarian di halaman katalog/direktori:
- Gunakan `router.get()` dari `@inertiajs/react` dengan opsi `{ preserveState: true, preserveScroll: true, replace: true }`.
- Gunakan custom hook `useDebounce` (300-500ms) untuk input pencarian teks agar tidak membebani server saat mengetik.
- Pastikan filter tersimpan di query string URL (misal: `?category=kuliner&search=nanas`) agar tautan dapat dibagikan dan navigasi history browser tetap bekerja.

---

## 5. Standar Responsivitas & Aksesibilitas (A11y)

- **Mobile-First:** Tata letak grid diuji dari resolusi mobile (1 kolom `grid-cols-1` pada `<640px`, 2 kolom `sm:grid-cols-2`, 3 kolom `md:grid-cols-3`, 4 kolom `lg:grid-cols-4`).
- **Touch Targets:** Tombol pada mobile memiliki ukuran minimal 44x44px untuk kenyamanan tap jari tangan.
- **Alt Text:** Semua tag `<img>` wajib memiliki atribut `alt` deskriptif (misal: `alt="Foto produk Keripik Nanas UMKM Dumai"`).
- **Aksen Kontras:** Teks putih hanya digunakan di atas background berbobot warna pekat (Pertamina Red, Pertamina Blue, atau Pertamina Green) yang telah memenuhi standar kontras WCAG AA.
