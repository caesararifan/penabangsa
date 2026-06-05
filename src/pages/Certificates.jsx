import React from 'react';
import DashboardLayout from '../components/DashboardLayout'; // Pastikan path ini benar
import { 
  Award, Download, Share2, ExternalLink, 
  Medal, ShieldCheck, Calendar, Hash
} from 'lucide-react';

const Certificates = () => {
  // Data dummy sertifikat (disesuaikan dengan materi yang sudah 'Completed' sebelumnya)
  const certificates = [
    {
      id: 'CERT-PB-2026-001',
      title: 'Machine Learning Basics (LSTM & ANN)',
      date: '10 Februari 2026',
      grade: 'A+',
      skills: ['Python', 'TensorFlow', 'Data Science'],
      gradient: 'from-slate-800 to-slate-900',
      accent: 'text-purple-400'
    },
    {
      id: 'CERT-PB-2026-045',
      title: 'Dasar Pemrograman Go (Golang)',
      date: '15 Maret 2026',
      grade: 'A',
      skills: ['Golang', 'Data Structure', 'Algorithms'],
      gradient: 'from-blue-800 to-slate-900',
      accent: 'text-blue-400'
    },
    {
      id: 'CERT-PB-2026-089',
      title: 'Database & GORM Fundamentals',
      date: '18 Maret 2026',
      grade: 'A',
      skills: ['PostgreSQL', 'GORM', 'SQL'],
      gradient: 'from-emerald-800 to-slate-900',
      accent: 'text-emerald-400'
    }
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-8 animate-in fade-in duration-700 pb-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-8 md:p-10 rounded-4xl border border-slate-100 shadow-sm relative overflow-hidden">
          {/* Efek dekorasi background */}
          <Award className="absolute -right-10 -top-10 w-64 h-64 text-slate-50 -rotate-12 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-amber-100">
              <Medal size={14} /> Pencapaian
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Sertifikat Saya
            </h1>
            <p className="text-slate-500 font-medium max-w-lg">
              Semua sertifikat kelulusan dari materi yang telah kamu selesaikan. Bagikan pencapaianmu ke LinkedIn atau jadikan portfolio!
            </p>
          </div>

          <div className="relative z-10 bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center min-w-35">
            <p className="text-sm text-slate-500 font-semibold mb-1">Total Diraih</p>
            <p className="text-3xl font-black text-slate-800">{certificates.length}</p>
          </div>
        </div>

        {/* CERTIFICATES GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div 
              key={index} 
              className="bg-white rounded-4xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group flex flex-col"
            >
              {/* Bagian Visual Sertifikat (Top Half) */}
              <div className={`h-48 bg-linear-to-br ${cert.gradient} relative p-6 flex flex-col items-center justify-center text-center overflow-hidden`}>
                {/* Efek pattern/garis pada sertifikat */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="absolute inset-4 border border-white/10 rounded-2xl"></div>
                
                <ShieldCheck size={40} className={`mb-3 relative z-10 ${cert.accent}`} />
                <h3 className="text-white font-bold text-lg leading-tight relative z-10 max-w-[80%]">
                  {cert.title}
                </h3>
                <p className="text-white/60 text-xs font-medium mt-2 tracking-widest uppercase relative z-10">
                  Pena Bangsa Verified
                </p>
              </div>

              {/* Bagian Informasi & Aksi (Bottom Half) */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="space-y-4 mb-8 flex-1">
                  <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                    <Calendar size={16} className="text-slate-400" />
                    <span>Diterbitkan: <span className="text-slate-700 font-bold">{cert.date}</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                    <Hash size={16} className="text-slate-400" />
                    <span>ID: <span className="text-slate-700 font-mono">{cert.id}</span></span>
                  </div>
                  
                  {/* Skill Badges */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                    {cert.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button className="flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 font-bold text-sm rounded-xl hover:bg-blue-600 hover:text-white transition-colors">
                    <Download size={16} />
                    Unduh PDF
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors border border-slate-100">
                    <Share2 size={16} />
                    Bagikan
                  </button>
                </div>
                
                {/* Link Validasi */}
                <button className="w-full mt-3 flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-wider">
                  Validasi Kredensial <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Certificates;