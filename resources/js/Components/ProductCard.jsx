import React from 'react';
import { ShoppingCart, MapPin, Store, Expand } from 'lucide-react';
import { useCart } from '@/Contexts/CartContext';
import { useLightbox } from '@/Contexts/LightboxContext';
import ShopeeIcon from '@/Components/ShopeeIcon';
import { formatRupiah } from '@/Utils/phone';

export default function ProductCard({ product, onSelectProduct, compact = false }) {
    const { addToCart } = useCart();
    const { openLightbox } = useLightbox();

    const handleZoomImage = (e) => {
        e.stopPropagation();
        openLightbox(product.image_url || '/asset/placeholder-product.webp', product.name);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product, 1);
    };

    const categoryName = typeof product.category === 'object' ? product.category?.name : product.category;
    const district = product.umkm?.district;

    return (
        <div
            onClick={() => onSelectProduct && onSelectProduct(product)}
            className={`group flex flex-col justify-between rounded-xl border border-slate-100 bg-white shadow-subtle transition-colors duration-200 hover:border-pertamina-green/40 ${compact ? 'p-2.5' : 'p-3'} ${onSelectProduct ? 'cursor-pointer' : ''}`}
        >
            <div>
                {/* Foto produk — dibiarkan bersih tanpa overlay agar produk jadi fokus utama */}
                <div className={`relative ${compact ? 'aspect-[4/3]' : 'aspect-square'} w-full overflow-hidden rounded-lg bg-slate-100`}>
                    <img
                        src={product.image_url || '/asset/placeholder-product.webp'}
                        alt={product.name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60';
                        }}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                    />

                    {/* Tombol zoom foto — selalu terlihat (bukan hanya hover) agar tetap bisa dipakai di layar sentuh */}
                    <button
                        type="button"
                        onClick={handleZoomImage}
                        title="Perbesar Foto Produk"
                        aria-label="Perbesar Foto Produk"
                        className={`absolute bottom-1.5 right-1.5 inline-flex items-center justify-center rounded-lg bg-slate-900/50 hover:bg-slate-900/70 text-white backdrop-blur-sm transition-colors ${compact ? 'w-6 h-6' : 'w-7 h-7'}`}
                    >
                        <Expand className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
                    </button>
                </div>

                {/* Label asal: kategori + kecamatan, gaya tag kemasan (bukan badge notifikasi) */}
                {(categoryName || district) && (
                    <div className={`flex items-center gap-1.5 flex-wrap ${compact ? 'mt-2' : 'mt-2.5'}`}>
                        {categoryName && (
                            <span className="inline-flex items-center rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-500">
                                {categoryName}
                            </span>
                        )}
                        {district && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-slate-400">
                                <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                                {district}
                            </span>
                        )}
                    </div>
                )}

                {/* Nama produk */}
                <h3 className={`${compact ? 'mt-1 text-sm' : 'mt-1.5 text-[15px]'} font-bold text-slate-900 line-clamp-2 leading-snug`}>
                    {product.name}
                </h3>

                {/* Byline pemilik UMKM */}
                <p className={`mt-1 flex items-center gap-1 ${compact ? 'text-[10px]' : 'text-xs'} text-slate-500`}>
                    <Store className="w-3 h-3 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{product.umkm?.name || 'UMKM Binaan Pertamina'}</span>
                </p>
            </div>

            {/* Footer Kartu: Harga & Aksi */}
            <div className={`${compact ? 'mt-2.5 pt-2' : 'mt-3 pt-2.5'} border-t border-slate-100 flex items-end justify-between gap-2`}>
                <div className="min-w-0">
                    <div className={`${compact ? 'text-sm' : 'text-base'} font-extrabold text-pertamina-red leading-none`}>
                        {formatRupiah(product.price)}
                    </div>
                    {product.unit && (
                        <div className={`mt-1 text-slate-400 ${compact ? 'text-[9px]' : 'text-[10px]'}`}>
                            per {product.unit}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                    {product.shopee_url && (
                        <a
                            href={product.shopee_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-shopee hover:text-shopee transition-colors ${compact ? 'w-8 h-8' : 'w-9 h-9'}`}
                            title="Beli di Toko Shopee Resmi"
                            aria-label="Beli di Toko Shopee Resmi"
                        >
                            <ShopeeIcon className="w-3.5 h-3.5" />
                        </a>
                    )}

                    <button
                        type="button"
                        onClick={handleAddToCart}
                        title="Tambah ke Keranjang"
                        aria-label="Tambah ke Keranjang"
                        className={
                            compact
                                ? 'inline-flex items-center justify-center w-8 h-8 rounded-lg bg-pertamina-red hover:bg-pertamina-red-dark text-white active:scale-[0.98] transition-all'
                                : 'inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg bg-pertamina-red hover:bg-pertamina-red-dark text-white text-xs font-semibold active:scale-[0.98] transition-all'
                        }
                    >
                        <ShoppingCart className={compact ? 'w-3.5 h-3.5' : 'w-3.5 h-3.5'} />
                        {!compact && <span>Tambah</span>}
                    </button>
                </div>
            </div>
        </div>
    );
}
