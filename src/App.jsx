
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UploadCertificate from './pages/UploadCertificate';
import VerifyCertificate from './pages/VerifyCertificate';
import Dashboard from './pages/Dashboard';
import RegisterCollege from'./pages/RegisterCollege';
import LandingPage from'./pages/LandingPage';
import ForumPost from './pages/Forumpage';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/upload" element={<UploadCertificate />} />
        <Route path="/verify" element={<VerifyCertificate />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegisterCollege />} />
        <Route path="/forum" element={<ForumPost />} />
     
      </Routes>
    </Router>
  );
}

export default App;