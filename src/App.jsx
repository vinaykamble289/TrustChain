import React from 'react';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import UploadCertificate from './pages/UploadCertificate';
import VerifyCertificate from './pages/VerifyCertificate';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Footer from './pages/Footer';
import AdminPage from './pages/AdminPage';
import StudentDashboard from './pages/StudentDashboard';
import Contact from './pages/Contact';
import InstituteDashboard from './pages/InstituteDashboard';
import IssuedCertificate from './pages/IssuedCertificate';
import Forum from './pages/Forum'
import VerifierDashboard from './pages/VerifierDashboard';
import { Verified as VerifiedIcon } from 'lucide-react';
import Unverified from './pages/Unverified';
import Verified from './pages/Verified';
import ForgotPassword from './pages/ForgotPassword';
import TrustChainBot from './components/TrustChainBot';
import ChatbotIcon from './components/ChatbotIcon';
// import StudentCertificate from './pages/StudentCertificate';
import ShareCertificate from './pages/ShareCertificate';
import CertificateFetcher from './pages/CertificateFecher';
import AddStudents from './pages/AddStudents';


const App = () => {
  return (
    <AuthProvider>
    <Router>
      <div className="min-h-screen bg-gray-50">
      <Navbar/>
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/instituteUpload" element={<UploadCertificate />} /> */}
            <Route path="/verify" element={<VerifyCertificate />} />
            <Route path='/admin' element={< AdminPage/>}/>
       <Route path='/student' element={< StudentDashboard/>}/>
       <Route path='/contact' element={< Contact/>}/>
       <Route path='/institute' element={<InstituteDashboard/>}/>
       <Route path='/issuedCertificate'element={<IssuedCertificate/>}/>
       <Route path='/forum' element={<Forum/>}/>
       <Route path='/verifier' element={< VerifierDashboard/>}/>
       <Route path='/verified' element={< Verified/>}/>
       <Route path='/unverified' element={< Unverified/>}/>
        <Route path='/chatbot' element={< TrustChainBot/>}/>
       <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/share-certificate' element={< ShareCertificate/>}/>
        <Route path="/upload-certificate" element={<UploadCertificate />} />
        <Route path="/add-students" element={<AddStudents />} />
       <Route path='/my-certificates' element={< CertificateFetcher/>}/>
       {/* <Route path='/share-certificate' element={< ShareCertificate/>}/> */}
          </Routes>
        </main>
        <ChatbotIcon />
        <Footer/>
      </div>
    </Router>
    </AuthProvider>
  );
};

export default App; 