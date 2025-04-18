
// FILE: src/services/contract.js
import { ethers } from 'ethers';
import TrustChainABI from '../TrustChainABI.json';
import { CONTRACT_ADDRESS } from '../utils/constants';

let provider;
let signer;
let contract;

export const initializeContract = async () => {
  if (window.ethereum) {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract(CONTRACT_ADDRESS, TrustChainABI, signer);
      
      return { provider, signer, contract };
    } catch (error) {
      console.error("User denied account access or error occurred:", error);
      throw error;
    }
  } else {
    // Fallback to read-only provider for verification functionality
    provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/YOUR_INFURA_KEY");
    contract = new ethers.Contract(CONTRACT_ADDRESS, TrustChainABI, provider);
    
    return { provider, contract, signer: null };
  }
};

export const issueCertificate = async (studentName, certificateHash, courseDetails, issueDate) => {
  if (!contract || !signer) {
    throw new Error("Contract not initialized or signer not available");
  }
  
  const tx = await contract.issueCertificate(
    studentName,
    certificateHash,
    courseDetails,
    issueDate
  );
  
  return await tx.wait();
};

export const verifyCertificate = async (certificateHash) => {
  if (!contract) {
    throw new Error("Contract not initialized");
  }
  
  const result = await contract.verifyCertificate(certificateHash);
  return {
    isValid: result.isValid,
    issuer: result.issuer,
    studentName: result.studentName,
    courseDetails: result.courseDetails,
    issueDate: Number(result.issueDate) * 1000, // Convert to milliseconds
    certificateHash: result.certificateHash
  };
};

export const getCertificatesForIssuer = async (issuerAddress) => {
  if (!contract) {
    throw new Error("Contract not initialized");
  }
  
  const certificateCount = await contract.getCertificateCountForIssuer(issuerAddress);
  const certificates = [];
  
  for (let i = 0; i < certificateCount; i++) {
    const hash = await contract.getCertificateHashForIssuerByIndex(issuerAddress, i);
    const cert = await contract.certificates(hash);
    
    certificates.push({
      isValid: cert.isValid,
      issuer: cert.issuer,
      studentName: cert.studentName,
      courseDetails: cert.courseDetails,
      issueDate: Number(cert.issueDate) * 1000,
      certificateHash: hash
    });
  }
  
  return certificates;
};
