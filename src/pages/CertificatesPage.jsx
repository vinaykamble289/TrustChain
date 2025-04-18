import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { USER_ROLES } from '../utils/constants';
import CertificateList from '../components/CertificateList';
import { fetchUserCertificates } from '../services/firebase';

function CertificatesPage() {
  const { currentUser, userRole } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Redirect to dashboard if not a college user
  useEffect(() => {
    if (userRole !== USER_ROLES.COLLEGE) {
      navigate('/dashboard');
    }
  }, [userRole, navigate]);

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        setLoading(true);
        if (currentUser) {
          const userCertificates = await fetchUserCertificates(currentUser.uid);
          setCertificates(userCertificates);
        }
      } catch (error) {
        console.error("Error loading certificates:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCertificates();
  }, [currentUser]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Issued Certificates</h1>
        <Link 
          to="/upload" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Issue New Certificate
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <CertificateList certificates={certificates} loading={loading} />
      </div>
    </div>
  );
}

export default CertificatesPage;