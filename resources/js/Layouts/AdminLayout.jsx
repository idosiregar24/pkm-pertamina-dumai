import { useState, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import {
    LayoutDashboard, Package, Store,
    LogOut, Menu, X, ChevronRight, ExternalLink
} from 'lucide-react';
import { getAssetUrl } from '@/Utils/phone';

const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, id: 'dashboard' },
    { label: 'Produk', href: '/admin/produk', icon: Package, id: 'produk' },
    { label: 'UMKM Mitra', href: '/admin/umkm', icon: Store, id: 'umkm' },
];

export default function AdminLayout({ title, activeNav = 'dashboard', children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth } = usePage().props;
    const logoSrc = getAssetUrl('/asset/logo/logo-pertamina-patra-niaga.png');

    return (
        <>
            <Head title={title ? `${title} — Admin CSR Pertamina Dumai` : 'Panel Admin — CSR Pertamina Dumai'} />

            <div className="min-h-screen bg-slate-100 flex">

                {/* Mobile overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/30 z-40 lg:hidden"
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

                    {/* Pertamina red top stripe */}
                    <div className="h-0.5 bg-[#ED1C24] flex-shrink-0" />

                    {/* Brand — hanya logo Pertamina */}
                    <div className="px-5 py-4 border-b border-slate-100 flex-shrink-0">
                        <img
                            src={logoSrc}
                            alt="Pertamina Patra Niaga"
                            className="h-9 w-auto object-contain"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <p className="text-[10px] text-slate-400 font-medium mt-1.5">
                            Panel Admin · Program CSR
                        </p>
                    </div>

                    {/* User info */}
                    {auth?.user && (
                        <div className="mx-4 mt-3 mb-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5 flex-shrink-0">
                            <div className="w-7 h-7 rounded-full bg-[#ED1C24] flex items-center justify-center flex-shrink-0">
                                <span className="text-[11px] font-bold text-white">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-800 truncate">{auth.user.name}</p>
                                <p className="text-[10px] text-slate-400">Administrator</p>
                            </div>
                        </div>
                    )}

                    {/* Nav links */}
                    <nav className="flex-1 px-3 py-3 overflow-y-auto">
                        <p className="px-2 pt-1 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Menu
                        </p>
                        {navItems.map((item) => {
                            const active = activeNav === item.id;
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                                        flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-0.5
                                        text-sm font-semibold transition-all duration-150
                                        ${active
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

                    {/* Footer actions */}
                    <div className="px-3 pb-4 border-t border-slate-100 pt-3 flex-shrink-0 space-y-0.5">
                        <a
                            href="/"
                            target="_blank"
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Portal Publik
                        </a>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-[#ED1C24] transition-all font-sans text-left"
                        >
                            <LogOut className="w-4 h-4" />
                            Keluar
                        </Link>
                    </div>
                </aside>

                {/* ── MAIN ── */}
                <div className="flex-1 flex flex-col min-h-screen lg:ml-60">

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
                                    <span className="text-slate-400">Admin</span>
                                    <span className="text-slate-300 mx-1.5">/</span>
                                    <span className="font-semibold text-slate-700">{title || 'Dashboard'}</span>
                                </div>
                            </div>

                            {auth?.user && (
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <div className="w-7 h-7 rounded-full bg-[#ED1C24] flex items-center justify-center">
                                        <span className="text-[11px] font-bold text-white">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="hidden sm:inline font-semibold text-slate-700">{auth.user.name}</span>
                                </div>
                            )}
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="flex-1 p-4 sm:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
