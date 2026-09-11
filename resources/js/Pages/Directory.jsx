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
import { useLightbox } from '@/Contexts/LightboxContext';
import { formatWhatsAppNumber, formatRupiah } from '@/Utils/phone';
import { INITIAL_UMKMS, INITIAL_PRODUCTS, DISTRICTS } from '@/data/mockData';

export default function Directory({ umkms: dbUmkms = [], products: dbProducts = [] }) {
    const { openLightbox } = useLightbox();
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUmkm, setSelectedUmkm] = useState(null);

    // Data UMKM dari database (dengan fallback ke mockData jika kosong)
    const baseUmkms = useMemo(() => {
        if (dbUmkms && dbUmkms.length > 0) {
            return dbUmkms;
        }
        return INITIAL_UMKMS;
    }, [dbUmkms]);

    // Data Produk dari database (dengan fallback)
    const baseProducts = useMemo(() => {
        if (dbProducts && dbProducts.length > 0) {
            return dbProducts;
        }
        return INITIAL_PRODUCTS;
    }, [dbProducts]);

    // Filter UMKM
    const filteredUmkms = useMemo(() => {
        return baseUmkms.filter((umkm) => {
            const matchesDistrict =
                selectedDistrict === 'all' || (umkm.district && umkm.district.toLowerCase().includes(selectedDistrict.toLowerCase()));
            const matchesSearch =
                !searchQuery.trim() ||
                (umkm.name && umkm.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (umkm.owner_name && umkm.owner_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (umkm.description && umkm.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (umkm.district && umkm.district.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesDistrict && matchesSearch;
        });
    }, [baseUmkms, selectedDistrict, searchQuery]);

    // Products of the selected UMKM in modal
    const umkmProducts = useMemo(() => {
        if (!selectedUmkm) return [];
        if (selectedUmkm.products && Array.isArray(selectedUmkm.products) && selectedUmkm.products.length > 0) {
            return selectedUmkm.products;
        }
        return baseProducts.filter((p) => p.umkm_id === selectedUmkm.id);
    }, [selectedUmkm, baseProducts]);

    return (
        <PublicLayout title="Direktori Mitra Binaan UMKM" activeMenu="directory" transparentNav={true}>
            {/* Header Banner Direktori — Background Kilang */}
            <div
                className="relative overflow-hidden pt-32 pb-16 lg:pt-36 lg:pb-20"
                style={{
                    backgroundImage: `url('/asset/logo/Bg/Kilang_Minyak_Pertamina_RU_II_Dumai.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Overlay gelap */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/65 to-slate-900/85" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs text-white/60 mb-4">
                        <Link href="/" className="hover:text-white transition-colors">
                            Beranda
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="font-semibold text-white/90">Direktori UMKM</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
                        <div>
                            <span className="text-[11px] font-extrabold uppercase tracking-widest text-pertamina-green">
                                Program TJSL Pertamina Patra Niaga Dumai
                            </span>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1 tracking-wide">
                                Direktori Kelompok Usaha &amp; Mitra Binaan
                            </h1>
                            <p className="text-xs sm:text-sm text-white/75 mt-2 max-w-2xl leading-relaxed">
                                Profil lengkap kelompok tani, komunitas pengrajin pesisir, dan produsen pangan olahan binaan CSR Pertamina di 7 kecamatan Kota Dumai.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-80 flex-shrink-0">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari nama UMKM / pengelola..."
                                className="w-full rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm pl-9 pr-8 py-2.5 text-xs text-white placeholder-white/50 focus:border-white/60 focus:ring-0 focus:outline-none"
                            />
                            <Search className="absolute left-3 top-3 w-3.5 h-3.5 text-white/50" />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2.5 top-3 text-white/50 hover:text-white"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filter Kecamatan Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-5 scrollbar-none">
                        {DISTRICTS.map((d) => {
                            const isSelected = selectedDistrict === d.id;
                            return (
                                <button
                                    key={d.id}
                                    type="button"
                                    onClick={() => setSelectedDistrict(d.id)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                                        isSelected
                                            ? 'bg-pertamina-green text-white shadow-sm'
                                            : 'bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 border border-white/20'
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
                            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pertamina-green text-white text-xs font-bold shadow-xs"
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
                                onClick={() => openLightbox(selectedUmkm.banner_url || selectedUmkm.logo_url, selectedUmkm.name)}
                                className="w-full h-full object-cover cursor-zoom-in"
                            />
                            {/* pointer-events-none — overlay ini murni dekoratif, jangan sampai menutupi klik zoom pada foto di baliknya */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />
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
                                <p className="mt-2 text-xs font-semibold text-pertamina-green flex items-center gap-1.5">
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
                                                onClick={() => openLightbox(p.image_url, p.name)}
                                                className="w-12 h-12 rounded-lg object-cover bg-slate-100 flex-shrink-0 cursor-zoom-in"
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
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-pertamina-green bg-white hover:bg-pertamina-green-light text-pertamina-green font-bold py-3 px-4 text-xs transition-all"
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
