import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

const AUTO_DISMISS_MS = 4500;
const LEAVE_TRANSITION_MS = 300;

/**
 * Alert toast global untuk konfirmasi aksi admin (tambah/edit/hapus, dll).
 * Dipasang sekali di AdminLayout — otomatis berlaku di semua halaman admin
 * (index, create, edit) tanpa perlu duplikasi per halaman.
 *
 * Membaca props.flash yang di-share lewat HandleInertiaRequests. Re-trigger
 * setiap kali pesan flash BERUBAH (bukan cuma saat mount) — perlu, karena
 * navigasi Inertia antar-halaman tidak me-remount komponen ini.
 */
export default function FlashAlert() {
    const { flash } = usePage().props;
    // hidden -> entering (frame berikutnya) -> visible -> leaving (300ms) -> hidden
    const [state, setState] = useState('hidden');

    const message = flash?.success ?? flash?.error ?? null;
    const isSuccess = Boolean(flash?.success);

    useEffect(() => {
        if (!message) return undefined;

        setState('entering');
        const enterFrame = requestAnimationFrame(() => setState('visible'));
        const dismissTimer = setTimeout(() => setState('leaving'), AUTO_DISMISS_MS);

        return () => {
            cancelAnimationFrame(enterFrame);
            clearTimeout(dismissTimer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flash?.success, flash?.error]);

    useEffect(() => {
        if (state !== 'leaving') return undefined;
        const removeTimer = setTimeout(() => setState('hidden'), LEAVE_TRANSITION_MS);
        return () => clearTimeout(removeTimer);
    }, [state]);

    if (state === 'hidden' || !message) return null;

    const entered = state === 'visible';

    return (
        <div className="fixed top-4 inset-x-4 sm:inset-x-auto sm:right-4 z-[100] flex justify-center sm:justify-end pointer-events-none">
            <div
                role="status"
                className={`pointer-events-auto flex items-start gap-2.5 w-full sm:w-auto sm:max-w-sm px-4 py-3 rounded-xl border bg-white shadow-subtle-hover
                    transition-all duration-300 ease-out
                    ${entered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
                    ${isSuccess ? 'border-pertamina-green/25' : 'border-pertamina-red/25'}
                `}
            >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${isSuccess ? 'bg-pertamina-green-light' : 'bg-pertamina-red-light'}`}>
                    {isSuccess
                        ? <CheckCircle2 className="w-4 h-4 text-pertamina-green-dark" />
                        : <XCircle className="w-4 h-4 text-pertamina-red" />
                    }
                </div>
                <p className="text-sm font-semibold leading-snug pt-0.5 flex-1 text-slate-800">
                    {message}
                </p>
                <button
                    type="button"
                    onClick={() => setState('leaving')}
                    className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                    aria-label="Tutup notifikasi"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
