import { useState, useRef } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLightbox } from '@/Contexts/LightboxContext';
import { ChevronLeft, Upload, X, MapPin } from 'lucide-react';

const DISTRICTS = [
    'Kec. Bukit Kapur', 'Kec. Medang Kampai', 'Kec. Dumai Barat',
    'Kec. Dumai Kota', 'Kec. Dumai Timur', 'Kec. Dumai Selatan', 'Kec. Sungai Sembilan',
];

export default function UmkmEdit({ umkm }) {
    const { auth } = usePage().props;
    const { openLightbox } = useLightbox();
    // Admin Kelompok tidak punya akses ke listing /admin/umkm (khusus Admin CSR) —
    // "kembali" untuk mereka mengarah ke Dashboard, bukan ke halaman yang akan 403.
    const backHref = auth?.user?.role === 'admin_csr' ? route('admin.umkm.index') : route('admin.dashboard');

    const [bannerPreview, setBannerPreview] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const bannerRef = useRef(null);
    const logoRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PATCH',
        name: umkm.name ?? '',
        owner_name: umkm.owner_name ?? '',
        district: umkm.district ?? '',
        phone: umkm.phone ?? '',
        established_year: umkm.established_year ?? '',
        csr_batch_year: umkm.csr_batch_year ?? '',
        shopee_shop_url: umkm.shopee_shop_url ?? '',
        certification: umkm.certification ?? '',
        members_count: umkm.members_count ?? '',
        description: umkm.description ?? '',
        banner: null,
        logo: null,
    });

    const handleFile = (field, previewSetter, file) => {
        if (!file) return;
        setData(field, file);
        const reader = new FileReader();
        reader.onload = (ev) => previewSetter(ev.target.result);
        reader.readAsDataURL(file);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.umkm.update', umkm.id), { forceFormData: true });
    };

    const currentBanner = bannerPreview || umkm.banner_url;
    const currentLogo = logoPreview || umkm.logo_url;

    return (
        <AdminLayout title="Edit UMKM" activeNav="umkm">
            <div className="mb-6 flex items-center gap-3">
                <Link
                    href={backHref}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" /> Kembali
                </Link>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {auth?.user?.role === 'admin_csr' ? 'Edit Data UMKM' : 'Profil Kelompok Saya'}
                </h1>
            </div>

            <form onSubmit={submit} encType="multipart/form-data">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* ── Left ── */}
                    <div className="lg:col-span-2 space-y-5">
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
                                Identitas Kelompok Usaha
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Nama UMKM *</label>
                                    <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)}
                                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-slate-50 text-slate-900 outline-none transition-all ${errors.name ? 'border-red-400' : 'border-slate-200 focus:border-[#9DC228] focus:ring-2 focus:ring-[#9DC228]/10 focus:bg-white'}`} />
                                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Nama Pemilik *</label>
                                        <input type="text" value={data.owner_name} onChange={(e) => setData('owner_name', e.target.value)}
                                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-slate-50 text-slate-900 outline-none transition-all ${errors.owner_name ? 'border-red-400' : 'border-slate-200 focus:border-[#9DC228] focus:ring-2 focus:ring-[#9DC228]/10 focus:bg-white'}`} />
                                        {errors.owner_name && <p className="mt-1 text-xs text-red-600">{errors.owner_name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">No. WhatsApp</label>
                                        <input type="text" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="08xxxxxxxxxx"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-900 outline-none focus:border-[#9DC228] focus:ring-2 focus:ring-[#9DC228]/10 focus:bg-white transition-all" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Kecamatan *</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                        <select value={data.district} onChange={(e) => setData('district', e.target.value)}
                                            className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm bg-slate-50 text-slate-900 outline-none transition-all ${errors.district ? 'border-red-400' : 'border-slate-200 focus:border-[#9DC228] focus:ring-2 focus:ring-[#9DC228]/10 focus:bg-white'}`}>
                                            <option value="">— Pilih Kecamatan —</option>
                                            {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                    </div>
                                    {errors.district && <p className="mt-1 text-xs text-red-600">{errors.district}</p>}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Tahun Berdiri</label>
                                        <input type="number" value={data.established_year} onChange={(e) => setData('established_year', e.target.value)} placeholder="2018"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-900 outline-none focus:border-[#9DC228] focus:ring-2 focus:ring-[#9DC228]/10 focus:bg-white transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Binaan CSR Sejak</label>
                                        <input type="number" value={data.csr_batch_year} onChange={(e) => setData('csr_batch_year', e.target.value)} placeholder="2021"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-900 outline-none focus:border-[#9DC228] focus:ring-2 focus:ring-[#9DC228]/10 focus:bg-white transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Jumlah Anggota</label>
                                        <input type="number" value={data.members_count} onChange={(e) => setData('members_count', e.target.value)} placeholder="24"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-900 outline-none focus:border-[#9DC228] focus:ring-2 focus:ring-[#9DC228]/10 focus:bg-white transition-all" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Sertifikasi & Legalitas</label>
                                    <input type="text" value={data.certification} onChange={(e) => setData('certification', e.target.value)} placeholder="P-IRT, Halal MUI, ..."
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-900 outline-none focus:border-[#9DC228] focus:ring-2 focus:ring-[#9DC228]/10 focus:bg-white transition-all" />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Link Toko Shopee</label>
                                    <input type="url" value={data.shopee_shop_url} onChange={(e) => setData('shopee_shop_url', e.target.value)} placeholder="https://shopee.co.id/..."
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-900 outline-none focus:border-[#9DC228] focus:ring-2 focus:ring-[#9DC228]/10 focus:bg-white transition-all" />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Deskripsi UMKM</label>
                                    <textarea rows={4} value={data.description} onChange={(e) => setData('description', e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-900 outline-none focus:border-[#9DC228] focus:ring-2 focus:ring-[#9DC228]/10 focus:bg-white transition-all resize-y" />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <Link href={backHref} className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                                Batal
                            </Link>
                            <button type="submit" disabled={processing}
                                className="px-6 py-2.5 rounded-xl bg-[#9DC228] hover:bg-[#7A9A1E] active:scale-[0.98] text-white font-bold text-sm shadow-sm hover:shadow transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                                {processing ? 'Menyimpan...' : 'Perbarui Data UMKM'}
                            </button>
                        </div>
                    </div>

                    {/* ── Right: Photos ── */}
                    <div className="space-y-4">
                        {/* Banner */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-800 mb-3">Foto Banner</h3>
                            <div
                                className={`border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-colors ${currentBanner ? 'border-slate-200' : 'border-slate-200 hover:border-[#9DC228] hover:bg-blue-50/30'}`}
                                onClick={() => bannerRef.current?.click()}
                            >
                                {currentBanner ? (
                                    <div className="relative">
                                        <img
                                            src={currentBanner}
                                            alt="Banner"
                                            onClick={(e) => { e.stopPropagation(); openLightbox(currentBanner, 'Banner ' + (umkm?.name || 'UMKM')); }}
                                            className="w-full h-40 object-cover cursor-zoom-in"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x160'; }}
                                        />
                                        {bannerPreview && (
                                            <button type="button" onClick={(e) => { e.stopPropagation(); setBannerPreview(null); setData('banner', null); }} className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-600 hover:text-red-600 transition-colors">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="py-8 text-center">
                                        <Upload className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                                        <p className="text-xs font-semibold text-slate-400">Upload foto banner baru</p>
                                    </div>
                                )}
                            </div>
                            <input ref={bannerRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile('banner', setBannerPreview, e.target.files[0])} />
                            <button type="button" onClick={() => bannerRef.current?.click()} className="w-full mt-2.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors">
                                {currentBanner ? 'Ganti Banner' : 'Pilih Foto'}
                            </button>
                            {errors.banner && <p className="mt-1 text-xs text-red-600">{errors.banner}</p>}
                        </div>

                        {/* Logo */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-800 mb-3">Logo / Thumbnail</h3>
                            <div
                                className={`border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-colors ${currentLogo ? 'border-slate-200' : 'border-slate-200 hover:border-[#9DC228] hover:bg-blue-50/30'}`}
                                onClick={() => logoRef.current?.click()}
                            >
                                {currentLogo ? (
                                    <div className="relative">
                                        <img
                                            src={currentLogo}
                                            alt="Logo"
                                            onClick={(e) => { e.stopPropagation(); openLightbox(currentLogo, 'Logo ' + (umkm?.name || 'UMKM')); }}
                                            className="w-full h-32 object-cover cursor-zoom-in"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/200x128'; }}
                                        />
                                        {logoPreview && (
                                            <button type="button" onClick={(e) => { e.stopPropagation(); setLogoPreview(null); setData('logo', null); }} className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-600 hover:text-red-600 transition-colors">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="py-7 text-center">
                                        <Upload className="w-5 h-5 text-slate-300 mx-auto mb-2" />
                                        <p className="text-xs font-semibold text-slate-400">Upload logo baru</p>
                                    </div>
                                )}
                            </div>
                            <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile('logo', setLogoPreview, e.target.files[0])} />
                            <button type="button" onClick={() => logoRef.current?.click()} className="w-full mt-2.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors">
                                {currentLogo ? 'Ganti Logo' : 'Pilih Logo'}
                            </button>
                            {errors.logo && <p className="mt-1 text-xs text-red-600">{errors.logo}</p>}
                        </div>

                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                            <div className="flex items-center gap-1.5 mb-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#9DC228] animate-pulse" />
                                <p className="text-xs font-bold text-[#9DC228]">Binaan CSR Pertamina Patra Niaga</p>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed">
                                Perubahan akan langsung tampil di halaman Direktori dan Katalog publik portal.
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
