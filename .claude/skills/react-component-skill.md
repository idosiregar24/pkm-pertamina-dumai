# Skill: Komponen React Reusable (Pertamina Corporate Clean Style)

Pedoman penyusunan komponen frontend modular berbasis React, Tailwind CSS, dan Lucide Icons untuk portal Binaan CSR Pertamina Patra Niaga Dumai.

---

## 1. Komponen Inti yang Wajib Tersedia di `resources/js/Components`

| Komponen | Kegunaan | Lokasi Penggunaan |
| :--- | :--- | :--- |
| `ProductCard.jsx` | Kartu produk (gambar, harga Rupiah, tombol keranjang, link Shopee) | Beranda, Katalog, Profil UMKM |
| `UmkmCard.jsx` | Kartu direktori UMKM binaan dengan badge resmi CSR Pertamina | Direktori Binaan, Beranda |
| `BadgeCsr.jsx` | Badge resmi *"Binaan CSR Pertamina Patra Niaga Unit Dumai"* | Seluruh card produk & UMKM |
| `CartDrawer.jsx` | Slide-over keranjang belanja, kuantitas stepper, dan form pembeli | Layout Publik (Global) |
| `WhatsAppButton.jsx` | Tombol checkout langsung WhatsApp hijau Pertamina (`#00A651`) | Detail Produk & Cart Drawer |
| `ShopeeButton.jsx` | Tombol direct link ke toko Shopee (`#EE4D2D`) | Detail Produk & Kartu Produk |
| `EmptyState.jsx` | Tampilan informatif saat data keranjang atau hasil filter kosong | Katalog & Drawer Keranjang |

---

## 2. Contoh Implementasi `ProductCard.jsx`

```jsx
import { Link } from '@inertiajs/react';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import { useCart } from '@/Contexts/CartContext';
import { formatRupiah } from '@/Utils/phone';
import BadgeCsr from '@/Components/BadgeCsr';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md">
            {/* Area Gambar */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
                <img
                    src={product.image_url || '/asset/placeholder-product.webp'}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                {product.category && (
                    <span className="absolute left-2.5 top-2.5 rounded-lg bg-white/90 px-2 py-0.5 text-[11px] font-medium text-slate-700 backdrop-blur-sm shadow-sm">
                        {product.category.name}
                    </span>
                )}
            </div>

            {/* Area Konten */}
            <div className="mt-3 flex-1">
                <div className="mb-1">
                    <p className="text-xs font-medium text-slate-500 truncate">
                        {product.umkm?.name || 'UMKM Binaan'}
                    </p>
                </div>
                <Link href={route('products.show', product.slug)}>
                    <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 hover:text-[#005BAC] transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-base font-extrabold text-[#ED1C24]">
                        {formatRupiah(product.price)}
                    </span>
                    {product.unit && (
                        <span className="text-xs text-slate-400">/{product.unit}</span>
                    )}
                </div>
            </div>

            {/* Tombol Aksi */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#ED1C24] px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#c9141b] active:scale-[0.98] transition-all"
                >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    + Keranjang
                </button>

                {product.shopee_url && (
                    <a
                        href={product.shopee_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-600 hover:bg-[#EE4D2D] hover:text-white hover:border-[#EE4D2D] transition-all"
                        title="Beli di Shopee"
                    >
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                )}
            </div>
        </div>
    );
}
```

---

## 3. Konfigurasi Tailwind Khusus Pertamina Theme

Pada `tailwind.config.js`, daftarkan token warna korporasi:
```javascript
export default {
    theme: {
        extend: {
            colors: {
                pertamina: {
                    red: '#ED1C24',
                    blue: '#005BAC',
                    green: '#00A651',
                },
                shopee: '#EE4D2D',
            },
        },
    },
};
```
