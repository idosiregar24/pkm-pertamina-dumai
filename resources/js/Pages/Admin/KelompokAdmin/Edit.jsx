import { Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ChevronLeft, KeyRound } from 'lucide-react';

const fieldBase = 'w-full px-3.5 py-2.5 rounded-xl border text-sm bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all focus:bg-white';
const fieldNormal = `${fieldBase} border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-300`;
const fieldError = `${fieldBase} border-red-300 ring-1 ring-red-100`;

export default function KelompokAdminEdit({ admin, umkms }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PATCH',
        name: admin?.name ?? '',
        email: admin?.email ?? '',
        password: '',
        umkm_id: admin?.umkm_id ? String(admin.umkm_id) : '',
        is_active: admin?.is_active ? true : false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.kelompok-admin.update', admin.id));
    };

    if (!admin) {
        return (
            <AdminLayout title="Edit Admin Kelompok" activeNav="kelompok-admin">
                <div className="flex items-center justify-center py-24">
                    <p className="text-sm text-slate-400">Data akun tidak ditemukan.</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Edit Admin Kelompok" activeNav="kelompok-admin">

            <div className="flex items-center gap-3 mb-6">
                <Link
                    href={route('admin.kelompok-admin.index')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                    <ChevronLeft className="w-3.5 h-3.5" /> Kembali
                </Link>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Edit Akun Admin Kelompok</h1>
            </div>

            <form onSubmit={submit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2 space-y-5">
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-700 mb-4 pb-3 border-b border-slate-100">
                                Kredensial Akun
                            </h3>

                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                                    Kelompok UMKM yang Dikelola <span className="text-slate-800">*</span>
                                </label>
                                <select value={data.umkm_id} onChange={(e) => setData('umkm_id', e.target.value)}
                                    className={errors.umkm_id ? fieldError : fieldNormal}>
                                    <option value="">— Pilih UMKM —</option>
                                    {(umkms ?? []).map((u) => (
                                        <option key={u.id} value={String(u.id)}>{u.name} ({u.district})</option>
                                    ))}
                                </select>
                                {errors.umkm_id && <p className="mt-1 text-xs text-slate-600">{errors.umkm_id}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                                    Nama Penanggung Jawab <span className="text-slate-800">*</span>
                                </label>
                                <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)}
                                    className={errors.name ? fieldError : fieldNormal} />
                                {errors.name && <p className="mt-1 text-xs text-slate-600">{errors.name}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                                    Email <span className="text-slate-800">*</span>
                                </label>
                                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)}
                                    className={errors.email ? fieldError : fieldNormal} />
                                {errors.email && <p className="mt-1 text-xs text-slate-600">{errors.email}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                                    Ganti Password
                                </label>
                                <input type="text" value={data.password} onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Kosongkan jika tidak ingin mengganti" className={errors.password ? fieldError : fieldNormal} />
                                {errors.password && <p className="mt-1 text-xs text-slate-600">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                    Status Akun
                                </label>
                                <button type="button" role="switch" aria-checked={data.is_active}
                                    onClick={() => setData('is_active', !data.is_active)}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all w-full text-left ${
                                        data.is_active
                                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    <span className={`relative w-9 h-5 rounded-full flex-shrink-0 transition-colors ${data.is_active ? 'bg-[#00A651]' : 'bg-slate-300'}`}>
                                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${data.is_active ? 'translate-x-4' : 'translate-x-0.5'}`} />
                                    </span>
                                    {data.is_active ? 'Aktif — dapat login ke Admin Panel' : 'Nonaktif — akun tidak bisa login'}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <Link href={route('admin.kelompok-admin.index')}
                                className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                                Batal
                            </Link>
                            <button type="submit" disabled={processing}
                                className="px-7 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                            <div className="flex items-center gap-1.5 mb-2">
                                <KeyRound className="w-4 h-4 text-[#005BAC]" />
                                <p className="text-xs font-bold text-[#005BAC]">Isolasi Data Otomatis</p>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                                Mengganti kelompok UMKM di sini memindahkan akses akun ini sepenuhnya ke kelompok baru — akses ke data kelompok lama otomatis hilang.
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
