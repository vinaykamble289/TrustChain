import React from 'react';
import { useSearchParams } from 'react-router-dom';
import CertificateVerifyForm from '../components/CertificateVerifyForm';

function VerifyPage() {
  const [searchParams] = useSearchParams();
  const certificateHash = searchParams.get('hash') || '';

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Verify Certificate</h1>
      
      <div className="mb-6">
        <p className="text-gray-600">
          Enter the certificate hash to verify its authenticity on the blockchain.
          The verification process is instant and will confirm if the certificate 
          was issued by a registered educational institution.
        </p>
      </div>
      
      <CertificateVerifyForm initialHash={certificateHash} />
    </div>
  );
}

export default VerifyPage;