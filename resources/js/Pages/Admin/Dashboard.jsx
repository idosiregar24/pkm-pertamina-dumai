import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Package, Store, Star, TrendingUp, Plus, ArrowRight, Pencil } from 'lucide-react';

function formatRupiah(n) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
}

export default function AdminDashboard({ stats, recent_products, recent_umkms }) {
    const statCards = [
        { label: 'Total Produk', value: stats.total_products, icon: Package, color: 'text-[#ED1C24]', bg: 'bg-[#ED1C24]/10 border-[#ED1C24]/15', href: '/admin/produk' },
        { label: 'Mitra UMKM', value: stats.total_umkms, icon: Store, color: 'text-[#005BAC]', bg: 'bg-[#005BAC]/10 border-[#005BAC]/15', href: '/admin/umkm' },
        { label: 'Produk Unggulan', value: stats.featured_count, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100', href: '/admin/produk' },
        { label: 'Total Terjual', value: `${Number(stats.total_sold).toLocaleString('id-ID')} item`, icon: TrendingUp, color: 'text-[#00A651]', bg: 'bg-[#00A651]/10 border-[#00A651]/15', href: '/admin/produk' },
    ];

    return (
        <AdminLayout title="Dashboard" activeNav="dashboard">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
                <p className="text-sm text-slate-500 mt-1">
                    Selamat datang — kelola seluruh data produk dan UMKM binaan CSR Pertamina Patra Niaga Unit Dumai.
                </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2.5 mb-6">
                <Link
                    href="/admin/produk/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#ED1C24] hover:bg-[#c9141b] active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all"
                >
                    <Plus className="w-3.5 h-3.5" /> Tambah Produk
                </Link>
                <Link
                    href="/admin/umkm/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#005BAC] hover:bg-[#004994] active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all"
                >
                    <Plus className="w-3.5 h-3.5" /> Tambah UMKM
                </Link>
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
                                <s.icon className={`w-4 h-4 ${s.color}`} />
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

                {/* Recent Products */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
                        <h3 className="text-sm font-bold text-slate-800">Produk Terbaru</h3>
                        <Link href="/admin/produk" className="flex items-center gap-1 text-xs font-semibold text-[#ED1C24] hover:text-[#c9141b] transition-colors">
                            Lihat semua <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {recent_products.map((p) => (
                            <div key={p.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/60 transition-colors">
                                <img
                                    src={p.image_url || 'https://via.placeholder.com/44'}
                                    alt={p.name}
                                    className="w-11 h-11 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/44'; }}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-slate-800 truncate">{p.name}</p>
                                    <p className="text-[11px] text-slate-400 mt-0.5">{p.umkm?.name}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-xs font-extrabold text-[#ED1C24]">{formatRupiah(p.price)}</p>
                                    {p.is_featured && (
                                        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-full mt-0.5">
                                            <Star className="w-2.5 h-2.5 fill-amber-500" /> Unggulan
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="px-5 py-3 border-t border-slate-100">
                        <Link href="/admin/produk" className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#ED1C24] hover:text-[#c9141b] transition-colors py-1">
                            Kelola semua produk <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>

                {/* Recent UMKMs */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
                        <h3 className="text-sm font-bold text-slate-800">Mitra UMKM Binaan</h3>
                        <Link href="/admin/umkm" className="flex items-center gap-1 text-xs font-semibold text-[#005BAC] hover:text-[#004994] transition-colors">
                            Lihat semua <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {recent_umkms.map((u) => (
                            <div key={u.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/60 transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#005BAC] to-[#003f7a] flex items-center justify-center flex-shrink-0">
                                    <span className="text-sm font-extrabold text-white">{u.name.charAt(0)}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-slate-800 truncate">{u.name}</p>
                                    <p className="text-[11px] text-slate-400 mt-0.5">{u.district} · {u.members_count} anggota</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 border border-blue-100 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#005BAC] animate-pulse" />
                                        <span className="text-[10px] font-bold text-[#005BAC]">CSR</span>
                                    </div>
                                    <Link
                                        href={`/admin/umkm/${u.id}/edit`}
                                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                                    >
                                        <Pencil className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="px-5 py-3 border-t border-slate-100">
                        <Link href="/admin/umkm" className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#005BAC] hover:text-[#004994] transition-colors py-1">
                            Kelola semua UMKM <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
