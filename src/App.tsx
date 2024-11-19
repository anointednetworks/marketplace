import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SearchProvider } from './contexts/SearchContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { EmailVerificationBanner } from './components/EmailVerificationBanner';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { HomePage } from './pages/HomePage';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SearchProvider>
          <BrowserRouter>
            <EmailVerificationBanner />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}