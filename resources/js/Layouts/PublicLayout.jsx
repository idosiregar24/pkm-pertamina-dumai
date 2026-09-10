import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ShoppingBag, Menu, X, MapPin, Phone, Mail, Award, ExternalLink, LogIn } from 'lucide-react';
import { CartProvider, useCart } from '@/Contexts/CartContext';
import CartDrawer from '@/Components/CartDrawer';
import BadgeCsr from '@/Components/BadgeCsr';
import { getAssetUrl } from '@/Utils/phone';

function NavbarContent({ activeMenu, transparentNav = false }) {
    const { totalCount, setIsCartOpen } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (!transparentNav) return;
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [transparentNav]);

    // Tentukan apakah navbar sedang dalam mode transparan (di atas hero, belum di-scroll)
    const isTransparent = transparentNav && !scrolled;

    const logoSrc = isTransparent
        ? getAssetUrl('/asset/logo/logo%20pertamina%20putih.svg')
        : getAssetUrl('/asset/logo/logo-pertamina-patra-niaga.png');

    const navLinks = [
        { label: 'Beranda', href: '/', id: 'home' },
        { label: 'Katalog Produk', href: '/katalog', id: 'catalog' },
        { label: 'Direktori UMKM', href: '/direktori', id: 'directory' },
        { label: 'Program CSR', href: '/program-csr', id: 'csr' },
    ];

    return (
        <header
            className={`z-40 transition-all duration-300 ${
                transparentNav
                    ? 'fixed top-0 left-0 right-0' // fixed hanya untuk hero page
                    : 'sticky top-0'               // sticky untuk halaman lain (no layout jump)
            } ${
                isTransparent
                    ? 'bg-transparent border-b border-transparent shadow-none'
                    : 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo & Identitas Korporasi */}
                    <div className="flex items-center gap-3.5">
                        <Link href="/" className="flex items-center gap-3 group">
                            <img
                                src={logoSrc}
                                alt="Logo Pertamina Patra Niaga"
                                className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
                            />
                            <div className={`hidden sm:block border-l pl-3 ${
                                isTransparent ? 'border-white/40' : 'border-slate-200'
                            }`}>
                                <span className={`block text-[11px] font-extrabold uppercase tracking-wider ${
                                    isTransparent ? 'text-white' : 'text-pertamina-green'
                                }`}>
                                    Unit Dumai
                                </span>
                                <span className={`block text-xs font-semibold ${
                                    isTransparent ? 'text-white/80' : 'text-slate-700'
                                }`}>
                                    Kelompok Binaan CSR
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Navigasi Desktop */}
                    <nav className="hidden md:flex items-center gap-7">
                        {navLinks.map((link) => {
                            const isActive = activeMenu === link.id;
                            return (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    className={`relative text-sm font-semibold transition-all py-1.5 ${
                                        isTransparent
                                            ? isActive
                                                ? 'text-white font-bold'
                                                : 'text-white/85 hover:text-white'
                                            : isActive
                                            ? 'text-pertamina-red font-bold'
                                            : 'text-slate-600 hover:text-pertamina-green'
                                    }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${isTransparent ? 'bg-white' : 'bg-pertamina-red'}`} />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Aksi Sisi Kanan: Keranjang, Login & Menu Mobile */}
                    <div className="flex items-center gap-2.5">
                        {/* Tombol Keranjang Belanja */}
                        <button
                            type="button"
                            onClick={() => setIsCartOpen(true)}
                            className={`relative flex items-center gap-2 px-2 py-1.5 transition-all active:scale-95 ${
                                isTransparent
                                    ? 'text-white hover:text-white/75'
                                    : 'text-slate-700 hover:text-slate-900'
                            }`}
                            aria-label="Buka Keranjang Belanja"
                        >
                            <ShoppingBag className={`w-5 h-5 ${isTransparent ? 'text-white' : 'text-pertamina-red'}`} />
                            <span className={`hidden sm:inline text-xs font-bold ${isTransparent ? 'text-white' : 'text-slate-800'}`}>
                                Keranjang
                            </span>
                            {totalCount > 0 && (
                                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-pertamina-red text-white text-[11px] font-extrabold shadow-sm animate-pulse">
                                    {totalCount}
                                </span>
                            )}
                        </button>

                        {/* Tombol Login (di sebelah kanan) */}
                        <Link
                            href="/login"
                            className={`hidden sm:inline-flex items-center gap-2 px-2 py-1.5 transition-all active:scale-95 text-xs font-bold ${
                                isTransparent
                                    ? 'text-white hover:text-white/75'
                                    : 'text-slate-700 hover:text-slate-900'
                            }`}
                            aria-label="Masuk ke Akun / Panel Admin"
                        >
                            <LogIn className={`w-5 h-5 ${isTransparent ? 'text-white' : 'text-pertamina-green'}`} />
                            <span className={`text-xs font-bold ${isTransparent ? 'text-white' : 'text-slate-800'}`}>
                                Login
                            </span>
                        </Link>

                        {/* Hamburger Button untuk Mobile */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className={`md:hidden p-2 rounded-xl border transition-all ${
                                isTransparent
                                    ? 'border-white/30 text-white hover:bg-white/20'
                                    : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1.5 shadow-lg">
                    {navLinks.map((link) => {
                        const isActive = activeMenu === link.id;
                        return (
                            <Link
                                key={link.id}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                                    isActive
                                        ? 'bg-pertamina-red/10 text-pertamina-red font-bold'
                                        : 'text-slate-800 hover:bg-slate-50'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    {/* Login Link on Mobile */}
                    <div className="pt-2 border-t border-slate-100">
                        <Link
                            href="/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors"
                        >
                            <LogIn className="w-4 h-4 text-pertamina-green" />
                            <span>Login</span>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

function Footer() {
    return (
        <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
                    {/* Kolom 1: Profil Portal & CSR */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="inline-block">
                            <img
                                src={getAssetUrl('/asset/logo/logo%20pertamina%20putih.svg')}
                                alt="Pertamina Patra Niaga"
                                className="h-12 w-auto object-contain"
                            />
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm font-extrabold text-white tracking-wide uppercase">
                                Portal UMKM Binaan CSR
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
                                &ldquo;Platform resmi program pemberdayaan dan pemasaran produk kelompok usaha lokal binaan CSR Pertamina Patra Niaga Unit Dumai melalui literasi digital, penguatan branding, dan perluasan akses pasar&rdquo;
                            </p>
                        </div>

                        <div className="pt-2">
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 border border-slate-700 px-3 py-1 text-xs text-slate-300">
                                <Award className="w-3.5 h-3.5 text-pertamina-green" />
                                <span>Mitra CSR: Fuel Terminal Dumai / Unit Dumai</span>
                            </div>
                        </div>
                    </div>

                    {/* Kolom 2: Navigasi Cepat */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                            Navigasi Portal
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-400">
                            <li>
                                <Link href="/katalog" className="hover:text-white transition-colors">
                                    Katalog Produk Binaan
                                </Link>
                            </li>
                            <li>
                                <Link href="/direktori" className="hover:text-white transition-colors">
                                    Direktori Kelompok UMKM
                                </Link>
                            </li>
                            <li>
                                <Link href="/program-csr" className="hover:text-white transition-colors">
                                    Program Pemberdayaan CSR
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="hover:text-pertamina-green transition-colors">
                                    Panel Pengelola / Admin
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Kolom 3: Kontak & Lokasi */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                            Unit Kerja
                        </h4>
                        <ul className="space-y-2.5 text-xs text-slate-400">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-pertamina-red flex-shrink-0 mt-0.5" />
                                <span>Fuel Terminal Dumai, Kota Dumai, Riau 28814</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-pertamina-green flex-shrink-0" />
                                <span>Kontak Binaan CSR Dumai</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-pertamina-green flex-shrink-0" />
                                <span>csr.patraniaga.dumai@pertamina.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Sub-Footer & Signature Credit Khusus */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                    <div>
                        © {new Date().getFullYear()} Portal UMKM Binaan CSR Pertamina Patra Niaga Unit Dumai. Seluruh hak cipta dilindungi.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function PublicLayout({ title, activeMenu = 'home', transparentNav = false, children }) {
    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
            <Head title={title ? `${title} — UMKM Binaan CSR Pertamina Dumai` : 'Portal UMKM Binaan CSR Pertamina Patra Niaga Unit Dumai'} />

            {/* Top Navbar */}
            <NavbarContent activeMenu={activeMenu} transparentNav={transparentNav} />

            {/* Main Content — pt-20 hanya saat navbar fixed (transparentNav=true) */}
            <main className={`flex-1 ${transparentNav ? 'pt-0' : ''}`}>{children}</main>

            {/* Slide-over Cart Drawer */}
            <CartDrawer />

            {/* Corporate Footer */}
            <Footer />
        </div>
    );
}
