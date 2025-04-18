import React, { useState } from 'react';
import '../styles/Register.css';

function RegisterCollege({ account, isConnected }) {
  const [collegeName, setCollegeName] = useState('');
  const [collegeID, setCollegeID] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
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
      
      setRegistrationStatus({ success: true, message: "College registered successfully!" });
      // Reset form
      setCollegeName('');
      setCollegeID('');
      setLocation('');
      setWebsite('');
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
  //       <h1>Register as a College</h1>
  //       <div className="connect-message">
  //         <p>Please connect your MetaMask wallet to register as a college.</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="register-container">
      <h1>Register as a College</h1>
      <p className="wallet-info">Connected Wallet: {account}</p>
      
      {registrationStatus && (
        <div className={`status-message ${registrationStatus.success ? 'success' : 'error'}`}>
          {registrationStatus.message}
        </div>
      )}
      
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            id="collegeName"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="collegeID">College ID/Registration Number</label>
          <input
            type="text"
            id="collegeID"
            value={collegeID}
            onChange={(e) => setCollegeID(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="website">Official Website</label>
          <input
            type="url"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="submit-btn" disabled={isRegistering}>
          {isRegistering ? 'Registering...' : 'Register College'}
        </button>
      </form>
      
      <div className="info-box">
        <h3>What happens after registration?</h3>
        <p>
          Once registered, your college will be able to issue verifiable certificates on the blockchain.
          Your college details will be stored securely and can be verified by students and employers.
        </p>
      </div>
    </div>
  );
}

export default RegisterCollege;
