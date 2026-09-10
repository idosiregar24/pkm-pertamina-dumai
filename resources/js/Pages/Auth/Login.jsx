import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LogIn, Lock } from 'lucide-react';
import { getAssetUrl } from '@/Utils/phone';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    const logoSrc = getAssetUrl('/asset/logo/logo-pertamina-patra-niaga.png');

    return (
        <>
            <Head title="Login Panel Admin — UMKM Binaan CSR Pertamina Dumai" />

            <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">

                {/* ─── LEFT: Branding Panel (Putih Bersih) ─── */}
                <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] flex-shrink-0 flex-col bg-white border-r border-slate-200/80 relative overflow-hidden">

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full p-10 xl:p-12">

                        {/* Logo Pertamina */}
                        <div className="flex items-center gap-3.5 mb-auto">
                            <img
                                src={logoSrc}
                                alt="Logo Pertamina Patra Niaga"
                                className="h-10 sm:h-12 w-auto object-contain"
                            />
                        </div>

                        {/* Main headline (Tanpa "Panel Pengelola Resmi") */}
                        <div className="py-12">
                            <h1 className="text-3xl xl:text-4xl font-extrabold text-slate-900 leading-[1.2] tracking-tight mb-4">
                                Kelola Portal<br />
                                <span className="text-pertamina-red">UMKM</span> Binaan<br />
                                <span className="text-pertamina-green">CSR Pertamina</span>
                            </h1>

                            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
                                Manajemen terpusat untuk data produk, profil UMKM mitra binaan, dan konten program pemberdayaan CSR Kota Dumai.
                            </p>
                        </div>

                        {/* Feature list */}
                        <div className="space-y-3.5 mb-10">
                            {[
                                { label: 'Tambah & edit produk UMKM binaan', dot: 'bg-pertamina-red' },
                                { label: 'Kelola foto & profil kelompok usaha', dot: 'bg-pertamina-green' },
                                { label: 'Pantau statistik & data program CSR', dot: 'bg-pertamina-green' },
                            ].map((f) => (
                                <div key={f.label} className="flex items-center gap-3">
                                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${f.dot}`} />
                                    <span className="text-sm text-slate-700 font-medium">{f.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <p className="text-[11px] text-slate-400 border-t border-slate-100 pt-5">
                            © {new Date().getFullYear()} Program CSR TJSL · PT Pertamina Patra Niaga · Unit Dumai
                        </p>
                    </div>
                </div>

                {/* ─── RIGHT: Form Panel ─── */}
                <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
                    <div className="w-full max-w-sm">

                        {/* Mobile logo */}
                        <div className="flex items-center gap-3 mb-8 lg:hidden">
                            <img
                                src={logoSrc}
                                alt="Logo Pertamina Patra Niaga"
                                className="h-10 w-auto object-contain"
                            />
                        </div>

                        {/* Header */}
                        <div className="mb-8">
                            <div className="w-11 h-11 bg-pertamina-green/10 rounded-2xl flex items-center justify-center mb-4 border border-pertamina-green/15">
                                <Lock className="w-5 h-5 text-pertamina-green" />
                            </div>
                            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                Masuk ke Panel Admin
                            </h2>
                            <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                                Gunakan akun yang diberikan koordinator CSR Pertamina Patra Niaga Unit Dumai.
                            </p>
                        </div>

                        {/* Status */}
                        {status && (
                            <div className="mb-5 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-medium rounded-xl px-4 py-3">
                                <span className="w-2 h-2 rounded-full bg-pertamina-green" />
                                {status}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-4">

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide"
                                >
                                    Alamat Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    autoFocus
                                    placeholder="email@pertamina.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 bg-white placeholder-slate-400 outline-none transition-all
                                        ${errors.email
                                            ? 'border-red-400 ring-1 ring-red-200'
                                            : 'border-slate-300 focus:border-pertamina-green focus:ring-2 focus:ring-pertamina-green/15'
                                        }`}
                                />
                                {errors.email && (
                                    <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide"
                                >
                                    Kata Sandi
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        placeholder="••••••••••"
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`w-full px-4 py-3 pr-11 rounded-xl border text-sm text-slate-900 bg-white placeholder-slate-400 outline-none transition-all
                                            ${errors.password
                                                ? 'border-red-400 ring-1 ring-red-200'
                                                : 'border-slate-300 focus:border-pertamina-green focus:ring-2 focus:ring-pertamina-green/15'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between pt-0.5">
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 rounded border-slate-300 text-pertamina-green focus:ring-pertamina-green cursor-pointer"
                                    />
                                    <span className="text-sm text-slate-600">Ingat perangkat ini</span>
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-semibold text-pertamina-green hover:text-pertamina-green-dark transition-colors"
                                    >
                                        Lupa sandi?
                                    </Link>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                id="login-submit-btn"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2.5 bg-pertamina-red hover:bg-pertamina-red-dark active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm py-3.5 rounded-xl shadow-xs hover:shadow transition-all duration-200 mt-2"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                        </svg>
                                        Memverifikasi...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="w-4 h-4" />
                                        Masuk ke Panel Admin
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-3 bg-slate-50 text-xs text-slate-400 font-medium">atau</span>
                            </div>
                        </div>

                        {/* Back link */}
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                            Kembali ke Portal Publik
                        </Link>

                        {/* Credential hint */}
                        <div className="mt-6 bg-slate-100/80 border border-slate-200/90 rounded-xl px-4 py-3">
                            <p className="text-[11px] text-slate-700 font-bold mb-1">
                                🔐 Akun Demo Admin
                            </p>
                            <p className="text-[11px] text-slate-500 font-mono">
                                admin@pertamina.com / admin123
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
