import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingMbti = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 mt-12">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-blue-600 p-8 text-center">
          <h1 className="text-3xl font-extrabold text-white mb-2">Tes Kepribadian Pena Bangsa</h1>
          <p className="text-blue-100 text-lg">Kenali dirimu lebih dalam untuk menemukan potensi terbaikmu!</p>
        </div>
        
        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Instruksi Pengerjaan:</h3>
          <ul className="space-y-3 text-gray-600 mb-8">
            <li className="flex items-start">
              <span className="mr-3 text-xl">⏱️</span>
              <p>Tes ini terdiri dari <strong>60 pertanyaan</strong> dan biasanya memakan waktu sekitar 10-15 menit.</p>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-xl">💡</span>
              <p>Tidak ada jawaban yang benar atau salah. Jawablah secara spontan sesuai dengan apa yang <strong>paling mencerminkan dirimu</strong>, bukan apa yang kamu inginkan.</p>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-xl">✅</span>
              <p>Pilih satu dari dua pernyataan (A atau B) di setiap nomor. Kamu harus mengisi semua pertanyaan untuk melihat hasilnya.</p>
            </li>
          </ul>

          <div className="flex justify-center mt-10">
            <button 
              onClick={() => navigate('/user/mbti/test')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
            >
              Mulai Tes Sekarang 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingMbti;