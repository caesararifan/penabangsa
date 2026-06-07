import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Hapus 'BrowserRouter as Router'

// Import Komponen & Halaman (tetap sama)
import ProtectedRoute from './components/ProtectedRoute';
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import MyCourses from './pages/MyCourses';
import LearningPath from './pages/LearningPath';
import Certificates from './pages/Certificates';
import Settings from './pages/Settings';
import MentorDashboard from './pages/MentorDashboard';
import MentorCourses from './pages/MentorCourses';
import MentorStudents from './pages/MentorStudents';
import MentorAnalytics from './pages/MentorAnalytics';
import MentorSettings from './pages/MentorSettings';
import LandingMbti from './pages/users/Mbti/LandingMbti';
import MbtiTest from './pages/users/Mbti/MbtiTest';
import ResultMbti from './pages/users/Mbti/ResultMbti';
// IMPORT HALAMAN BARU (Nanti kita buat)
import CourseDetail from './pages/CourseDetail'; 

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('token') !== null);

  const handleAuthChange = () => {
    setIsAuth(localStorage.getItem('token') !== null);
  };

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(localStorage.getItem('token') !== null);
    };
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    // DI SINI: Hapus tag <Router>
    <Routes>
      {/* 1. PUBLIC ROUTES */}
      <Route 
        path="/login" 
        element={isAuth ? <Navigate to="/" replace /> : <Login onAuthChange={handleAuthChange} />} 
      />

      {/* 2. STUDENT ROUTES */}
      <Route element={<ProtectedRoute isAuth={isAuth} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/learning-path" element={<LearningPath />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/user/mbti" element={<LandingMbti />} />
        <Route path="/user/mbti/test" element={<MbtiTest />} />
        <Route path="/user/mbti/result" element={<ResultMbti />} />
      </Route>

      {/* 3. MENTOR ROUTES */}
      <Route element={<ProtectedRoute isAuth={isAuth} allowedRole="mentor" />}>
        <Route path="/mentor/dashboard" element={<MentorDashboard />} />
        <Route path="/mentor/courses" element={<MentorCourses />} />
        <Route path="/mentor/course/:id" element={<CourseDetail />} /> {/* Rute Detail Kursus */}
        <Route path="/mentor/students" element={<MentorStudents />} />
        <Route path="/mentor/analytics" element={<MentorAnalytics />} />
        <Route path="/mentor/settings" element={<MentorSettings />} />
      </Route>

      {/* 4. REDIRECT LOGIC */}
      <Route 
        path="/" 
        element={
          isAuth 
            ? (JSON.parse(localStorage.getItem('user'))?.role === 'mentor' 
                ? <Navigate to="/mentor/dashboard" replace /> 
                : <Navigate to="/dashboard" replace />)
            : <Navigate to="/login" replace />
        } 
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    // DI SINI: Hapus tag </Router>
  );
}

export default App;