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
import { formatRupiah, formatWhatsAppNumber } from '@/Utils/phone';

// Data Mock Otentik Binaan CSR Pertamina Patra Niaga Unit Dumai
const INITIAL_UMKMS = [
    {
        id: 1,
        name: 'Kelompok Tani Nanas Maju Mandiri',
        owner_name: 'Ibu Siti Aminah',
        district: 'Kec. Bukit Kapur',
        phone: '081268421099',
        established_year: 2018,
        csr_batch_year: 2021,
        banner_url: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&auto=format&fit=crop&q=80',
        logo_url: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=200&auto=format&fit=crop&q=80',
        shopee_shop_url: 'https://shopee.co.id',
        description:
            'Kelompok tani binaan CSR Pertamina Patra Niaga Dumai yang mengolah komoditas nanas madu khas lahan gambut Bukit Kapur menjadi aneka kuliner bernilai tambah tinggi.',
        products_count: 4,
    },
    {
        id: 2,
        name: 'Rumah Kriya Mangrove Lestari',
        owner_name: 'Bapak Hendra Saputra',
        district: 'Kec. Dumai Barat',
        phone: '085271890044',
        established_year: 2019,
        csr_batch_year: 2022,
        banner_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
        logo_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&auto=format&fit=crop&q=80',
        shopee_shop_url: 'https://shopee.co.id',
        description:
            'Kelompok pengrajin ramah lingkungan di pesisir Dumai Barat yang mengolah limbah ranting mangrove dan serat alami menjadi cinderamata serta produk kerajinan bernilai seni.',
        products_count: 3,
    },
    {
        id: 3,
        name: 'Batik & Tenun Dumai Berkah',
        owner_name: 'Ibu Nurhayati',
        district: 'Kec. Dumai Kota',
        phone: '081374552211',
        established_year: 2020,
        csr_batch_year: 2023,
        banner_url: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=800&auto=format&fit=crop&q=80',
        logo_url: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=200&auto=format&fit=crop&q=80',
        shopee_shop_url: 'https://shopee.co.id',
        description:
            'Pemberdayaan ibu-ibu pengrajin tenun songket dan batik khas Dumai dengan pewarna alami ekstrak mangrove dan motif ikonik Kota Dumai.',
        products_count: 3,
    },
    {
        id: 4,
        name: 'Madu Hutan & Herbal Dumai Sejahtera',
        owner_name: 'Bapak Ruslan Efendi',
        district: 'Kec. Medang Kampai',
        phone: '082169883355',
        established_year: 2017,
        csr_batch_year: 2020,
        banner_url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80',
        logo_url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&auto=format&fit=crop&q=80',
        shopee_shop_url: 'https://shopee.co.id',
        description:
            'Kelompok pembudidaya lebah madu sialang dan hutan akasia di Medang Kampai, menghasilkan madu murni tanpa campuran serta olahan herbal kesehatan.',
        products_count: 3,
    },
];

