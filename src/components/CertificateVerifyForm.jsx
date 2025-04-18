
// FILE: src/components/CertificateVerifyForm.jsx
import React, { useState } from 'react';
import { verifyCertificate } from '../services/contract';
import { useContract } from '../contexts/ContractContext';
import { useToast } from '../contexts/ToastContext';
import LoadingSpinner from './LoadingSpinner';
import { isValidEthereumHash, formatDate } from '../utils/helpers';

function CertificateVerifyForm({ initialHash = '' }) {
  const [certificateHash, setCertificateHash] = useState(initialHash);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  
  const { contract } = useContract();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!certificateHash) {
      showToast("Please enter a certificate hash", "error");
      return;
    }
    
    if (!isValidEthereumHash(certificateHash)) {
      showToast("Invalid certificate hash format", "error");
      return;
    }
    
    try {
      setIsVerifying(true);
      setVerificationResult(null);
      
      const result = await verifyCertificate(certificateHash);
      setVerificationResult(result);
      
      if (result.isValid) {
        showToast("Certificate verified successfully!", "success");
      } else {
        showToast("Certificate could not be verified", "error");
      }
    } catch (error) {
      console.error("Error verifying certificate:", error);
      showToast("Error verifying certificate. Please try again.", "error");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Verify Certificate</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="certificateHash">
            Certificate Hash *
          </label>
          <input
            type="text"
            id="certificateHash"
            value={certificateHash}
            onChange={(e) => setCertificateHash(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the certificate hash (0x...)"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isVerifying}
          className="w-full py-2 px-4 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600"
        >
          {isVerifying ? (
            <span className="flex items-center justify-center">
              <LoadingSpinner /> <span className="ml-2">Verifying...</span>
            </span>
          ) : (
            'Verify Certificate'
          )}
        </button>
      </form>
      
      {verificationResult && (
        <div className={`mt-6 p-4 rounded-md ${verificationResult.isValid ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-center">
            {verificationResult.isValid ? (
              <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <h3 className={`font-medium ${verificationResult.isValid ? 'text-green-800' : 'text-red-800'}`}>
              {verificationResult.isValid ? 'Certificate is Valid' : 'Certificate is Invalid'}
            </h3>
          </div>
          
          {verificationResult.isValid && (
            <div className="mt-4 text-sm text-gray-700">
              <p><span className="font-medium">Student Name:</span> {verificationResult.studentName}</p>
              <p><span className="font-medium">Course:</span> {verificationResult.courseDetails}</p>
              <p><span className="font-medium">Issue Date:</span> {formatDate(verificationResult.issueDate)}</p>
              <p><span className="font-medium">Issuer:</span> {verificationResult.issuer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CertificateVerifyForm;
