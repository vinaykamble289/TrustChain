
// FILE: src/contexts/ContractContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeContract } from '../services/contract';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const ContractContext = createContext();

export function useContract() {
  return useContext(ContractContext);
}

export function ContractProvider({ children }) {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(''); 
  const { currentUser, userRole } = useAuth();
  //const { showToast } = useToast();

  useEffect(() => {
    if (currentUser && userRole === 'college') {
      initContract();
    } else {
      initReadOnlyContract();
    }
  }, [currentUser, userRole]);

  const initContract = async () => {
    try {
      setLoading(true);
      const { provider: p, signer: s, contract: c } = await initializeContract();
      
      setProvider(p);
      setSigner(s);
      setContract(c);
      
      if (s) {
        const address = await s.getAddress();
        setWalletAddress(address);
        setWalletConnected(true);
      }
    } catch (error) {
      console.error("Error initializing contract:", error);
      //showToast("Failed to connect to blockchain. Please ensure MetaMask is installed and connected.", "error");
    } finally {
      setLoading(false);
    }
  };

  const initReadOnlyContract = async () => {
    try {
      setLoading(true);
      const { provider: p, contract: c } = await initializeContract();
      
      setProvider(p);
      setContract(c);
      setSigner(null);
      setWalletConnected(false);
      setWalletAddress('');
    } catch (error) {
      console.error("Error initializing read-only contract:", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    provider,
    signer,
    contract,
    loading,
    walletConnected,
    walletAddress,
    connectWallet: initContract
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
}