import { useState, useRef } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ChevronLeft, Upload, X, ImageIcon } from 'lucide-react';

const CATEGORIES = [
    'Olahan Nanas & Kuliner',
    'Madu Hutan & Herbal',
    'Kerajinan & Kriya',
    'Batik & Tenun',
    'Kuliner Pesisir',
    'Olahan Kelapa',
    'Umum',
];

export default function ProductEdit({ product, umkms }) {
    const { auth } = usePage().props;
    const isAdminCsr = auth?.user?.role === 'admin_csr';

    const [previewUrl, setPreviewUrl] = useState(null);
    const fileRef = useRef(null);

    // Inisialisasi form dengan data produk yang sudah ada
    const { data, setData, post, processing, errors } = useForm({
        _method:     'PATCH',
        umkm_id:     product?.umkm_id ? String(product.umkm_id) : '',
        name:        product?.name        ?? '',
        price:       product?.price       ?? '',
        unit:        product?.unit        ?? '',
        category:    product?.category    ?? '',
        description: product?.description ?? '',
        shopee_url:  product?.shopee_url  ?? '',
        is_featured: product?.is_featured ? true : false,
        image:       null,
    });

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setData('image', file);
        const reader = new FileReader();
        reader.onload = (ev) => setPreviewUrl(ev.target.result);
        reader.readAsDataURL(file);
    };

    const removeNewImage = (e) => {
        e.stopPropagation();
        setPreviewUrl(null);
        setData('image', null);
        if (fileRef.current) fileRef.current.value = '';
    };

    // Tampilkan: foto baru (preview) → foto lama dari DB → kosong
    const displayImage = previewUrl || product?.image_url || null;

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.produk.update', product.id), { forceFormData: true });
    };

    // Jika product prop belum tersedia (edge case)
    if (!product) {
        return (
            <AdminLayout title="Edit Produk" activeNav="produk">
                <div className="flex items-center justify-center py-24">
                    <p className="text-sm text-slate-400">Data produk tidak ditemukan.</p>
                </div>
            </AdminLayout>
        );
    }

    const fieldBase = 'w-full px-3.5 py-2.5 rounded-xl border text-sm bg-slate-50 text-slate-900 placeholder-slate-400 outline-none transition-all focus:bg-white';
    const fieldNormal = `${fieldBase} border-slate-200 focus:border-slate-400 focus:ring-1 focus:ring-slate-300`;
    const fieldError  = `${fieldBase} border-red-300 ring-1 ring-red-100`;

    return (
        <AdminLayout title="Edit Produk" activeNav="produk">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <Link
                    href={route('admin.produk.index')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Kembali
                </Link>
                <div>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Edit Produk</h1>
                    <p className="text-xs text-slate-400 mt-0.5">
                        ID #{product.id} · {product.umkm?.name ?? '—'}
                    </p>
                </div>
            </div>

            <form onSubmit={submit} encType="multipart/form-data">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* ── Kolom Kiri: Fields (2/3) ── */}
                    <div className="lg:col-span-2 space-y-5">
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-700 mb-4 pb-3 border-b border-slate-100">
                                Informasi Produk
                            </h3>

                            {/* UMKM Pemilik — hanya Admin CSR yang boleh memindahkan produk
                                antar-kelompok. Admin Kelompok tidak bisa mengubah kepemilikan
                                produknya sendiri (dipaksa server-side lewat resolvedUmkmId()). */}
                            {isAdminCsr ? (
                                <div className="mb-4">
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                                        UMKM Pemilik <span className="text-slate-800">*</span>
                                    </label>
                                    <select
                                        value={data.umkm_id}
                                        onChange={(e) => setData('umkm_id', e.target.value)}
                                        className={errors.umkm_id ? fieldError : fieldNormal}
                                    >
                                        <option value="">— Pilih UMKM —</option>
                                        {umkms.map((u) => (
                                            <option key={u.id} value={String(u.id)}>
                                                {u.name} ({u.district})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.umkm_id && (
                                        <p className="mt-1 text-xs text-slate-600">{errors.umkm_id}</p>
                                    )}
                                </div>
                            ) : (
                                <div className="mb-4 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-blue-50 border border-blue-100 text-xs font-semibold text-[#005BAC]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#005BAC]" />
                                    Produk ini milik kelompok Anda: {product.umkm?.name ?? '—'}
                                </div>
                            )}

                            {/* Nama Produk */}
                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                                    Nama Produk <span className="text-slate-800">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Nama produk lengkap"
                                    className={errors.name ? fieldError : fieldNormal}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs text-slate-600">{errors.name}</p>
                                )}
                            </div>

                            {/* Kategori */}
                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                                    Kategori <span className="text-slate-800">*</span>
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className={errors.category ? fieldError : fieldNormal}
                                >
                                    <option value="">— Pilih Kategori —</option>
                                    {CATEGORIES.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-xs text-slate-600">{errors.category}</p>
                                )}
                            </div>

                            {/* Harga + Satuan */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                                        Harga (Rp) <span className="text-slate-800">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        placeholder="25000"
                                        className={errors.price ? fieldError : fieldNormal}
                                    />
                                    {errors.price && (
                                        <p className="mt-1 text-xs text-slate-600">{errors.price}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                                        Satuan <span className="text-slate-800">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.unit}
                                        onChange={(e) => setData('unit', e.target.value)}
                                        placeholder="pcs / botol / pouch"
                                        className={errors.unit ? fieldError : fieldNormal}
                                    />
                                    {errors.unit && (
                                        <p className="mt-1 text-xs text-slate-600">{errors.unit}</p>
                                    )}
                                </div>
                            </div>

                            {/* Deskripsi */}
                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                                    Deskripsi Produk
                                </label>
                                <textarea
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Jelaskan keunggulan produk ini..."
                                    className={`${fieldNormal} resize-y`}
                                />
                            </div>

                            {/* Link Shopee */}
                            <div className="mb-4">
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                                    Link Toko Shopee
                                </label>
                                <input
                                    type="text"
                                    value={data.shopee_url}
                                    onChange={(e) => setData('shopee_url', e.target.value)}
                                    placeholder="https://shopee.co.id/..."
                                    className={fieldNormal}
                                />
                            </div>

                            {/* Toggle Unggulan */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                    Status Unggulan
                                </label>
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={data.is_featured}
                                    onClick={() => setData('is_featured', !data.is_featured)}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all w-full text-left ${
                                        data.is_featured
                                            ? 'bg-amber-50 border-amber-200 text-amber-800'
                                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    <span className={`relative w-9 h-5 rounded-full flex-shrink-0 transition-colors ${data.is_featured ? 'bg-amber-400' : 'bg-slate-300'}`}>
                                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${data.is_featured ? 'translate-x-4' : 'translate-x-0.5'}`} />
                                    </span>
                                    {data.is_featured
                                        ? '⭐  Produk Unggulan — tampil di halaman utama'
                                        : 'Produk Normal — tidak di-highlight'
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                            <Link
                                href={route('admin.produk.index')}
                                className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-7 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-bold text-sm shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" />
                                        </svg>
                                        Menyimpan...
                                    </span>
                                ) : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </div>

                    {/* ── Kolom Kanan: Foto (1/3) ── */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-700 mb-3 pb-3 border-b border-slate-100">
                                Foto Produk
                            </h3>

                            {/* Preview area */}
                            {displayImage ? (
                                <div className="relative rounded-xl overflow-hidden border border-slate-200 mb-3">
                                    <img
                                        src={displayImage}
                                        alt="Foto produk"
                                        className="w-full h-52 object-cover block bg-slate-100"
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="208" fill="%23f1f5f9"><rect width="300" height="208"/><text x="150" y="110" text-anchor="middle" fill="%2394a3b8" font-size="13" font-family="sans-serif">Gambar tidak tersedia</text></svg>';
                                        }}
                                    />
                                    {/* Badge foto baru */}
                                    {previewUrl && (
                                        <div className="absolute top-2 left-2">
                                            <span className="bg-slate-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                Foto Baru
                                            </span>
                                        </div>
                                    )}
                                    {/* Tombol hapus preview baru */}
                                    {previewUrl && (
                                        <button
                                            type="button"
                                            onClick={removeNewImage}
                                            className="absolute top-2 right-2 w-7 h-7 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
                                            title="Batalkan foto baru"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div
                                    className="border-2 border-dashed border-slate-200 rounded-xl py-10 mb-3 flex flex-col items-center justify-center cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-colors"
                                    onClick={() => fileRef.current?.click()}
                                >
                                    <ImageIcon className="w-8 h-8 text-slate-300 mb-2" />
                                    <p className="text-xs font-semibold text-slate-400">Belum ada foto</p>
                                </div>
                            )}

                            {/* Upload button */}
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-sm font-semibold text-slate-600 transition-colors"
                            >
                                <Upload className="w-4 h-4" />
                                {displayImage ? 'Ganti Foto' : 'Upload Foto'}
                            </button>

                            <p className="text-[10px] text-slate-400 text-center mt-2">
                                JPG, PNG, WebP · Maks. 4MB
                            </p>

                            {errors.image && (
                                <p className="mt-2 text-xs text-slate-600 text-center">{errors.image}</p>
                            )}

                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/jpg,image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Info panel */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                            <p className="text-xs font-bold text-slate-700 mb-2">Catatan</p>
                            <ul className="space-y-1.5">
                                {[
                                    'Upload foto hanya jika ingin mengganti foto lama.',
                                    'Harga dalam satuan Rupiah (angka, tanpa titik).',
                                    'Produk unggulan ditampilkan di halaman beranda portal.',
                                ].map((note) => (
                                    <li key={note} className="text-[11px] text-slate-500 flex items-start gap-1.5">
                                        <span className="mt-1 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                                        {note}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
