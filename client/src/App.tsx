import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkAuth } from './redux/slices/authSlice';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import RehearsalsPage from './pages/rehearsals/RehearsalsPage';
import RehearsalDetailPage from './pages/rehearsals/RehearsalDetailPage';
import BandsPage from './pages/bands/BandsPage';
import BandDetailPage from './pages/bands/BandDetailPage';
import ProfilePage from './pages/profile/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />} />
        <Route path="/forgot-password" element={!isAuthenticated ? <ForgotPasswordPage /> : <Navigate to="/dashboard" />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/rehearsals" element={isAuthenticated ? <RehearsalsPage /> : <Navigate to="/login" />} />
        <Route path="/rehearsals/:id" element={isAuthenticated ? <RehearsalDetailPage /> : <Navigate to="/login" />} />
        <Route path="/bands" element={isAuthenticated ? <BandsPage /> : <Navigate to="/login" />} />
        <Route path="/bands/:id" element={isAuthenticated ? <BandDetailPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
      </Route>

      {/* Catch All Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
