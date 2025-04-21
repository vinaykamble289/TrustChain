

import React,{ useState } from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0f051d] text-white py-20 px-6 mt-15">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-indigo-400">Student</span> Dashboard
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            View your certificates and share them securely for verification
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center mb-20 px-4">
          
          {/* My Certificates */}
          <div className="bg-[#1c0a35]/90 p-8 rounded-2xl border border-indigo-500/30 hover:border-indigo-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-500/20 p-4 rounded-lg mr-4">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-2xl font-semibold text-indigo-300">My Certificates</h3>
            </div>
            <p className="text-gray-300 mb-6 text-sm">
              View and download your academic certificates
            </p>
            <Link
              to="/my-certificates"
              className="block text-center bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-md text-sm font-medium transition"
            >
              View Certificates
            </Link>
          </div>

          {/* Share Certificate */}
          <div className="bg-[#1c0a35]/90 p-8 rounded-2xl border border-indigo-500/30 hover:border-indigo-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-500/20 p-4 rounded-lg mr-4">
                <span className="text-3xl">🔗</span>
              </div>
              <h3 className="text-2xl font-semibold text-indigo-300">Share Certificate</h3>
            </div>
            <p className="text-gray-300 mb-6 text-sm">
              Generate a secure link or QR code to share with verifiers
            </p>
            <Link
              to="/share-certificate"
              className="block text-center bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-md text-sm font-medium transition"
            >
              Share Certificate
            </Link>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-[#1c0a35]/90 p-8 rounded-2xl border border-indigo-500/20">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <span className="text-indigo-400 mr-2">📋</span>
            Recent Certificate Activity
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-500/20">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Certificate</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-500/20">
                {[
                  { action: "Viewed", cert: "B.Tech Degree", date: "2 days ago" },
                  { action: "Shared", cert: "Internship Certificate", date: "5 days ago" },
                  { action: "Downloaded", cert: "Transcript", date: "1 week ago" },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-300">{item.action}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{item.cert}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
