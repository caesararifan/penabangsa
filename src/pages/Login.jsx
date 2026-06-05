import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm"; 
import api from "../utils/api"; 

const Login = ({ onAuthChange }) => {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (token && !loading) {
      if (user?.role === 'mentor') {
        navigate('/mentor/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [navigate, loading]);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (onAuthChange) onAuthChange();

      if (user.role === 'mentor') {
        navigate('/mentor/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Email atau password salah!');
    } finally {
      setLoading(false);
    }
  };

  // --- PERBAIKAN REGISTER REAL ---
  const handleRegister = async (userData) => { // Menerima objek utuh
    setLoading(true);
    setError('');

    try {
      // WAJIB PAKAI FORMDATA KARENA ADA FILE
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      formData.append('role', userData.role);

      if (userData.role === 'mentor') {
        formData.append('occupation', userData.occupation);
        formData.append('expertise', userData.expertise);
        formData.append('certificate', userData.certificate); // File binary
      }

      const response = await api.post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert(response.data.message || 'Registrasi Berhasil! Silakan masuk.');
      setIsLoginView(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mendaftar, coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex bg-white overflow-hidden selection:bg-blue-100">
      <Sidebar />
      <div className="flex-1 flex flex-col relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-125 h-125 bg-blue-50/40 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
        <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10 px-8 lg:p-12">
          <div className="min-h-full flex flex-col justify-center items-center py-20">
            <div className="w-full max-w-100">
              {isLoginView ? (
                <LoginForm onLogin={handleLogin} loading={loading} error={error} onNavigateToRegister={() => { setIsLoginView(false); setError(''); }} />
              ) : (
                <RegisterForm onRegister={handleRegister} loading={loading} error={error} onNavigateToLogin={() => { setIsLoginView(true); setError(''); }} />
              )}
            </div>
          </div>
        </div>
        <div className="w-full py-6 flex flex-col items-center gap-2 bg-white/80 backdrop-blur-md border-t border-slate-50 relative z-20">
          <div className="h-0.5 w-6 bg-slate-200 rounded-full" />
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.4em]">Pena Bangsa Ecosystem &copy; 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Login;