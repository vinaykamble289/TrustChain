
// FILE: src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-white shadow-inner py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © {new Date().getFullYear()} TrustChain - Decentralized Certificate Verification
        </div>
      </footer>
    </div>
  );
}

export default Layout;
