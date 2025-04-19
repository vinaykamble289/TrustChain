

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../AuthContext';
import sha256 from 'crypto-js/sha256';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('certificates');
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentPRN, setStudentPRN] = useState('');



  const verifyOnBlockchain = async (certHash) => {
    try {
      const res = await fetch(`http://localhost:5000/verify/${certHash}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Blockchain verification failed:', err);
      return null;
    }
  };

  
  
  useEffect(() => {
    const fetchCertificates = async () => {
      console.log("Logged in as:", currentUser);

      setLoading(true);
      try {
        let q;
    
        if (currentUser.email.endsWith('@admin.edu')) {
          q = query(collection(db, 'certificates'));
        } else {
          const studentQuery = query(
            collection(db, 'students'),
            where('email', '==', currentUser.email)
          );
          const studentSnapshot = await getDocs(studentQuery);
    
          if (!studentSnapshot.empty) {
            const studentData = studentSnapshot.docs[0].data();
            setStudentPRN(studentData.prn);
    
            q = query(
              collection(db, 'certificates'),
              where('studentPRN', '==', studentData.prn)
            );
          } else {
            setCertificates([]);
            setLoading(false);
            return;
          }
        }
    
        const querySnapshot = await getDocs(q);
        const certs = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const cert = { id: doc.id, ...doc.data() };
    
            // Generate hash same as backend
            const hashData = `${cert.studentPRN}-${cert.certificateName}-${cert.issueDate}`;
            const certHash = sha256(hashData).toString();
    
            const verification = await verifyOnBlockchain(certHash);
            cert.certHash = certHash;
            cert.verified = verification?.blockchainVerified || false;
    
            return cert;
          })
        );
    
        setCertificates(certs);
      } catch (err) {
        console.error('Error fetching certificates:', err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchCertificates();
    }
  }, [currentUser, activeTab]);

  const renderInstitutionDashboard = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Institution Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage and issue certificates</p>
        </div>
        <Link
          to="/upload"
          className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          <svg className="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Issue New Certificate
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Certificates</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{certificates.length}</div>
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Certificates */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Certificates</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {loading ? (
            <div className="px-6 py-4 text-center">Loading...</div>
          ) : certificates.length === 0 ? (
            <div className="px-6 py-4 text-center text-gray-500">No certificates found</div>
          ) : (
            certificates.slice(0, 5).map((cert) => (
              <div key={cert.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3">
                      <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-md font-medium text-gray-900">{cert.studentName}</h4>
                      <p className="text-sm text-gray-500">{cert.certificateName} (Semester {cert.semester})</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                    <a 
                      href={cert.fileURL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="px-6 py-4 bg-gray-50 text-right">
          <Link to="/certificates" className="text-indigo-600 hover:text-indigo-900 font-medium">
            View all certificates →
          </Link>
        </div>
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
        <p className="text-gray-600 mt-2">View and manage your academic credentials</p>
        {studentPRN && (
          <p className="text-sm text-gray-500 mt-1">PRN: {studentPRN}</p>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('certificates')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'certificates' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Certificates
          </button>
          <button
            onClick={() => setActiveTab('shared')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'shared' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Shared
          </button>
        </nav>
      </div>

      {/* Certificate Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center py-8">Loading your certificates...</div>
        ) : certificates.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No certificates found. Contact your institution if you believe this is an error.
          </div>
        ) : (
          certificates.map((cert) => (
            <div key={cert.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3">
                    <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{cert.certificateName}</h3>
                    <p className="text-sm text-gray-500">Semester {cert.semester}</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500">ISSUED</p>
                    <p className="text-sm text-gray-900">{new Date(cert.issueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">STATUS</p>
                    <p className="text-sm text-green-600 font-medium">{cert.status}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-between">
                <a 
                  href={cert.fileURL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                >
                  View Details
                </a>
                <div className="flex space-x-3">
                  <a 
                    href={cert.fileURL} 
                    download
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const isInstitution = currentUser.email.endsWith('@admin.edu'); // Adjust this check based on your auth system

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-900">CertiChain</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 font-medium">
                    {currentUser.displayName ? currentUser.displayName.charAt(0) : currentUser.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {currentUser.displayName || currentUser.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isInstitution ? renderInstitutionDashboard() : renderStudentDashboard()}
      </main>
    </div>
  );
};

export default Dashboard;