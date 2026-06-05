import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

import { 
  PlayCircle, Clock, CheckCircle2, ArrowRight, Book, Flame, Zap, 
  Code, Database, Layers, Cpu 
} from 'lucide-react';

const Dashboard = () => {
  const learningPath = [
    { title: "Pengenalan Go (Golang)", status: "Completed", desc: "Selesai pada 15 Mar" },
    { title: "Membangun REST API", status: "In Progress", desc: "Modul 4 dari 10" },
    { title: "Middleware & Auth JWT", status: "Upcoming", desc: "Materi terkunci" },
  ];

  // Tambahkan icon dan gradient dekoratif agar lebih visual
  const materiTerbaru = [
    { title: 'Setup Environment Go', time: '12m', cat: 'Go Basics', icon: <Code size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50', topBorder: 'bg-emerald-400' },
    { title: 'Struktur Data & Interface', time: '25m', cat: 'Advanced Go', icon: <Cpu size={20} />, color: 'text-orange-600', bg: 'bg-orange-50', topBorder: 'bg-orange-400' },
    { title: 'GORM Database Logic', time: '40m', cat: 'Database', icon: <Database size={20} />, color: 'text-blue-600', bg: 'bg-blue-50', topBorder: 'bg-blue-400' },
    { title: 'Clean Architecture', time: '1h 20m', cat: 'Pro Tips', icon: <Layers size={20} />, color: 'text-purple-600', bg: 'bg-purple-50', topBorder: 'bg-purple-400' },
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-8 md:space-y-10 animate-in fade-in duration-700 pb-10">
        
        {/* STATS OVERVIEW: Tambahan icon raksasa transparan di background (Visual Cue) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <div className="relative overflow-hidden bg-white p-6 rounded-4xl border border-slate-100 flex items-center gap-5 shadow-sm hover:shadow-lg transition-all group">
            <Flame className="absolute -right-4 -bottom-4 w-28 h-28 text-orange-50 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-linear-to-br from-orange-50 to-orange-100 flex items-center justify-center text-orange-500 shrink-0 shadow-inner">
              <Flame size={26} />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Streak Belajar</p>
              <p className="text-2xl md:text-3xl font-black text-slate-900 leading-none">12 <span className="text-lg text-slate-400 font-bold">Hari</span></p>
            </div>
          </div>
          
          <div className="relative overflow-hidden bg-white p-6 rounded-4xl border border-slate-100 flex items-center gap-5 shadow-sm hover:shadow-lg transition-all group">
            <Zap className="absolute -right-4 -bottom-4 w-28 h-28 text-blue-50 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-500 shrink-0 shadow-inner">
              <Zap size={26} />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-2">XP Terkumpul</p>
              <p className="text-2xl md:text-3xl font-black text-slate-900 leading-none">2,450 <span className="text-lg text-slate-400 font-bold">XP</span></p>
            </div>
          </div>
          
          <div className="relative overflow-hidden bg-white p-6 rounded-4xl border border-slate-100 flex items-center gap-5 shadow-sm hover:shadow-lg transition-all group sm:col-span-2 lg:col-span-1">
            <CheckCircle2 className="absolute -right-4 -bottom-4 w-28 h-28 text-emerald-50 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-50 to-emerald-100 flex items-center justify-center text-emerald-500 shrink-0 shadow-inner">
              <CheckCircle2 size={26} />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Modul Selesai</p>
              <p className="text-2xl md:text-3xl font-black text-slate-900 leading-none">18<span className="text-lg text-slate-400 font-bold">/40</span></p>
            </div>
          </div>
        </div>

        {/* HERO SECTION: Banner lebih dinamis */}
        <section className="relative overflow-hidden bg-[#020617] rounded-3xl md:rounded-[40px] p-8 md:p-12 lg:p-14 text-white shadow-2xl shadow-blue-900/20">
          <div className="absolute top-0 right-0 w-125 h-125 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 grid md:grid-cols-2 items-center gap-10">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-500/30">
                <Flame size={12} /> Sedang Dipelajari
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 leading-[1.15] tracking-tight">
                Lanjutkan Belajar <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">Backend Dev!</span>
              </h2>
              <p className="text-slate-400 mb-8 text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0">
                Kamu sudah menyelesaikan 45% dari materi. Sedikit lagi kamu akan siap membangun API skala industri.
              </p>
              <button className="w-full md:w-auto bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-blue-600/30 active:scale-[0.98]">
                Lanjutkan Materi
                <PlayCircle className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Visual Progress Ring */}
            <div className="hidden md:flex justify-center lg:justify-end lg:pr-10">
              <div className="relative w-40 h-40 lg:w-48 lg:h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                  <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="12" fill="transparent" 
                          strokeDasharray="264%" strokeDashoffset="145%" 
                          className="text-blue-500" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.6))'}} />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-4xl lg:text-5xl font-black block tracking-tighter">45<span className="text-2xl">%</span></span>
                </div>
              </div>
            </div>
          </div>
          <Book className="absolute -right-5 -bottom-5 w-40 h-40 md:-right-10 md:-bottom-10 md:w-80 md:h-80 text-white/2 -rotate-12 pointer-events-none" />
        </section>

        {/* GRID UTAMA: 12 Kolom Dinamis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* MATERI TERKINI (Kiri - 8 kolom) - Dibuat lebih visual dengan Top Border */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Materi Terkini</h3>
              <button className="text-xs font-black text-blue-600 hover:text-blue-700 hover:underline uppercase tracking-widest transition-colors">Lihat Semua</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              {materiTerbaru.map((materi, i) => (
                <div key={i} className="relative bg-white rounded-3xl border border-slate-100 hover:border-slate-300 transition-all group cursor-pointer shadow-sm hover:shadow-xl hover:shadow-slate-200/50 flex flex-col justify-between overflow-hidden">
                  {/* Visual Aksen Garis Atas */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${materi.topBorder} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${materi.bg} ${materi.color}`}>
                        {materi.icon}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${materi.color}`}>
                        {materi.cat}
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">{materi.title}</h4>
                  </div>
                  
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock size={14} />
                      <span className="text-xs font-bold">{materi.time}</span>
                    </div>
                    <ArrowRight size={18} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LEARNING PATH (Kanan - 4 kolom) - Visual Timeline Dipertegas */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 px-1 tracking-tight">Alur Belajar</h3>
            <div className="bg-white p-7 md:p-8 rounded-3xl md:rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
              
              <div className="space-y-8 relative z-10">
                {/* Garis Vertikal (Timeline) */}
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100 hidden md:block z-0"></div>
                
                {learningPath.map((path, i) => (
                  <div key={i} className="relative flex gap-5 z-10 items-start group">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-white shadow-md shrink-0 relative z-10 transition-transform group-hover:scale-105 ${
                      path.status === 'Completed' ? 'bg-emerald-500 text-white' : 
                      path.status === 'In Progress' ? 'bg-blue-600 text-white shadow-blue-500/40 ring-4 ring-blue-50' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <CheckCircle2 size={20} className={path.status === 'In Progress' ? 'animate-pulse' : ''} />
                    </div>
                    <div className="pt-1.5 flex-1">
                      <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-1 ${
                        path.status === 'Completed' ? 'text-emerald-500' :
                        path.status === 'In Progress' ? 'text-blue-600' : 'text-slate-400'
                      }`}>{path.status}</p>
                      <h5 className="font-bold text-slate-900 text-sm md:text-base leading-tight mb-1">{path.title}</h5>
                      <p className="text-[11px] text-slate-500 font-medium">{path.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;