import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mbtiQuestions } from '../../../utils/mbtiQuestions';
import { calculateMBTI } from '../../../utils/mbtiScoring';

const MbtiTest = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (questionId, choice) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: choice,
    }));
    
    // Auto-next delay
    if (currentIndex < mbtiQuestions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 250);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Kalkulasi hasil langsung di frontend
    const finalType = calculateMBTI(answers);
    
    // Simulasi loading sebentar biar terasa natural, lalu pindah halaman
    setTimeout(() => {
      setIsSubmitting(false);
      // Lempar hasil kalkulasi ke halaman Result via state React Router
      navigate('/user/mbti/result', { 
        state: { mbtiType: finalType } 
      });
    }, 1000);
  };

  const currentQ = mbtiQuestions[currentIndex];
  const progressPercentage = ((currentIndex) / mbtiQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sedang Mengerjakan Tes...</h1>
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
          className="px-5 py-2.5 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          ← Sebelumnya
        </button>

        {currentIndex === mbtiQuestions.length - 1 ? (
          <button 
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < mbtiQuestions.length || isSubmitting}
            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg disabled:opacity-50 transition-colors shadow-md"
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