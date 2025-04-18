import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useContract } from '../contexts/ContractContext';
import { USER_ROLES } from '../utils/constants';
import ConnectWalletButton from '../components/ConnectWalletButton';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchUserCertificates } from '../services/firebase';

function DashboardPage() {
  const { currentUser, userRole } = useAuth();
  const { walletConnected, currentAccount } = useContract();
  const [recentCertificates, setRecentCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        if (currentUser && userRole === USER_ROLES.COLLEGE) {
          // Fetch recent certificates issued by this college
          const certificates = await fetchUserCertificates(currentUser.uid, 5);
          setRecentCertificates(certificates);
        }
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, [currentUser, userRole]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="space-y-2">
          <p><span className="font-medium">Email:</span> {currentUser?.email}</p>
          <p>
            <span className="font-medium">Account Type:</span> 
            {userRole === USER_ROLES.COLLEGE ? 'Educational Institution' : 'Verifier'}
          </p>
          
          {userRole === USER_ROLES.COLLEGE && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Wallet Status:</h3>
              {walletConnected ? (
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">●</span>
                  <span>Connected: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</span>
                </div>
              ) : (
                <ConnectWalletButton />
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {userRole === USER_ROLES.COLLEGE && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Certificates</h2>
              <Link to="/certificates" className="text-blue-500 hover:text-blue-700">
                View All
              </Link>
            </div>
            
            {loading ? (
              <div className="flex justify-center p-4">
                <LoadingSpinner />
              </div>
            ) : recentCertificates.length > 0 ? (
              <div className="space-y-4">
                {recentCertificates.map((cert) => (
                  <div key={cert.certificateHash} className="border-b pb-2">
                    <p className="font-medium">{cert.studentName}</p>
                    <p className="text-sm text-gray-600">{cert.courseDetails}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(cert.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No certificates issued yet.</p>
            )}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            {userRole === USER_ROLES.COLLEGE && (
              <Link 
                to="/upload"
                className="block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md text-center"
              >
                Issue New Certificate
              </Link>
            )}
            
            <Link 
              to="/verify"
              className="block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md text-center"
            >
              Verify Certificate
            </Link>
            
            {userRole === USER_ROLES.COLLEGE && (
              <Link 
                to="/certificates"
                className="block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md text-center"
              >
                View All Certificates
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;