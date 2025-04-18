// src/pages/RegisterVerifier.jsx
import React, { useState } from 'react';
import '../styles/Register.css';

function RegisterVerifier({ account, isConnected }) {
  const [verifierName, setVerifierName] = useState('');
  const [verifierType, setVerifierType] = useState('employer');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // if (!isConnected) {
    //   alert("Please connect your MetaMask wallet first");
    //   return;
    // }
    
    try {
      setIsRegistering(true);
      // Here you would interact with your smart contract
      // This is a placeholder for the actual blockchain interaction
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating blockchain interaction
      
      setRegistrationStatus({ success: true, message: "Verifier registered successfully!" });
      // Reset form
      setVerifierName('');
      setVerifierType('employer');
      setOrganization('');
      setEmail('');
    } catch (error) {
      console.error(error);
      setRegistrationStatus({ success: false, message: "Registration failed. Please try again." });
    } finally {
      setIsRegistering(false);
    }
  };

  // if (!isConnected) {
  //   return (
  //     <div className="register-container">
  //       <h1>Register as a Verifier</h1>
  //       <div className="connect-message">
  //         <p>Please connect your MetaMask wallet to register as a verifier.</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="register-container">
      <h1>Register as a Verifier</h1>
      <p className="wallet-info">Connected Wallet: {account}</p>
      
      {registrationStatus && (
        <div className={`status-message ${registrationStatus.success ? 'success' : 'error'}`}>
          {registrationStatus.message}
        </div>
      )}
      
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="verifierName">Full Name</label>
          <input
            type="text"
            id="verifierName"
            value={verifierName}
            onChange={(e) => setVerifierName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="verifierType">Verifier Type</label>
          <select
            id="verifierType"
            value={verifierType}
            onChange={(e) => setVerifierType(e.target.value)}
            required
          >
            <option value="employer">Employer</option>
            <option value="recruiter">Recruiter</option>
            <option value="educational">Educational Institution</option>
            <option value="government">Government Agency</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="organization">Organization</label>
          <input
            type="text"
            id="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="submit-btn" disabled={isRegistering}>
          {isRegistering ? 'Registering...' : 'Register as Verifier'}
        </button>
      </form>
      
      <div className="info-box">
        <h3>What happens after registration?</h3>
        <p>
          Once registered, you will be able to verify certificates issued to students.
          Your verifier status will be recorded on the blockchain, creating a trusted network
          of certificate verification.
        </p>
      </div>
    </div>
  );
}

export default RegisterVerifier;
