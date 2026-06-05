import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // 1. Cek apakah user sudah login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Cek apakah Role user sesuai (Opsional: buat proteksi Mentor vs Student)
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  // Jika aman, tampilkan halaman yang dituju
  return <Outlet />;
};

export default ProtectedRoute;