const INITIAL_PRODUCTS = [
    {
        id: 101,
        umkm_id: 1,
        category: { id: 1, name: 'Olahan Nanas & Kuliner', slug: 'olahan-nanas' },
        name: 'Keripik Nanas Madu Bukit Kapur Crispy',
        slug: 'keripik-nanas-madu-bukit-kapur',
        price: 25000,
        unit: 'bungkus',
        image_url: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&auto=format&fit=crop&q=80',
        shopee_url: 'https://shopee.co.id',
        description:
            'Keripik nanas olahan vacuum frying dari nanas madu kualitas super khas lahan gambut Bukit Kapur Dumai. Manis renyah alami tanpa pemanis buatan.',
        umkm: INITIAL_UMKMS[0],
    },
    {
        id: 102,
        umkm_id: 1,
        category: { id: 1, name: 'Olahan Nanas & Kuliner', slug: 'olahan-nanas' },
        name: 'Selai Nanas Dumai Premium Glass Jar',
        slug: 'selai-nanas-dumai-premium',
        price: 32000,
        unit: 'jar',
        image_url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=600&auto=format&fit=crop&q=80',
        shopee_url: 'https://shopee.co.id',
        description:
            'Selai nanas segar dengan tekstur serat buah asli dan aroma cengkeh kayu manis yang kaya, sangat cocok untuk isian nastar dan sarapan roti.',
        umkm: INITIAL_UMKMS[0],
    },
    {
        id: 103,
        umkm_id: 1,
        category: { id: 1, name: 'Olahan Nanas & Kuliner', slug: 'olahan-nanas' },
        name: 'Sirup Konsentrat Nanas Gambut Segar',
        slug: 'sirup-nanas-gambut-segar',
        price: 35000,
        unit: 'botol 500ml',
        image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
        shopee_url: 'https://shopee.co.id',
        description:
            'Konsentrat sari nanas murni kaya vitamin C. Tinggal dilarutkan dengan air es untuk minuman penyegar alami di cuaca tropis Dumai.',
        umkm: INITIAL_UMKMS[0],
    },
    {
        id: 104,
        umkm_id: 2,
        category: { id: 2, name: 'Kerajinan & Kriya', slug: 'kerajinan' },
        name: 'Tas Anyaman Serat Mangrove Ramah Lingkungan',
        slug: 'tas-anyaman-serat-mangrove',
        price: 85000,
        unit: 'pcs',
        image_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80',
        shopee_url: 'https://shopee.co.id',
        description:
            'Tas jinjing etnik buatan tangan pengrajin pesisir Dumai Barat. Menggunakan serat tumbuhan mangrove lestari yang kokoh dan modis.',
        umkm: INITIAL_UMKMS[1],
    },
    {
        id: 105,
        umkm_id: 2,
        category: { id: 2, name: 'Kerajinan & Kriya', slug: 'kerajinan' },
        name: 'Miniatur Kapal Pinisi Kayu Pesisir Dumai',
        slug: 'miniatur-kapal-pinisi-kayu',
        price: 150000,
        unit: 'set',
        image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
        shopee_url: 'https://shopee.co.id',
        description:
            'Souvenir eksklusif ukiran kayu khas pelabuhan Dumai hasil kreasi kelompok pengrajin binaan CSR Pertamina Patra Niaga.',
        umkm: INITIAL_UMKMS[1],
    },
    {
        id: 106,
        umkm_id: 3,
        category: { id: 3, name: 'Batik & Tenun', slug: 'batik-tenun' },
        name: 'Kain Batik Tulis Motif Daun Mangrove Dumai',
        slug: 'kain-batik-motif-daun-mangrove',
        price: 220000,
        unit: 'lembar (2 meter)',
        image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
        shopee_url: 'https://shopee.co.id',
        description:
            'Batik tulis eksklusif dengan filosofi pelestarian lingkungan pesisir Dumai, menggunakan pewarnaan ramah lingkungan bersertifikasi.',
        umkm: INITIAL_UMKMS[2],
    },
    {
        id: 107,
        umkm_id: 4,
        category: { id: 4, name: 'Madu Hutan & Herbal', slug: 'madu-herbal' },
        name: 'Madu Murni Hutan Akasia Medang Kampai',
        slug: 'madu-murni-hutan-akasia',
        price: 95000,
        unit: 'botol 650gr',
        image_url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
        shopee_url: 'https://shopee.co.id',
        description:
            'Madu mentah (raw honey) dipanen langsung dari sarang lebah hutan binaan di kawasan Medang Kampai Dumai. Menjaga daya tahan tubuh alami.',
        umkm: INITIAL_UMKMS[3],
    },
    {
        id: 108,
        umkm_id: 4,
        category: { id: 4, name: 'Madu Hutan & Herbal', slug: 'madu-herbal' },
        name: 'Madu Propolis Alami Khas Dumai',
        slug: 'madu-propolis-alami-dumai',
        price: 120000,
        unit: 'botol 250ml',
        image_url: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&auto=format&fit=crop&q=80',
        shopee_url: 'https://shopee.co.id',
        description:
            'Kombinasi madu hutan dengan ekstrak propolis lebah trigona asli Dumai untuk imunitas dan pemulihan stamina tubuh.',
        umkm: INITIAL_UMKMS[3],
    },
];

