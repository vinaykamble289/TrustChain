
// src/pages/ViewCertificates.jsx
import React, { useState, useEffect } from 'react';
import CertificateCard from '../components/CertificateCard';
import '../styles/ViewCertificates.css';

function ViewCertificates() {
  const [address, setAddress] = useState('');
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch certificates
  const fetchCertificates = async (walletAddress) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This would be a call to your smart contract to get certificates
      // For demo purposes, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate loading
      
      // Mock data for demonstration
      const mockCertificates = [
        {
          id: '1',
          type: 'degree',
          name: 'Bachelor of Computer Science',
          issuer: 'University of Blockchain',
          issuerAddress: '0x1234...5678',
          issuedDate: '2023-06-15',
          expiryDate: '',
          grade: 'First Class Honors',
          additionalDetails: 'Specialized in Distributed Systems and Blockchain Technologies'
        },
        {
          id: '2',
          type: 'certificate',
          name: 'Advanced Smart Contract Development',
          issuer: 'Blockchain Academy',
          issuerAddress: '0xabcd...efgh',
          issuedDate: '2024-02-10',
          expiryDate: '2026-02-10',
          grade: 'A+',
          additionalDetails: 'Completed 12-week intensive course on Solidity and smart contract security'
        }
      ];
      
      setCertificates(mockCertificates);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch certificates. Please try again.');
      setCertificates([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (address) {
      fetchCertificates(address);
    }
  };

  // Check if connected user has any certificates
  useEffect(() => {
    // If user connects with MetaMask, we could auto-fill their address
    // For demo purposes, we'll leave this as manual input
  }, []);

  return (
    <div className="view-certificates-container">
      <h1>View Certificates</h1>
      
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address (0x...)"
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="certificates-section">
        {isLoading ? (
          <div className="loading">Loading certificates...</div>
        ) : certificates.length > 0 ? (
          <>
            <h2>Certificates for {address.substring(0, 6)}...{address.substring(address.length - 4)}</h2>
            <div className="certificates-grid">
              {certificates.map(cert => (
                <CertificateCard key={cert.id} certificate={cert} />
              ))}
            </div>
          </>
        ) : address ? (
          <div className="no-certificates">
            <p>No certificates found for this address.</p>
          </div>
        ) : (
          <div className="instructions">
            <p>Enter a wallet address to view associated certificates.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewCertificates;
