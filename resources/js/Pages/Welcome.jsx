import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ShoppingBag,
    Store,
    Sparkles,
    ShieldCheck,
    Search,
    Filter,
    ArrowRight,
    MapPin,
    Phone,
    ExternalLink,
    ChevronRight,
    Award,
    CheckCircle2,
    Users,
    TrendingUp,
    Smartphone,
    X,
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import BadgeCsr from '@/Components/BadgeCsr';
import ProductCard from '@/Components/ProductCard';
import UmkmCard from '@/Components/UmkmCard';
import { useCart } from '@/Contexts/CartContext';
import { formatRupiah, formatWhatsAppNumber, generateWhatsAppOrderUrl } from '@/Utils/phone';
import { INITIAL_PRODUCTS, INITIAL_UMKMS, CATEGORIES, HERO_SHOWCASES } from '@/data/mockData';

export default function Welcome() {
    const [heroActiveTab, setHeroActiveTab] = useState('nanas');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedUmkm, setSelectedUmkm] = useState(null);
    const [modalQty, setModalQty] = useState(1);

    const { addToCart } = useCart();

    const activeShowcase = useMemo(() => {
        return HERO_SHOWCASES.find((s) => s.id === heroActiveTab) || HERO_SHOWCASES[0];
    }, [heroActiveTab]);

    // Top 6 Featured Products for Homepage Showcase
    const featuredProducts = useMemo(() => {
        return INITIAL_PRODUCTS.slice(0, 6);
    }, []);

    // Handle modal direct whatsapp
    const handleDirectWhatsApp = () => {
        if (!selectedProduct) return;
        const url = generateWhatsAppOrderUrl({
            umkmPhone: selectedProduct.umkm?.phone,
            umkmName: selectedProduct.umkm?.name,
            items: [{ name: selectedProduct.name, price: selectedProduct.price, quantity: modalQty, unit: selectedProduct.unit }],
        });
        window.open(url, '_blank');
    };

    const handleModalAddToCart = () => {
        if (!selectedProduct) return;
        addToCart(selectedProduct, modalQty);
        setSelectedProduct(null);
        setModalQty(1);
    };

    return (
        <PublicLayout title="Beranda" activeMenu="home">
            {/* ========================================================================= */}
            {/* 1. HERO SECTION (Pertamina Corporate Clean Style)                          */}
            {/* ========================================================================= */}
            <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
                {/* Background Pattern Lembut */}
                <div className="absolute inset-0 pointer-events-none opacity-40">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pertamina-blue/5 blur-3xl" />
                    <div className="absolute top-1/2 -left-24 w-96 h-96 rounded-full bg-pertamina-red/5 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Kolom Teks Hero (7 Kolom di Desktop) */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Badge Resmi Pertamina CSR */}
                            <BadgeCsr size="default" />

                            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18]">
                                Pusat Informasi &amp; Direktori{' '}
                                <span className="text-pertamina-blue">UMKM Mitra Binaan TJSL</span>{' '}
                                <span className="text-pertamina-red">PT Pertamina Patra Niaga Regional Dumai</span>
                            </h1>

                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                                Platform resmi program pemberdayaan kelompok usaha lokal Kota Dumai melalui literasi digital, standardisasi mutu kemasan, e-katalog produk terpadu, dan pemesanan instan langsung ke WhatsApp pemilik UMKM.
                            </p>

                            {/* Dual Call to Action Buttons */}
                            <div className="pt-2 flex flex-wrap items-center gap-4">
                                <Link
                                    href="/katalog"
                                    className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-pertamina-red hover:bg-pertamina-red-dark text-white font-bold px-6 py-3.5 text-sm shadow-xs hover:shadow active:scale-[0.98] transition-all"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    <span>Buka E-Katalog Produk (Filter Lengkap)</span>
                                </Link>

                                <Link
                                    href="/direktori"
                                    className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-pertamina-blue bg-white hover:bg-pertamina-blue-light text-pertamina-blue font-bold px-6 py-3.5 text-sm active:scale-[0.98] transition-all"
                                >
                                    <Store className="w-4 h-4" />
                                    <span>Lihat Direktori UMKM</span>
                                </Link>
                            </div>

                            {/* Key Value Point Highlight */}
                            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-500">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-pertamina-green" />
                                    <span>100% Produk Asli Dumai</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-pertamina-green" />
                                    <span>Direct WhatsApp Tanpa Potongan</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-pertamina-green" />
                                    <span>Toko Resmi Shopee Terverifikasi</span>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Visual Hero: Etalase Unggulan Terpadu (Grounded & Realistic) */}
                        <div className="lg:col-span-5">
                            <div className="relative mx-auto max-w-lg lg:max-w-none">
                                <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
                                    {/* Header Status Bar Resmi */}
                                    <div className="flex items-center justify-between px-4 py-3 bg-slate-50/90 border-b border-slate-100">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-lg bg-pertamina-blue/10 flex items-center justify-center text-pertamina-blue font-black text-xs">
                                                TJSL
                                            </div>
                                            <div>
                                                <span className="text-[11px] font-extrabold text-slate-900 tracking-tight block leading-none">
                                                    Etalase Unggulan Binaan Pertamina
                                                </span>
                                                <span className="text-[9px] text-slate-400 font-medium">
                                                    {activeShowcase.locationDetail}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-pertamina-green-light text-pertamina-green-dark border border-pertamina-green/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-pertamina-green animate-pulse" />
                                            Aktif Terbina
                                        </span>
                                    </div>

                                    {/* Interactive Segmented Switcher Tabs */}
                                    <div className="grid grid-cols-3 p-1.5 bg-slate-100/80 border-b border-slate-100 gap-1 text-xs">
                                        {HERO_SHOWCASES.map((item) => {
                                            const isActive = heroActiveTab === item.id;
                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() => setHeroActiveTab(item.id)}
                                                    className={`py-1.5 px-2 rounded-lg font-bold text-[11px] transition-all text-center ${
                                                        isActive
                                                            ? 'bg-white text-pertamina-blue shadow-xs border border-slate-200/90'
                                                            : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
                                                    }`}
                                                >
                                                    {item.tabLabel}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Visual Spotlight Foto Produk Asli */}
                                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                                        <img
                                            src={activeShowcase.imageUrl}
                                            alt={activeShowcase.imageAlt}
                                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                                        {/* Inner Meta Badges */}
                                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                                            <span className="inline-flex items-center gap-1 rounded-lg bg-white/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-slate-800 shadow-sm border border-white/60">
                                                <MapPin className="w-3 h-3 text-pertamina-red flex-shrink-0" />
                                                <span>{activeShowcase.district}</span>
                                            </span>
                                            <span className="inline-flex items-center gap-1 rounded-lg bg-slate-900/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-white border border-white/20 shadow-sm">
                                                <ShieldCheck className="w-3 h-3 text-pertamina-green flex-shrink-0" />
                                                <span>{activeShowcase.certTag}</span>
                                            </span>
                                        </div>

                                        {/* Inner Bottom Info */}
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <span className="inline-block px-2 py-0.5 rounded bg-pertamina-red text-white text-[9px] font-extrabold uppercase tracking-wider mb-1 shadow-xs">
                                                {activeShowcase.programTag}
                                            </span>
                                            <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight drop-shadow-sm">
                                                {activeShowcase.title}
                                            </h3>
                                            <p className="text-[11px] text-slate-200 mt-1 flex items-center gap-1.5">
                                                <span className="font-semibold text-white">{activeShowcase.producer}</span>
                                                <span className="text-slate-400">•</span>
                                                <span className="text-pertamina-green font-medium">{activeShowcase.csrBadge}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Mini Preview Produk Binaan */}
                                    <div className="p-3.5 bg-white">
                                        <div className="flex items-center justify-between mb-2.5">
                                            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                                                Sample Produk Binaan Siap Pesan
                                            </p>
                                            <span className="text-[10px] font-bold text-pertamina-blue">
                                                Harga Petani Langsung
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                            {activeShowcase.sampleProducts.map((prod, idx) => (
                                                <div
                                                    key={idx}
                                                    className="rounded-xl border border-slate-100 bg-slate-50/80 p-2.5 text-left hover:border-slate-300 hover:bg-white hover:shadow-xs transition-all"
                                                >
                                                    <p className="text-[11px] font-bold text-slate-800 line-clamp-1 leading-snug">
                                                        {prod.name}
                                                    </p>
                                                    <div className="flex items-baseline justify-between mt-1.5">
                                                        <span className="text-xs font-extrabold text-pertamina-red">
                                                            {formatRupiah(prod.price)}
                                                        </span>
                                                        <span className="text-[9px] text-slate-400 font-medium">
                                                            /{prod.unit}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Action & Navigasi Terpadu */}
                                    <div className="px-4 py-3 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-pertamina-green flex-shrink-0" />
                                            <span>Pesan instan langsung ke WA UMKM</span>
                                        </div>
                                        <Link
                                            href="/katalog"
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-pertamina-blue hover:text-pertamina-blue-dark transition-colors group flex-shrink-0"
                                        >
                                            <span>Buka Katalog Lengkap</span>
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Strip Statistik Pencapaian CSR */}
                <div className="mt-16 border-y border-slate-100 bg-slate-50/60 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="text-2xl sm:text-3xl font-extrabold text-pertamina-red">15+</div>
                                <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                                    Kelompok Binaan Aktif
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-extrabold text-pertamina-blue">50+</div>
                                <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                                    Produk Khas Dumai
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-extrabold text-pertamina-green">7</div>
                                <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                                    Kecamatan Binaan di Dumai
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</div>
                                <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                                    Produk Lokal Otentik
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 2. PILAR PROGRAM CSR DENGAN LINK KE /program-csr                           */}
            {/* ========================================================================= */}
            <section className="py-16 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                        <div>
                            <span className="text-xs font-extrabold uppercase tracking-wider text-pertamina-blue">
                                Program Pemberdayaan CSR
                            </span>
                            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">
                                3 Pilar Utama Program Pemberdayaan UMKM Binaan
                            </h2>
                            <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl">
                                Pendampingan nyata bagi kelompok usaha lokal Dumai menuju kemandirian ekonomi dan daya saing pasar yang berkelanjutan.
                            </p>
                        </div>
                        <Link
                            href="/program-csr"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-pertamina-blue hover:text-pertamina-blue-dark transition-colors self-start md:self-end"
                        >
                            <span>Pelajari Selengkapnya</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md transition-all">
                            <div className="w-12 h-12 rounded-xl bg-pertamina-blue/10 text-pertamina-blue flex items-center justify-center mb-5">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mb-2">
                                Literasi &amp; Katalog Digital
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Pendampingan pelaku UMKM dalam mendokumentasikan produk, mengelola inventaris etalase online, dan sistem order langsung ke WhatsApp.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md transition-all">
                            <div className="w-12 h-12 rounded-xl bg-pertamina-red/10 text-pertamina-red flex items-center justify-center mb-5">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mb-2">
                                Standardisasi Mutu &amp; Kemasan
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Standardisasi kemasan higienis, uji laboratorium madu, fasilitasi izin P-IRT, serta sertifikasi Halal resmi untuk kepercayaan pasar.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md transition-all">
                            <div className="w-12 h-12 rounded-xl bg-pertamina-green/10 text-pertamina-green flex items-center justify-center mb-5">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mb-2">
                                Akses Pasar Multi-Channel
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Menghubungkan pembeli langsung ke pengrajin &amp; petani, integrasi toko Shopee resmi, serta fasilitasi expo BUMN skala nasional.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 3. PREVIEW PRODUK UNGGULAN (DENGAN LINK KE /katalog DENGAN FILTER KIRI)    */}
            {/* ========================================================================= */}
            <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/70">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                        <div>
                            <span className="text-xs font-extrabold uppercase tracking-wider text-pertamina-red">
                                E-Katalog Produk Pilihan
                            </span>
                            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">
                                Produk Unggulan Komoditas Kota Dumai
                            </h2>
                            <p className="mt-1 text-xs sm:text-sm text-slate-500">
                                Dapatkan produk olahan nanas, madu hutan murni, dan kriya pesisir berkualitas binaan CSR Pertamina.
                            </p>
                        </div>

                        <Link
                            href="/katalog"
                            className="inline-flex items-center gap-2 rounded-xl bg-pertamina-blue hover:bg-pertamina-blue-dark text-white font-bold px-5 py-2.5 text-xs shadow-xs active:scale-95 transition-all self-start md:self-end"
                        >
                            <span>Buka E-Katalog Lengkap (Filter di Kiri)</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Grid 6 Produk Terpopuler */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProducts.map((prod) => (
                            <ProductCard
                                key={prod.id}
                                product={prod}
                                onSelectProduct={(p) => {
                                    setSelectedProduct(p);
                                    setModalQty(1);
                                }}
                            />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="/katalog"
                            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 px-6 py-3.5 text-xs font-bold text-slate-700 shadow-xs hover:border-slate-300 transition-all"
                        >
                            <span>Lihat Semua {INITIAL_PRODUCTS.length} Produk di Halaman E-Katalog</span>
                            <ArrowRight className="w-4 h-4 text-pertamina-blue" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 4. PREVIEW DIREKTORI UMKM (DENGAN LINK KE /direktori)                      */}
            {/* ========================================================================= */}
            <section className="py-16 sm:py-20 bg-white border-t border-slate-200/70">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                        <div>
                            <span className="text-xs font-extrabold uppercase tracking-wider text-pertamina-blue">
                                Mitra Binaan Terverifikasi
                            </span>
                            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">
                                Direktori Kelompok Usaha Lokal
                            </h2>
                            <p className="mt-1 text-xs sm:text-sm text-slate-500">
                                Berdayakan ekonomi masyarakat lokal dengan berbelanja langsung dari kelompok petani dan pengrajin Dumai.
                            </p>
                        </div>

                        <Link
                            href="/direktori"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-pertamina-blue hover:text-pertamina-blue-dark transition-colors self-start md:self-end"
                        >
                            <span>Lihat Seluruh Direktori ({INITIAL_UMKMS.length} Kelompok)</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {INITIAL_UMKMS.map((umkm) => (
                            <UmkmCard
                                key={umkm.id}
                                umkm={umkm}
                                onSelectUmkm={(u) => setSelectedUmkm(u)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal Detail Produk */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
                        onClick={() => setSelectedProduct(null)}
                    />

                    <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
                        <button
                            type="button"
                            onClick={() => setSelectedProduct(null)}
                            className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
                                <img
                                    src={selectedProduct.image_url}
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <span className="inline-block px-2.5 py-1 rounded-lg bg-pertamina-blue-light text-pertamina-blue text-[11px] font-bold">
                                        {selectedProduct.category?.name}
                                    </span>
                                    <h2 className="text-xl font-extrabold text-slate-900 mt-2 leading-snug">
                                        {selectedProduct.name}
                                    </h2>
                                    <div className="flex items-baseline gap-2 mt-2">
                                        <span className="text-2xl font-black text-pertamina-red">
                                            {formatRupiah(selectedProduct.price)}
                                        </span>
                                        <span className="text-xs text-slate-400">/{selectedProduct.unit}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {selectedProduct.description}
                                </p>

                                {selectedProduct.umkm && (
                                    <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs space-y-1">
                                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                                            <Store className="w-3.5 h-3.5 text-pertamina-blue" />
                                            <span>{selectedProduct.umkm.name}</span>
                                        </div>
                                        <p className="text-slate-500 text-[11px]">
                                            Ketua: {selectedProduct.umkm.owner_name} • {selectedProduct.umkm.district}
                                        </p>
                                    </div>
                                )}

                                <div className="space-y-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={handleModalAddToCart}
                                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-pertamina-red hover:bg-pertamina-red-dark text-white font-bold py-3 text-xs shadow-xs active:scale-98 transition-all"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>Tambah ke Keranjang Belanja</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleDirectWhatsApp}
                                        className="w-full flex items-center justify-center gap-2 rounded-xl border border-pertamina-green bg-white hover:bg-pertamina-green-light text-pertamina-green font-bold py-2.5 text-xs active:scale-98 transition-all"
                                    >
                                        <Phone className="w-4 h-4" />
                                        <span>Order Cepat via WhatsApp UMKM</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
