import React from 'react';
import { Link } from 'react-router-dom';

const InstituteDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0f051d] text-white py-12 px-6 mt-15">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-indigo-400">Institution</span> Dashboard
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Upload certificates, record on blockchain, and manage issued credentials
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Upload Certificate */}
          <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
                <span className="text-2xl">📤</span>
              </div>
              <h3 className="text-xl font-semibold">Upload Certificate</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Upload student certificate files to Google Drive securely
            </p>
            <Link
              to="/instituteUpload"
              className="block text-center bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Upload Now
            </Link>
          </div>


          {/* Issue on Blockchain */}
          <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
                <span className="text-2xl">⛓️</span>
              </div>
              <h3 className="text-xl font-semibold">Issue Certificate</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Record document hash and metadata on the blockchain
            </p>
            <Link
              to="/issuedCertificate"
              className="block text-center bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Issue Certificate
            </Link>
          </div>

          {/* Manage Issued Certificates */}
          <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold">Issued Certificates</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              View and manage all certificates issued by your institution
            </p>
            <Link
              to="/issuedCertificate"
              className="block text-center bg-[#0f051d] hover:bg-[#1c0a35] border border-indigo-500/30 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              View Certificates
            </Link>
          </div>

          {/* Blockchain Logs */}
          <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition col-span-full md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
                <span className="text-2xl">🧾</span>
              </div>
              <h3 className="text-xl font-semibold">Blockchain Logs</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              View logs of all blockchain interactions for auditing
            </p>
            <Link
              to="/institution/logs"
              className="block text-center bg-[#0f051d] hover:bg-[#1c0a35] border border-indigo-500/30 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              View Logs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteDashboard;
