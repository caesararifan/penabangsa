import React from 'react';
import DashboardLayout from '../components/DashboardLayout'; // Pastikan path ini benar

import { 
  CheckCircle2, Lock, PlayCircle, Trophy, 
  Terminal, Database, Server, ShieldCheck, Cpu
} from 'lucide-react';

const LearningPath = () => {
  // Data dummy roadmap/alur belajar
  const roadmapData = [
    {
      id: 1,
      phase: 'Fase 1',
      title: 'Dasar Pemrograman Go',
      desc: 'Memahami sintaks dasar, struktur data, dan interface pada Golang.',
      status: 'completed',
      icon: <Terminal size={24} />,
      modules: '12 Modul',
      xp: '+500 XP'
    },
    {
      id: 2,
      phase: 'Fase 2',
      title: 'Database & GORM',
      desc: 'Integrasi aplikasi Go dengan PostgreSQL menggunakan ORM.',
      status: 'completed',
      icon: <Database size={24} />,
      modules: '8 Modul',
      xp: '+450 XP'
    },
    {
      id: 3,
      phase: 'Fase 3',
      title: 'Membangun RESTful API',
      desc: 'Membuat endpoint API, routing, dan arsitektur MVC yang rapi.',
      status: 'active',
      icon: <Server size={24} />,
      modules: '15 Modul',
      xp: '+800 XP'
    },
    {
      id: 4,
      phase: 'Fase 4',
      title: 'Middleware & Autentikasi JWT',
      desc: 'Mengamankan API dengan token dan membuat custom middleware.',
      status: 'locked',
      icon: <ShieldCheck size={24} />,
      modules: '10 Modul',
      xp: '+600 XP'
    },
    {
      id: 5,
      phase: 'Fase 5',
      title: 'Deployment & CI/CD',
      desc: 'Mendeploy aplikasi ke VPS linux dan setup pipeline otomatis.',
      status: 'locked',
      icon: <Cpu size={24} />,
      modules: '7 Modul',
      xp: '+1000 XP'
    }
  ];

  return (
    <DashboardLayout>
      <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 pb-10">
        
        {/* HEADER SECTION */}
        <div className="bg-[#020617] rounded-4xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
                <Trophy size={14} className="text-yellow-400" />
                Jalur Backend Developer
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                Roadmap Pembelajaran
              </h1>
              <p className="text-slate-400 font-medium max-w-xl">
                Ikuti urutan materi ini selangkah demi selangkah. Selesaikan tantangan di setiap fase untuk membuka materi berikutnya.
              </p>
            </div>
            
            {/* Progres Keseluruhan */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-3xl text-center min-w-40 backdrop-blur-sm">
              <p className="text-sm text-slate-400 font-medium mb-1">Total Progress</p>
              <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
                40%
              </p>
            </div>
          </div>
        </div>

        {/* TIMELINE SECTION */}
        <div className="relative pt-6">
          {/* Garis Vertikal (Background Line) */}
          <div className="absolute left-7.75 md:left-10.75 top-10 bottom-10 w-1 bg-slate-200 rounded-full hidden sm:block"></div>

          <div className="space-y-8 md:space-y-12 relative z-10">
            {roadmapData.map((item, index) => {
              const isCompleted = item.status === 'completed';
              const isActive = item.status === 'active';
              const isLocked = item.status === 'locked';

              return (
                <div key={item.id} className={`relative flex flex-col sm:flex-row gap-5 md:gap-8 group transition-opacity ${isLocked ? 'opacity-60 hover:opacity-100' : ''}`}>
                  
                  {/* Ikon Timeline */}
                  <div className="shrink-0 flex items-start">
                    <div className={`w-16 h-16 md:w-22.5 md:h-22.5 rounded-full flex items-center justify-center border-[6px] border-[#F8FAFC] shadow-sm relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'} ${
                      isCompleted ? 'bg-emerald-500 text-white' : 
                      isActive ? 'bg-blue-600 text-white shadow-blue-500/30 shadow-lg' : 'bg-slate-200 text-slate-400'
                    }`}>
                      {isLocked ? <Lock size={28} /> : item.icon}
                    </div>
                  </div>

                  {/* Konten Card */}
                  <div className={`flex-1 bg-white p-6 md:p-8 rounded-4xl border transition-all duration-300 ${
                    isActive 
                      ? 'border-blue-200 shadow-xl shadow-blue-900/5 ring-1 ring-blue-100' 
                      : 'border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200'
                  }`}>
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
                      
                      <div className="flex-1">
                        <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                          isCompleted ? 'text-emerald-500' : isActive ? 'text-blue-600' : 'text-slate-400'
                        }`}>
                          {item.phase}
                        </span>
                        <h3 className={`text-xl md:text-2xl font-bold mb-2 ${isLocked ? 'text-slate-600' : 'text-slate-800'}`}>
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-2xl">
                          {item.desc}
                        </p>
                      </div>

                      <div className="flex flex-row xl:flex-col items-center xl:items-end justify-between gap-4 mt-4 xl:mt-0 pt-4 xl:pt-0 border-t xl:border-t-0 border-slate-100">
                        <div className="flex xl:flex-col items-center xl:items-end gap-3 xl:gap-1 text-sm font-semibold text-slate-500">
                          <span className="bg-slate-50 px-3 py-1 rounded-lg">{item.modules}</span>
                          <span className="bg-slate-50 px-3 py-1 rounded-lg text-amber-600">{item.xp}</span>
                        </div>
                        
                        {/* Tombol Aksi */}
                        {isCompleted && (
                          <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-xl">
                            <CheckCircle2 size={18} /> Selesai
                          </div>
                        )}
                        {isActive && (
                          <button className="flex items-center gap-2 bg-blue-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 active:scale-95">
                            <PlayCircle size={18} /> Lanjutkan
                          </button>
                        )}
                        {isLocked && (
                          <div className="flex items-center gap-2 text-slate-400 font-bold text-sm bg-slate-100 px-4 py-2 rounded-xl">
                            <Lock size={16} /> Terkunci
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default LearningPath;