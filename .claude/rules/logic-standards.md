# Logic Standards — Phone, WhatsApp Order, & Formatting

Standar fungsi logika, utilitas format nomor telepon, generator pesan WhatsApp, kalkulasi keranjang belanja, serta penanganan pesanan multi-UMKM.

---

## 1. Normalisasi & Validasi Nomor Telepon Indonesia

Nomor kontak UMKM maupun nomor kontak pembeli wajib dinormalisasi ke format standar WhatsApp internasional Indonesia (`628...`):

### Aturan Konversi
- Input: `0812-3456-7890` -> Hasil: `6281234567890`
- Input: `+62 812 3456 7890` -> Hasil: `6281234567890`
- Input: `6281234567890` -> Hasil: `6281234567890`
- Input: `81234567890` -> Hasil: `6281234567890`

### Implementasi Helper (`resources/js/Utils/phone.js` atau PHP Helper)
```javascript
/**
 * Menormalisasi nomor telepon Indonesia ke format WhatsApp API (628xxx)
 * @param {string} phone
 * @returns {string}
 */
export function formatWhatsAppNumber(phone) {
  if (!phone) return '';
  
  // Hapus semua karakter non-digit
  let cleaned = phone.toString().replace(/\D/g, '');

  // Jika diawali dengan '08', ganti '0' di depan dengan '62'
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  }
  // Jika diawali dengan '8', tambahkan '62'
  else if (cleaned.startsWith('8')) {
    cleaned = '62' + cleaned;
  }
  // Jika belum berawalan '62', tambahkan '62' jika panjang valid
  else if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }

  return cleaned;
}

/**
 * Validasi apakah nomor telepon Indonesia valid (panjang 10 - 15 digit)
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidIndonesianPhone(phone) {
  const normalized = formatWhatsAppNumber(phone);
  return /^628\d{8,12}$/.test(normalized);
}
```

---

## 2. Formatting Mata Uang Rupiah (IDR)

Semua angka nominal harga barang dan kalkulasi subtotal wajib diformat secara seragam:
```javascript
/**
 * Format angka ke format Rupiah standar Indonesia
 * @param {number|string} amount
 * @returns {string} Contoh: "Rp 25.000"
 */
export function formatRupiah(amount) {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}
```

---

## 3. Generator Template Pesan Checkout WhatsApp

Pesan yang dikirimkan ke WhatsApp pemilik UMKM wajib berstruktur formal, rapi, ramah, dan memuat detail pesanan lengkap serta identitas pembeli:

### Struktur Pesan:
```text
Halo [Nama UMKM], saya ingin memesan produk binaan CSR Pertamina Patra Niaga Dumai dari website katalog:

*Detail Pesanan:*
1. [Nama Produk] (x[Qty]) - Rp [Harga]
2. [Nama Produk Lain] (x[Qty]) - Rp [Harga]

*Total Belanja:* Rp [Total]

---
*Data Pemesan:*
- Nama: [Nama Pembeli]
- No. WhatsApp: [No HP Pembeli]
- Alamat Pengiriman: [Alamat Lengkap]
- Catatan: [Catatan Tambahan / Custom Permintaan]

Mohon informasi ketersediaan stok dan biaya ongkir ke alamat saya. Terima kasih!
```

### Implementasi Helper Generator URL
```javascript
import { formatWhatsAppNumber, formatRupiah } from './phone';

/**
 * Menghasilkan URL direct link WhatsApp checkout
 * @param {Object} params
 * @param {string} params.umkmPhone - Nomor WA UMKM
 * @param {string} params.umkmName - Nama UMKM
 * @param {Array} params.items - Daftar item dari UMKM terkait
 * @param {Object} params.customer - Data pembeli { name, phone, address, notes }
 * @returns {string} URL WhatsApp siap buka
 */
export function generateWhatsAppOrderUrl({ umkmPhone, umkmName, items, customer }) {
  const targetPhone = formatWhatsAppNumber(umkmPhone);

  const itemListText = items
    .map((item, index) => {
      const subtotal = item.price * item.quantity;
      return `${index + 1}. *${item.name}* (x${item.quantity}) - ${formatRupiah(subtotal)}`;
    })
    .join('\n');

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const messageLines = [
    `Halo *${umkmName}*, saya tertarik memesan produk binaan CSR Pertamina Patra Niaga Unit Dumai dari website:`,
    '',
    `*📋 RINCIAN PESANAN:*`,
    itemListText,
    '',
    `*💰 TOTAL BELANJA:* ${formatRupiah(totalAmount)}`,
    '',
    `*📍 DATA PEMESAN:*`,
    `• Nama: ${customer?.name || '-'}`,
    `• No. WhatsApp: ${customer?.phone || '-'}`,
    `• Alamat Pengiriman: ${customer?.address || '-'}`,
    customer?.notes ? `• Catatan: ${customer.notes}` : null,
    '',
    `Mohon konfirmasi ketersediaan stok serta ongkos kirim. Terima kasih!`,
  ].filter(line => line !== null);

  const fullMessage = messageLines.join('\n');
  const encodedText = encodeURIComponent(fullMessage);

  return `https://wa.me/${targetPhone}?text=${encodedText}`;
}
```

---

## 4. Logika Keranjang Belanja Multi-UMKM

Karena portal ini menampung banyak UMKM binaan CSR yang masing-masing memiliki nomor WhatsApp dan lokasi fisik terpisah, alur checkout keranjang belanja harus menangani skenario produk lintas UMKM:

### Strategi Pengelompokan (Group by UMKM):
1. State item keranjang menyimpan referensi UMKM:
   ```javascript
   {
     id: 'prod_123',
     name: 'Keripik Nanas Dumai',
     price: 25000,
     quantity: 2,
     image: '/storage/...',
     umkm: {
       id: 1,
       name: 'Kelompok Tani Nanas Maju',
       phone: '081234567890',
       shopeeUrl: 'https://shopee.co.id/...'
     }
   }
   ```
2. Pada Cart Drawer:
   - Tampilkan produk terkelompok berdasarkan UMKM (*Grouped by UMKM*).
   - Tombol checkout WhatsApp dieksekusi per-UMKM (misal: *"Pesan ke [Nama UMKM]"*), atau jika pembeli menekan tombol *"Checkout Semua"*, sistem menyediakan panduan untuk mengirimkan pesanan ke masing-masing WhatsApp UMKM secara bergantian.
   - Hal ini memastikan tidak ada kekeliruan pemesanan barang UMKM A yang terkirim ke WhatsApp UMKM B.

---

## 5. Validasi Tautan Eksternal Marketplace (Shopee)

Untuk mencegah kerentanan Open Redirect atau phishing:
1. URL Shopee UMKM pada admin panel maupun tombol frontend wajib diawali dengan:
   - `https://shopee.co.id/` atau `https://www.shopee.co.id/`
2. Helper sanitasi URL:
   ```javascript
   export function isValidShopeeUrl(url) {
     if (!url) return false;
     try {
       const parsed = new URL(url);
       return (
         parsed.protocol === 'https:' &&
         (parsed.hostname === 'shopee.co.id' || parsed.hostname === 'www.shopee.co.id')
       );
     } catch {
       return false;
     }
   }
   ```
