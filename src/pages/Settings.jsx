import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { 
  User, Lock, Bell, Globe, Camera, 
  Save, ShieldCheck, Mail, Smartphone 
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profil Publik', icon: <User size={18} /> },
    { id: 'security', label: 'Keamanan', icon: <Lock size={18} /> },
    { id: 'notifications', label: 'Notifikasi', icon: <Bell size={18} /> },
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-8 animate-in fade-in duration-700 pb-20">
        
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pengaturan</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Kelola akun dan preferensi belajarmu di sini.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: TAB NAVIGATION */}
          <div className="lg:col-span-3 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* RIGHT: CONTENT AREA */}
          <div className="lg:col-span-9">
            <div className="bg-white border border-slate-100 rounded-4xl overflow-hidden shadow-sm">
              
              {/* TAB CONTENT: PROFILE */}
              {activeTab === 'profile' && (
                <div className="p-8 md:p-10 space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                  {/* Avatar Upload */}
                  <div className="flex flex-col md:flex-row items-center gap-8 border-b border-slate-50 pb-10">
                    <div className="relative group">
                      <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Caesar" 
                        className="w-32 h-32 rounded-[40px] bg-blue-50 border-4 border-white shadow-xl object-cover" 
                        alt="Profile" 
                      />
                      <button className="absolute -bottom-2 -right-2 p-3 bg-white border border-slate-100 rounded-2xl shadow-lg text-blue-600 hover:scale-110 transition-transform">
                        <Camera size={20} />
                      </button>
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-lg font-black text-slate-900">Foto Profil</h3>
                      <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed max-w-xs">
                        Gunakan foto wajah asli agar mentor dan teman belajarmu lebih mengenalmu. Format JPG atau PNG, maks 2MB.
                      </p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                      <input 
                        type="text" 
                        defaultValue="Caesar Al-Khowarizmi"
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white focus:border-blue-600 outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Publik</label>
                      <input 
                        type="email" 
                        defaultValue="caesar@khowarizmi.com"
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white focus:border-blue-600 outline-none transition-all" 
                      />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bio Singkat</label>
                      <textarea 
                        rows="3"
                        placeholder="Ceritakan sedikit tentang dirimu..."
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:border-blue-600 outline-none transition-all resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: SECURITY */}
              {activeTab === 'security' && (
                <div className="p-8 md:p-10 space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-start gap-4 p-5 bg-blue-50 border border-blue-100 rounded-2xl">
                    <ShieldCheck className="text-blue-600 shrink-0" size={24} />
                    <div>
                      <h4 className="text-sm font-black text-blue-900">Lindungi Akunmu</h4>
                      <p className="text-xs text-blue-700/70 font-medium mt-1">Kami menyarankan untuk mengganti password secara berkala setidaknya 6 bulan sekali.</p>
                    </div>
                  </div>

                  <div className="space-y-6 max-w-md">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password Saat Ini</label>
                      <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:bg-white focus:border-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password Baru</label>
                      <input type="password" placeholder="Min. 8 Karakter" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:bg-white focus:border-blue-600" />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: NOTIFICATIONS */}
              {activeTab === 'notifications' && (
                <div className="p-8 md:p-10 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  {[
                    { title: 'Email Progress Belajar', desc: 'Dapatkan laporan mingguan tentang pencapaian belajarmu.', icon: <Mail className="text-slate-400" size={20} /> },
                    { title: 'Pengingat Materi Baru', desc: 'Notifikasi saat mentor favoritmu merilis materi atau modul baru.', icon: <Smartphone className="text-slate-400" size={20} /> },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between gap-6 pb-6 border-b border-slate-50 last:border-0">
                      <div className="flex gap-4 items-start">
                        <div className="p-3 bg-slate-50 rounded-xl">{item.icon}</div>
                        <div>
                          <h4 className="text-sm font-black text-slate-900">{item.title}</h4>
                          <p className="text-xs text-slate-400 font-medium mt-1">{item.desc}</p>
                        </div>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={i === 0} />
                        <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SAVE FOOTER */}
              <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4">
                <button className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Batalkan</button>
                <button className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white text-sm font-black rounded-2xl shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95">
                  <Save size={18} />
                  Simpan Perubahan
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;