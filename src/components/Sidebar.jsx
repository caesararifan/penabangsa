import React from 'react';
import { GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="hidden lg:flex lg:w-[42%] h-full bg-[#020617] relative flex-col justify-between p-16 overflow-hidden shrink-0">
      {/* Background Glows (Sedikit diredupkan agar teks di depannya lebih menonjol) */}
      <div className="absolute top-[-10%] left-[-10%] w-150 h-150 bg-blue-600/15 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-100 h-100 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Brand Logo */}
      <div className="relative z-10 flex items-center gap-4 group">
        <div className="w-12 h-12 bg-linear-to-tr from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-500">
          <GraduationCap className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-white text-2xl font-black tracking-tighter uppercase leading-none drop-shadow-sm">Pena Bangsa</h1>
          <p className="text-blue-300 font-bold text-[9px] tracking-[0.3em] uppercase mt-1.5 drop-shadow-sm">Future of Tech</p>
        </div>
      </div>

      {/* Hero Text */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-400/20 rounded-full backdrop-blur-md mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">Digital Talent Hub</span>
        </div>

        <h2 className="text-5xl xl:text-6xl font-black text-white leading-[1.1] tracking-tight mb-8 drop-shadow-md">
          Belajar Tanpa <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-300 to-emerald-300 italic">Batas Biaya.</span>
        </h2>

        <div className="space-y-6">
          {[
            { t: 'Kurikulum Industri', d: 'Materi praktis Go, React, & AI.' },
            { t: 'Komunitas Global', d: 'Terhubung dengan 50k+ pelajar aktif.' }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start group">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 mt-1 shadow-inner group-hover:bg-blue-600/20 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-sm" />
              </div>
              <div>
                <h4 className="text-slate-50 font-bold text-lg leading-tight tracking-tight">{item.t}</h4>
                <p className="text-slate-300 text-sm mt-1.5 leading-relaxed">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Proof */}
      <div className="relative z-10 inline-flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl">
        <div className="flex -space-x-3">
          {[1,2,3].map(i => (
            <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+20}`} className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800 shadow-sm" alt="user" />
          ))}
        </div>
        <p className="text-slate-200 font-bold text-[11px] tracking-wider uppercase">Join 50k+ Pelajar</p>
      </div>
    </div>
  );
};

export default Sidebar;