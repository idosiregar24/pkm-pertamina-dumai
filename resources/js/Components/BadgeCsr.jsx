import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';

/**
 * Badge Resmi Kelompok Binaan CSR Pertamina Patra Niaga Unit Dumai
 */
export default function BadgeCsr({ size = 'sm', className = '' }) {
    if (size === 'xs') {
        return (
            <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-pertamina-blue-light border border-pertamina-blue/20 text-pertamina-blue text-[11px] font-semibold tracking-wide ${className}`}
            >
                <span className="w-1.5 h-1.5 rounded-full bg-pertamina-blue animate-pulse" />
                Binaan CSR Pertamina
            </span>
        );
    }

    return (
        <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pertamina-blue-light border border-pertamina-blue/20 text-pertamina-blue text-xs font-semibold tracking-wide shadow-xs ${className}`}
        >
            <ShieldCheck className="w-3.5 h-3.5 text-pertamina-blue flex-shrink-0" />
            <span>Binaan CSR Pertamina Patra Niaga Unit Dumai</span>
        </div>
    );
}
