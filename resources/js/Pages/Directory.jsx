import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Search,
    MapPin,
    Users,
    Store,
    Calendar,
    Award,
    ChevronRight,
    Phone,
    ExternalLink,
    X,
    Package,
    ShoppingBag,
    CheckCircle2,
    Filter,
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import UmkmCard from '@/Components/UmkmCard';
import ProductCard from '@/Components/ProductCard';
import BadgeCsr from '@/Components/BadgeCsr';
import { formatWhatsAppNumber, formatRupiah } from '@/Utils/phone';
import { INITIAL_UMKMS, INITIAL_PRODUCTS, DISTRICTS } from '@/data/mockData';

export default function Directory() {
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUmkm, setSelectedUmkm] = useState(null);

    // Filter UMKM
    const filteredUmkms = useMemo(() => {
        return INITIAL_UMKMS.filter((umkm) => {
            const matchesDistrict =
                selectedDistrict === 'all' || umkm.district.toLowerCase().includes(selectedDistrict.toLowerCase());
            const matchesSearch =
                !searchQuery.trim() ||
                umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                umkm.owner_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                umkm.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                umkm.district.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesDistrict && matchesSearch;
        });
    }, [selectedDistrict, searchQuery]);

    // Products of the selected UMKM in modal
    const umkmProducts = useMemo(() => {
        if (!selectedUmkm) return [];
        return INITIAL_PRODUCTS.filter((p) => p.umkm_id === selectedUmkm.id);
    }, [selectedUmkm]);

    return (
        <PublicLayout title="Direktori Mitra Binaan UMKM" activeMenu="directory">
            {/* Header Banner Direktori */}
            <div className="bg-slate-50 border-b border-slate-200/80 py-8 lg:py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                        <Link href="/" className="hover:text-pertamina-blue transition-colors">
                            Beranda
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="font-semibold text-slate-700">Direktori UMKM</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <span className="text-[11px] font-extrabold uppercase tracking-widest text-pertamina-blue">
                                Program TJSL Pertamina Patra Niaga Dumai
                            </span>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-1">
                                Direktori Kelompok Usaha &amp; Mitra Binaan
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                                Profil lengkap kelompok tani, komunitas pengrajin pesisir, dan produsen pangan olahan binaan CSR Pertamina di 7 kecamatan Kota Dumai.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari nama UMKM / pengelola..."
                                className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-8 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-pertamina-blue focus:ring-pertamina-blue shadow-2xs"
                            />
                            <Search className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-400" />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filter Kecamatan Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-6 scrollbar-none">
                        {DISTRICTS.map((d) => {
                            const isSelected = selectedDistrict === d.id;
                            return (
                                <button
                                    key={d.id}
                                    type="button"
                                    onClick={() => setSelectedDistrict(d.id)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                                        isSelected
                                            ? 'bg-pertamina-blue text-white shadow-xs'
                                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                                    }`}
                                >
                                    {d.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content Body: Grid UMKM */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-xs text-slate-500 font-medium">
                        Menampilkan <strong className="text-slate-900 font-bold">{filteredUmkms.length}</strong> kelompok usaha binaan
                    </p>
                    {selectedDistrict !== 'all' && (
                        <button
                            type="button"
                            onClick={() => setSelectedDistrict('all')}
                            className="text-xs text-pertamina-red font-bold hover:underline"
                        >
                            Tampilkan Semua Wilayah
                        </button>
                    )}
                </div>

                {filteredUmkms.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
                            <Store className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-slate-800">Tidak ada UMKM yang cocok</h3>
                        <p className="text-xs text-slate-500 mt-1">
                            Coba ubah kata kunci pencarian atau pilih kecamatan lainnya.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedDistrict('all');
                            }}
                            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pertamina-blue text-white text-xs font-bold shadow-xs"
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredUmkms.map((umkm) => (
                            <UmkmCard
                                key={umkm.id}
                                umkm={umkm}
                                onSelectUmkm={(u) => setSelectedUmkm(u)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal Detail Profil UMKM Binaan */}
            {selectedUmkm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
                        onClick={() => setSelectedUmkm(null)}
                    />

                    <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
                        <button
                            type="button"
                            onClick={() => setSelectedUmkm(null)}
                            className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Banner & Logo */}
                        <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 mb-5">
                            <img
                                src={selectedUmkm.banner_url || selectedUmkm.logo_url}
                                alt={selectedUmkm.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                            <div className="absolute top-3 left-3">
                                <BadgeCsr size="default" />
                            </div>
                            <div className="absolute bottom-3 left-3 right-3 text-white">
                                <h2 className="text-xl font-extrabold drop-shadow-sm leading-snug">
                                    {selectedUmkm.name}
                                </h2>
                                <p className="text-xs text-slate-200 flex items-center gap-1.5 mt-0.5">
                                    <MapPin className="w-3.5 h-3.5 text-pertamina-red" />
                                    <span>{selectedUmkm.district}</span>
                                    <span>•</span>
                                    <span>Binaan CSR Batch {selectedUmkm.csr_batch_year}</span>
                                </p>
                            </div>
                        </div>

                        {/* Key Specs */}
                        <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 mb-5 text-center text-xs">
                            <div>
                                <span className="block text-[10px] text-slate-400 font-semibold uppercase">Pengelola</span>
                                <span className="font-bold text-slate-800">{selectedUmkm.owner_name}</span>
                            </div>
                            <div className="border-x border-slate-200">
                                <span className="block text-[10px] text-slate-400 font-semibold uppercase">Berdiri</span>
                                <span className="font-bold text-slate-800">Tahun {selectedUmkm.established_year}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] text-slate-400 font-semibold uppercase">Anggota</span>
                                <span className="font-bold text-slate-800">{selectedUmkm.members_count || 15} Pelaku</span>
                            </div>
                        </div>

                        {/* Deskripsi Kelompok */}
                        <div className="mb-5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                                Tentang Kelompok Usaha
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {selectedUmkm.description}
                            </p>
                            {selectedUmkm.certification && (
                                <p className="mt-2 text-xs font-semibold text-pertamina-blue flex items-center gap-1.5">
                                    <CheckCircle2 className="w-4 h-4 text-pertamina-green" />
                                    <span>Legalitas &amp; Sertifikasi: {selectedUmkm.certification}</span>
                                </p>
                            )}
                        </div>

                        {/* Produk yang Dihasilkan */}
                        <div className="mb-6">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                                Produk Unggulan Kelompok ({umkmProducts.length})
                            </h4>
                            {umkmProducts.length === 0 ? (
                                <p className="text-xs text-slate-500">Belum ada produk terdaftar untuk UMKM ini.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {umkmProducts.map((p) => (
                                        <div
                                            key={p.id}
                                            className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300"
                                        >
                                            <img
                                                src={p.image_url}
                                                alt={p.name}
                                                className="w-12 h-12 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-bold text-slate-800 truncate">{p.name}</p>
                                                <p className="text-xs font-extrabold text-pertamina-red mt-0.5">
                                                    {formatRupiah(p.price)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Direct Action Buttons */}
                        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
                            <a
                                href={`https://wa.me/${formatWhatsAppNumber(selectedUmkm.phone)}?text=${encodeURIComponent(
                                    `Halo *${selectedUmkm.name}*, saya tertarik berkoordinasi dan memesan produk melalui Portal Binaan CSR Pertamina Patra Niaga Dumai.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-pertamina-green hover:bg-pertamina-green-dark text-white font-bold py-3 text-xs shadow-xs transition-all"
                            >
                                <Phone className="w-4 h-4" />
                                <span>Hubungi via WhatsApp ({selectedUmkm.phone})</span>
                            </a>

                            <Link
                                href="/katalog"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-pertamina-blue bg-white hover:bg-pertamina-blue-light text-pertamina-blue font-bold py-3 px-4 text-xs transition-all"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                <span>Buka di Katalog</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
