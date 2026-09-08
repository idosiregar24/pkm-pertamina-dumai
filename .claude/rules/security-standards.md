# Security Standards — Checklist Wajib

Checklist keamanan wajib yang harus diverifikasi sebelum setiap task atau PR dinyatakan selesai pada portal PKM CSR Pertamina Patra Niaga Dumai.

---

## 1. Validasi & Sanitasi Tautan Eksternal (Shopee & Media Sosial)
- [ ] Semua input tautan Shopee divalidasi hanya menerima protokol `https://` dan domain resmi `shopee.co.id` atau `www.shopee.co.id`.
- [ ] Dilarang merender tautan eksternal yang diawali dengan `javascript:`, `data:`, atau URI scheme mencurigakan lainnya.
- [ ] Atribut link eksternal selalu menyertakan `target="_blank"` dan `rel="noopener noreferrer"` untuk mencegah kerentanan reverse tabnabbing.

---

## 2. Sanitasi WhatsApp URL & Nomor Telepon
- [ ] Pesan WhatsApp yang di-generate selalu menggunakan fungsi bawaan `encodeURIComponent()` pada seluruh parameter teks pesanan.
- [ ] Nomor telepon dibersihkan dari karakter berbahaya dan hanya memuat digit angka berawalan kode negara `628...`.

---

## 3. Autentikasi & Hak Akses Admin Panel
- [ ] Seluruh route manajemen CMS (`/admin/*`) terproteksi penuh oleh middleware `auth` dan `verified`.
- [ ] User publik anonim hanya memiliki hak akses baca (GET) pada katalog, direktori, dan detail produk.
- [ ] Setiap form input admin memiliki proteksi token CSRF otomatis dari Inertia.js.

---

## 4. Keamanan Unggah Berkas (Upload File)
- [ ] Upload gambar produk dan logo dibatasi hanya pada ekstensi aman: `jpg`, `jpeg`, `png`, `webp`.
- [ ] Ukuran berkas dibatasi maksimal 2048 KB (2MB) untuk mencegah lonjakan beban penyimpanan dan potensi DoS.
- [ ] Nama berkas yang tersimpan di disk `public` di-generate ulang menggunakan hash atau UUID unik; tidak memakai nama asli dari komputer pengguna (mencegah *directory traversal* / *file overwrite*).

---

## 5. Pencegahan Stored XSS & Sanitasi Konten
- [ ] Tidak ada penggunaan `dangerouslySetInnerHTML` pada input deskripsi produk atau profil UMKM tanpa sanitasi menggunakan library sanitasi (seperti DOMPurify) jika konten mendukung HTML.
- [ ] Teks biasa selalu di-render langsung sebagai child node React `{product.description}` agar otomatis di-escape oleh React.

---

## 6. Kebersihan Kode Sebelum Commit
- [ ] Tidak ada fungsi debugging seperti `dd()`, `dump()`, `var_dump()`, atau `console.log()` yang tertinggal di berkas produksi.
- [ ] Tidak ada kredensial database, password admin, atau secret key yang di-hardcode di dalam controller/komponen.
