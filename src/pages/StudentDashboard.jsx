import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
  const [showQR, setShowQR] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [shareLink, setShareLink] = useState('');
  const [linkExpiry, setLinkExpiry] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [certificateData, setCertificateData] = useState(null);
  const [verificationHistory, setVerificationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [expiryHours, setExpiryHours] = useState(24);
  const navigate = useNavigate();
  
  // Get student PRN from local storage or session
  const studentPRN = localStorage.getItem('studentPRN') || sessionStorage.getItem('studentPRN') || '12345'; // Default for demo
  
  useEffect(() => {
    // Fetch student data
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch student profile
        const profileResponse = await axios.get(`/api/student/${studentPRN}`);
        setStudentData(profileResponse.data.student);
        
        // Fetch certificate data
        const certificatesResponse = await axios.get(`/api/student/${studentPRN}/certificates`);
        setCertificateData(certificatesResponse.data.certificates);
        
        // Fetch verification history
        const historyResponse = await axios.get(`/api/student/${studentPRN}/verification-history`);
        setVerificationHistory(historyResponse.data.history || []);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchStudentData();
  }, [studentPRN]);
  
  const generateQRCode = async () => {
    try {
      // Generate a share link first
      const shareResponse = await axios.post(`/api/student/${studentPRN}/generate-share-link`, {
        expiryHours
      });
      
      setShareLink(shareResponse.data.shareLink);
      setLinkExpiry(shareResponse.data.expires);
      
      // Get QR code from our backend
      const qrResponse = await axios.get(`/api/generate-qr?data=${encodeURIComponent(shareResponse.data.shareLink)}`, {
        responseType: 'blob'
      });
      
      // Create URL for the blob data
      const qrCodeUrl = URL.createObjectURL(qrResponse.data);
      setQrCodeImage(qrCodeUrl);
      setShowQR(true);
      setShowShareOptions(false);
    } catch (error) {
      console.error("Error generating sharing link:", error);
      alert("Failed to generate QR code. Please try again.");
    }
  };
  
  const downloadCertificate = async () => {
    try {
      const response = await axios.get(`/api/student/${studentPRN}/download-certificate`);
      window.open(response.data.downloadUrl, '_blank');
    } catch (error) {
      console.error("Error downloading certificate:", error);
      alert("Failed to download certificate. Please try again.");
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy link: ", err);
      });
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeImage;
    link.download = `certificate-qr-${studentPRN}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f051d] text-white flex items-center justify-center">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-[#0f051d] text-white flex items-center justify-center">
        <div className="text-xl text-red-400">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#0f051d] text-white py-12 px-6 mt-15">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-indigo-400">Student</span> Dashboard
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            View your certificates and share them securely for verification
          </p>
          {studentData && (
            <div className="mt-4 text-gray-300">
              <p>Welcome, {studentData.studentName}</p>
              <p className="text-sm">PRN: {studentPRN}</p>
            </div>
          )}
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

          {/* My Certificates with QR popup trigger */}
          <div
            className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition"
          >
            <div className="flex items-center mb-4">
              <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold">My Certificates</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              View and download your academic certificates
            </p>
            <button
              onClick={downloadCertificate}
              className="w-full text-center bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Download Certificate
            </button>
          </div>

          {/* Share Certificate */}
          <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h3 className="text-xl font-semibold">Share Certificate</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Generate a secure link to share with verifiers
            </p>
            <button
              onClick={() => setShowShareOptions(true)}
              className="w-full text-center bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Share Options
            </button>
          </div>

          {/* Verification Status */}
          <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold">Verification Status</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm">
              Check your certificate's blockchain verification status
            </p>
            <Link
              to={`/student/verify-status/${studentPRN}`}
              className="block text-center bg-[#0f051d] hover:bg-[#1c0a35] border border-indigo-500/30 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Check Status
            </Link>
          </div>

        </div>

        {/* Share Options Modal */}
        {showShareOptions && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-[#1c0a35] p-6 rounded-xl shadow-xl w-96">
              <h2 className="text-xl font-bold mb-4 text-indigo-400">Certificate Sharing Options</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Link Expiry (Hours)
                </label>
                <input
                  type="number"
                  min="1"
                  max="720"
                  value={expiryHours}
                  onChange={(e) => setExpiryHours(parseInt(e.target.value))}
                  className="bg-[#0f051d] border border-indigo-500/30 rounded-md w-full p-2 text-white"
                />
              </div>
              <div className="flex justify-between gap-3 mt-6">
                <button 
                  onClick={generateQRCode}
                  className="flex-1 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Generate QR
                </button>
                <button 
                  onClick={() => setShowShareOptions(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* QR Code Popup */}
        {showQR && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-[#1c0a35] p-6 rounded-xl shadow-xl w-96 text-center">
              <h2 className="text-xl font-bold mb-4 text-indigo-400">Certificate QR Code</h2>
              {qrCodeImage && (
                <div className="mb-4">
                  <img 
                    src={qrCodeImage} 
                    alt="Certificate QR Code"
                    className="mx-auto border border-indigo-500 rounded-lg w-48 h-48" 
                  />
                  <p className="text-xs text-gray-300 mt-2">
                    Expires: {new Date(linkExpiry).toLocaleString()}
                  </p>
                </div>
              )}
              <div className="mb-4">
                <p className="text-xs text-gray-300 mb-2">Share Link:</p>
                <div className="bg-[#0f051d] p-2 rounded-md overflow-hidden">
                  <p className="text-xs break-all">{shareLink}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={copyShareLink}
                  className="bg-[#0f051d] hover:bg-[#150728] border border-indigo-500/30 px-3 py-2 rounded-md text-xs font-medium transition"
                >
                  Copy Link
                </button>
                <button
                  onClick={downloadQRCode}
                  className="bg-[#0f051d] hover:bg-[#150728] border border-indigo-500/30 px-3 py-2 rounded-md text-xs font-medium transition"
                >
                  Download QR
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowQR(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activity Table */}
        <div className="bg-[#1c0a35]/80 p-8 rounded-xl border border-indigo-500/20 mb-10">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <span className="text-indigo-400 mr-2">📋</span>
            Recent Verification Activity
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-500/20">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Verifier</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-500/20">
                {verificationHistory && verificationHistory.length > 0 ? (
                  verificationHistory.map((activity, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {activity.verifier}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {activity.status} ({activity.method})
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-3 text-sm text-gray-300 text-center">No recent verification activity</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Certificate Summary Section */}
        <div className="bg-[#1c0a35]/80 p-8 rounded-xl border border-indigo-500/20">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <span className="text-indigo-400 mr-2">📜</span>
            Your Certificate
          </h3>
          
          {certificateData ? (
            <div className="border border-indigo-500/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium">{certificateData.certificateName}</h4>
                <button 
                  onClick={downloadCertificate}
                  className="bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded text-xs"
                >
                  Download
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Issue Date:</p>
                  <p>{certificateData.issueDate ? new Date(certificateData.issueDate).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400">Semester:</p>
                  <p>{certificateData.semester || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400">Certificate Hash:</p>
                  <p className="truncate">{certificateData.certHash || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400">Verification Status:</p>
                  <p className="text-green-500">Verified on Blockchain</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400">No certificate available</p>
          )}
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowShareOptions(true)}
              className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Share Certificate
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;