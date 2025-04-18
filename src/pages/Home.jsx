import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home({ connectWallet, isConnected }) {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to TrustChain</h1>
        <h2>Secure Certificate Verification on the Blockchain</h2>
        <p>
          TrustChain is a decentralized platform that enables educational institutions to issue 
          tamper-proof digital certificates and allows employers to instantly verify their authenticity.
        </p>
        {!isConnected ? (
          <button className="connect-btn" onClick={connectWallet}>
            Connect with MetaMask
          </button>
        ) : (
          <div className="action-buttons">
            <Link to="/register/college" className="action-btn">Register as College</Link>
            <Link to="/register/verifier" className="action-btn">Register as Verifier</Link>
            <Link to="/certificates" className="action-btn">View Certificates</Link>
          </div>
        )}
      </section>

      <section className="features">
        <h2>Why Choose TrustChain?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Immutable Records</h3>
            <p>Certificates stored on blockchain cannot be altered or forged</p>
          </div>
          <div className="feature-card">
            <h3>Instant Verification</h3>
            <p>Verify certificates in seconds, not days or weeks</p>
          </div>
          <div className="feature-card">
            <h3>Decentralized</h3>
            <p>No central authority or single point of failure</p>
          </div>
          <div className="feature-card">
            <h3>Transparent</h3>
            <p>Full visibility into certificate issuance and verification history</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Educational institutions register on TrustChain</h3>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Institutions issue digital certificates to students</h3>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Students share certificate access with employers</h3>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Employers instantly verify certificate authenticity</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;