import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/MentorLayout';
import api from '../utils/api';
import { Play, Plus, X, Loader2, ArrowLeft, Video, CheckCircle, FileVideo, ExternalLink } from 'lucide-react';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  
  // State Upload Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessonTitle, setLessonTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // 1. Fungsi ambil detail kursus dan materinya
  const fetchDetail = async () => {
    try {
      const res = await api.get(`/auth/courses/${id}`);
      console.log("Data dari Server:", res.data);
      setCourse(res.data);
    } catch (err) {
      console.error("Gagal ambil detail:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  // 2. Fungsi Handle Upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile) return alert("Pilih file video dulu!");

    setIsUploading(true);
    const formData = new FormData();
    formData.append('title', lessonTitle);
    formData.append('courseId', id);
    formData.append('video', videoFile);

    try {
      // Pastikan endpoint backend kamu: /auth/lessons
      await api.post('/auth/lessons', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Materi Berhasil Terbit! 🎥");
      setIsModalOpen(false);
      setLessonTitle('');
      setVideoFile(null);
      fetchDetail(); // Refresh daftar video biar muncul yang baru
    } catch (err) {
      alert(err.response?.data?.message || "Gagal upload video");
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) return (
    <DashboardLayout>
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-20">
        
        {/* HEADER & BACK BUTTON */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/mentor/dashboard')} 
            className="p-4 bg-white rounded-3xl shadow-sm hover:bg-slate-50 transition-all border border-slate-100 text-slate-400 hover:text-blue-600"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{course?.title}</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">
              Panel Pengelola Materi / {course?.lessons?.length || 0} Video Terupload
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LIST MATERI VIDEO */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-900 px-2">Video Pembelajaran</h3>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3.5 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
              >
                <Plus size={18} strokeWidth={3} /> Tambah Video
              </button>
            </div>

            {course?.lessons?.length === 0 ? (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] py-24 text-center space-y-4">
                <Video size={56} className="mx-auto text-slate-200" />
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Belum ada materi video</p>
              </div>
            ) : (
              <div className="space-y-4">
                {course?.lessons?.map((lesson, i) => (
                  <div key={lesson.id} className="bg-white p-5 rounded-4xl border border-slate-100 flex flex-col md:flex-row items-center gap-5 hover:border-blue-200 transition-all shadow-sm group">
                    
                    {/* INFO MATERI */}
                    <div className="flex items-center gap-5 flex-1 w-full">
                      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Play size={24} fill="currentColor" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-slate-800 tracking-tight">Materi {i + 1}: {lesson.title}</h4>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Format: Video MP4/MKV</p>
                      </div>
                    </div>

                    {/* TOMBOL AKSES VIDEO */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                       <a 
                         // .replace(/\\/g, '/') untuk handle path Windows agar jadi URL valid
                         href={`http://localhost:5000/${lesson.videoPath.replace(/\\/g, '/')}`} 
                         target="_blank" 
                         rel="noreferrer"
                         className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl text-xs font-black hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                       >
                         <ExternalLink size={14} /> Tonton Video
                       </a>
                       <CheckCircle className="text-emerald-500 hidden md:block" size={20} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SIDEBAR INFO */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-4 sticky top-10 shadow-2xl shadow-slate-200">
              <FileVideo size={32} className="text-blue-400" />
              <h4 className="text-lg font-black leading-tight">Panduan Mentor</h4>
              <ul className="text-slate-400 text-xs space-y-4 font-medium">
                <li className="flex gap-2">
                  <span className="text-blue-400 font-bold">1.</span>
                  Pastikan koneksi stabil saat upload video ukuran besar.
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 font-bold">2.</span>
                  Gunakan resolusi minimal 720p agar siswa nyaman belajar.
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400 font-bold">3.</span>
                  Video yang sudah terbit akan langsung muncul di panel siswa.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL UPLOAD VIDEO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Upload Materi</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Judul Video Materi</label>
                <input required type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all font-bold text-slate-800" placeholder="Contoh: Dasar Dasar Programming" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pilih File Video</label>
                <input 
                  required 
                  type="file" 
                  accept="video/*" 
                  onChange={(e) => setVideoFile(e.target.files[0])} 
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-all cursor-pointer"
                />
              </div>

              <button type="submit" disabled={isUploading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black transition-all shadow-xl shadow-blue-200 active:scale-95 flex items-center justify-center gap-2">
                {isUploading ? <><Loader2 className="animate-spin" /> Sedang Mengunggah...</> : 'Publikasikan Sekarang'}
              </button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CourseDetail;