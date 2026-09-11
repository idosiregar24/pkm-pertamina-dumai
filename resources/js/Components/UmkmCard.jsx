import React from 'react';
import { Link } from '@inertiajs/react';
import { MapPin, User, ArrowRight, MessageCircle, ExternalLink, Package, Expand } from 'lucide-react';
import BadgeCsr from '@/Components/BadgeCsr';
import { useLightbox } from '@/Contexts/LightboxContext';
import { formatWhatsAppNumber } from '@/Utils/phone';

export default function UmkmCard({ umkm, onSelectUmkm }) {
    const { openLightbox } = useLightbox();

    const handleZoomImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        openLightbox(
            umkm.banner_url || umkm.logo_url || 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&auto=format&fit=crop&q=60',
            umkm.name
        );
    };

    const waUrl = umkm.phone
        ? `https://wa.me/${formatWhatsAppNumber(umkm.phone)}?text=${encodeURIComponent(
              `Halo *${umkm.name}*, saya mengetahui kelompok usaha Anda melalui Portal Binaan CSR Pertamina Patra Niaga Dumai.`
          )}`
        : null;

    return (
        <Link
            href={route('directory.show', umkm.id)}
            className={`group flex flex-col justify-between rounded-2xl border p-5 shadow-subtle transition-all duration-300 hover:border-slate-300 hover:shadow-subtle-hover cursor-pointer ${
                umkm.is_highlighted ? 'border-pertamina-green bg-blue-50/40 ring-1 ring-pertamina-green/20' : 'border-slate-200/90 bg-white'
            }`}
        >
            <div>
                {/* Header: Foto Banner / Cover + Badge CSR */}
                <div className="relative h-40 w-full overflow-hidden rounded-xl bg-slate-100">
                    <img
                        src={umkm.banner_url || umkm.logo_url || 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&auto=format&fit=crop&q=60'}
                        alt={umkm.name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&auto=format&fit=crop&q=60';
                        }}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

                    <div className="absolute top-3 left-3">
                        <BadgeCsr size="xs" />
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        {/* Tombol zoom foto — selalu terlihat agar tetap bisa dipakai di layar sentuh */}
                        <button
                            type="button"
                            onClick={handleZoomImage}
                            title="Perbesar Foto UMKM"
                            aria-label="Perbesar Foto UMKM"
                            className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900/50 hover:bg-slate-900/70 text-white backdrop-blur-sm transition-colors"
                        >
                            <Expand className="w-3.5 h-3.5" />
                        </button>

                        {umkm.is_highlighted && (
                            <span className="rounded-lg bg-pertamina-red px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                                Highlight
                            </span>
                        )}

                        {umkm.csr_batch_year && (
                            <span className="rounded-lg bg-black/40 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white border border-white/20">
                                Angkatan {umkm.csr_batch_year}
                            </span>
                        )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                        <div className="flex items-center gap-1.5 text-xs font-medium drop-shadow-sm">
                            <MapPin className="w-3.5 h-3.5 text-pertamina-red" />
                            <span>{umkm.district || 'Kota Dumai'}</span>
                        </div>

                        {umkm.products_count !== undefined && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-md">
                                <Package className="w-3 h-3" />
                                {umkm.products_count} Produk
                            </span>
                        )}
                    </div>
                </div>

                {/* Info Profil */}
                <div className="mt-4">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-pertamina-green transition-colors leading-tight">
                        {umkm.name}
                    </h3>

                    {umkm.owner_name && (
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                            <User className="w-3 h-3 text-slate-400" />
                            <span>Pengelola: <strong className="text-slate-700 font-semibold">{umkm.owner_name}</strong></span>
                        </p>
                    )}

                    <p className="mt-2.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {umkm.description || 'Kelompok usaha binaan program CSR Pertamina Patra Niaga Unit Dumai yang memproduksi komoditas lokal unggulan berkualitas.'}
                    </p>
                </div>
            </div>

            {/* Footer Aksi */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    {waUrl && (
                        <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-pertamina-green-light hover:bg-pertamina-green hover:text-white text-pertamina-green text-xs font-semibold px-3 py-2 border border-pertamina-green/20 transition-all shadow-2xs"
                            title="Hubungi Penjual via WhatsApp"
                        >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Hubungi WA</span>
                        </a>
                    )}

                    {umkm.shopee_shop_url && (
                        <a
                            href={umkm.shopee_shop_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 rounded-xl bg-shopee-light hover:bg-shopee hover:text-white text-shopee text-xs font-semibold px-2.5 py-2 border border-shopee/20 transition-all shadow-2xs"
                            title="Buka Toko Shopee"
                        >
                            <span className="text-[11px]">Shopee</span>
                            <ExternalLink className="w-3 h-3" />
                        </a>
                    )}
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-pertamina-green group-hover:translate-x-0.5 transition-transform">
                    <span>Lihat Profil</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                </span>
            </div>
        </Link>
    );
}
