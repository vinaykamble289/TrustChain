// FILE: src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ContractProvider } from './contexts/ContractContext';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import VerifyPage from './pages/VerifyPage';
import CertificatesPage from './pages/CertificatesPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';

import './tailwind.css';

function App() {
  return (
      <AuthProvider>
        <ToastProvider>
          <ContractProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route 
                  path="dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="issue" element={<CertificatesPage/>}/>
                <Route 
                  path="upload" 
                  element={
                    <ProtectedRoute requiredRole="college">
                      <UploadPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="verify" element={<VerifyPage />} />
                <Route 
                  path="certificates" 
                  element={
                    <ProtectedRoute requiredRole="college">
                      <CertificatesPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
            
        </ContractProvider>
      </ToastProvider>
      </AuthProvider>
  );
}

export default App;