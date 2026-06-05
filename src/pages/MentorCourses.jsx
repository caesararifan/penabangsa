import React from 'react';
import MentorLayout from '../components/MentorLayout';
import { Plus, MoreVertical, Play, Users, Clock, Filter } from 'lucide-react';

const MentorCourses = () => {
  const courses = [
    { id: 1, title: 'Golang Microservices Masterclass', category: 'Backend', students: 842, lessons: 24, status: 'Published', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80' },
    { id: 2, title: 'UI/UX Design System with Figma', category: 'Design', students: 1205, lessons: 18, status: 'Published', img: 'https://images.unsplash.com/photo-1541461946746-82096d7947d2?w=400&q=80' },
    { id: 3, title: 'Machine Learning for Stock Market', category: 'AI & Data', students: 530, lessons: 32, status: 'Draft', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80' },
  ];

  return (
    <MentorLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Konten Saya</h1>
            <p className="text-slate-500 font-medium">Kelola kurikulum dan materi ajar Anda.</p>
          </div>
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all">
            <Plus size={20} /> Buat Kursus Baru
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-4xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all group">
              <div className="relative h-48 overflow-hidden">
                <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${course.status === 'Published' ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'}`}>
                    {course.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2">{course.category}</p>
                <h3 className="text-lg font-black text-slate-900 leading-tight mb-4 group-hover:text-emerald-600 transition-colors">{course.title}</h3>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-1.5 text-xs font-bold"><Users size={14}/> {course.students}</div>
                    <div className="flex items-center gap-1.5 text-xs font-bold"><Clock size={14}/> {course.lessons} Modul</div>
                  </div>
                  <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors"><MoreVertical size={18} className="text-slate-400"/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MentorLayout>
  );
};

export default MentorCourses;