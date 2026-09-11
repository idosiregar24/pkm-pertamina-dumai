import { Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLightbox } from '@/Contexts/LightboxContext';
import { Package, Store, Star, TrendingUp, Plus, ArrowRight, Pencil } from 'lucide-react';

function formatRupiah(n) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
}

export default function AdminDashboard({ stats, recent_products, recent_umkms }) {
    const { auth } = usePage().props;
    const { openLightbox } = useLightbox();
    const isAdminCsr = auth?.user?.role === 'admin_csr';
    // Admin Kelompok tidak punya listing /admin/umkm (khusus CSR) — kartu "Mitra UMKM"
    // untuk mereka mengarah ke halaman edit profil kelompoknya sendiri.
    const umkmHref = isAdminCsr ? route('admin.umkm.index') : route('admin.umkm.edit', auth.user.umkm_id);

    const statCards = [
        {
            label: 'Total Produk',
            value: stats.total_products,
            icon: Package,
            iconClass: 'text-slate-600',
            bg: 'bg-slate-100 border-slate-200',
            href: route('admin.produk.index'),
        },
        {
            label: isAdminCsr ? 'Mitra UMKM' : 'Profil Kelompok',
            value: isAdminCsr ? stats.total_umkms : 'Kelola',
            icon: Store,
            iconClass: 'text-slate-600',
            bg: 'bg-slate-100 border-slate-200',
            href: umkmHref,
        },
        {
            label: 'Produk Unggulan',
            value: stats.featured_count,
            icon: Star,
            iconClass: 'text-amber-500',
            bg: 'bg-amber-50 border-amber-100',
            href: route('admin.produk.index'),
        },
        {
            label: 'Total Terjual',
            value: `${Number(stats.total_sold).toLocaleString('id-ID')}`,
            icon: TrendingUp,
            iconClass: 'text-emerald-600',
            bg: 'bg-emerald-50 border-emerald-100',
            href: route('admin.produk.index'),
        },
    ];

    return (
        <AdminLayout title="Dashboard" activeNav="dashboard">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
                <p className="text-sm text-slate-500 mt-1">
                    {isAdminCsr
                        ? 'Kelola seluruh data produk dan UMKM binaan CSR Pertamina Patra Niaga Unit Dumai.'
                        : 'Kelola produk dan profil kelompok UMKM Anda.'}
                </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2.5 mb-6">
                <Link
                    href={route('admin.produk.create')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                >
                    <Plus className="w-3.5 h-3.5" /> Tambah Produk
                </Link>
                {isAdminCsr ? (
                    <Link
                        href={route('admin.umkm.create')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl shadow-sm transition-all"
                    >
                        <Plus className="w-3.5 h-3.5" /> Tambah UMKM
                    </Link>
                ) : (
                    <Link
                        href={umkmHref}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl shadow-sm transition-all"
                    >
                        <Pencil className="w-3.5 h-3.5" /> Edit Profil Kelompok
                    </Link>
                )}
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
                {statCards.map((s) => (
                    <Link
                        key={s.label}
                        href={s.href}
                        className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 block"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${s.bg}`}>
                                <s.icon className={`w-4 h-4 ${s.iconClass}`} />
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                        </div>
                        <p className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">
                            {s.value}
                        </p>
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{s.label}</p>
                    </Link>
                ))}
            </div>

            {/* Lower Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

                {/* Recent Products — melebar penuh untuk Admin Kelompok karena panel UMKM disembunyikan */}
                <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${isAdminCsr ? '' : 'xl:col-span-2'}`}>
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
                        <h3 className="text-sm font-bold text-slate-800">Produk Terbaru</h3>
                        <Link
                            href={route('admin.produk.index')}
                            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                        >
                            Lihat semua <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {(recent_products ?? []).map((p) => (
                            <div key={p.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/60 transition-colors">
                                <div className="w-11 h-11 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden">
                                    {p.image_url ? (
                                        <img
                                            src={p.image_url}
                                            alt={p.name}
                                            onClick={() => openLightbox(p.image_url, p.name)}
                                            className="w-full h-full object-cover cursor-zoom-in"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    ) : null}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-slate-800 truncate">{p.name}</p>
                                    <p className="text-[11px] text-slate-400 mt-0.5">{p.umkm?.name}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-xs font-bold text-slate-700">{formatRupiah(p.price)}</p>
                                    {p.is_featured && (
                                        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-full mt-0.5">
                                            <Star className="w-2.5 h-2.5 fill-amber-500" /> Unggulan
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="px-5 py-3 border-t border-slate-100">
                        <Link
                            href={route('admin.produk.index')}
                            className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-1"
                        >
                            Kelola semua produk <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>

                {/* Recent UMKMs — khusus Admin CSR, Admin Kelompok sudah punya "Profil Kelompok" di quick actions */}
                {isAdminCsr && (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
                            <h3 className="text-sm font-bold text-slate-800">Mitra UMKM Binaan</h3>
                            <Link
                                href={route('admin.umkm.index')}
                                className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                            >
                                Lihat semua <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>

                        <div className="divide-y divide-slate-50">
                            {(recent_umkms ?? []).map((u) => (
                                <div key={u.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/60 transition-colors">
                                    <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-bold text-slate-600">{u.name.charAt(0)}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-slate-800 truncate">{u.name}</p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">{u.district} · {u.members_count} anggota</p>
                                    </div>
                                    <Link
                                        href={route('admin.umkm.edit', u.id)}
                                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex-shrink-0"
                                        title="Edit UMKM"
                                    >
                                        <Pencil className="w-3 h-3" />
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="px-5 py-3 border-t border-slate-100">
                            <Link
                                href={route('admin.umkm.index')}
                                className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-1"
                            >
                                Kelola semua UMKM <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
