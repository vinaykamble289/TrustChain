
// FILE: src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useContract } from '../contexts/ContractContext';
import { logOut } from '../services/firebase';
import { useToast } from '../contexts/ToastContext';
import { truncateAddress } from '../utils/helpers';

function Navbar() {
  const { currentUser, userRole } = useAuth();
  const { walletConnected, walletAddress, connectWallet } = useContract();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      showToast('Logged out successfully', 'success');
      navigate('/');
    } catch (error) {
      showToast('Failed to log out', 'error');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-blue-600">TrustChain</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/verify" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
              Verify Certificate
            </Link>
            
            {currentUser ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                
                {userRole === 'college' && (
                  <>
                    <Link to="/upload" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
                      Upload Certificate
                    </Link>
                    <Link to="/certificates" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600">
                      My Certificates
                    </Link>
                  </>
                )}
                
                {userRole === 'college' && !walletConnected && (
                  <button 
                    onClick={connectWallet}
                    className="px-3 py-2 bg-yellow-500 text-white rounded-md text-sm font-medium hover:bg-yellow-600"
                  >
                    Connect Wallet
                  </button>
                )}
                
                {walletConnected && (
                  <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700">
                    {truncateAddress(walletAddress)}
                  </span>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600">
                  Login
                </Link>
                <Link to="/register" className="px-3 py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600">
                  Register
                </Link>
              </>
            )}
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/verify" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Verify Certificate
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                
                {userRole === 'college' && (
                  <>
                    <Link 
                      to="/upload" 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Upload Certificate
                    </Link>
                    <Link 
                      to="/certificates" 
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Certificates
                    </Link>
                  </>
                )}
                
                {userRole === 'college' && !walletConnected && (
                  <button 
                    onClick={() => {
                      connectWallet();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 bg-yellow-500 text-white rounded-md text-base font-medium hover:bg-yellow-600"
                  >
                    Connect Wallet
                  </button>
                )}
                
                {walletConnected && (
                  <span className="block px-3 py-2 rounded-md text-base font-medium text-gray-700">
                    {truncateAddress(walletAddress)}
                  </span>
                )}
                
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 bg-red-500 text-white rounded-md text-base font-medium hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 bg-blue-500 text-white rounded-md text-base font-medium hover:bg-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 bg-green-500 text-white rounded-md text-base font-medium hover:bg-green-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;