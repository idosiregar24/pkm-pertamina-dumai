import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Pencil, Trash2, Search, ShieldCheck, ShieldOff } from 'lucide-react';

function ConfirmModal({ admin, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                    <Trash2 className="w-5 h-5 text-slate-500" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">Hapus Akun Admin Kelompok?</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                    Akun <strong className="text-slate-700">"{admin?.name}"</strong> ({admin?.email}) akan dihapus permanen dan tidak bisa login lagi.
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

export default function KelompokAdminIndex({ admins }) {
    const [search, setSearch] = useState('');
    const [deleteTarget, setDeleteTarget] = useState(null);

    const filtered = (admins ?? []).filter((a) =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase()) ||
        (a.umkm?.name ?? '').toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = () => {
        if (!deleteTarget) return;
        router.delete(route('admin.kelompok-admin.destroy', deleteTarget.id), {
            onSuccess: () => setDeleteTarget(null),
        });
    };

    return (
        <AdminLayout title="Akun Admin Kelompok" activeNav="kelompok-admin">

            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-5 flex-wrap">
                <div>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Akun Admin Kelompok</h1>
                    <p className="text-sm text-slate-400 mt-0.5">
                        {admins?.length ?? 0} akun terdaftar — setiap akun hanya bisa mengelola data kelompoknya sendiri
                    </p>
                </div>
                <Link
                    href={route('admin.kelompok-admin.create')}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                >
                    <Plus className="w-3.5 h-3.5" /> Daftarkan Akun Baru
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 flex-wrap">
                    <div className="relative flex-1 min-w-[200px] max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Cari nama, email, kelompok..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 outline-none focus:border-slate-400 focus:bg-white transition-all"
                        />
                    </div>
                    <span className="text-xs text-slate-400 ml-auto">
                        {filtered.length} dari {admins?.length ?? 0} akun
                    </span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                {['Admin Kelompok', 'Kelompok UMKM', 'Status', 'Aksi'].map((h) => (
                                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-16 text-center text-sm text-slate-400">
                                        {search ? `Tidak ada hasil untuk "${search}"` : 'Belum ada akun Admin Kelompok'}
                                    </td>
                                </tr>
                            ) : filtered.map((a) => (
                                <tr key={a.id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-[#005BAC] flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs font-bold text-white">{a.name.charAt(0).toUpperCase()}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800 max-w-[200px] truncate">{a.name}</p>
                                                <p className="text-[11px] text-slate-400 mt-0.5">{a.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-xs font-semibold text-slate-700">{a.umkm?.name ?? '—'}</span>
                                        <p className="text-[11px] text-slate-400">{a.umkm?.district}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        {a.is_active ? (
                                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00A651] bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                                                <ShieldCheck className="w-3 h-3" /> Aktif
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                                                <ShieldOff className="w-3 h-3" /> Nonaktif
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5">
                                            <Link
                                                href={route('admin.kelompok-admin.edit', a.id)}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </Link>
                                            <button
                                                onClick={() => setDeleteTarget(a)}
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
                    admin={deleteTarget}
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </AdminLayout>
    );
}
