import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import {
    LayoutDashboard, Package, Store, Users, Tag,
    LogOut, Menu, X, ChevronRight, ExternalLink
} from 'lucide-react';
import FlashAlert from '@/Components/FlashAlert';

/**
 * Menu sidebar disesuaikan per-role (UI-level saja — otorisasi sesungguhnya
 * tetap ditegakkan server-side lewat middleware `role` & Policy). Admin CSR
 * melihat seluruh menu; Admin Kelompok hanya melihat produk & profil miliknya.
 */
function buildNavItems(user) {
    if (!user) return [];

    const isAdminCsr = user.role === 'admin_csr';

    const items = [
        { label: 'Dashboard', routeName: 'admin.dashboard', icon: LayoutDashboard, id: 'dashboard' },
        { label: 'Produk',    routeName: 'admin.produk.index', icon: Package,      id: 'produk'    },
    ];

    if (isAdminCsr) {
        items.push(
            { label: 'UMKM Mitra',        routeName: 'admin.umkm.index',           icon: Store, id: 'umkm' },
            { label: 'Kategori',          routeName: 'admin.kategori.index',       icon: Tag,   id: 'kategori' },
            { label: 'Akun Admin Kelompok', routeName: 'admin.kelompok-admin.index', icon: Users, id: 'kelompok-admin' },
        );
    } else if (user.umkm_id) {
        // Admin Kelompok tidak punya listing UMKM — langsung ke edit profilnya sendiri.
        items.push({
            label: 'Profil Kelompok Saya',
            href: route('admin.umkm.edit', user.umkm_id),
            icon: Store,
            id: 'umkm',
        });
    }

    return items;
}

export default function AdminLayout({ title, activeNav = 'dashboard', children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage().props;
    const navItems = buildNavItems(auth?.user);

    // Resolve logo path — handle Laragon subfolder and direct domain
    const logoPath = (() => {
        if (typeof window === 'undefined') return '/asset/logo/logo-pertamina-patra-niaga.png';
        const base = window.location.pathname.includes('/pkm-pertamina-dumai/public')
            ? '/pkm-pertamina-dumai/public'
            : '';
        return `${base}/asset/logo/logo-pertamina-patra-niaga.png`;
    })();

    return (
        <>
            <Head title={title
                ? `${title} — Admin CSR Pertamina Dumai`
                : 'Panel Admin — CSR Pertamina Dumai'
            } />

            <FlashAlert />

            <div className="min-h-screen bg-slate-100 flex">

                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/25 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* ── SIDEBAR ── */}
                <aside className={`
                    fixed top-0 left-0 bottom-0 w-60 z-50 flex flex-col
                    bg-white border-r border-slate-200
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
                `}>

                    {/* Pertamina red stripe — identitas brand */}
                    <div className="h-1 bg-[#ED1C24] flex-shrink-0" />

                    {/* Brand area — Logo Pertamina */}
                    <div className="px-5 py-4 border-b border-slate-100 flex-shrink-0">
                        <img
                            src={logoPath}
                            alt="Pertamina Patra Niaga"
                            className="h-9 w-auto object-contain object-left"
                            onError={(e) => {
                                // Fallback teks jika logo gagal load
                                e.target.style.display = 'none';
                                const fallback = document.createElement('div');
                                fallback.className = 'flex items-center gap-2';
                                fallback.innerHTML = `
                                    <div style="width:32px;height:32px;background:#ED1C24;border-radius:6px;display:flex;align-items:center;justify-content:center">
                                        <span style="color:white;font-weight:900;font-size:14px">P</span>
                                    </div>
                                    <div>
                                        <div style="font-size:12px;font-weight:800;color:#0f172a;line-height:1.1">PERTAMINA</div>
                                        <div style="font-size:9px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em">Patra Niaga</div>
                                    </div>`;
                                e.target.parentNode.insertBefore(fallback, e.target.nextSibling);
                            }}
                        />
                        <p className="text-[10px] text-slate-400 mt-2 font-medium tracking-wide">
                            Panel Admin · Program CSR
                        </p>
                    </div>

                    {/* User info */}
                    {auth?.user && (
                        <div className="mx-4 mt-3 mb-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5 flex-shrink-0">
                            {/* Avatar merah = identitas Pertamina, bukan alert */}
                            <div className="w-7 h-7 rounded-full bg-[#ED1C24] flex items-center justify-center flex-shrink-0">
                                <span className="text-[11px] font-bold text-white">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-800 truncate">{auth.user.name}</p>
                                <p className="text-[10px] text-slate-400">
                                    {auth.user.role === 'admin_csr' ? 'Admin CSR · Super Admin' : 'Admin Kelompok UMKM'}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Nav links */}
                    <nav className="flex-1 px-3 py-3 overflow-y-auto">
                        <p className="px-2 pt-1 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Menu Utama
                        </p>
                        {navItems.map((item) => {
                            const active = activeNav === item.id;
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href ?? route(item.routeName)}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                                        flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-0.5
                                        text-sm font-semibold transition-all duration-150
                                        ${active
                                            /* Aktif = merah Pertamina — branding, bukan warning */
                                            ? 'bg-[#ED1C24] text-white shadow-sm'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                        }
                                    `}
                                >
                                    <item.icon className="w-4 h-4 flex-shrink-0" />
                                    {item.label}
                                    {active && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-60" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="px-3 pb-4 border-t border-slate-100 pt-3 flex-shrink-0 space-y-0.5">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Lihat Portal Publik
                        </a>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all text-left"
                        >
                            <LogOut className="w-4 h-4" />
                            Keluar
                        </Link>
                    </div>
                </aside>

                {/* ── MAIN CONTENT ── */}
                {/* min-w-0 wajib: tanpa ini, flex item ini tidak bisa menyusut di
                    bawah lebar konten intrinsiknya (mis. tabel admin ber-min-w-[700px]),
                    sehingga seluruh halaman ikut melebar dan discroll horizontal
                    di layar sempit alih-alih hanya tabelnya (yang sudah overflow-x-auto). */}
                <div className="flex-1 flex flex-col min-w-0 min-h-screen lg:ml-60">

                    {/* Top bar */}
                    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
                        <div className="flex items-center justify-between h-14 px-4 sm:px-6">

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
                                    aria-label="Toggle sidebar"
                                >
                                    {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                                </button>
                                <div className="text-sm">
                                    <span className="text-slate-400 text-xs">Admin</span>
                                    <span className="text-slate-300 mx-1.5">/</span>
                                    <span className="font-semibold text-slate-700">{title || 'Dashboard'}</span>
                                </div>
                            </div>

                            {auth?.user && (
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-[#ED1C24] flex items-center justify-center">
                                        <span className="text-[11px] font-bold text-white">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="hidden sm:inline text-sm font-semibold text-slate-700">
                                        {auth.user.name}
                                    </span>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 min-w-0 p-4 sm:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
