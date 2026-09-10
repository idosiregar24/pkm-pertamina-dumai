import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Pencil, Trash2, Search, MapPin, Users } from 'lucide-react';

function ConfirmModal({ umkm, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full border border-slate-200">
                <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                    <Trash2 className="w-5 h-5 text-[#ED1C24]" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">Hapus Data UMKM?</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                    Data UMKM <strong className="text-slate-700">"{umkm?.name}"</strong> beserta seluruh produk terkait akan dihapus secara permanen.
                </p>
                <div className="flex gap-2.5 justify-end">
                    <button onClick={onCancel} className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                        Batal
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-[#ED1C24] hover:bg-[#c9141b] text-white text-sm font-bold transition-colors shadow-sm">
                        Ya, Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function UmkmIndex({ umkms }) {
    const [search, setSearch] = useState('');
    const [deleteTarget, setDeleteTarget] = useState(null);
    const { flash } = usePage().props;

    const filtered = umkms.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.owner_name.toLowerCase().includes(search.toLowerCase()) ||
        u.district.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = () => {
        if (!deleteTarget) return;
        router.delete(route('admin.umkm.destroy', deleteTarget.id), {
            onSuccess: () => setDeleteTarget(null),
        });
    };

    return (
        <AdminLayout title="Manajemen UMKM" activeNav="umkm">
            {flash?.success && (
                <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold rounded-xl px-4 py-3">
                    <span className="w-2 h-2 rounded-full bg-[#00A651]" />
                    {flash.success}
                </div>
            )}

            <div className="flex items-start justify-between gap-3 mb-5 flex-wrap">
                <div>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Manajemen UMKM</h1>
                    <p className="text-sm text-slate-400 mt-0.5">{umkms.length} mitra UMKM binaan dalam program CSR</p>
                </div>
                <Link
                    href="/admin/umkm/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#005BAC] hover:bg-[#004994] active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all"
                >
                    <Plus className="w-3.5 h-3.5" /> Tambah UMKM
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 flex-wrap">
                    <div className="relative flex-1 min-w-[180px] max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Cari nama, pemilik, kecamatan..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:border-[#005BAC] focus:ring-2 focus:ring-[#005BAC]/10 focus:bg-white transition-all"
                        />
                    </div>
                    <span className="text-xs text-slate-400 font-medium ml-auto">
                        {filtered.length} dari {umkms.length} UMKM
                    </span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                {['UMKM', 'Kecamatan', 'Anggota', 'Produk', 'Binaan Sejak', 'Sertifikasi', 'Aksi'].map((h) => (
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
                                        {search ? `Tidak ada hasil untuk "${search}"` : 'Belum ada data UMKM'}
                                    </td>
                                </tr>
                            ) : filtered.map((u) => (
                                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#005BAC] to-[#003f7a] flex items-center justify-center flex-shrink-0">
                                                <span className="text-sm font-extrabold text-white">{u.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800 max-w-[180px] truncate">{u.name}</p>
                                                <p className="text-[11px] text-slate-400 mt-0.5">{u.owner_name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#005BAC] bg-[#005BAC]/8 border border-[#005BAC]/15 px-2 py-0.5 rounded-full whitespace-nowrap">
                                            <MapPin className="w-2.5 h-2.5" /> {u.district}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="flex items-center gap-1 text-xs font-bold text-slate-700">
                                            <Users className="w-3 h-3 text-slate-400" /> {u.members_count}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm font-bold text-slate-800">
                                        {u.products_count ?? 0}
                                        <span className="text-[11px] font-normal text-slate-400 ml-1">produk</span>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-500">{u.csr_batch_year || '—'}</td>
                                    <td className="px-4 py-3">
                                        <span className="text-[11px] text-slate-500 block max-w-[150px] truncate" title={u.certification}>
                                            {u.certification || '—'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5">
                                            <Link
                                                href={`/admin/umkm/${u.id}/edit`}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-[#005BAC]/10 text-slate-500 hover:text-[#005BAC] transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </Link>
                                            <button
                                                onClick={() => setDeleteTarget(u)}
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
                    umkm={deleteTarget}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </AdminLayout>
    );
}
