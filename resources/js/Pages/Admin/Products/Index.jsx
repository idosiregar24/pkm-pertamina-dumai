import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLightbox } from '@/Contexts/LightboxContext';
import { Plus, Pencil, Trash2, Star, Search } from 'lucide-react';

function formatRupiah(n) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(n);
}

function ConfirmModal({ product, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                    <Trash2 className="w-5 h-5 text-slate-500" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">Hapus Produk?</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                    Produk <strong className="text-slate-700">"{product?.name}"</strong> akan dihapus permanen.
                </p>
                <div className="flex gap-2.5 justify-end">
                    <button onClick={onCancel}
                        className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
                        Batal
                    </button>
                    <button onClick={onConfirm}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-colors">
                        Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ProductsIndex({ products }) {
    const { openLightbox } = useLightbox();
    const [search, setSearch] = useState('');
    const [deleteTarget, setDeleteTarget] = useState(null);

    const filtered = (products ?? []).filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.umkm?.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = () => {
        if (!deleteTarget) return;
        router.delete(route('admin.produk.destroy', deleteTarget.id), {
            onSuccess: () => setDeleteTarget(null),
        });
    };

    return (
        <AdminLayout title="Produk" activeNav="produk">

            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-5 flex-wrap">
                <div>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Manajemen Produk</h1>
                    <p className="text-sm text-slate-400 mt-0.5">{products?.length ?? 0} produk terdaftar</p>
                </div>
                <Link
                    href={route('admin.produk.create')}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                >
                    <Plus className="w-3.5 h-3.5" /> Tambah Produk
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 flex-wrap">
                    <div className="relative flex-1 min-w-[200px] max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Cari produk, UMKM, kategori..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 outline-none focus:border-slate-400 focus:bg-white transition-all"
                        />
                    </div>
                    <span className="text-xs text-slate-400 ml-auto">
                        {filtered.length} dari {products?.length ?? 0} produk
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
                                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-11 h-11 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden">
                                                <img
                                                    src={p.image_url || ''}
                                                    alt={p.name}
                                                    onClick={() => p.image_url && openLightbox(p.image_url, p.name)}
                                                    className="w-full h-full object-cover cursor-zoom-in"
                                                    onError={(e) => {
                                                        e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-300"><svg xmlns=\'http://www.w3.org/2000/svg\' width=\'18\' height=\'18\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'1.5\'><rect x=\'3\' y=\'3\' width=\'18\' height=\'18\' rx=\'2\'/><circle cx=\'8.5\' cy=\'8.5\' r=\'1.5\'/><polyline points=\'21,15 16,10 5,21\'/></svg></div>';
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800 max-w-[180px] truncate">{p.name}</p>
                                                <p className="text-[11px] text-slate-400 mt-0.5">{p.umkm?.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{p.category}</td>
                                    <td className="px-4 py-3 text-sm font-bold text-slate-800 whitespace-nowrap">
                                        {formatRupiah(p.price)}
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-500">{p.unit}</td>
                                    <td className="px-4 py-3">
                                        <span className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                            {Number(p.rating).toFixed(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {p.is_featured ? (
                                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full whitespace-nowrap">
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
                                                href={route('admin.produk.edit', p.id)}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </Link>
                                            <button
                                                onClick={() => setDeleteTarget(p)}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
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
