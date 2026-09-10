/**
 * Format angka ke format mata uang Rupiah (IDR)
 * @param {number|string} amount
 * @returns {string} Contoh: "Rp 25.000"
 */
export function formatRupiah(amount) {
    const num = Number(amount) || 0;
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(num);
}

/**
 * Normalisasi nomor telepon Indonesia ke format internasional WhatsApp (628xxx)
 * @param {string} phone
 * @returns {string}
 */
export function formatWhatsAppNumber(phone) {
    if (!phone) return '';
    let cleaned = phone.toString().replace(/\D/g, '');

    if (cleaned.startsWith('0')) {
        cleaned = '62' + cleaned.slice(1);
    } else if (cleaned.startsWith('8')) {
        cleaned = '62' + cleaned;
    } else if (!cleaned.startsWith('62')) {
        cleaned = '62' + cleaned;
    }

    return cleaned;
}

/**
 * Validasi nomor telepon Indonesia (10-15 digit dengan format 628...)
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidIndonesianPhone(phone) {
    const normalized = formatWhatsAppNumber(phone);
    return /^628\d{8,12}$/.test(normalized);
}

/**
 * Validasi apakah URL berasal dari domain resmi Shopee Indonesia
 * @param {string} url
 * @returns {boolean}
 */
export function isValidShopeeUrl(url) {
    if (!url) return false;
    try {
        const parsed = new URL(url);
        return (
            parsed.protocol === 'https:' &&
            (parsed.hostname === 'shopee.co.id' || parsed.hostname === 'www.shopee.co.id')
        );
    } catch {
        return false;
    }
}

/**
 * Generator URL Direct Checkout ke WhatsApp UMKM
 * @param {Object} params
 * @param {string} params.umkmPhone - Nomor WA UMKM
 * @param {string} params.umkmName - Nama UMKM binaan
 * @param {Array} params.items - Daftar produk dari UMKM terkait
 * @param {Object} [params.customer] - Data pemesan { name, phone, address, notes }
 * @returns {string} URL WhatsApp siap buka
 */
export function generateWhatsAppOrderUrl({ umkmPhone, umkmName, items = [], customer = {} }) {
    const targetPhone = formatWhatsAppNumber(umkmPhone);

    const itemListText = items
        .map((item, index) => {
            const subtotal = (Number(item.price) || 0) * (item.quantity || 1);
            const unitLabel = item.unit ? `/${item.unit}` : '';
            return `${index + 1}. *${item.name}* (x${item.quantity || 1}) - ${formatRupiah(subtotal)}`;
        })
        .join('\n');

    const totalAmount = items.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
        0
    );

    const messageLines = [
        `Halo *${umkmName || 'Pelaku UMKM Binaan'}*, saya tertarik memesan produk binaan CSR Pertamina Patra Niaga Unit Dumai dari website:`,
        '',
        `*📋 RINCIAN PESANAN:*`,
        itemListText || '- (Belum ada produk)',
        '',
        `*💰 TOTAL BELANJA:* ${formatRupiah(totalAmount)}`,
        '',
        `*📍 DATA PEMESAN:*`,
        `• Nama: ${customer.name?.trim() || '-'}`,
        `• No. WhatsApp: ${customer.phone?.trim() || '-'}`,
        `• Alamat Pengiriman: ${customer.address?.trim() || '-'}`,
        customer.notes?.trim() ? `• Catatan Khusus: ${customer.notes.trim()}` : null,
        '',
        `Mohon konfirmasi ketersediaan stok serta estimasi ongkos kirim. Terima kasih! 🙏`,
    ].filter(line => line !== null);

    const encodedText = encodeURIComponent(messageLines.join('\n'));
    return `https://wa.me/${targetPhone}?text=${encodedText}`;
}

/**
 * Resolves static asset paths accurately across virtual hosts and subdirectory deployments
 * @param {string} path
 * @returns {string}
 */
export function getAssetUrl(path) {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    if (typeof window !== 'undefined' && window.location.pathname.includes('/pkm-pertamina-dumai/public')) {
        return `/pkm-pertamina-dumai/public${cleanPath}`;
    }
    return cleanPath;
}

