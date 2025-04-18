
// FILE: src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">TrustChain</h1>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Decentralized Certificate Verification System
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Securely issue, store, and verify academic certificates using blockchain technology.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <Link 
            to="/verify" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md text-center"
          >
            Verify a Certificate
          </Link>
          <Link 
            to="/register" 
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-md text-center"
          >
            Register as Institution
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-blue-500 mb-4">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Tamper-Proof Security</h3>
          <p className="text-gray-600">
            Certificates are stored on the blockchain, making them immutable and resistant to fraud.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-blue-500 mb-4">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Instant Verification</h3>
          <p className="text-gray-600">
            Verify the authenticity of certificates instantly with a simple hash lookup.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-blue-500 mb-4">
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Transparent & Decentralized</h3>
          <p className="text-gray-600">
            No central authority controls the system. All verifications are transparent and trustless.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <div>
              <h3 className="font-medium">Educational institutions register on TrustChain</h3>
              <p className="text-gray-600 mt-1">
                Colleges and universities can sign up and connect their Ethereum wallet.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <div>
              <h3 className="font-medium">Institutions issue certificates on the blockchain</h3>
              <p className="text-gray-600 mt-1">
                When a student graduates, their certificate is issued with a unique hash and stored on the blockchain.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
              <span className="text-blue-600 font-bold">3</span>
            </div>
            <div>
              <h3 className="font-medium">Easy verification by employers and other institutions</h3>
              <p className="text-gray-600 mt-1">
                Anyone can verify the authenticity of a certificate by entering its hash on the verification page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
