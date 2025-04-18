import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ConnectWalletButton = ({ onConnect }) => {
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if wallet is already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            if (onConnect) onConnect(accounts[0]);
          }
        } catch (err) {
          console.error("Error checking wallet connection:", err);
        }
      }
    };
    
    checkConnection();
  }, [onConnect]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      if (onConnect) onConnect(accounts[0]);
    } catch (err) {
      console.error("Error connecting to wallet:", err);
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="wallet-connect">
      {!account ? (
        <button
          onClick={connectWallet}
          disabled={loading}
          className="connect-button bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="flex items-center">
          <div className="connected-indicator mr-2 h-3 w-3 bg-green-500 rounded-full"></div>
          <span className="wallet-address font-medium">{truncateAddress(account)}</span>
        </div>
      )}
      {error && <p className="error-message text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ConnectWalletButton;