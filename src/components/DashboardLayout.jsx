import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { 
  LayoutDashboard, BookOpen, GraduationCap, 
  Settings as SettingsIcon, LogOut, Search, Bell, Trophy, Menu, X
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Diperlukan untuk mendeteksi URL aktif
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Menu navigasi utama
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/dashboard' },
    { icon: <BookOpen size={20} />, label: 'My Courses', path: '/my-courses' },
    { icon: <GraduationCap size={20} />, label: 'Learning Path', path: '/learning-path' },
    { icon: <Trophy size={20} />, label: 'Certificates', path: '/certificates' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  };

  return (
    <div className="h-screen w-screen bg-[#F8FAFC] flex overflow-hidden font-sans relative">
      
      {/* OVERLAY UNTUK MOBILE */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#020617] text-white flex flex-col p-6 
        transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 border-r border-white/5
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <GraduationCap className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Pena Bangsa</span>
          </div>
          {/* Tombol Close untuk Mobile */}
          <button 
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* MENU NAVIGASI UTAMA */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item, i) => {
            // Cek apakah menu ini sedang aktif
            const isActive = location.pathname === item.path;

            return (
              <button 
                key={i} 
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* BAGIAN BAWAH SIDEBAR (SETTINGS & LOGOUT) */}
        <div className="pt-6 border-t border-white/5 space-y-1">
          {/* TOMBOL SETTINGS YANG SUDAH DISESUAIKAN */}
          <button 
            onClick={() => {
              navigate('/settings');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
              location.pathname === '/settings'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <SettingsIcon size={20} />
            <span className="font-medium text-sm">Settings</span>
          </button>

          {/* TOMBOL LOGOUT */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium text-sm"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-10 shrink-0 w-full z-10">
          
          <div className="flex items-center gap-4 w-full max-w-lg">
            {/* HAMBURGER BUTTON (Mobile Only) */}
            <button 
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* SEARCH BAR */}
            <div className="relative w-full hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari materi atau topik..." 
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button className="relative p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:text-blue-600 transition-all border border-slate-100">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 md:gap-4 md:pl-6 md:border-l border-slate-100">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-800 leading-none">Caesar Al-Khowarizmi</p>
                <p className="text-[11px] font-medium text-blue-600 mt-1 uppercase tracking-wider">Fullstack Student</p>
              </div>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Caesar" className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-blue-50 border border-blue-100 shadow-sm" alt="profile" />
            </div>
          </div>
        </header>

        {/* VIEWPORT UTAMA */}
        <div className="flex-1 overflow-y-auto w-full p-6 md:p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;