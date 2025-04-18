
// src/pages/VerifyCertificate.jsx
import React, { useState, useEffect } from 'react';
import '../styles/VerifyCertificate.css';

function VerifyCertificate({ account, isConnected }) {
  const [studentAddress, setStudentAddress] = useState('');
  const [certificateId, setCertificateId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifier, setIsVerifier] = useState(false);
  
  // Simulate checking if wallet is registered as a verifier
  useEffect(() => {
    if (isConnected) {
      // This would be a call to your contract to check if the address is a registered verifier
      // For demo purposes, we'll just simulate this check
      setIsVerifier(true);
    }
  }, [isConnected, account]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert("Please connect your MetaMask wallet first");
      return;
    }
    
    if (!isVerifier) {
      alert("Only registered verifiers can verify certificates");
      return;
    }
    
    try {
      setIsVerifying(true);
      // Here you would interact with your smart contract to verify a certificate
      // This is a placeholder for the actual blockchain interaction
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating blockchain interaction
      
      // Mock verification success for demo
      setVerificationResult({
        success: true,
        certificate: {
          id: certificateId || '12345',
          type: 'degree',
          name: 'Bachelor of Computer Science',
          issuer: 'University of Blockchain',
          issuerAddress: '0x1234...5678',
          issuedDate: '2023-06-15',
          expiryDate: '',
          grade: 'First Class Honors',
          studentAddress: studentAddress,
          verificationCount: 3,
          lastVerified: '2024-04-10'
        }
      });
    } catch (error) {
      console.error(error);
      setVerificationResult({ 
        success: false, 
        message: "Certificate verification failed. The certificate either does not exist or has been tampered with." 
      });
    } finally {
      setIsVerifying(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="verify-container">
        <h1>Verify Certificate</h1>
        <div className="connect-message">
          <p>Please connect your MetaMask wallet to verify certificates.</p>
        </div>
      </div>
    );
  }

  if (!isVerifier) {
    return (
      <div className="verify-container">
        <h1>Verify Certificate</h1>
        <div className="error-message">
          <p>Only registered verifiers can verify certificates. Please register as a verifier first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="verify-container">
      <h1>Verify Certificate</h1>
      <p className="wallet-info">Verifier Wallet: {account}</p>
      
      <form className="verify-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studentAddress">Student Wallet Address</label>
          <input
            type="text"
            id="studentAddress"
            value={studentAddress}
            onChange={(e) => setStudentAddress(e.target.value)}
            placeholder="0x..."
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="certificateId">Certificate ID (Optional)</label>
          <input
            type="text"
            id="certificateId"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            placeholder="Leave blank to verify all certificates for this address"
          />
        </div>
        
        <button type="submit" className="submit-btn" disabled={isVerifying}>
          {isVerifying ? 'Verifying...' : 'Verify Certificate'}
        </button>
      </form>
      
      {verificationResult && (
        <div className="verification-result">
          {verificationResult.success ? (
            <div className="success-result">
              <div className="success-header">
                <span className="verified-badge">✓ Verified</span>
                <h3>Certificate is authentic and valid</h3>
              </div>
              
              <div className="certificate-details">
                <h3>Certificate Details:</h3>
                <div className="detail-row">
                  <span className="detail-label">Certificate ID:</span>
                  <span className="detail-value">{verificationResult.certificate.id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{verificationResult.certificate.type}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{verificationResult.certificate.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Issued By:</span>
                  <span className="detail-value">{verificationResult.certificate.issuer}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Issuer Address:</span>
                  <span className="detail-value">{verificationResult.certificate.issuerAddress}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Issue Date:</span>
                  <span className="detail-value">{verificationResult.certificate.issuedDate}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Student Address:</span>
                  <span className="detail-value">{verificationResult.certificate.studentAddress}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Grade:</span>
                  <span className="detail-value">{verificationResult.certificate.grade}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Verification Count:</span>
                  <span className="detail-value">{verificationResult.certificate.verificationCount}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Last Verified:</span>
                  <span className="detail-value">{verificationResult.certificate.lastVerified}</span>
                </div>
              </div>
              
              <div className="verification-actions">
                <button className="action-btn">Download Verification Report</button>
                <button className="action-btn secondary">Add Verification Note</button>
              </div>
            </div>
          ) : (
            <div className="error-result">
              <span className="failed-badge">✗ Verification Failed</span>
              <p>{verificationResult.message}</p>
            </div>
          )}
        </div>
      )}
      
      <div className="info-box">
        <h3>Verification Process:</h3>
        <p>
          When you verify a certificate, the following checks are performed:
        </p>
        <ul>
          <li>Certificate existence on the blockchain</li>
          <li>Issuer authenticity</li>
          <li>Certificate integrity (not tampered)</li>
          <li>Validity period check</li>
        </ul>
        <p>
          Each verification is recorded on the blockchain, creating an audit trail.
        </p>
      </div>
    </div>
  );
}

export default VerifyCertificate;
