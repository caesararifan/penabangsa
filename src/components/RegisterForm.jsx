import React, { useState } from 'react';
import { 
  User, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, 
  GraduationCap, Briefcase, AlertCircle, FileUp, BriefcaseBusiness 
} from 'lucide-react';

const RegisterForm = ({ onRegister, loading, error, onNavigateToLogin }) => {
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // State khusus Mentor
  const [occupation, setOccupation] = useState('');
  const [expertise, setExpertise] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileObject, setFileObject] = useState(null); // KUNCI: Simpan file asli
  
  const [localError, setLocalError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileObject(file); // Simpan objek file binary
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');

    if (password !== confirmPassword) {
      setLocalError('Password tidak cocok!');
      return;
    }
    if (password.length < 8) {
      setLocalError('Minimal 8 karakter!');
      return;
    }
    
    if (role === 'mentor' && (!occupation || !expertise || !fileObject)) {
      setLocalError('Harap lengkapi status, keahlian, dan unggah sertifikat!');
      return;
    }

    // KIRIM SEBAGAI SATU OBJEK KE PARENT (Login.js)
    onRegister({ 
      name, 
      email, 
      password, 
      role, 
      occupation, 
      expertise, 
      certificate: fileObject 
    });
  };

  const displayError = localError || error;

  return (
    <div className="w-full max-w-105 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6 text-center lg:text-left">
        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight uppercase leading-none">Daftar Akun</h2>
        <p className="text-slate-500 font-medium text-sm">
          {role === 'mentor' ? 'Bagikan ilmumu dan bangun reputasi.' : 'Mulai belajar dan raih sertifikat.'}
        </p>
      </div>

      {/* ROLE SELECTION */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6">
        <button
          type="button"
          onClick={() => setRole('student')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
            role === 'student' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <GraduationCap size={16} /> Student
        </button>
        <button
          type="button"
          onClick={() => setRole('mentor')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
            role === 'mentor' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Briefcase size={16} /> Mentor
        </button>
      </div>

      {role === 'mentor' && (
        <div className="mb-6 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl animate-in zoom-in-95 duration-300">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider mb-1 text-left">Standar Mentor Pena Bangsa</h4>
              <ul className="text-[11px] text-emerald-700 font-medium space-y-1 list-disc ml-4 text-left">
                <li>Melampirkan bukti keahlian (Sertifikat/Ijazah/Portofolio).</li>
                <li>Menjelaskan status profesi saat ini secara jujur.</li>
                <li>Verifikasi data memakan waktu maksimal 24 jam.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {displayError && (
        <div className="bg-red-50 border border-red-200 p-3 rounded-xl mb-6 flex items-center gap-3 animate-shake">
          <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shrink-0" />
          <p className="text-red-700 text-[10px] font-bold uppercase">{displayError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1.5 group">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input type="text" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-blue-500 outline-none transition-all" placeholder="Contoh: Caesar Pradana" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Aktif</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input type="email" className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-blue-500 outline-none transition-all" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
        </div>

        {role === 'mentor' && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-500">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Status Saat Ini</label>
              <div className="relative">
                <BriefcaseBusiness className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:bg-white focus:border-emerald-500 outline-none appearance-none transition-all"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  required
                >
                  <option value="">Pilih Status</option>
                  <option value="student">Mahasiswa</option>
                  <option value="professional">Profesional</option>
                  <option value="academic">Dosen/Guru</option>
                  <option value="freelancer">Freelancer</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Bidang Keahlian</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-emerald-500 outline-none transition-all font-medium" 
                placeholder="Contoh: Backend Dev" 
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                required
              />
            </div>
            
            <div className="col-span-2 space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Upload Sertifikat</label>
              <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-3 hover:bg-slate-50 transition-colors">
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.png"
                  required
                />
                <div className="flex items-center justify-center gap-3">
                  <FileUp className="text-emerald-500 w-5 h-5" />
                  <span className="text-xs font-bold text-slate-500 truncate">
                    {fileName ? fileName : 'Klik atau seret file (PDF/JPG)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1.5 group">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input type={showPassword ? "text" : "password"} className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-blue-500 outline-none transition-all" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Konfirmasi Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input type={showPassword ? "text" : "password"} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-blue-500 outline-none transition-all" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-4 rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 mt-4 ${
            role === 'mentor' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' : 'bg-slate-900 hover:bg-blue-600 shadow-slate-900/20'
          }`}
        >
          {loading ? <Loader2 className="animate-spin" /> : <>Daftar Sekarang <ArrowRight size={18} /></>}
        </button>
      </form>

      <div className="mt-10 pt-6 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Sudah punya akun?</p>
        <button 
          type="button" 
          onClick={onNavigateToLogin}
          className="text-blue-600 hover:text-blue-800 font-black text-xs uppercase tracking-widest transition-all border-b-2 border-transparent hover:border-blue-600 pb-0.5"
        >
          Masuk Sekarang
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;