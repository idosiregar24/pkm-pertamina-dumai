import React from 'react';
import { ShoppingBag, ShoppingCart, ExternalLink } from 'lucide-react';
import { useCart } from '@/Contexts/CartContext';
import { formatRupiah } from '@/Utils/phone';

export default function ProductCard({ product, onSelectProduct, compact = false }) {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product, 1);
    };

    return (
        <div
            onClick={() => onSelectProduct && onSelectProduct(product)}
            className={`group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white ${compact ? 'p-2.5 shadow-sm' : 'p-3.5 shadow-subtle'} transition-all duration-300 hover:border-slate-300 hover:shadow-subtle-hover cursor-pointer`}
        >
            <div>
                {/* Area Gambar */}
                <div className={`relative ${compact ? 'aspect-[4/3]' : 'aspect-square'} w-full overflow-hidden rounded-xl bg-slate-100`}>
                    <img
                        src={product.image_url || '/asset/placeholder-product.webp'}
                        alt={product.name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60';
                        }}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                    />

                    {/* Badges Container (Category & District) */}
                    <div className={`absolute ${compact ? 'top-2 inset-x-2' : 'top-2.5 inset-x-2.5'} flex items-start justify-between gap-1.5 pointer-events-none z-10`}>
                        {product.category && (
                            <span className="rounded-lg bg-pertamina-green-light px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-pertamina-green shadow-sm backdrop-blur-xs border border-pertamina-green/10 truncate max-w-[62%]">
                                {typeof product.category === 'object' ? product.category.name : product.category}
                            </span>
                        )}

                        {product.umkm?.district && (
                            <span className="ml-auto flex-shrink-0 rounded-lg bg-pertamina-red-light px-2 py-0.5 text-[10px] font-medium text-pertamina-red shadow-xs backdrop-blur-xs border border-pertamina-red/10">
                                {product.umkm.district}
                            </span>
                        )}
                    </div>
                </div>

                {/* Konten Produk */}
                <div className={`${compact ? 'mt-2.5' : 'mt-3.5'}`}>
                    <div className={`flex items-center gap-1.5 ${compact ? 'text-[10px]' : 'text-xs'} text-slate-500`}>
                        <span className="font-medium text-pertamina-green truncate">
                            {product.umkm?.name || 'UMKM Binaan Pertamina'}
                        </span>
                    </div>

                    <h3 className={`mt-1 ${compact ? 'text-sm' : 'text-[15px]'} font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-pertamina-green transition-colors`}>
                        {product.name}
                    </h3>

                    {product.description && (
                        <p className={`mt-1 ${compact ? 'text-[11px]' : 'text-xs'} text-slate-500 line-clamp-2 leading-relaxed`}>
                            {product.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Footer Kartu: Harga & Tombol Aksi */}
            <div className={`${compact ? 'mt-3 pt-2' : 'mt-4 pt-3'} border-t border-slate-100`}>
                <div className={`flex items-baseline justify-between ${compact ? 'mb-2' : 'mb-3'}`}>
                    <span className={`text-slate-400 font-medium ${compact ? 'text-[10px]' : 'text-xs'}`}>Harga</span>
                    <div className="text-right">
                        <span className={`${compact ? 'text-sm' : 'text-base'} font-extrabold text-pertamina-red`}>
                            {formatRupiah(product.price)}
                        </span>
                        {product.unit && (
                            <span className={`font-normal text-slate-400 ml-1 ${compact ? 'text-[10px]' : 'text-xs'}`}>
                                /{product.unit}
                            </span>
                        )}
                    </div>
                </div>

                <div className={`flex items-center ${compact ? 'gap-1.5' : 'gap-2'}`}>
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-pertamina-red hover:bg-pertamina-red-dark text-white font-semibold shadow-xs active:scale-[0.98] transition-all ${compact ? 'text-[10px] py-2 px-2' : 'text-xs py-2.5 px-3'}`}
                    >
                        <ShoppingCart className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
                        <span>+ Keranjang</span>
                    </button>

                    {product.shopee_url && (
                        <a
                            href={product.shopee_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`inline-flex items-center justify-center rounded-xl border border-shopee/20 bg-[#FFF4F0] hover:bg-shopee hover:text-white text-[#EE4D2D] transition-all shadow-xs ${compact ? 'p-2' : 'p-2.5'}`}
                            title="Beli di Toko Shopee Resmi"
                        >
                            <span className={`${compact ? 'text-[10px]' : 'text-[11px]'} font-bold mr-1`}>Shopee</span>
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
