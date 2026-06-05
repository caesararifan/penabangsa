import React, { useState } from 'react';
import MentorLayout from '../components/MentorLayout';
import { 
  User, Lock, Bell, Camera, Save, 
  ShieldCheck, Mail, Briefcase, FileCheck, GraduationCap 
} from 'lucide-react';

const MentorSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profil Mentor', icon: <User size={18} /> },
    { id: 'expertise', label: 'Keahlian & Karir', icon: <Briefcase size={18} /> },
    { id: 'security', label: 'Keamanan', icon: <Lock size={18} /> },
  ];

  return (
    <MentorLayout>
      <div className="w-full space-y-8 animate-in fade-in duration-700 pb-20">
        
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pengaturan Mentor</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">Kelola profil pengajar dan kredensial profesional Anda.</p>
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
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
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
                  <div className="flex flex-col md:flex-row items-center gap-8 border-b border-slate-50 pb-10">
                    <div className="relative group">
                      <img 
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Caesar" 
                        className="w-32 h-32 rounded-[40px] bg-emerald-50 border-4 border-white shadow-xl object-cover" 
                        alt="Profile" 
                      />
                      <button className="absolute -bottom-2 -right-2 p-3 bg-white border border-slate-100 rounded-2xl shadow-lg text-emerald-600 hover:scale-110 transition-transform">
                        <Camera size={20} />
                      </button>
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-lg font-black text-slate-900">Foto Profil Pengajar</h3>
                      <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed max-w-xs">
                        Gunakan foto formal yang ramah. Profil dengan foto asli memiliki tingkat kepercayaan murid 80% lebih tinggi.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nama Gelar / Lengkap</label>
                      <input type="text" defaultValue="Mentor Caesar, S.Kom" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white focus:border-emerald-600 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Publik (Untuk Murid)</label>
                      <input type="email" defaultValue="caesar.mentor@penabangsa.com" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:bg-white focus:border-emerald-600 outline-none transition-all" />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bio Profesional</label>
                      <textarea rows="4" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:bg-white focus:border-emerald-600 outline-none transition-all resize-none" defaultValue="Software Engineer dengan pengalaman 5 tahun di bidang Backend Development menggunakan Go dan Cloud Infrastructure."></textarea>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: EXPERTISE */}
              {activeTab === 'expertise' && (
                <div className="p-8 md:p-10 space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kategori Utama Materi</label>
                      <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-emerald-600">
                        <option>Backend Development</option>
                        <option>Frontend Development</option>
                        <option>Data Science & AI</option>
                        <option>UI/UX Design</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pekerjaan / Status Saat Ini</label>
                      <input type="text" defaultValue="Senior Developer at Tech Corp" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-emerald-600" />
                    </div>
                    
                    <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                          <FileCheck size={24} />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-emerald-900 leading-none">Dokumen Sertifikasi</h4>
                          <p className="text-[11px] text-emerald-700 mt-1 font-medium">Sertifikat_Keahlian_Go.pdf (Terverifikasi)</p>
                        </div>
                      </div>
                      <button className="text-xs font-black text-emerald-600 hover:underline uppercase tracking-widest">Update</button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: SECURITY */}
              {activeTab === 'security' && (
                <div className="p-8 md:p-10 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password Baru</label>
                    <input type="password" placeholder="Min. 8 karakter" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:border-emerald-600" />
                  </div>
                  <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex gap-4">
                    <ShieldCheck className="text-blue-600" />
                    <p className="text-xs text-blue-800 font-medium">Autentikasi dua faktor (2FA) akan segera tersedia untuk meningkatkan keamanan akun Mentor Anda.</p>
                  </div>
                </div>
              )}

              {/* SAVE FOOTER */}
              <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4">
                <button className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Batalkan</button>
                <button className="flex items-center gap-2 px-8 py-3.5 bg-emerald-600 text-white text-sm font-black rounded-2xl shadow-xl shadow-emerald-600/30 hover:bg-emerald-700 transition-all active:scale-95">
                  <Save size={18} />
                  Simpan Perubahan
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </MentorLayout>
  );
};

export default MentorSettings;