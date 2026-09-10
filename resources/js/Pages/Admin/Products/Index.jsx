import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Pencil, Trash2, Star, Search } from 'lucide-react';

function formatRupiah(n) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
}

function ConfirmModal({ product, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full border border-slate-200">
                <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                    <Trash2 className="w-5 h-5 text-[#ED1C24]" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Hapus Produk?</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                    Produk <strong className="text-slate-700">"{product?.name}"</strong> akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex gap-2.5 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-xl bg-[#ED1C24] hover:bg-[#c9141b] text-white text-sm font-bold transition-colors shadow-sm"
                    >
                        Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ProductsIndex({ products }) {
    const [search, setSearch] = useState('');
    const [deleteTarget, setDeleteTarget] = useState(null);
    const { flash } = usePage().props;

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.umkm?.name || '').toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = () => {
        if (!deleteTarget) return;
        router.delete(route('admin.produk.destroy', deleteTarget.id), {
            onSuccess: () => setDeleteTarget(null),
        });
    };

    return (
        <AdminLayout title="Manajemen Produk" activeNav="produk">
            {/* Flash */}
            {flash?.success && (
                <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-xl px-4 py-3">
                    <span className="w-2 h-2 rounded-full bg-[#00A651]" />
                    {flash.success}
                </div>
            )}

            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-5 flex-wrap">
                <div>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Manajemen Produk</h1>
                    <p className="text-sm text-slate-400 mt-0.5">{products.length} produk terdaftar dalam sistem</p>
                </div>
                <Link
                    href="/admin/produk/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#ED1C24] hover:bg-[#c9141b] active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all"
                >
                    <Plus className="w-3.5 h-3.5" /> Tambah Produk
                </Link>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                {/* Toolbar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 flex-wrap">
                    <div className="relative flex-1 min-w-[180px] max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Cari produk, UMKM, kategori..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-[#005BAC] focus:ring-2 focus:ring-[#005BAC]/10 focus:bg-white transition-all"
                        />
                    </div>
                    <span className="text-xs text-slate-400 font-medium ml-auto">
                        {filtered.length} dari {products.length} produk
                    </span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                {['Produk', 'Kategori', 'Harga', 'Satuan', 'Rating', 'Status', 'Aksi'].map((h) => (
                                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-16 text-center text-sm text-slate-400">
                                        {search ? `Tidak ada hasil untuk "${search}"` : 'Belum ada produk'}
                                    </td>
                                </tr>
                            ) : filtered.map((p) => (
                                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={p.image_url || 'https://via.placeholder.com/44'}
                                                alt={p.name}
                                                className="w-11 h-11 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/44'; }}
                                            />
                                            <div>
                                                <p className="text-sm font-bold text-slate-800 max-w-[200px] truncate">{p.name}</p>
                                                <p className="text-[11px] text-slate-400 mt-0.5">{p.umkm?.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{p.category}</td>
                                    <td className="px-4 py-3 text-sm font-extrabold text-[#ED1C24] whitespace-nowrap">
                                        {formatRupiah(p.price)}
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-500">{p.unit}</td>
                                    <td className="px-4 py-3">
                                        <span className="flex items-center gap-1 text-xs font-bold text-slate-700">
                                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                            {Number(p.rating).toFixed(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {p.is_featured ? (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                                                <Star className="w-2.5 h-2.5 fill-amber-500" /> Unggulan
                                            </span>
                                        ) : (
                                            <span className="inline-flex text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                                Normal
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5">
                                            <Link
                                                href={`/admin/produk/${p.id}/edit`}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-[#005BAC]/10 text-slate-500 hover:text-[#005BAC] transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </Link>
                                            <button
                                                onClick={() => setDeleteTarget(p)}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-[#ED1C24] transition-colors"
                                                title="Hapus"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {deleteTarget && (
                <ConfirmModal
                    product={deleteTarget}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </AdminLayout>
    );
}