const CATEGORIES = [
    { name: 'Semua Kategori', slug: 'all' },
    { name: 'Olahan Nanas & Kuliner', slug: 'olahan-nanas' },
    { name: 'Kerajinan & Kriya', slug: 'kerajinan' },
    { name: 'Batik & Tenun', slug: 'batik-tenun' },
    { name: 'Madu Hutan & Herbal', slug: 'madu-herbal' },
];

export default function Welcome() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedUmkm, setSelectedUmkm] = useState(null);

    const { addToCart } = useCart();

    // Filter Produk
    const filteredProducts = useMemo(() => {
        return INITIAL_PRODUCTS.filter((prod) => {
            const matchesCategory =
                selectedCategory === 'all' || prod.category.slug === selectedCategory;
            const matchesSearch =
                !searchQuery.trim() ||
                prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prod.umkm?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prod.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    // Filter UMKM
    const filteredUmkms = useMemo(() => {
        return INITIAL_UMKMS.filter((umkm) => {
            return selectedDistrict === 'all' || umkm.district.includes(selectedDistrict);
        });
    }, [selectedDistrict]);

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

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                                Penguatan Branding & Akses Pasar Digital{' '}
                                <span className="text-pertamina-blue">UMKM Binaan CSR</span>{' '}
                                <span className="text-pertamina-red">Pertamina Patra Niaga Dumai</span>
                            </h1>

                            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                                Program Pengabdian Kepada Masyarakat (PKM) untuk memberdayakan potensi kelompok usaha lokal Kota Dumai melalui literasi digital, standardisasi kemasan, etalase e-katalog, dan pemesanan instan langsung ke WhatsApp UMKM.
                            </p>

                            {/* Dual Call to Action Buttons */}
                            <div className="pt-2 flex flex-wrap items-center gap-4">
                                <a
                                    href="#katalog"
                                    className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-pertamina-red hover:bg-pertamina-red-dark text-white font-bold px-6 py-3.5 text-sm shadow-sm hover:shadow active:scale-[0.98] transition-all"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    <span>Jelajahi Produk Binaan</span>
                                </a>

                                <a
                                    href="#direktori"
                                    className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-pertamina-blue bg-white hover:bg-pertamina-blue-light text-pertamina-blue font-bold px-6 py-3.5 text-sm active:scale-[0.98] transition-all"
                                >
                                    <Store className="w-4 h-4" />
                                    <span>Lihat Direktori UMKM</span>
                                </a>
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

                        {/* Kolom Visual Hero (5 Kolom di Desktop) */}
                        <div className="lg:col-span-5">
                            <div className="relative mx-auto max-w-md lg:max-w-none">
                                {/* Card Showcase Utama */}
                                <div className="rounded-3xl border border-slate-200/90 bg-slate-50/50 p-4 shadow-subtle backdrop-blur-xs">
                                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-xs">
                                        <img
                                            src="https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&auto=format&fit=crop&q=80"
                                            alt="Produk Nanas Binaan CSR Pertamina Dumai"
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                                        <div className="absolute top-4 left-4">
                                            <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-pertamina-blue shadow-sm">
                                                Komoditas Unggulan Dumai
                                            </span>
                                        </div>

                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <span className="text-[11px] font-semibold uppercase tracking-wider text-pertamina-red bg-white/90 px-2 py-0.5 rounded">
                                                CSR Unit Dumai
                                            </span>
                                            <h3 className="mt-1 text-base font-bold text-white drop-shadow-sm">
                                                Olahan Nanas Gambut Bukit Kapur
                                            </h3>
                                            <p className="text-xs text-slate-200 line-clamp-1">
                                                Pemberdayaan ekonomi petani nanas lokal Dumai
                                            </p>
                                        </div>
                                    </div>

                                    {/* Mini Info Floating Pill */}
                                    <div className="mt-4 grid grid-cols-2 gap-3">
                                        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
                                            <span className="text-[11px] text-slate-400 font-medium">Mitra Pembina</span>
                                            <p className="text-xs font-bold text-slate-900 mt-0.5">
                                                PT Pertamina Patra Niaga
                                            </p>
                                            <span className="text-[10px] text-pertamina-blue font-semibold">Fuel Terminal Dumai</span>
                                        </div>

                                        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
                                            <span className="text-[11px] text-slate-400 font-medium">Fokus Program</span>
                                            <p className="text-xs font-bold text-slate-900 mt-0.5">
                                                Literasi Digital PKM
                                            </p>
                                            <span className="text-[10px] text-pertamina-green font-semibold">Akses Pasar & Branding</span>
                                        </div>
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
            {/* 2. PILAR LITERASI DIGITAL & PROGRAM CSR PKM (#tentang)                     */}
            {/* ========================================================================= */}
            <section id="tentang" className="py-16 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-pertamina-blue">
                            Pemberdayaan Berkelanjutan
                        </span>
                        <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900">
                            3 Pilar Penguatan UMKM Binaan Melalui Literasi Digital
                        </h2>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                            Program Pengabdian Kepada Masyarakat (PKM) menghadirkan sinergi nyata antara akademisi dan program CSR Pertamina Patra Niaga Dumai untuk kemandirian ekonomi pelaku usaha lokal.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Pilar 1 */}
                        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-subtle hover:border-slate-300 hover:shadow-subtle-hover transition-all">
                            <div className="w-12 h-12 rounded-xl bg-pertamina-blue/10 text-pertamina-blue flex items-center justify-center mb-5">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                Literasi & Katalog Digital
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Pendampingan pelaku UMKM dalam mendokumentasikan produk, mengelola inventaris etalase online, dan memanfaatkan website katalog mandiri yang mudah diakses konsumen.
                            </p>
                        </div>

                        {/* Pilar 2 */}
                        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-subtle hover:border-slate-300 hover:shadow-subtle-hover transition-all">
                            <div className="w-12 h-12 rounded-xl bg-pertamina-red/10 text-pertamina-red flex items-center justify-center mb-5">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                Penguatan Identitas & Branding
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Standardisasi label, narasi keunggulan produk lokal Dumai, serta penyematan identitas resmi Binaan CSR Pertamina Patra Niaga Unit Dumai yang meningkatkan kepercayaan pasar.
                            </p>
                        </div>

                        {/* Pilar 3 */}
                        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-subtle hover:border-slate-300 hover:shadow-subtle-hover transition-all">
                            <div className="w-12 h-12 rounded-xl bg-pertamina-green/10 text-pertamina-green flex items-center justify-center mb-5">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                Akses Pasar Multi-Channel
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Menghubungkan pembeli langsung ke nomor WhatsApp pemilik usaha dengan format order otomatis tanpa potongan komisi, serta tautan terintegrasi ke toko resmi Shopee.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 3. KATALOG MINI-MARKETPLACE PRODUK (#katalog)                              */}
            {/* ========================================================================= */}
            <section id="katalog" className="py-16 sm:py-20 bg-slate-50/70 border-t border-slate-200/70">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                        <div>
                            <span className="text-xs font-extrabold uppercase tracking-wider text-pertamina-red">
                                Mini-Marketplace Binaan
                            </span>
                            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">
                                Katalog Produk Unggulan Kota Dumai
                            </h2>
                            <p className="mt-1 text-xs sm:text-sm text-slate-500">
                                Pilih aneka produk olahan dan kerajinan khas Dumai, tambahkan ke keranjang, dan pesan langsung via WhatsApp.
                            </p>
                        </div>

                        {/* Search Input Bar */}
                        <div className="relative w-full md:w-72">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari nama produk / UMKM..."
                                className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-pertamina-red focus:ring-pertamina-red shadow-2xs"
                            />
                            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                        </div>
                    </div>

                    {/* Filter Kategori Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.slug}
                                type="button"
                                onClick={() => setSelectedCategory(cat.slug)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                                    selectedCategory === cat.slug
                                        ? 'bg-pertamina-blue text-white shadow-xs'
                                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Grid Produk */}
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
                                <Search className="w-6 h-6" />
                            </div>
                            <h4 className="text-base font-bold text-slate-800">Tidak ada produk yang cocok</h4>
                            <p className="text-xs text-slate-500 mt-1">
                                Coba ganti kata kunci pencarian atau pilih kategori lain di atas.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onSelectProduct={(p) => setSelectedProduct(p)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 4. DIREKTORI KELOMPOK BINAAN CSR DUMAI (#direktori)                        */}
            {/* ========================================================================= */}
            <section id="direktori" className="py-16 sm:py-20 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                        <div>
                            <span className="text-xs font-extrabold uppercase tracking-wider text-pertamina-blue">
                                Direktori Usaha Lokal
                            </span>
                            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">
                                Profil Kelompok Binaan CSR Pertamina Dumai
                            </h2>
                            <p className="mt-1 text-xs sm:text-sm text-slate-500">
                                Pelaku usaha mikro dan kelompok tani yang dibina secara berkala oleh CSR PT Pertamina Patra Niaga Unit Dumai.
                            </p>
                        </div>

                        {/* Filter Kecamatan di Dumai */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-3.5 h-3.5 text-slate-400" />
                            <select
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                className="rounded-xl border-slate-200 bg-white py-1.5 px-3 text-xs text-slate-700 font-semibold focus:border-pertamina-blue focus:ring-pertamina-blue shadow-2xs"
                            >
                                <option value="all">Semua Kecamatan di Dumai</option>
                                <option value="Bukit Kapur">Kec. Bukit Kapur</option>
                                <option value="Dumai Barat">Kec. Dumai Barat</option>
                                <option value="Dumai Kota">Kec. Dumai Kota</option>
                                <option value="Medang Kampai">Kec. Medang Kampai</option>
                            </select>
                        </div>
                    </div>

                    {/* Grid UMKM Card */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredUmkms.map((umkm) => (
                            <UmkmCard
                                key={umkm.id}
                                umkm={umkm}
                                onSelectUmkm={(u) => setSelectedUmkm(u)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 5. CALLOUT PROMOSI CSR & CALL TO ACTION BANNER                             */}
            {/* ========================================================================= */}
            <section className="py-14 bg-gradient-to-r from-pertamina-blue-dark via-pertamina-blue to-pertamina-blue text-white relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-pertamina-red/10 transform skew-x-12 pointer-events-none" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                    <BadgeCsr size="default" className="bg-white/10 text-white border-white/20" />
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Dukung Kebangkitan UMKM Lokal Kota Dumai
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-100 max-w-2xl mx-auto leading-relaxed">
                        Setiap transaksi produk yang Anda beli membantu langsung kesejahteraan kelompok tani dan pengrajin lokal binaan CSR Pertamina Patra Niaga Unit Dumai.
                    </p>
                    <div className="pt-2">
                        <a
                            href="#katalog"
                            className="inline-flex items-center gap-2 rounded-xl bg-pertamina-red hover:bg-pertamina-red-dark text-white font-bold px-6 py-3 text-xs shadow-md active:scale-95 transition-all"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Pesan Sekarang Langsung via WhatsApp</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* ========================================================================= */}
            {/* 6. MODAL QUICK VIEW DETAIL PRODUK                                         */}
            {/* ========================================================================= */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div
                        onClick={() => setSelectedProduct(null)}
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
                    />

                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
                            <button
                                type="button"
                                onClick={() => setSelectedProduct(null)}
                                className="absolute right-4 top-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 mb-4">
                                <img
                                    src={selectedProduct.image_url}
                                    alt={selectedProduct.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="space-y-3">
                                <BadgeCsr size="xs" />

                                <div className="text-xs font-semibold text-pertamina-blue">
                                    {selectedProduct.umkm?.name} ({selectedProduct.umkm?.district})
                                </div>

                                <h3 className="text-lg font-bold text-slate-900">
                                    {selectedProduct.name}
                                </h3>

                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {selectedProduct.description}
                                </p>

                                <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                                    <span className="text-xs text-slate-400">Harga Satuan</span>
                                    <span className="text-xl font-extrabold text-pertamina-red">
                                        {formatRupiah(selectedProduct.price)}
                                        {selectedProduct.unit && (
                                            <span className="text-xs text-slate-400 font-normal ml-1">
                                                /{selectedProduct.unit}
                                            </span>
                                        )}
                                    </span>
                                </div>

                                <div className="pt-2 flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            addToCart(selectedProduct, 1);
                                            setSelectedProduct(null);
                                        }}
                                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-pertamina-red hover:bg-pertamina-red-dark text-white text-xs font-semibold py-3 px-4 shadow-sm"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>+ Tambah ke Keranjang</span>
                                    </button>

                                    {selectedProduct.shopee_url && (
                                        <a
                                            href={selectedProduct.shopee_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 rounded-xl bg-shopee hover:bg-shopee-dark text-white text-xs font-semibold py-3 px-4 shadow-sm"
                                        >
                                            <span>Beli di Shopee</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* 7. MODAL QUICK VIEW DETAIL UMKM                                           */}
            {/* ========================================================================= */}
            {selectedUmkm && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div
                        onClick={() => setSelectedUmkm(null)}
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
                    />

                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
                            <button
                                type="button"
                                onClick={() => setSelectedUmkm(null)}
                                className="absolute right-4 top-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 mb-4">
                                <img
                                    src={selectedUmkm.banner_url}
                                    alt={selectedUmkm.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="space-y-3">
                                <BadgeCsr size="default" />

                                <h3 className="text-xl font-bold text-slate-900">
                                    {selectedUmkm.name}
                                </h3>

                                <div className="space-y-1 text-xs text-slate-500">
                                    <p>Pengelola: <strong className="text-slate-800 font-semibold">{selectedUmkm.owner_name}</strong></p>
                                    <p>Lokasi: <strong className="text-slate-800 font-semibold">{selectedUmkm.district}, Kota Dumai</strong></p>
                                    {selectedUmkm.csr_batch_year && (
                                        <p>Mulai Binaan: <strong className="text-pertamina-blue font-semibold">Tahun {selectedUmkm.csr_batch_year}</strong></p>
                                    )}
                                </div>

                                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                                    {selectedUmkm.description}
                                </p>

                                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                                    {selectedUmkm.phone && (
                                        <a
                                            href={`https://wa.me/${formatWhatsAppNumber(selectedUmkm.phone)}?text=${encodeURIComponent(
                                                `Halo *${selectedUmkm.name}*, saya tertarik berdiskusi dan memesan produk binaan CSR Pertamina Dumai dari website.`
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-pertamina-green hover:bg-pertamina-green-dark text-white text-xs font-semibold py-3 px-4 shadow-sm"
                                        >
                                            <Phone className="w-4 h-4" />
                                            <span>Chat Pemilik Usaha via WhatsApp</span>
                                        </a>
                                    )}

                                    {selectedUmkm.shopee_shop_url && (
                                        <a
                                            href={selectedUmkm.shopee_shop_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 rounded-xl bg-shopee hover:bg-shopee-dark text-white text-xs font-semibold py-3 px-4 shadow-sm"
                                        >
                                            <span>Toko Shopee</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
