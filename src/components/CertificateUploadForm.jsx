
// FILE: src/components/CertificateUploadForm.jsx
import React, { useState } from 'react';
import { uploadToDrive } from '../services/googleDrive';
import { issueCertificate } from '../services/contract';
import { useContract } from '../contexts/ContractContext';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';
import { ethers } from 'ethers';

function CertificateUploadForm() {
  const [studentName, setStudentName] = useState('');
  const [courseDetails, setCourseDetails] = useState('');
  const [certificateFile, setCertificateFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  
  const { contract, walletConnected } = useContract();
  const { showToast } = useToast();
  const { currentUser } = useAuth();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificateFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!walletConnected) {
      showToast("Please connect your wallet first", "error");
      return;
    }
    
    if (!studentName || !courseDetails || !certificateFile) {
      showToast("Please fill all required fields", "error");
      return;
    }
    
    try {
      setIsUploading(true);
      
      // Upload file to Google Drive
      const driveResponse = await uploadToDrive(certificateFile, {
        studentName,
        courseDetails,
        issuerEmail: currentUser.email
      });
      
      // Generate certificate hash using the file ID from Drive
      const certificateData = {
        studentName,
        courseDetails,
        fileId: driveResponse.fileId,
        timestamp: Date.now()
      };
      
      const certificateHash = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(JSON.stringify(certificateData))
      );
      
      // Issue certificate on blockchain
      const txResponse = await issueCertificate(
        studentName,
        certificateHash,
        courseDetails,
        Math.floor(Date.now() / 1000) // Convert to seconds
      );
      
      setTransactionHash(txResponse.transactionHash);
      
      showToast("Certificate issued successfully!", "success");
      
      // Reset form
      setStudentName('');
      setCourseDetails('');
      setCertificateFile(null);
      
    } catch (error) {
      console.error("Error issuing certificate:", error);
      showToast("Failed to issue certificate. Please try again.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Upload New Certificate</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="studentName">
            Student Name *
          </label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter student's full name"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="courseDetails">
            Course Details *
          </label>
          <input
            type="text"
            id="courseDetails"
            value={courseDetails}
            onChange={(e) => setCourseDetails(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Course name, duration, grade, etc."
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="certificateFile">
            Certificate File (PDF) *
          </label>
          <input
            type="file"
            id="certificateFile"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept=".pdf"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isUploading || !walletConnected}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            walletConnected ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isUploading ? (
            <span className="flex items-center justify-center">
              <LoadingSpinner /> <span className="ml-2">Processing...</span>
            </span>
          ) : (
            'Issue Certificate'
          )}
        </button>
        
        {!walletConnected && (
          <p className="mt-2 text-sm text-red-500">
            Please connect your wallet to issue certificates.
          </p>
        )}
      </form>
      
      {transactionHash && (
        <div className="mt-6 p-4 bg-green-50 rounded-md">
          <h3 className="font-medium text-green-800">Certificate Issued Successfully!</h3>
          <p className="text-sm text-green-700 mt-1">
            Transaction Hash: <span className="font-mono break-all">{transactionHash}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default CertificateUploadForm;
