import React, { useState } from 'react';
import { db } from '../firebase/firebase.js';
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

function ShareCertificate() {
  const [prn, setPrn] = useState('');
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [certHash, setCertHash] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [qrGenerating, setQrGenerating] = useState(false);
  const [sharingStatus, setSharingStatus] = useState(null);

  const fetchCertificate = async () => {
    const trimmedPrn = prn.trim();
    
    if (!trimmedPrn) {
      setError('Please enter a PRN');
      return;
    }
    
    setLoading(true);
    setError(null);
    setFileUrl(null);
    setStudentName('');
    setQrCodeUrl(null);
    setSharingStatus(null);
    
    try {
      console.log("Fetching certificate for PRN:", trimmedPrn);
      const docRef = doc(db, "students", trimmedPrn);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Document data:", data);
        
        if (data.fileUrl) {
          setFileUrl(data.fileUrl);
          if (data.studentName || data.name) {
            setStudentName(data.studentName || data.name);
          }
          if (data.certHash) {
            setCertHash(data.certHash);
          }
          
          // Generate QR code immediately after getting the fileUrl
          generateQRCode(data.fileUrl);
        } else {
          setError('No certificate URL found for this PRN.');
        }
      } else {
        setError('No student found with this PRN.');
      }
    } catch (err) {
      console.error("Error fetching document:", err);
      setError('Error fetching certificate: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = async (url) => {
    if (!url) return;
    
    setQrGenerating(true);
    try {
      // Using QRServer API instead of Google Charts
      const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}';
      setQrCodeUrl(qrUrl);
      
      // Record this QR code generation in Firestore
      const docRef = doc(db, "students", prn.trim());
      const shareTimestamp = new Date();
      
      await updateDoc(docRef, {
        qrShares: arrayUnion({
          generatedAt: shareTimestamp,
          certificateUrl: url
        })
      });
      
      setSharingStatus('qr-generated');
    } catch (err) {
      console.error("Error generating QR code:", err);
      setError('Error generating QR code: ' + err.message);
    } finally {
      setQrGenerating(false);
    }
  };

  const refreshQRCode = () => {
    if (fileUrl) {
      generateQRCode(fileUrl);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      // Create a separate fetch to get the image as blob
      fetch(qrCodeUrl)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'certificate-qr-${prn.trim()}.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
        .catch(err => {
          console.error("Error downloading QR code:", err);
          setError('Error downloading QR code: ' + err.message);
        });
    }
  };

  const copyShareLink = () => {
    if (fileUrl) {
      navigator.clipboard.writeText(fileUrl)
        .then(() => {
          setSharingStatus('copied');
          setTimeout(() => setSharingStatus(prev => prev === 'copied' ? null : prev), 3000);
        })
        .catch(err => {
          console.error('Failed to copy:', err);
          setError('Failed to copy link');
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 transition-transform hover:scale-105 duration-300">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Share Certificate</h2>
        
        <div className="mb-4">
          <input
            type="text"
            value={prn}
            onChange={(e) => setPrn(e.target.value)}
            placeholder="Enter PRN"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          onClick={fetchCertificate}
          disabled={loading}
          className={`w-full py-3 mt-2 text-white font-semibold rounded-md ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          } transition duration-200`}
        >
          {loading ? 'Fetching...' : 'Fetch Certificate'}
        </button>
        
        {error && (
          <p className="mt-4 text-center text-red-500 font-medium">{error}</p>
        )}
        
        {fileUrl && (
          <div className="mt-6">
            <p className="text-center text-green-600 font-medium">✅ Certificate found!</p>
            
            {studentName && (
              <p className="text-center text-gray-700 mt-1">Student: {studentName}</p>
            )}
            
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-center text-blue-600 hover:underline font-semibold"
            >
              🔗 Download Certificate
            </a>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-center mb-4">Share Certificate via QR Code</h3>
              
              <div className="flex items-center justify-center mb-4">
                <button
                  onClick={copyShareLink}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md mr-2 transition duration-200"
                >
                  Copy Link
                </button>
                {sharingStatus === 'copied' && (
                  <span className="text-green-600 text-sm">✓ Link copied!</span>
                )}
              </div>
              
              {qrGenerating ? (
                <div className="text-center py-4">
                  <p>Generating QR Code...</p>
                </div>
              ) : qrCodeUrl ? (
                <div className="flex flex-col items-center mt-4">
                  <div className="p-4 bg-white border-2 border-gray-300 rounded-lg shadow-md">
                    <img 
                      src={qrCodeUrl} 
                      alt="Certificate QR Code" 
                      className="w-64 h-64" 
                      style={{ display: 'block' }}
                      onError={(e) => {
                        console.error("QR code failed to load");
                        setError("QR code failed to load. Please try again.");
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-4 text-center">
                    Scan this QR code to download the certificate
                  </p>
                  
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={downloadQRCode}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
                    >
                      Download QR Code
                    </button>
                    
                    <button
                      onClick={refreshQRCode}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition duration-200"
                    >
                      Refresh QR
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p>QR code will appear here after certificate is fetched.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShareCertificate;