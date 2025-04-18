import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TrustChainABI from '../TrustChainABI.json';
import { useToast, TOAST_TYPES } from './ToastContext';

const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const { showToast } = useToast();
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Contract address - replace with your deployed contract address
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

  // Initialize ethers connection and contract
  useEffect(() => {
    const initContract = async () => {
      try {
        // Check if ethereum is available
        if (window.ethereum) {
          // Create provider
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(provider);

          // Get accounts
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            
            // Get signer
            const signer = provider.getSigner();
            setSigner(signer);

            // Create contract instance
            const contract = new ethers.Contract(
              contractAddress,
              TrustChainABI,
              signer
            );
            setContract(contract);
          } else {
            // No accounts connected yet
            setContract(null);
          }
        } else {
          throw new Error("Ethereum provider not found. Please install MetaMask.");
        }
      } catch (err) {
        console.error("Error initializing contract:", err);
        setError(err.message);
        showToast(
          `Failed to initialize contract: ${err.message}`,
          TOAST_TYPES.ERROR
        );
      } finally {
        setLoading(false);
      }
    };

    initContract();
  }, [contractAddress, showToast]);

  // Handle account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = async (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        
        // Recreate contract with new signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(signer);
        
        const contract = new ethers.Contract(
          contractAddress,
          TrustChainABI,
          signer
        );
        setContract(contract);
        
        showToast(`Connected to account: ${accounts[0].substring(0, 6)}...${accounts[0].substring(accounts[0].length - 4)}`, TOAST_TYPES.INFO);
      } else {
        setAccount('');
        setSigner(null);
        setContract(null);
        showToast('Disconnected from wallet', TOAST_TYPES.WARNING);
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, [contractAddress, showToast]);

  // Connect wallet function
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Ethereum provider not found. Please install MetaMask.");
      }

      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      
      // Request accounts
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      
      // Get signer
      const signer = provider.getSigner();
      setSigner(signer);
      
      // Create contract instance
      const contract = new ethers.Contract(
        contractAddress,
        TrustChainABI,
        signer
      );
      setContract(contract);
      
      showToast("Wallet connected successfully!", TOAST_TYPES.SUCCESS);
      return accounts[0];
    } catch (err) {
      console.error("Error connecting wallet:", err);
      setError(err.message);
      showToast(`Failed to connect wallet: ${err.message}`, TOAST_TYPES.ERROR);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to upload a file to the blockchain
  const uploadFile = async (fileHash, fileName, fileType) => {
    try {
      if (!contract) {
        throw new Error("Contract not initialized. Please connect your wallet.");
      }

      setLoading(true);
      
      // Call the contract method
      const tx = await contract.uploadFile(fileHash, fileName, fileType);
      
      // Wait for transaction to be mined
      await tx.wait();
      
      showToast(`File ${fileName} uploaded successfully!`, TOAST_TYPES.SUCCESS);
      return true;
    } catch (err) {
      console.error("Error uploading file:", err);
      showToast(`Failed to upload file: ${err.message}`, TOAST_TYPES.ERROR);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Function to verify a file
  const verifyFile = async (fileHash) => {
    try {
      if (!contract) {
        throw new Error("Contract not initialized. Please connect your wallet.");
      }

      setLoading(true);
      
      // Call the contract method
      const fileData = await contract.verifyFile(fileHash);
      
      if (fileData && fileData.owner !== ethers.constants.AddressZero) {
        showToast("File verification successful!", TOAST_TYPES.SUCCESS);
        return {
          owner: fileData.owner,
          fileHash: fileData.fileHash,
          fileName: fileData.fileName,
          fileType: fileData.fileType,
          timestamp: new Date(fileData.timestamp.toNumber() * 1000)
        };
      } else {
        showToast("File not found on blockchain", TOAST_TYPES.WARNING);
        return null;
      }
    } catch (err) {
      console.error("Error verifying file:", err);
      showToast(`Failed to verify file: ${err.message}`, TOAST_TYPES.ERROR);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to get user's files
  const getUserFiles = async (userAddress) => {
    try {
      if (!contract) {
        throw new Error("Contract not initialized. Please connect your wallet.");
      }

      setLoading(true);
      
      // Use current account if no address provided
      const address = userAddress || account;
      
      if (!address) {
        throw new Error("No address provided and no account connected");
      }
      
      // Call the contract method
      const fileHashes = await contract.getFilesByUser(address);
      
      // Get details for each file
      const filePromises = fileHashes.map(hash => contract.verifyFile(hash));
      const fileDetails = await Promise.all(filePromises);
      
      // Format the results
      const files = fileDetails.map(file => ({
        owner: file.owner,
        fileHash: file.fileHash,
        fileName: file.fileName,
        fileType: file.fileType,
        timestamp: new Date(file.timestamp.toNumber() * 1000)
      }));
      
      return files;
    } catch (err) {
      console.error("Error getting user files:", err);
      showToast(`Failed to get user files: ${err.message}`, TOAST_TYPES.ERROR);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    contract,
    provider,
    signer,
    account,
    loading,
    error,
    connectWallet,
    uploadFile,
    verifyFile,
    getUserFiles,
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};

// Custom hook to use contract context
export const useContract = () => {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};

export default ContractContext;