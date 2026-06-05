import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/MentorLayout';
import api from '../utils/api'; 
import { 
  Users, BookOpenCheck, Star, Wallet, Plus, 
  TrendingUp, MoreVertical, PlayCircle, Users2, Loader2, X,
  MessageSquare, Image as ImageIcon, CheckCircle2,
  Edit2, Trash2 // <-- Tambahan icon untuk menu Edit dan Hapus
} from 'lucide-react';

const MentorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  
  // State untuk Dropdown Titik Tiga
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // State untuk Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null); // null = Buat Baru, isi = Edit Mode
  const [newTitle, setNewTitle] = useState('');
  const [courseImage, setCourseImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // 1. Ambil Data Stats & List Kursus
  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/auth/mentor-stats'); 
      setDashboardData(response.data);
    } catch (err) {
      console.error("Gagal ambil data dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // 2. Handle Live Preview Gambar
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseImage(file);
      if (previewUrl && !previewUrl.startsWith('http')) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 3. Tombol Edit Diklik (Buka Modal dengan Data Lama)
  const handleEditClick = (e, course) => {
    e.preventDefault(); // Mencegah pindah halaman (karena dibungkus Link)
    setEditingCourseId(course.id);
    setNewTitle(course.title);
    if (course.thumbnail) {
      setPreviewUrl(`http://localhost:5000/${course.thumbnail.replace(/\\/g, '/')}`);
    } else {
      setPreviewUrl(null);
    }
    setCourseImage(null);
    setOpenDropdownId(null);
    setIsModalOpen(true);
  };

  // 4. Submit Kursus (Bisa untuk Create ATAU Update)
  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    // Kalau buat baru wajib ada gambar. Kalau edit, gambar opsional.
    if (!editingCourseId && !courseImage) return alert("Mohon pilih thumbnail kursus terlebih dahulu!");
    
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('title', newTitle);
    if (courseImage) formData.append('image', courseImage); 

    try {
      if (editingCourseId) {
        // Mode UPDATE (Perlu route PUT di backend)
        await api.put(`/auth/courses/${editingCourseId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("Kursus Berhasil Diperbarui! ✏️");
      } else {
        // Mode CREATE
        await api.post('/auth/courses', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("Kursus Berhasil Diterbitkan! 🚀");
      }
      
      closeModal();
      await fetchDashboardData(); 
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menyimpan kursus");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. Tombol Hapus Diklik
  const handleDeleteCourse = async (e, id) => {
    e.preventDefault(); // Mencegah pindah halaman
    setOpenDropdownId(null);
    
    if (!window.confirm("Yakin ingin menghapus kursus ini? Semua data di dalamnya akan hilang permanen!")) return;

    try {
      // Perlu route DELETE di backend
      await api.delete(`/auth/courses/${id}`);
      alert("Kursus berhasil dihapus! 🗑️");
      await fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus kursus");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourseId(null);
    setNewTitle('');
    setCourseImage(null);
    setPreviewUrl(null);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-[80vh] w-full flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-[10px]">Menyusun Dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  const stats = [
    { label: 'Total Murid', value: dashboardData?.totalStudents || 0, icon: <Users size={24} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Kursus Aktif', value: dashboardData?.activeCourses || 0, icon: <BookOpenCheck size={24} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Rating Mentor', value: '4.9', icon: <Star size={24} />, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Estimasi Saldo', value: 'Rp 0', icon: <Wallet size={24} />, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <DashboardLayout>
      <div className="w-full space-y-8 animate-in fade-in duration-700 pb-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Mentor</h1>
            <p className="text-slate-500 font-medium">
              Selamat datang kembali, <span className="text-blue-600 font-bold">Coach {user?.name}</span>.
            </p>
          </div>
          <button 
            onClick={() => { closeModal(); setIsModalOpen(true); }}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-xl shadow-blue-600/20 active:scale-95"
          >
            <Plus size={20} strokeWidth={3} />
            Buat Kursus Baru
          </button>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}> {item.icon} </div>
                <TrendingUp size={16} className="text-emerald-500" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: LIST KURSUS */}
          <div className="lg:col-span-8 space-y-6">
             <h3 className="text-xl font-black text-slate-900 px-2 tracking-tight">Kursus Saya</h3>
             <div className="grid grid-cols-1 gap-4">
               {dashboardData?.courses?.map((course) => (
                 <Link 
                   to={`/mentor/course/${course.id}`} 
                   key={course.id} 
                   className="bg-white p-5 rounded-[28px] border border-slate-100 flex flex-col md:flex-row items-center gap-6 hover:border-blue-400 hover:shadow-lg transition-all group shadow-sm relative"
                 >
                   {/* Thumbnail Kursus */}
                  <div className="w-full md:w-44 h-28 rounded-2xl bg-slate-100 overflow-hidden shrink-0 shadow-inner relative">
                    {course.thumbnail ? (
                      <img 
                          // Kita jadikan URL-nya lurus dan bersih
                          src={`http://localhost:5000/${course.thumbnail.replace(/\\/g, '/')}`} 
                          alt={course.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            // INI PENTING: Kalau masih gagal, dia bakal nulis URL yang error di Console F12
                            console.error("❌ GAMBAR GAGAL DIMUAT. URL YANG DICARI:", e.target.src);
                            e.target.onerror = null; 
                            e.target.src = "https://via.placeholder.com/300x200?text=Gambar+Rusak";
                          }}
                        />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <PlayCircle size={32} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <PlayCircle className="text-white" size={32} fill="currentColor" />
                    </div>
                  </div>

                   <div className="flex-1 text-center md:text-left">
                     <h4 className="font-black text-slate-800 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors">{course.title}</h4>
                     <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400">
                       <div className="flex items-center gap-1.5 text-xs font-bold font-mono">
                         <Users2 size={14} /> {course._count?.enrollments || 0} STUDENTS
                       </div>
                       <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                         <CheckCircle2 size={14} /> PUBLISHED
                       </div>
                     </div>
                   </div>
                   
                   {/* MENU TITIK TIGA (DROPDOWN) */}
                   <div className="relative z-10">
                     <button 
                       onClick={(e) => {
                         e.preventDefault(); // Cegah klik link
                         setOpenDropdownId(openDropdownId === course.id ? null : course.id);
                       }}
                       className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-all"
                     >
                       <MoreVertical size={20} />
                     </button>

                     {/* Isi Dropdown Menu */}
                     {openDropdownId === course.id && (
                       <div className="absolute right-0 top-14 w-44 bg-white border border-slate-100 shadow-xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 origin-top-right">
                         <button 
                           onClick={(e) => handleEditClick(e, course)}
                           className="w-full px-4 py-3 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-3 transition-colors"
                         >
                           <Edit2 size={16} /> Edit Kursus
                         </button>
                         <button 
                           onClick={(e) => handleDeleteCourse(e, course.id)}
                           className="w-full px-4 py-3 text-sm font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 flex items-center gap-3 transition-colors"
                         >
                           <Trash2 size={16} /> Hapus
                         </button>
                       </div>
                     )}
                   </div>
                 </Link>
               ))}

               {dashboardData?.courses?.length === 0 && (
                 <div className="text-center py-24 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                   <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Belum ada materi kursus yang dibuat.</p>
                 </div>
               )}
             </div>
          </div>

          {/* RIGHT: SIDEBAR AKTIVITAS */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xl font-black text-slate-900 px-2 tracking-tight">Pusat Diskusi</h3>
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="text-blue-500" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">No Messages Yet</p>
                <p className="text-slate-500 text-xs font-medium mt-2 leading-relaxed">Belum ada pertanyaan dari mahasiswa saat ini.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL BUAT / EDIT KURSUS --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">
                {editingCourseId ? 'Edit Kursus' : 'Kursus Baru'}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={24} className="text-slate-400" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitCourse} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Thumbnail Kelas</label>
                <div className="relative w-full h-44 bg-slate-50 rounded-4xl border-2 border-dashed border-slate-200 overflow-hidden group hover:border-blue-400 transition-all cursor-pointer">
                  {previewUrl ? (
                    <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                      <ImageIcon size={32} className="mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-center px-4">Klik untuk pilih gambar thumbnail</span>
                    </div>
                  )}
                  {/* Kalau Edit, input file jadi opsional. Kalau Baru, wajib */}
                  <input required={!editingCourseId} type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Judul Kursus</label>
                <input 
                  autoFocus required type="text" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all font-bold text-slate-800"
                  placeholder="Contoh: Mastering Laravel 11"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-slate-900 hover:bg-blue-600 text-white py-5 rounded-2xl font-black transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : (editingCourseId ? 'Simpan Perubahan' : 'Terbitkan Kursus Sekarang')}
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MentorDashboard;