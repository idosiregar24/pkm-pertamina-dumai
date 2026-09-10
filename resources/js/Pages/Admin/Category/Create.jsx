import { Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ChevronLeft, Tag } from 'lucide-react';

const fieldBase = 'w-full px-3.5 py-2.5 rounded-xl border text-sm bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all focus:bg-white';
const fieldNormal = `${fieldBase} border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-300`;
const fieldError = `${fieldBase} border-red-300 ring-1 ring-red-100`;

export default function CategoryCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        icon_name: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.kategori.store'));
    };

    return (
        <AdminLayout title="Tambah Kategori" activeNav="kategori">

            <div className="flex items-center gap-3 mb-6">
                <Link
                    href={route('admin.kategori.index')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                    <ChevronLeft className="w-3.5 h-3.5" /> Kembali
                </Link>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Tambah Kategori Produk</h1>
            </div>

            <form onSubmit={submit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-2 space-y-5">
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-700 mb-4 pb-3 border-b border-slate-100">
                                Detail Kategori
                            </h3>

                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                                    Nama Kategori <span className="text-slate-800">*</span>
                                </label>
                                <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Contoh: Kerajinan & Kriya" className={errors.name ? fieldError : fieldNormal} />
                                {errors.name && <p className="mt-1 text-xs text-slate-600">{errors.name}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                                    Nama Icon (Lucide, opsional)
                                </label>
                                <input type="text" value={data.icon_name} onChange={(e) => setData('icon_name', e.target.value)}
                                    placeholder="Contoh: Utensils, ShoppingBag, Sparkles" className={errors.icon_name ? fieldError : fieldNormal} />
                                {errors.icon_name && <p className="mt-1 text-xs text-slate-600">{errors.icon_name}</p>}
                                <p className="mt-1.5 text-[11px] text-slate-400">
                                    Cari nama komponen di <span className="font-mono">lucide.dev/icons</span> — opsional, hanya untuk tampilan.
                                </p>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                                    Deskripsi
                                </label>
                                <textarea rows={3} value={data.description} onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Deskripsi singkat kategori ini (opsional)"
                                    className={`${fieldNormal} resize-y`} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <Link href={route('admin.kategori.index')}
                                className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                                Batal
                            </Link>
                            <button type="submit" disabled={processing}
                                className="px-7 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                {processing ? 'Menyimpan...' : 'Simpan Kategori'}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                            <div className="flex items-center gap-1.5 mb-2">
                                <Tag className="w-4 h-4 text-[#005BAC]" />
                                <p className="text-xs font-bold text-[#005BAC]">Langsung Tersedia</p>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                                Kategori baru langsung muncul sebagai pilihan di form Tambah/Edit Produk (untuk Admin CSR maupun Admin Kelompok),
                                dan otomatis jadi filter baru di halaman Katalog publik begitu ada produk yang memakainya.
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
