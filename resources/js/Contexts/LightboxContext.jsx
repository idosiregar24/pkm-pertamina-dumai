import React, { createContext, useCallback, useContext, useState } from 'react';
import ImageLightbox from '@/Components/ImageLightbox';

const LightboxContext = createContext();

/**
 * Provider global untuk pratinjau foto full-screen yang bisa di-zoom.
 * Dipasang sekali di root aplikasi (lihat app.jsx) supaya seluruh
 * halaman & komponen bisa memicunya lewat hook useLightbox().
 */
export function LightboxProvider({ children }) {
    const [image, setImage] = useState(null); // { src, alt } | null

    const openLightbox = useCallback((src, alt = '') => {
        if (!src) return;
        setImage({ src, alt });
    }, []);

    const closeLightbox = useCallback(() => setImage(null), []);

    return (
        <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
            {children}
            <ImageLightbox image={image} onClose={closeLightbox} />
        </LightboxContext.Provider>
    );
}

export function useLightbox() {
    const context = useContext(LightboxContext);
    if (!context) {
        throw new Error('useLightbox must be used within a LightboxProvider');
    }
    return context;
}
