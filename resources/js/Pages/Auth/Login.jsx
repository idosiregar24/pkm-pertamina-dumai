import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LogIn, Shield, Lock } from 'lucide-react';

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

    const logoSrc = '/pkm-pertamina-dumai/public/asset/logo/logo-pertamina-patra-niaga.png';

    return (
        <>
            <Head title="Login Panel Admin — UMKM Binaan CSR Pertamina Dumai" />

            <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">

                {/* ─── LEFT: Branding Panel ─── */}
                <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] flex-shrink-0 flex-col bg-[#005BAC] relative overflow-hidden">

                    {/* Texture overlay */}
                    <div className="absolute inset-0 opacity-[0.06]"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                            backgroundSize: '28px 28px'
                        }} />

                    {/* Top gradient accent */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ED1C24] via-[#ED1C24] to-[#005BAC]" />

                    {/* Bottom corner decoration */}
                    <div className="absolute bottom-0 right-0 w-64 h-64 rounded-tl-full opacity-10 bg-white" />
                    <div className="absolute bottom-8 right-8 w-40 h-40 rounded-full opacity-5 bg-white" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full p-10">

                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-auto">
                            <div className="bg-white rounded-xl px-3 py-2 shadow-sm">
                                <img
                                    src={logoSrc}
                                    alt="Pertamina Patra Niaga"
                                    className="h-9 w-auto object-contain"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>
                            <div>
                                <p className="text-[10px] font-extrabold text-blue-200 uppercase tracking-widest leading-none mb-0.5">
                                    Pertamina Patra Niaga
                                </p>
                                <p className="text-xs font-medium text-white/60">
                                    Unit Dumai · Program CSR
                                </p>
                            </div>
                        </div>

                        {/* Main headline */}
                        <div className="py-12">
                            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 mb-6">
                                <Shield className="w-3.5 h-3.5 text-blue-200" />
                                <span className="text-[11px] font-semibold text-blue-100 uppercase tracking-wider">
                                    Panel Pengelola Resmi
                                </span>
                            </div>

                            <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
                                Kelola Portal<br />
                                <span className="text-[#ED1C24]">UMKM</span> Binaan<br />
                                CSR Pertamina
                            </h1>

                            <p className="text-sm text-blue-100/70 leading-relaxed max-w-xs">
                                Manajemen terpusat untuk data produk, profil UMKM mitra, dan konten program pemberdayaan CSR Kota Dumai.
                            </p>
                        </div>

                        {/* Feature list */}
                        <div className="space-y-3 mb-10">
                            {[
                                { label: 'Tambah & edit produk UMKM binaan', dot: 'bg-[#ED1C24]' },
                                { label: 'Kelola foto & profil kelompok usaha', dot: 'bg-[#00A651]' },
                                { label: 'Pantau statistik & data program CSR', dot: 'bg-blue-300' },
                            ].map((f) => (
                                <div key={f.label} className="flex items-center gap-3">
                                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${f.dot}`} />
                                    <span className="text-sm text-blue-100/80 font-medium">{f.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <p className="text-[11px] text-white/25 border-t border-white/10 pt-5">
                            © {new Date().getFullYear()} Program CSR TJSL · PT Pertamina Patra Niaga · Unit Dumai
                        </p>
                    </div>
                </div>

                {/* ─── RIGHT: Form Panel ─── */}
                <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
                    <div className="w-full max-w-sm">

                        {/* Mobile logo */}
                        <div className="flex items-center gap-3 mb-8 lg:hidden">
                            <div className="bg-white rounded-xl px-2.5 py-1.5 border border-slate-200 shadow-sm">
                                <img
                                    src={logoSrc}
                                    alt="Pertamina Patra Niaga"
                                    className="h-8 w-auto object-contain"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>
                            <div>
                                <p className="text-[10px] font-extrabold text-[#005BAC] uppercase tracking-widest leading-none mb-0.5">Pertamina Patra Niaga</p>
                                <p className="text-xs text-slate-500">Unit Dumai · Panel Admin</p>
                            </div>
                        </div>

                        {/* Header */}
                        <div className="mb-8">
                            <div className="w-11 h-11 bg-[#005BAC]/10 rounded-2xl flex items-center justify-center mb-4 border border-[#005BAC]/15">
                                <Lock className="w-5 h-5 text-[#005BAC]" />
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
                                <span className="w-2 h-2 rounded-full bg-[#00A651]" />
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
                                            : 'border-slate-300 focus:border-[#005BAC] focus:ring-2 focus:ring-[#005BAC]/15'
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
                                                : 'border-slate-300 focus:border-[#005BAC] focus:ring-2 focus:ring-[#005BAC]/15'
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
                                        className="w-4 h-4 rounded border-slate-300 accent-[#005BAC] cursor-pointer"
                                    />
                                    <span className="text-sm text-slate-600">Ingat perangkat ini</span>
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-semibold text-[#005BAC] hover:text-[#004994] transition-colors"
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
                                className="w-full flex items-center justify-center gap-2.5 bg-[#ED1C24] hover:bg-[#c9141b] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 mt-2"
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
                        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                            <p className="text-[11px] text-[#005BAC] font-semibold mb-1">
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
