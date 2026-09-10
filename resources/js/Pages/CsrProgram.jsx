import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Award,
    CheckCircle2,
    Smartphone,
    TrendingUp,
    ShieldCheck,
    MapPin,
    Users,
    Store,
    ShoppingBag,
    ArrowRight,
    Phone,
    Mail,
    ChevronRight,
    Building2,
    Sparkles,
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import BadgeCsr from '@/Components/BadgeCsr';
import { DISTRICTS, CSR_PILLARS } from '@/data/mockData';

export default function CsrProgram() {
    return (
        <PublicLayout title="Program Pemberdayaan CSR" activeMenu="csr">
            {/* Header Banner */}
            <div className="relative overflow-hidden bg-slate-50 border-b border-slate-200/80 py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                        <Link href="/" className="hover:text-pertamina-blue transition-colors">
                            Beranda
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="font-semibold text-slate-700">Program CSR &amp; TJSL</span>
                    </nav>

                    <div className="max-w-3xl">
                        <BadgeCsr size="default" />
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 leading-tight">
                            Pemberdayaan Berkelanjutan Menuju Kemandirian UMKM Kota Dumai
                        </h1>
                        <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
                            Program Tanggung Jawab Sosial dan Lingkungan (TJSL) PT Pertamina Patra Niaga Regional Dumai / Fuel Terminal Dumai hadir mendampingi kelompok usaha lokal dari hulu ke hilir: mulai dari mutu bahan baku, perizinan edar, hingga akses pasar modern.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-4">
                            <Link
                                href="/katalog"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-pertamina-red hover:bg-pertamina-red-dark text-white font-bold px-6 py-3 text-xs shadow-xs transition-all"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                <span>Lihat Produk Hasil Binaan</span>
                            </Link>
                            <Link
                                href="/direktori"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-pertamina-blue bg-white hover:bg-pertamina-blue-light text-pertamina-blue font-bold px-6 py-3 text-xs transition-all"
                            >
                                <Store className="w-4 h-4" />
                                <span>Daftar Kelompok Binaan</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistik Capaian TJSL */}
            <div className="bg-white border-b border-slate-100 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <span className="block text-3xl sm:text-4xl font-black text-pertamina-red">15+</span>
                            <span className="text-xs font-semibold text-slate-600 mt-1 block">
                                Kelompok Usaha Aktif Terbina
                            </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <span className="block text-3xl sm:text-4xl font-black text-pertamina-blue">50+</span>
                            <span className="text-xs font-semibold text-slate-600 mt-1 block">
                                Produk Lokal Terstandarisasi
                            </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <span className="block text-3xl sm:text-4xl font-black text-pertamina-green">7</span>
                            <span className="text-xs font-semibold text-slate-600 mt-1 block">
                                Kecamatan Binaan di Dumai
                            </span>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <span className="block text-3xl sm:text-4xl font-black text-slate-900">100%</span>
                            <span className="text-xs font-semibold text-slate-600 mt-1 block">
                                Didampingi Hingga Sertifikasi
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 1: 3 Pilar Utama Program CSR */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-pertamina-blue">
                        Fokus Strategis CSR
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                        3 Pilar Utama Pembinaan Kelompok Usaha
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2">
                        Dirancang secara terintegrasi untuk mempercepat transformasi usaha tradisional menuju ekosistem UMKM modern yang berdaya saing tinggi.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Pilar 1 */}
                    <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-pertamina-blue/10 text-pertamina-blue flex items-center justify-center mb-6">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                1. Literasi &amp; Katalog Digital
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                Memberikan pendampingan intensif kepada para pelaku usaha dalam mendokumentasikan katalog secara mandiri, pengelolaan inventaris, serta pembuatan identitas digital.
                            </p>
                            <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-pertamina-green flex-shrink-0 mt-0.5" />
                                    <span>E-katalog produk terintegrasi tanpa potongan komisi.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-pertamina-green flex-shrink-0 mt-0.5" />
                                    <span>Format pemesanan otomatis ke WhatsApp pemilik UMKM.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-pertamina-green flex-shrink-0 mt-0.5" />
                                    <span>Toko resmi Shopee terverifikasi untuk pengiriman luar kota.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Pilar 2 */}
                    <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-pertamina-red/10 text-pertamina-red flex items-center justify-center mb-6">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                2. Standardisasi Mutu &amp; Legalitas
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                Memfasilitasi penerbitan legalitas usaha, higienitas pangan, dan perizinan edar agar produk UMKM dapat masuk ke pasar ritel modern dan hotel berbintang.
                            </p>
                            <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-pertamina-green flex-shrink-0 mt-0.5" />
                                    <span>Fasilitasi izin P-IRT dan Sertifikasi Halal BPJPH.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-pertamina-green flex-shrink-0 mt-0.5" />
                                    <span>Peningkatan kemasan standing pouch &amp; jar toples kedap udara.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-pertamina-green flex-shrink-0 mt-0.5" />
                                    <span>Uji laboratorium berkala untuk kemurnian madu hutan.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Pilar 3 */}
                    <div className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-pertamina-green/10 text-pertamina-green flex items-center justify-center mb-6">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                3. Akses Pasar &amp; Penguatan Branding
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                Membuka jalur kemitraan strategis, pemanfaatan cinderamata korporat resmi, dan partisipasi rutin dalam expo UMKM skala daerah maupun nasional.
                            </p>
                            <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-pertamina-green flex-shrink-0 mt-0.5" />
                                    <span>Pengadaan paket souvenir tamu resmi Fuel Terminal Dumai.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-pertamina-green flex-shrink-0 mt-0.5" />
                                    <span>Fasilitasi booth expo dan pameran BUMN se-Indonesia.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-pertamina-green flex-shrink-0 mt-0.5" />
                                    <span>Koneksi ekosistem rantai pasok antar-kelompok binaan.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Peta Sebaran 7 Kecamatan Komoditas Binaan */}
            <div className="bg-slate-50 border-y border-slate-200/80 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-pertamina-red">
                            Wilayah Pemberdayaan
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                            Komoditas Unggulan di 7 Kecamatan Kota Dumai
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Setiap kecamatan di Kota Dumai memiliki potensi lokal unik yang dikembangkan secara spesifik oleh program CSR Pertamina.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {DISTRICTS.filter((d) => d.id !== 'all').map((dist, idx) => (
                            <div
                                key={dist.id}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-pertamina-blue/50 transition-all"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-pertamina-red" />
                                    <h4 className="text-sm font-bold text-slate-900">{dist.name}</h4>
                                </div>
                                <p className="text-xs text-pertamina-blue font-semibold">
                                    {dist.commodity}
                                </p>
                                <Link
                                    href="/direktori"
                                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-pertamina-blue mt-4 transition-colors"
                                >
                                    <span>Lihat Mitra di Wilayah Ini</span>
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section 3: Kontak & Unit Pelaksana TJSL */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-pertamina-blue-dark text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl space-y-3">
                        <span className="inline-block px-3 py-1 rounded-lg bg-white/10 text-xs font-bold text-pertamina-blue-light border border-white/10">
                            Unit Pelaksana CSR Dumai
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                            Berminat Menjalin Kerjasama atau Bermitra dengan UMKM Binaan?
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Hubungi tim CSR PT Pertamina Patra Niaga Regional Dumai untuk pengadaan cinderamata korporat dalam jumlah besar atau kolaborasi program pemberdayaan ekonomi masyarakat.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <a
                            href="https://wa.me/6281268421099?text=Halo%20Tim%20CSR%20Pertamina%20Dumai,%20saya%20tertarik%20berkolaborasi%20dan%20memesan%20produk%20binaan."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-pertamina-green hover:bg-pertamina-green-dark text-white font-bold px-6 py-3.5 text-xs shadow-md transition-all text-center"
                        >
                            <Phone className="w-4 h-4" />
                            <span>Hubungi Tim CSR via WhatsApp</span>
                        </a>
                        <Link
                            href="/katalog"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 text-xs border border-white/20 transition-all text-center"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Jelajahi E-Katalog</span>
                        </Link>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
