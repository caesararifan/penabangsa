import React from 'react';
import MentorLayout from '../components/MentorLayout';
import { BarChart3, TrendingUp, Users, Play, Star } from 'lucide-react';

const MentorAnalytics = () => {
  return (
    <MentorLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Analitik Performa</h1>
          <p className="text-slate-500 font-medium">Data statistik pertumbuhan konten dan interaksi murid.</p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Menit Ditonton', val: '45.2K', trend: '+12%', icon: <Play /> },
            { label: 'Murid Baru (30 Hari)', val: '124', trend: '+8%', icon: <Users /> },
            { label: 'Penyelesaian Modul', val: '68%', trend: '+3%', icon: <BarChart3 /> },
            { label: 'Rating Kepuasan', val: '4.92', trend: '+0.1', icon: <Star /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">{stat.icon}</div>
                <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Placeholder Grafik */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm h-80 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
               <TrendingUp className="text-slate-300" size={32} />
            </div>
            <h4 className="font-bold text-slate-800">Grafik Pertumbuhan Murid</h4>
            <p className="text-sm text-slate-400">Integrasikan Recharts atau Chart.js di sini untuk data real-time.</p>
          </div>
          <div className="lg:col-span-4 bg-emerald-900 p-8 rounded-[40px] text-white flex flex-col justify-between overflow-hidden relative">
            <BarChart3 className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10 -rotate-12" />
            <div className="relative z-10">
              <h4 className="text-xl font-black leading-tight mb-4">Insight Minggu Ini</h4>
              <p className="text-emerald-100/70 text-sm leading-relaxed mb-6">Materi "Golang Microservices" mengalami kenaikan interaksi sebesar 25% dibandingkan minggu lalu.</p>
            </div>
            <button className="relative z-10 w-full bg-emerald-500 hover:bg-emerald-400 py-3 rounded-2xl text-sm font-black transition-all">Unduh Laporan Lengkap</button>
          </div>
        </div>
      </div>
    </MentorLayout>
  );
};

export default MentorAnalytics;