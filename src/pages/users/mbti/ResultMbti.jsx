import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { mbtiProfiles } from '../../../utils/mbtiScoring';

const ResultMbti = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Tangkap data mbtiType yang dilempar dari MbtiTest.jsx
  const mbtiType = location.state?.mbtiType;

  // Proteksi rute: Jika user tembak URL langsung tanpa ikut tes, lempar balik ke landing
  if (!mbtiType || !mbtiProfiles[mbtiType]) {
    return <Navigate to="/user/mbti" replace />;
  }

  const profileData = mbtiProfiles[mbtiType];

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="text-center mb-10">
        <div className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold tracking-wider mb-4">
          HASIL TES KEPRIBADIAN
        </div>
        <h2 className="text-6xl font-black text-blue-700 tracking-tight mb-2">{mbtiType}</h2>
        <h3 className="text-3xl text-gray-800 font-bold">{profileData.name}</h3>
      </div>
      
      <div className="space-y-8 text-gray-600">
        <div className="bg-blue-50/50 p-8 rounded-2xl border border-blue-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">💡</div>
          <h4 className="font-extrabold text-gray-800 text-xl mb-3">Karakter Utama</h4>
          <p className="leading-relaxed text-lg">{profileData.desc}</p>
        </div>
        
        <div className="bg-green-50/50 p-8 rounded-2xl border border-green-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">💼</div>
          <h4 className="font-extrabold text-gray-800 text-xl mb-3">Rekomendasi Profesi</h4>
          <p className="leading-relaxed text-lg">{profileData.prof}</p>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center gap-4">
        <button 
          onClick={() => navigate('/user/mbti')} 
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
        >
          Ulangi Tes
        </button>
        <button 
          onClick={() => alert('Nanti disambung ke fitur cetak PDF/Simpan Profile')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg hover:shadow-blue-500/30"
        >
          Simpan Hasil ke Profil
        </button>
      </div>
    </div>
  );
};

export default ResultMbti;