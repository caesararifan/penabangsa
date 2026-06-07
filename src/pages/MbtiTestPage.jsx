import React, { useState } from 'react';
import { mbtiQuestions } from '../../../utils/mbtiQuestions';
import { calculateMBTI, mbtiProfiles } from '../../../utils/mbtiScoring';

const MbtiTest = () => {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleSelect = (questionId, choice) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: choice,
    }));
    
    // Pindah ke pertanyaan selanjutnya otomatis jika belum di akhir
    if (currentIndex < mbtiQuestions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 250);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // 1. Eksekusi fungsi kalkulasi dari utils
    const finalType = calculateMBTI(answers);
    const profileData = mbtiProfiles[finalType];
    
    // Simulasi delay pengiriman (Nanti diganti dengan Axios Post ke PostgreSQL)
    setTimeout(() => {
      setIsSubmitting(false);
      
      // 2. Tampilkan hasil kalkulasi asli ke UI
      setResult({
        type: finalType,
        name: profileData.name,
        description: profileData.desc,
        professions: profileData.prof
      });
      
      // Catatan: Di titik ini kamu bisa lakukan 
      // axios.post('/api/mbti/results', { type: finalType, answers: answers }) 
      // untuk menyimpan ke database.

    }, 1500);
  };

  // --- TAMPILAN HALAMAN HASIL TES ---
  if (result) {
    return (
      <div className="max-w-3xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 font-semibold mb-1">TIPE KEPRIBADIAN KAMU ADALAH</p>
          <h2 className="text-5xl font-extrabold text-blue-700 tracking-tight">{result.type}</h2>
          <h3 className="text-2xl text-gray-700 font-semibold mt-2">{result.name}</h3>
        </div>
        
        <div className="space-y-6 text-gray-600">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center">
              💡 Karakter Utama
            </h4>
            <p className="leading-relaxed">{result.description}</p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h4 className="font-bold text-gray-800 mb-2 flex items-center">
              💼 Rekomendasi Profesi
            </h4>
            <p className="leading-relaxed">{result.professions}</p>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Ulangi Tes
          </button>
          <button 
            onClick={() => alert("Simpan PDF/Dashboard belum dibuat")} 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Simpan Hasil ke Profil
          </button>
        </div>
      </div>
    );
  }

  // --- TAMPILAN PENGERJAAN SOAL ---
  const currentQ = mbtiQuestions[currentIndex];
  const progressPercentage = ((currentIndex) / mbtiQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Tes Kepribadian Pena Bangsa</h1>
        <div className="flex justify-between text-sm text-gray-500 mb-2 font-medium">
          <span>Progress Penyelesaian</span>
          <span>{currentIndex + 1} / {mbtiQuestions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-8 border border-gray-100 min-h-[300px] flex flex-col justify-center">
        <h3 className="text-lg font-medium mb-6 text-center text-gray-700">
          Pilih pernyataan yang paling sesuai dengan dirimu
        </h3>
        
        <div className="flex flex-col space-y-4">
          <button 
            className={`p-5 border-2 rounded-xl text-left transition-all duration-200 ${
              answers[currentQ.id] === 'A' 
                ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-sm font-medium transform scale-[1.01]' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700'
            }`}
            onClick={() => handleSelect(currentQ.id, 'A')}
          >
            A. {currentQ.statement_a}
          </button>
          
          <button 
            className={`p-5 border-2 rounded-xl text-left transition-all duration-200 ${
              answers[currentQ.id] === 'B' 
                ? 'bg-blue-50 border-blue-500 text-blue-800 shadow-sm font-medium transform scale-[1.01]' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700'
            }`}
            onClick={() => handleSelect(currentQ.id, 'B')}
          >
            B. {currentQ.statement_b}
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button 
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className="px-5 py-2.5 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Sebelumnya
        </button>

        {currentIndex === mbtiQuestions.length - 1 ? (
          <button 
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < mbtiQuestions.length || isSubmitting}
            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg disabled:opacity-50 flex items-center transition-colors shadow-md"
          >
            {isSubmitting ? 'Mengkalkulasi...' : 'Lihat Hasil Tes ✓'}
          </button>
        ) : (
          <button 
            onClick={() => setCurrentIndex(currentIndex + 1)}
            disabled={!answers[currentQ.id]}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 transition-colors"
          >
            Selanjutnya →
          </button>
        )}
      </div>
    </div>
  );
};

export default MbtiTest;