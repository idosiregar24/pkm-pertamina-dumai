import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

/**
 * Overlay pratinjau foto full-screen yang bisa diperbesar (zoom).
 * - Klik foto: toggle perbesar / perkecil.
 * - Klik area luar foto (backdrop) atau tombol X atau tekan Escape: langsung tutup.
 *
 * Dirender sekali di root lewat LightboxProvider — jangan diimpor manual di
 * halaman lain, gunakan hook useLightbox() untuk memicunya.
 */
export default function ImageLightbox({ image, onClose }) {
    const [zoomed, setZoomed] = useState(false);

    // Reset status zoom setiap kali foto yang ditampilkan berganti
    useEffect(() => {
        setZoomed(false);
    }, [image]);

    // Kunci scroll halaman di belakang selama lightbox terbuka
    useEffect(() => {
        if (!image) return undefined;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [image, onClose]);

    if (!image) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 sm:p-8"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={image.alt || 'Pratinjau foto'}
        >
            {/* Tombol Tutup */}
            <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 sm:right-6 sm:top-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                aria-label="Tutup pratinjau foto"
            >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Petunjuk interaksi zoom — z-10 wajib: foto punya class scale-* (transform) yang
                membentuk stacking context sendiri, jadi tanpa z-index eksplisit label ini akan
                tertutup di belakang foto begitu foto membesar */}
            <span className="absolute z-10 left-1/2 -translate-x-1/2 bottom-5 sm:bottom-7 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/80 pointer-events-none">
                {zoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                {zoomed ? 'Klik foto untuk perkecil' : 'Klik foto untuk perbesar'}
            </span>

            <img
                src={image.src}
                alt={image.alt || ''}
                onClick={(e) => {
                    e.stopPropagation();
                    setZoomed((prev) => !prev);
                }}
                className={`rounded-lg shadow-2xl transition-transform duration-300 ease-out select-none object-contain ${
                    zoomed ? 'scale-[1.9] cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                }`}
                style={{ maxWidth: '92vw', maxHeight: '85vh', width: 'auto', height: 'auto' }}
                draggable={false}
            />
        </div>
    );
}
