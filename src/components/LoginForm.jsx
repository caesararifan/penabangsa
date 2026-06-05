import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';

const LoginForm = ({ onLogin, loading, error, onNavigateToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="w-full max-w-90 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase">Masuk</h2>
        <p className="text-slate-500 font-medium text-[14px] leading-relaxed">
          Silakan masuk ke akun <span className="text-blue-600 font-bold">Pena Bangsa</span> Anda.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-3.5 rounded-xl mb-6 flex items-center gap-3 animate-shake shadow-sm">
          <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
          <p className="text-red-700 text-[12px] font-bold tracking-wide">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-1.5 group">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-blue-600 transition-colors">Email Pengguna</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors w-5 h-5" />
            <input
              type="email"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[15px] font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none placeholder:text-slate-400 shadow-sm"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5 group">
          <div className="flex justify-between items-center px-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest group-focus-within:text-blue-600 transition-colors">Password</label>
            <button type="button" className="text-[11px] font-bold text-blue-600 uppercase hover:text-blue-800 transition-colors">Lupa?</button>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[15px] font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none placeholder:text-slate-400 shadow-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-all p-1"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-xl text-[14px] font-bold transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-blue-600/30 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 mt-4 group"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span className="tracking-wide text-white">Autentikasi Sekarang</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-none">
          Belum punya akun? <br />
          <button 
            type="button" 
            onClick={onNavigateToRegister} 
            className="mt-3 text-blue-600 hover:text-blue-800 transition-colors border-b-2 border-transparent hover:border-blue-600 pb-0.5"
          >
            Daftar Gratis Selamanya
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;