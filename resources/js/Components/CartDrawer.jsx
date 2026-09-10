import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/Contexts/CartContext';
import { formatRupiah, generateWhatsAppOrderUrl } from '@/Utils/phone';

export default function CartDrawer() {
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
        groupedByUmkm,
    } = useCart();

    // Form data pemesan (disimpan di state lokal)
    const [customer, setCustomer] = useState(() => {
        try {
            const saved = localStorage.getItem('pertamina_customer_info');
            return saved ? JSON.parse(saved) : { name: '', phone: '', address: '', notes: '' };
        } catch {
            return { name: '', phone: '', address: '', notes: '' };
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('pertamina_customer_info', JSON.stringify(customer));
        } catch {}
    }, [customer]);

    if (!isCartOpen) return null;

    const handleCheckoutUmkm = (group) => {
        if (!customer.name.trim()) {
            alert('Mohon lengkapi Nama Anda sebelum melakukan checkout.');
            return;
        }
        if (!customer.address.trim()) {
            alert('Mohon isi Alamat Pengiriman Anda agar penjual dapat mengestimasi ongkos kirim.');
            return;
        }

        const waUrl = generateWhatsAppOrderUrl({
            umkmPhone: group.umkm?.phone || '6281234567890',
            umkmName: group.umkm?.name || 'UMKM Binaan Pertamina',
            items: group.items,
            customer: customer,
        });

        window.open(waUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop Blur */}
            <div
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
            />

            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200">
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50/70">
                        <div className="flex items-center gap-2.5">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-pertamina-red/10 text-pertamina-red">
                                <ShoppingBag className="w-4 h-4" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-slate-900">Keranjang Belanja</h2>
                                <p className="text-xs text-slate-500">{totalCount} item dipilih</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {cartItems.length > 0 && (
                                <button
                                    type="button"
                                    onClick={clearCart}
                                    className="text-xs text-slate-400 hover:text-pertamina-red px-2 py-1 rounded transition-colors"
                                    title="Kosongkan Keranjang"
                                >
                                    Kosongkan
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setIsCartOpen(false)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Drawer Body */}
                    <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
                        {cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-16">
                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-4">
                                    <ShoppingBag className="w-8 h-8" />
                                </div>
                                <h3 className="text-base font-bold text-slate-800">Keranjang Anda Masih Kosong</h3>
                                <p className="mt-1 text-xs text-slate-500 max-w-xs">
                                    Jelajahi produk-produk unggulan dari kelompok binaan CSR Pertamina Patra Niaga Dumai dan tambahkan ke keranjang.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setIsCartOpen(false)}
                                    className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pertamina-red text-white text-xs font-semibold hover:bg-pertamina-red-dark transition-all shadow-xs"
                                >
                                    <span>Mulai Jelajah Produk</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Daftar Produk terkelompok per UMKM */}
                                <div className="space-y-4">
                                    {groupedByUmkm.map((group, gIdx) => (
                                        <div
                                            key={gIdx}
                                            className="rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-2xs"
                                        >
                                            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100 text-xs">
                                                <span className="font-bold text-pertamina-green">
                                                    {group.umkm?.name || 'UMKM Binaan Pertamina'}
                                                </span>
                                                <span className="text-[11px] text-slate-400">
                                                    {group.umkm?.district || 'Kota Dumai'}
                                                </span>
                                            </div>

                                            <div className="space-y-3">
                                                {group.items.map((item) => (
                                                    <div key={item.id} className="flex gap-3 items-center">
                                                        <img
                                                            src={item.image_url || '/asset/placeholder-product.webp'}
                                                            alt={item.name}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&auto=format&fit=crop&q=60';
                                                            }}
                                                            className="w-13 h-13 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                                                        />

                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-xs font-semibold text-slate-900 truncate">
                                                                {item.name}
                                                            </h4>
                                                            <p className="text-xs font-bold text-pertamina-red mt-0.5">
                                                                {formatRupiah(item.price)}
                                                                {item.unit && (
                                                                    <span className="text-[10px] font-normal text-slate-400 ml-1">
                                                                        /{item.unit}
                                                                    </span>
                                                                )}
                                                            </p>

                                                            {/* Stepper Kuantitas */}
                                                            <div className="flex items-center gap-2 mt-2">
                                                                <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                        className="p-1 hover:text-pertamina-red transition-colors"
                                                                    >
                                                                        <Minus className="w-3 h-3" />
                                                                    </button>
                                                                    <span className="px-2 text-xs font-bold text-slate-700">
                                                                        {item.quantity}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                        className="p-1 hover:text-pertamina-green transition-colors"
                                                                    >
                                                                        <Plus className="w-3 h-3" />
                                                                    </button>
                                                                </div>

                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeFromCart(item.id)}
                                                                    className="text-slate-400 hover:text-pertamina-red p-1 transition-colors"
                                                                    title="Hapus Produk"
                                                                >
                                                                    <Trash2 className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="text-right">
                                                            <span className="text-xs font-bold text-slate-900">
                                                                {formatRupiah(item.price * item.quantity)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Subtotal UMKM & Tombol Checkout per UMKM */}
                                            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                                                <span className="text-xs text-slate-500">Subtotal UMKM ini:</span>
                                                <span className="text-xs font-extrabold text-slate-900">
                                                    {formatRupiah(group.subtotal)}
                                                </span>
                                            </div>

                                            {groupedByUmkm.length > 1 && (
                                                <div className="mt-2.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCheckoutUmkm(group)}
                                                        className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-pertamina-green hover:bg-pertamina-green-dark text-white text-xs font-semibold py-2 px-3 transition-all shadow-xs"
                                                    >
                                                        <MessageCircle className="w-3.5 h-3.5" />
                                                        <span>Pesan ke {group.umkm?.name}</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Form Data Pembeli */}
                                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                                    <div className="flex items-center gap-1.5 mb-2.5 text-xs font-bold text-slate-900">
                                        <CheckCircle2 className="w-4 h-4 text-pertamina-green" />
                                        <span>Data Pemesan untuk Pengiriman</span>
                                    </div>

                                    <div className="space-y-2.5 text-xs">
                                        <div>
                                            <label className="block text-slate-600 font-medium mb-1">
                                                Nama Lengkap <span className="text-pertamina-red">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={customer.name}
                                                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                                placeholder="Contoh: Budi Santoso"
                                                className="w-full rounded-lg border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-pertamina-red focus:ring-pertamina-red"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-slate-600 font-medium mb-1">
                                                Nomor WhatsApp <span className="text-pertamina-red">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                value={customer.phone}
                                                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                                                placeholder="Contoh: 081234567890"
                                                className="w-full rounded-lg border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-pertamina-red focus:ring-pertamina-red"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-slate-600 font-medium mb-1">
                                                Alamat Lengkap Pengiriman <span className="text-pertamina-red">*</span>
                                            </label>
                                            <textarea
                                                rows="2"
                                                value={customer.address}
                                                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                                                placeholder="Jalan, No Rumah, Kelurahan, Kecamatan, Kota"
                                                className="w-full rounded-lg border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-pertamina-red focus:ring-pertamina-red"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-slate-600 font-medium mb-1">
                                                Catatan Tambahan (Opsional)
                                            </label>
                                            <input
                                                type="text"
                                                value={customer.notes}
                                                onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                                                placeholder="Contoh: Packing kayu / varian pedas sedang"
                                                className="w-full rounded-lg border-slate-200 bg-white px-3 py-1.5 text-xs focus:border-pertamina-red focus:ring-pertamina-red"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Drawer Footer */}
                    {cartItems.length > 0 && (
                        <div className="border-t border-slate-200 bg-white p-5 space-y-3">
                            <div className="flex items-baseline justify-between text-sm">
                                <span className="font-medium text-slate-600">Total Keseluruhan</span>
                                <span className="text-lg font-extrabold text-pertamina-red">
                                    {formatRupiah(totalPrice)}
                                </span>
                            </div>

                            {groupedByUmkm.length === 1 ? (
                                <button
                                    type="button"
                                    onClick={() => handleCheckoutUmkm(groupedByUmkm[0])}
                                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-pertamina-green hover:bg-pertamina-green-dark text-white font-semibold py-3 px-4 shadow-sm active:scale-[0.98] transition-all text-sm"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    <span>Checkout Pesanan via WhatsApp</span>
                                </button>
                            ) : (
                                <div className="space-y-1.5">
                                    <div className="flex items-start gap-1.5 text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
                                        <span>
                                            Pesanan berasal dari <strong>{groupedByUmkm.length} UMKM berbeda</strong>. Gunakan tombol hijau di atas kartu masing-masing UMKM untuk mengirim pesan ke penjualnya.
                                        </span>
                                    </div>
                                </div>
                            )}

                            <p className="text-center text-[11px] text-slate-400">
                                Transaksi langsung ke nomor resmi WhatsApp UMKM Binaan CSR Pertamina Patra Niaga Dumai
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
