
// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ account, isConnected, connectWallet }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">🔗</span>
          <span className="logo-text">TrustChain</span>
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={menuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        
        <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={location.pathname === "/" ? "nav-link active" : "nav-link"} 
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/register" 
              className={location.pathname === "/register/college" ? "nav-link active" : "nav-link"} 
              onClick={closeMenu}
            >
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/Login" 
              className={location.pathname === "/register/verifier" ? "nav-link active" : "nav-link"} 
              onClick={closeMenu}
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/issue" 
              className={location.pathname === "/issue" ? "nav-link active" : "nav-link"} 
              onClick={closeMenu}
            >
              Issue Certificate
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/certificates" 
              className={location.pathname === "/certificates" ? "nav-link active" : "nav-link"} 
              onClick={closeMenu}
            >
              View Certificates
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/verify" 
              className={location.pathname === "/verify" ? "nav-link active" : "nav-link"} 
              onClick={closeMenu}
            >
              Verify Certificate
            </Link>
          </li>
        </ul>
        
        <div className="wallet-section">
          {isConnected ? (
            <div className="wallet-info">
              <span className="wallet-address">
                {account.substring(0, 6)}...{account.substring(account.length - 4)}
              </span>
              <span className="connection-status connected">●</span>
            </div>
          ) : (
            <button className="connect-wallet-btn" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;