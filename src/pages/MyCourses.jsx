import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

import { 
  PlayCircle, CheckCircle2, Clock, BookOpen, 
  MoreHorizontal, Filter, Search, Award, Cpu, Code, Server, Database
} from 'lucide-react';

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState('Semua');

  // Simulasi data kelas 
  const courses = [
    {
      id: 1,
      title: 'Membangun REST API dengan Go (Golang)',
      category: 'Backend Dev',
      progress: 60,
      totalModules: 24,
      completedModules: 14,
      lastAccessed: '2 jam yang lalu',
      status: 'In Progress',
      icon: <Server size={24} />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      title: 'Django Web Framework Fundamentals',
      category: 'Fullstack',
      progress: 85,
      totalModules: 30,
      completedModules: 26,
      lastAccessed: 'Kemarin',
      status: 'In Progress',
      icon: <Code size={24} />,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      id: 3,
      title: 'IoT System: Raspberry Pi & ESP32',
      category: 'Hardware & IoT',
      progress: 30,
      totalModules: 15,
      completedModules: 4,
      lastAccessed: '3 hari yang lalu',
      status: 'In Progress',
      icon: <Cpu size={24} />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      id: 4,
      title: 'Machine Learning Basics (LSTM & ANN)',
      category: 'Data Science',
      progress: 100,
      totalModules: 20,
      completedModules: 20,
      lastAccessed: 'Bulan lalu',
      status: 'Completed',
      icon: <Database size={24} />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  const tabs = ['Semua', 'In Progress', 'Completed'];

  // Filter logika sederhana
  const filteredCourses = courses.filter(course => {
    if (activeTab === 'Semua') return true;
    return course.status === activeTab;
  });

  return (
    <DashboardLayout>
      <div className="w-full space-y-8 animate-in fade-in duration-700 pb-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">Kelas Saya</h1>
            <p className="text-slate-500 font-medium">Lanjutkan pembelajaran dan capai targetmu minggu ini.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Cari kelas..." 
                className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-full md:w-64 shadow-sm"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm shrink-0">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* COURSE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-[28px] border border-slate-100 p-5 flex flex-col justify-between hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 group"
            >
              {/* Card Header: Icon & Category */}
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${course.bgColor} ${course.color} transition-transform group-hover:scale-105`}>
                  {course.icon}
                </div>
                <button className="text-slate-400 hover:text-slate-600 p-2">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Card Body: Title & Meta */}
              <div className="mb-6">
                <span className={`text-[11px] font-bold uppercase tracking-wider mb-2 block ${course.color}`}>
                  {course.category}
                </span>
                <h3 className="text-xl font-bold text-slate-800 leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {course.title}
                </h3>
                
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={14} />
                    <span>{course.completedModules}/{course.totalModules} Modul</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>{course.lastAccessed}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Progress Bar & Button */}
              <div className="mt-auto space-y-5">
                {/* Progress Indicator */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700">Progress</span>
                    <span className={course.progress === 100 ? 'text-emerald-600' : 'text-blue-600'}>
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-linear-to-r ${course.gradient} transition-all duration-1000 ease-out`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    course.progress === 100 
                      ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      : 'bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/25'
                  }`}
                >
                  {course.progress === 100 ? (
                    <>
                      <Award size={18} />
                      Lihat Sertifikat
                    </>
                  ) : (
                    <>
                      <PlayCircle size={18} />
                      Lanjutkan Belajar
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (Mencegah tampilan kosong jika filter tidak cocok) */}
        {filteredCourses.length === 0 && (
          <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-white rounded-4xl border border-slate-100 border-dashed">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
              <BookOpen size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Tidak ada kelas ditemukan</h3>
            <p className="text-sm text-slate-500 max-w-sm">Kamu belum memiliki kelas dalam kategori ini. Coba ubah filter atau jelajahi materi baru.</p>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default MyCourses;