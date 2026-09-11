import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckCircle2,
    ExternalLink,
    MapPin,
    MessageCircle,
    Package,
    Phone,
    ShoppingBag,
    Users,
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import ProductCard from '@/Components/ProductCard';
import { useLightbox } from '@/Contexts/LightboxContext';
import { formatWhatsAppNumber, formatRupiah } from '@/Utils/phone';

export default function DirectoryShow({ umkm, products = [] }) {
    const { openLightbox } = useLightbox();
    const showcaseProducts = products && products.length > 0 ? products : umkm?.products ?? [];

    return (
        <PublicLayout title={`${umkm?.name ?? 'Detail UMKM'} | Direktori UMKM`} activeMenu="directory">
            <Head title={`${umkm?.name ?? 'Detail UMKM'} | Direktori UMKM`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
                <div className="mb-6">
                    <Link
                        href={route('directory')}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-all"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Kembali ke Direktori
                    </Link>
                </div>

                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-subtle">
                    <div className="relative h-56 sm:h-72 lg:h-80 overflow-hidden bg-slate-100">
                        <img
                            src={umkm?.banner_url || umkm?.logo_url}
                            alt={umkm?.name}
                            onClick={() => openLightbox(umkm?.banner_url || umkm?.logo_url, umkm?.name)}
                            className="h-full w-full object-cover cursor-zoom-in"
                        />
                        {/* pointer-events-none — overlay ini murni dekoratif, jangan sampai menutupi klik zoom pada foto di baliknya */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />

                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                                        {umkm?.name}
                                    </h1>
                                </div>

                                {umkm?.csr_batch_year && (
                                    <span className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 text-[11px] font-semibold text-white">
                                        Angkatan {umkm.csr_batch_year}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:p-7">
                        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-8">
                            <div>
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <MapPin className="w-4 h-4 text-pertamina-red" />
                                        <span>{umkm?.district}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                                        <div className="flex items-center gap-2 text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
                                            <Users className="w-3.5 h-3.5 text-pertamina-green" />
                                            Pengelola
                                        </div>
                                        <div className="mt-2 text-sm font-bold text-slate-900">{umkm?.owner_name}</div>
                                    </div>

                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                                        <div className="flex items-center gap-2 text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
                                            <Calendar className="w-3.5 h-3.5 text-pertamina-green" />
                                            Berdiri
                                        </div>
                                        <div className="mt-2 text-sm font-bold text-slate-900">{umkm?.established_year}</div>
                                    </div>

                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                                        <div className="flex items-center gap-2 text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
                                            <Package className="w-3.5 h-3.5 text-pertamina-green" />
                                            Produk
                                        </div>
                                        <div className="mt-2 text-sm font-bold text-slate-900">{showcaseProducts.length} item</div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-2">
                                        Tentang Kelompok Usaha
                                    </h2>
                                    <p className="text-sm leading-relaxed text-slate-600">
                                        {umkm?.description}
                                    </p>
                                </div>

                                {umkm?.certification && (
                                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                                        <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Legalitas & Sertifikasi
                                        </div>
                                        <p className="mt-1 text-sm text-slate-700">{umkm.certification}</p>
                                    </div>
                                )}
                            </div>

                            <aside className="space-y-4">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">
                                        Kontak & Tautan
                                    </h3>

                                    {umkm?.phone && (
                                        <a
                                            href={`https://wa.me/${formatWhatsAppNumber(umkm.phone)}?text=${encodeURIComponent(
                                                `Halo *${umkm.name}*, saya tertarik dengan produk UMKM Anda melalui Portal Binaan CSR Pertamina Patra Niaga Dumai.`
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between gap-3 rounded-xl bg-pertamina-green hover:bg-pertamina-green-dark text-white px-3 py-2.5 text-sm font-semibold transition-all"
                                        >
                                            <span className="flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                WhatsApp
                                            </span>
                                            <MessageCircle className="w-4 h-4" />
                                        </a>
                                    )}

                                    {umkm?.shopee_shop_url && (
                                        <a
                                            href={umkm.shopee_shop_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-[#EE4D2D]/20 bg-[#FFF4F0] text-[#EE4D2D] px-3 py-2.5 text-sm font-semibold transition-all hover:bg-[#EE4D2D] hover:text-white"
                                        >
                                            <span className="flex items-center gap-2">
                                                <ExternalLink className="w-4 h-4" />
                                                Toko Shopee
                                            </span>
                                            <ShoppingBag className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-2">
                                        Informasi Tambahan
                                    </h3>
                                    <ul className="space-y-2 text-sm text-slate-600">
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-pertamina-green" />
                                            <span>Nama pemilik: <strong className="text-slate-800">{umkm?.owner_name}</strong></span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-pertamina-green" />
                                            <span>Jumlah anggota: <strong className="text-slate-800">{umkm?.members_count || 0} orang</strong></span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-pertamina-green" />
                                            <span>Nomor WhatsApp: <strong className="text-slate-800">{umkm?.phone || '-'}</strong></span>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>

                <section className="mt-10">
                    <div className="flex items-center justify-between gap-3 mb-5">
                        <div>
                            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-pertamina-green">
                                Produk Unggulan
                            </p>
                            <h2 className="text-2xl font-extrabold text-slate-900">Produk dari {umkm?.name}</h2>
                        </div>
                    </div>

                    {showcaseProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {showcaseProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={{ ...product, umkm: umkm }}
                                    compact
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-500">
                            Belum ada produk yang terdaftar untuk UMKM ini.
                        </div>
                    )}
                </section>
            </div>
        </PublicLayout>
    );
}
