import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BookText, Users2, 
  Settings, LogOut, Search, Bell, Menu, X,
  PlusCircle, BarChart3, GraduationCap
} from 'lucide-react';

const MentorLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Menu Pendapatan sudah dihapus
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Insights', path: '/mentor/dashboard' },
    { icon: <BookText size={20} />, label: 'Konten Saya', path: '/mentor/courses' },
    { icon: <Users2 size={20} />, label: 'Daftar Murid', path: '/mentor/students' },
    { icon: <BarChart3 size={20} />, label: 'Analitik', path: '/mentor/analytics' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="h-screen w-screen bg-[#FDFDFD] flex overflow-hidden font-sans">
      {/* Sidebar logic tetap sama, hanya menuItems yang berubah */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#020617] text-white flex flex-col p-6 transition-transform duration-300 lg:relative lg:translate-x-0 border-r border-white/5 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <GraduationCap className="text-white" />
            </div>
            <div>
              <span className="font-bold text-lg block leading-none text-white">Pena Bangsa</span>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Mentor Panel</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item, i) => (
            <button 
              key={i} 
              onClick={() => { navigate(item.path); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                location.pathname === item.path ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-1">
          <button onClick={() => navigate('/mentor/settings')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${location.pathname === '/mentor/settings' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>
            <Settings size={20} />
            <span className="font-medium text-sm">Settings</span>
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-10 shrink-0 z-10">
          <div className="flex items-center gap-4 w-full max-w-lg">
            <button className="lg:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(true)}><Menu size={24} /></button>
            <div className="relative w-full hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Cari..." className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Caesar" className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100" alt="avatar" />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto w-full p-6 md:p-8 lg:p-10">{children}</div>
      </main>
    </div>
  );
};

export default MentorLayout;