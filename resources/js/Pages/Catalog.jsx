import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Search,
    Filter,
    X,
    SlidersHorizontal,
    ShoppingBag,
    ShoppingCart,
    ExternalLink,
    ChevronRight,
    MapPin,
    Tag,
    DollarSign,
    RotateCcw,
    Check,
    Store,
    Phone,
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import ProductCard from '@/Components/ProductCard';
import { useCart } from '@/Contexts/CartContext';
import { formatRupiah, formatWhatsAppNumber, generateWhatsAppOrderUrl } from '@/Utils/phone';
import { INITIAL_PRODUCTS, CATEGORIES, DISTRICTS, PRICE_RANGES, INITIAL_UMKMS } from '@/data/mockData';

export default function Catalog({ products: dbProducts = [], categories: dbCategories = [] }) {
    const { addToCart } = useCart();

    // Data produk dari database (dengan fallback ke mockData jika kosong)
    const baseProducts = useMemo(() => {
        if (dbProducts && dbProducts.length > 0) {
            return dbProducts;
        }
        return INITIAL_PRODUCTS;
    }, [dbProducts]);

    // Kategori dinamis dari database (dengan fallback)
    const categoriesList = useMemo(() => {
        if (dbCategories && dbCategories.length > 0) {
            return dbCategories;
        }
        // Fallback: hitung dari produk yang ada
        const map = new Map();
        baseProducts.forEach((p) => {
            const name = typeof p.category === 'object' ? p.category?.name : p.category;
            const slug = typeof p.category === 'object' ? p.category?.slug : (p.category_slug || (name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''));
            if (name && slug) {
                if (!map.has(slug)) {
                    map.set(slug, { name, slug, count: 0 });
                }
                map.get(slug).count += 1;
            }
        });
        return [
            { name: 'Semua Kategori', slug: 'all', count: baseProducts.length },
            ...Array.from(map.values()),
        ];
    }, [dbCategories, baseProducts]);

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [selectedPriceRangeIndex, setSelectedPriceRangeIndex] = useState(0);
    const [customMinPrice, setCustomMinPrice] = useState('');
    const [customMaxPrice, setCustomMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('recommended');

    // Mobile filter drawer state
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // Selected product modal
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalQty, setModalQty] = useState(1);

    // Filter logic
    const filteredProducts = useMemo(() => {
        let list = [...baseProducts];

        // 1. Search Query
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    (p.description && p.description.toLowerCase().includes(q)) ||
                    (p.umkm?.name && p.umkm.name.toLowerCase().includes(q)) ||
                    (p.umkm?.district && p.umkm.district.toLowerCase().includes(q))
            );
        }

        // 2. Category
        if (selectedCategory !== 'all') {
            list = list.filter((p) => {
                const pSlug = p.category_slug || (typeof p.category === 'string' ? p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '');
                const pName = typeof p.category === 'object' ? p.category?.name : p.category;
                const pCatSlug = typeof p.category === 'object' ? p.category?.slug : null;

                return (
                    pSlug === selectedCategory ||
                    pCatSlug === selectedCategory ||
                    (pName && pName.toLowerCase() === selectedCategory.toLowerCase()) ||
                    (pSlug && selectedCategory && (pSlug.includes(selectedCategory) || selectedCategory.includes(pSlug)))
                );
            });
        }

        // 3. District
        if (selectedDistrict !== 'all') {
            list = list.filter((p) => p.umkm?.district?.toLowerCase().includes(selectedDistrict.toLowerCase()));
        }

        // 4. Price range
        const range = PRICE_RANGES[selectedPriceRangeIndex];
        const effectiveMin = customMinPrice !== '' ? Number(customMinPrice) || 0 : range.min;
        const effectiveMax = customMaxPrice !== '' ? Number(customMaxPrice) || Infinity : range.max;

        list = list.filter((p) => p.price >= effectiveMin && p.price <= effectiveMax);

        // 5. Sorting
        if (sortBy === 'price-asc') {
            list.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            list.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'name-asc') {
            list.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'sold-desc') {
            list.sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0));
        }

        return list;
    }, [searchQuery, selectedCategory, selectedDistrict, selectedPriceRangeIndex, customMinPrice, customMaxPrice, sortBy]);

    // Active filter counts
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (searchQuery.trim()) count++;
        if (selectedCategory !== 'all') count++;
        if (selectedDistrict !== 'all') count++;
        if (selectedPriceRangeIndex !== 0 || customMinPrice !== '' || customMaxPrice !== '') count++;
        return count;
    }, [searchQuery, selectedCategory, selectedDistrict, selectedPriceRangeIndex, customMinPrice, customMaxPrice]);

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedDistrict('all');
        setSelectedPriceRangeIndex(0);
        setCustomMinPrice('');
        setCustomMaxPrice('');
        setSortBy('recommended');
    };

    // Quick add to cart from modal
    const handleModalAddToCart = () => {
        if (!selectedProduct) return;
        addToCart(selectedProduct, modalQty);
        setSelectedProduct(null);
        setModalQty(1);
    };

    // Direct WhatsApp link from modal
    const handleDirectWhatsApp = () => {
        if (!selectedProduct) return;
        const url = generateWhatsAppOrderUrl({
            umkmPhone: selectedProduct.umkm?.phone,
            umkmName: selectedProduct.umkm?.name,
            items: [{ name: selectedProduct.name, price: selectedProduct.price, quantity: modalQty, unit: selectedProduct.unit }],
        });
        window.open(url, '_blank');
    };

    // Reusable Filter Sidebar Content
    const renderFilterContent = () => (
        <div className="space-y-6 text-slate-800 text-sm">
            {/* 1. Search Box */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Cari Produk
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Nama produk / rasa..."
                        className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-pertamina-green focus:ring-pertamina-green shadow-2xs"
                    />
                    <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </div>

            {/* 2. Kategori Produk */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                    Kategori Produk
                </label>
                <div className="space-y-1">
                    {categoriesList.map((cat) => {
                        const isSelected = selectedCategory === cat.slug;
                        return (
                            <button
                                key={cat.slug}
                                type="button"
                                onClick={() => setSelectedCategory(cat.slug)}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                                    isSelected
                                        ? 'bg-pertamina-green text-white font-bold shadow-xs'
                                        : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                <span>{cat.name}</span>
                                <span
                                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                                        isSelected
                                            ? 'bg-white/20 text-white'
                                            : 'bg-slate-100 text-slate-500'
                                    }`}
                                >
                                    {cat.count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 3. Rentang Harga */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                    Rentang Harga
                </label>
                <div className="space-y-1.5">
                    {PRICE_RANGES.map((range, idx) => {
                        const isSelected = selectedPriceRangeIndex === idx && customMinPrice === '' && customMaxPrice === '';
                        return (
                            <label
                                key={idx}
                                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl cursor-pointer text-xs transition-colors ${
                                    isSelected ? 'bg-pertamina-red/10 text-pertamina-red font-bold' : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="priceRange"
                                    checked={isSelected}
                                    onChange={() => {
                                        setSelectedPriceRangeIndex(idx);
                                        setCustomMinPrice('');
                                        setCustomMaxPrice('');
                                    }}
                                    className="text-pertamina-red focus:ring-pertamina-red h-3.5 w-3.5"
                                />
                                <span>{range.label}</span>
                            </label>
                        );
                    })}
                </div>

                {/* Custom Min / Max Price Input */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-400 mb-1.5">Atau masukkan manual (Rp):</p>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="number"
                            placeholder="Min (Rp)"
                            value={customMinPrice}
                            onChange={(e) => setCustomMinPrice(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs placeholder-slate-400 focus:border-pertamina-green focus:ring-pertamina-green"
                        />
                        <input
                            type="number"
                            placeholder="Maks (Rp)"
                            value={customMaxPrice}
                            onChange={(e) => setCustomMaxPrice(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs placeholder-slate-400 focus:border-pertamina-green focus:ring-pertamina-green"
                        />
                    </div>
                </div>
            </div>

            {/* 4. Filter Kecamatan Asal UMKM */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Wilayah Kecamatan di Dumai
                </label>
                <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:border-pertamina-green focus:ring-pertamina-green shadow-2xs"
                >
                    {DISTRICTS.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.name} {d.commodity ? `— (${d.commodity})` : ''}
                        </option>
                    ))}
                </select>
            </div>

            {/* Reset Button */}
            {activeFiltersCount > 0 && (
                <button
                    type="button"
                    onClick={handleResetFilters}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-pertamina-red py-2.5 text-xs font-bold transition-all active:scale-98"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Semua Filter ({activeFiltersCount})</span>
                </button>
            )}
        </div>
    );

    return (
        <PublicLayout title="E-Katalog Produk Binaan" activeMenu="catalog" transparentNav={true}>
            {/* Banner Header Halaman Katalog — Background Kilang */}
            <div
                className="relative overflow-hidden pt-36 pb-20 lg:pt-40 lg:pb-24"
                style={{
                    backgroundImage: `url('/asset/logo/Bg/Kilang_Minyak_Pertamina_RU_II_Dumai.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Overlay gelap */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/65 to-slate-900/80" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs text-white/60 mb-4">
                        <Link href="/" className="hover:text-white transition-colors">
                            Beranda
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="font-semibold text-white/90">Katalog Produk E-Commerce</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="text-[11px] font-extrabold uppercase tracking-widest text-pertamina-green">
                                E-Katalog Resmi Mitra Binaan CSR Pertamina
                            </span>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1 tracking-wide">
                                Belanja Produk Otentik Kota Dumai
                            </h1>
                            <p className="text-xs sm:text-sm text-white/75 mt-2 max-w-2xl leading-relaxed">
                                Dapatkan produk olahan nanas gambut, madu sialang murni, songket khas Dumai, dan kerajinan serat mangrove langsung dari kelompok tani &amp; pengrajin lokal tanpa biaya perantara.
                            </p>
                        </div>

                        {/* Statistik Singkat */}
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 flex-shrink-0">
                            <div className="text-center px-3">
                                <span className="block text-lg font-black text-white">
                                    {baseProducts.length}
                                </span>
                                <span className="text-[10px] text-white/60 font-semibold uppercase">Total Produk</span>
                            </div>
                            <div className="h-7 w-px bg-white/20" />
                            <div className="text-center px-3">
                                <span className="block text-lg font-black text-white">
                                    100%
                                </span>
                                <span className="text-[10px] text-white/60 font-semibold uppercase">Binaan TJSL</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Layout Utama: Sidebar Filter Kiri + Grid Produk Kanan */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* ============================================================== */}
                    {/* 1. SIDEBAR FILTER KIRI (Desktop Sticky)                        */}
                    {/* ============================================================== */}
                    <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-28 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                                <SlidersHorizontal className="w-4 h-4 text-pertamina-green" />
                                <span>Filter Katalog</span>
                            </div>
                            {activeFiltersCount > 0 && (
                                <button
                                    type="button"
                                    onClick={handleResetFilters}
                                    className="text-[11px] font-bold text-pertamina-red hover:underline"
                                >
                                    Reset ({activeFiltersCount})
                                </button>
                            )}
                        </div>

                        {renderFilterContent()}
                    </aside>

                    {/* ============================================================== */}
                    {/* 2. AREA PRODUK KANAN                                           */}
                    {/* ============================================================== */}
                    <main className="flex-1 min-w-0 w-full">
                        {/* Control Bar: Total ditemukan, Mobile Filter Button, Sorting */}
                        <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-3">
                            {/* Kiri: Total produk & Tombol Filter Mobile */}
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setMobileFilterOpen(true)}
                                    className="lg:hidden inline-flex items-center gap-2 rounded-xl bg-pertamina-green text-white px-3.5 py-2 text-xs font-bold shadow-xs active:scale-95"
                                >
                                    <Filter className="w-3.5 h-3.5" />
                                    <span>Filter &amp; Kategori</span>
                                    {activeFiltersCount > 0 && (
                                        <span className="ml-1 w-4 h-4 rounded-full bg-pertamina-red text-[10px] font-extrabold flex items-center justify-center">
                                            {activeFiltersCount}
                                        </span>
                                    )}
                                </button>

                                <span className="text-xs text-slate-500 font-medium">
                                    Menampilkan{' '}
                                    <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> produk
                                </span>
                            </div>

                            {/* Kanan: Sorting Dropdown */}
                            <div className="flex items-center gap-2 ml-auto">
                                <label htmlFor="sortSelect" className="text-xs text-slate-400 font-semibold whitespace-nowrap hidden sm:inline">
                                    Urutkan:
                                </label>
                                <select
                                    id="sortSelect"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs text-slate-700 font-medium focus:border-pertamina-green focus:ring-pertamina-green"
                                >
                                    <option value="recommended">Paling Sesuai / Rekomendasi</option>
                                    <option value="price-asc">Harga: Terendah ke Tertinggi</option>
                                    <option value="price-desc">Harga: Tertinggi ke Terendah</option>
                                    <option value="sold-desc">Paling Banyak Terjual</option>
                                    <option value="name-asc">Nama Produk (A - Z)</option>
                                </select>
                            </div>
                        </div>

                        {/* Active Filter Chips Bar */}
                        {activeFiltersCount > 0 && (
                            <div className="flex flex-wrap items-center gap-2 mb-6">
                                <span className="text-xs font-semibold text-slate-400">Filter Aktif:</span>

                                {searchQuery && (
                                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs text-slate-700">
                                        <span>Kata kunci: &ldquo;{searchQuery}&rdquo;</span>
                                        <button type="button" onClick={() => setSearchQuery('')} className="hover:text-pertamina-red">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}

                                {selectedCategory !== 'all' && (
                                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-pertamina-green-light border border-pertamina-green/20 px-2.5 py-1 text-xs text-pertamina-green font-semibold">
                                        <span>Kategori: {categoriesList.find((c) => c.slug === selectedCategory)?.name || selectedCategory}</span>
                                        <button type="button" onClick={() => setSelectedCategory('all')} className="hover:text-pertamina-red">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}

                                {selectedDistrict !== 'all' && (
                                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs text-slate-700">
                                        <span>Kecamatan: {selectedDistrict}</span>
                                        <button type="button" onClick={() => setSelectedDistrict('all')} className="hover:text-pertamina-red">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}

                                {(selectedPriceRangeIndex !== 0 || customMinPrice !== '' || customMaxPrice !== '') && (
                                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-pertamina-red-light border border-pertamina-red/20 px-2.5 py-1 text-xs text-pertamina-red font-semibold">
                                        <span>
                                            Harga:{' '}
                                            {customMinPrice || customMaxPrice
                                                ? `${customMinPrice ? formatRupiah(customMinPrice) : 'Rp 0'} - ${
                                                      customMaxPrice ? formatRupiah(customMaxPrice) : 'Maks'
                                                  }`
                                                : PRICE_RANGES[selectedPriceRangeIndex].label}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedPriceRangeIndex(0);
                                                setCustomMinPrice('');
                                                setCustomMaxPrice('');
                                            }}
                                            className="hover:text-pertamina-red-dark"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}

                                <button
                                    type="button"
                                    onClick={handleResetFilters}
                                    className="text-xs text-slate-400 hover:text-pertamina-red font-bold underline ml-1"
                                >
                                    Hapus Semua
                                </button>
                            </div>
                        )}

                        {/* Grid Produk E-Commerce */}
                        {filteredProducts.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center">
                                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                                    <Search className="w-7 h-7" />
                                </div>
                                <h3 className="text-base font-bold text-slate-800">
                                    Tidak ada produk yang cocok
                                </h3>
                                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                                    Kombinasi kata kunci atau filter harga yang Anda pilih tidak menemukan produk binaan.
                                </p>
                                <button
                                    type="button"
                                    onClick={handleResetFilters}
                                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-pertamina-green hover:bg-pertamina-green-dark text-white text-xs font-bold px-4 py-2.5 shadow-xs transition-all"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    <span>Reset Semua Filter</span>
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onSelectProduct={(p) => {
                                            setSelectedProduct(p);
                                            setModalQty(1);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* ============================================================== */}
            {/* 3. MOBILE FILTER DRAWER (Off-Canvas)                            */}
            {/* ============================================================== */}
            {mobileFilterOpen && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
                        onClick={() => setMobileFilterOpen(false)}
                    />

                    {/* Panel Sisi Kiri */}
                    <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between z-10">
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                                <SlidersHorizontal className="w-4 h-4 text-pertamina-green" />
                                <span>Filter Produk</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setMobileFilterOpen(false)}
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Drawer Body Scrollable */}
                        <div className="flex-1 overflow-y-auto p-5">
                            {renderFilterContent()}
                        </div>

                        {/* Drawer Footer Actions */}
                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleResetFilters}
                                className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100"
                            >
                                Reset
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileFilterOpen(false)}
                                className="flex-1 py-2.5 rounded-xl bg-pertamina-green text-white text-xs font-bold shadow-xs active:scale-95"
                            >
                                Terapkan ({filteredProducts.length})
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* 4. MODAL DETAIL PRODUK                                         */}
            {/* ============================================================== */}
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
                            {/* Gambar Produk Modal */}
                            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
                                <img
                                    src={selectedProduct.image_url}
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Info Produk Modal */}
                            <div className="space-y-4">
                                <div>
                                    <span className="inline-block px-2.5 py-1 rounded-lg bg-pertamina-green-light text-pertamina-green text-[11px] font-bold">
                                        {typeof selectedProduct.category === 'object' ? selectedProduct.category?.name : selectedProduct.category}
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

                                {/* Deskripsi */}
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {selectedProduct.description}
                                </p>

                                {/* Profil UMKM Pembuat */}
                                {selectedProduct.umkm && (
                                    <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs space-y-1">
                                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                                            <Store className="w-3.5 h-3.5 text-pertamina-green" />
                                            <span>{selectedProduct.umkm.name}</span>
                                        </div>
                                        <p className="text-slate-500 text-[11px]">
                                            Ketua: {selectedProduct.umkm.owner_name} • {selectedProduct.umkm.district}
                                        </p>
                                    </div>
                                )}

                                {/* Quantity Selector */}
                                <div className="flex items-center gap-3 pt-2">
                                    <span className="text-xs font-semibold text-slate-600">Jumlah:</span>
                                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => setModalQty((prev) => Math.max(1, prev - 1))}
                                            className="px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
                                        >
                                            -
                                        </button>
                                        <span className="px-3 py-1.5 text-xs font-bold text-slate-900 min-w-[32px] text-center">
                                            {modalQty}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setModalQty((prev) => prev + 1)}
                                            className="px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Tombol Aksi */}
                                <div className="space-y-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={handleModalAddToCart}
                                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-pertamina-red hover:bg-pertamina-red-dark text-white font-bold py-3 text-xs shadow-xs active:scale-98 transition-all"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
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

                                    {selectedProduct.shopee_url && (
                                        <a
                                            href={selectedProduct.shopee_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-2 text-xs transition-all"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5 text-shopee" />
                                            <span>Buka di Toko Shopee Resmi</span>
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
