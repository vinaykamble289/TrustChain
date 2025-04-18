import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useContract } from '../contexts/ContractContext';
import { USER_ROLES } from '../utils/constants';
import CertificateUploadForm from '../components/CertificateUploadForm';
import ConnectWalletButton from '../components/ConnectWalletButton';

function UploadPage() {
  const { userRole } = useAuth();
  const { walletConnected } = useContract();
  const navigate = useNavigate();

  // Redirect to dashboard if not a college user
  React.useEffect(() => {
    if (userRole !== USER_ROLES.COLLEGE) {
      navigate('/dashboard');
    }
  }, [userRole, navigate]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Issue New Certificate</h1>
      
      {!walletConnected ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
          <p className="mb-6 text-gray-600">
            To issue certificates on the blockchain, you need to connect your Ethereum wallet first.
          </p>
          <ConnectWalletButton />
        </div>
      ) : (
        <CertificateUploadForm />
      )}
    </div>
  );
}

export default UploadPage;