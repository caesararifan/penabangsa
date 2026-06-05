import React from 'react';
import MentorLayout from '../components/MentorLayout';
import { Mail, MoreHorizontal, Search, UserCheck } from 'lucide-react';

const MentorStudents = () => {
  const students = [
    { id: 1, name: 'Budi Raharjo', course: 'Golang Masterclass', joinDate: '12 Mar 2026', progress: '85%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi' },
    { id: 2, name: 'Siti Aminah', course: 'UI/UX Design', joinDate: '10 Mar 2026', progress: '40%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti' },
    { id: 3, name: 'Andi Wijaya', course: 'Golang Masterclass', joinDate: '08 Mar 2026', progress: '100%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi' },
  ];

  return (
    <MentorLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Daftar Murid</h1>
          <p className="text-slate-500 font-medium">Pantau perkembangan belajar murid-murid Anda.</p>
        </div>

        <div className="bg-white rounded-4xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Murid</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kursus</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tgl Bergabung</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img src={s.avatar} className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100" alt="" />
                        <span className="font-bold text-slate-800 text-sm">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-500">{s.course}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full max-w-25 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: s.progress }} />
                        </div>
                        <span className="text-xs font-black text-slate-700">{s.progress}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-500">{s.joinDate}</td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"><Mail size={18}/></button>
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors"><MoreHorizontal size={18}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MentorLayout>
  );
};

export default MentorStudents;