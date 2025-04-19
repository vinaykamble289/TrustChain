// src/pages/IssueCertificate.jsx
import React, { useState, useEffect } from 'react';
import '../styles/IssueCertificate.css';

function IssueCertificate({ account, isConnected }) {
  const [studentAddress, setStudentAddress] = useState('');
  const [certificateType, setCertificateType] = useState('degree');
  const [courseName, setCourseName] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [grade, setGrade] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [isIssuing, setIsIssuing] = useState(false);
  const [issueStatus, setIssueStatus] = useState(null);
  const [isCollege, setIsCollege] = useState(false);
  
  // Simulate checking if wallet is registered as a college
  useEffect(() => {
    if (isConnected) {
      // This would be a call to your contract to check if the address is a registered college
      // For demo purposes, we'll just simulate this check
      setIsCollege(true);
    }
  }, [isConnected, account]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert("Please connect your MetaMask wallet first");
      return;
    }
    
    if (!isCollege) {
      alert("Only registered colleges can issue certificates");
      return;
    }
    
    try {
      setIsIssuing(true);
      // Here you would interact with your smart contract to issue a certificate
      // This is a placeholder for the actual blockchain interaction
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating blockchain interaction
      
      setIssueStatus({ success: true, message: "Certificate issued successfully to " + studentAddress });
      // Reset form
      setStudentAddress('');
      setCertificateType('degree');
      setCourseName('');
      setGrade('');
      setAdditionalDetails('');
      // Keep the dates as they might issue multiple certificates on the same day
    } catch (error) {
      console.error(error);
      setIssueStatus({ success: false, message: "Failed to issue certificate. Please try again." });
    } finally {
      setIsIssuing(false);
    }
  };

  // if (!isConnected) {
  //   return (
  //     <div className="issue-container">
  //       <h1>Issue Certificate</h1>
  //       <div className="connect-message">
  //         <p>Please connect your MetaMask wallet to issue certificates.</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!isCollege) {
  //   return (
  //     <div className="issue-container">
  //       <h1>Issue Certificate</h1>
  //       <div className="error-message">
  //         <p>Only registered colleges can issue certificates. Please register your institution first.</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="issue-container">
      <h1>Issue Digital Certificate</h1>
      <p className="wallet-info">College Wallet: {account}</p>
      
      {issueStatus && (
        <div className={`status-message ${issueStatus.success ? 'success' : 'error'}`}>
          {issueStatus.message}
        </div>
      )}
      
      <form className="issue-form" onSubmit={handleSubmit}>
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
          <label htmlFor="certificateType">Certificate Type</label>
          <select
            id="certificateType"
            value={certificateType}
            onChange={(e) => setCertificateType(e.target.value)}
            required
          >
            <option value="degree">Degree</option>
            <option value="diploma">Diploma</option>
            <option value="certificate">Course Certificate</option>
            <option value="achievement">Achievement Certificate</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="courseName">Course/Degree Name</label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="issueDate">Issue Date</label>
            <input
              type="date"
              id="issueDate"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group half">
            <label htmlFor="expiryDate">Expiry Date (if applicable)</label>
            <input
              type="date"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="grade">Grade/Result (if applicable)</label>
          <input
            type="text"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="additionalDetails">Additional Details</label>
          <textarea
            id="additionalDetails"
            value={additionalDetails}
            onChange={(e) => setAdditionalDetails(e.target.value)}
            placeholder="Any other relevant information about the certificate"
            rows="4"
          ></textarea>
        </div>
        
        <button type="submit" className="submit-btn" disabled={isIssuing}>
          {isIssuing ? 'Issuing Certificate...' : 'Issue Certificate'}
        </button>
      </form>
      
      <div className="info-box">
        <h3>Important Notes:</h3>
        <ul>
          <li>Make sure the student wallet address is correct. Certificates cannot be revoked once issued.</li>
          <li>The certificate will be permanently stored on the blockchain.</li>
          <li>The student will be able to share their certificate with potential employers or other institutions.</li>
        </ul>
      </div>
    </div>
  );
}

export default IssueCertificate;