import React, { useState } from 'react';
import { db } from '../firebase/firebase.js';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

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
      setError('Please enter a PRN.');
      return;
    }

    setLoading(true);
    setError(null);
    setFileUrl(null);
    setQrCodeUrl(null);
    setSharingStatus(null);
    setStudentName('');

    try {
      const docRef = doc(db, 'students', trimmedPrn);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.fileUrl) {
          setFileUrl(data.fileUrl);
          setStudentName(data.studentName || data.name || '');
          setCertHash(data.certHash || '');
          generateQRCode(data.fileUrl); // Trigger QR code generation
        } else {
          setError('No certificate URL found for this PRN.');
        }
      } else {
        setError('No student found with this PRN.');
      }
    } catch (err) {
      setError('Error fetching certificate: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = async (url) => {
    if (!url) return;

    setQrGenerating(true);
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
      setQrCodeUrl(qrUrl);

      const docRef = doc(db, 'students', prn.trim());
      const shareTimestamp = new Date();

      await updateDoc(docRef, {
        qrShares: arrayUnion({
          generatedAt: shareTimestamp,
          certificateUrl: url,
        }),
      });

      setSharingStatus('qr-generated');
    } catch (err) {
      setError('Error generating QR code: ' + err.message);
    } finally {
      setQrGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    fetch(qrCodeUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `certificate-qr-${prn.trim()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        setError('Error downloading QR code: ' + err.message);
      });
  };

  const copyShareLink = () => {
    if (!fileUrl) return;

    navigator.clipboard.writeText(fileUrl)
      .then(() => {
        setSharingStatus('copied');
        setTimeout(() => setSharingStatus(null), 3000);
      })
      .catch(() => {
        setError('Failed to copy link.');
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-center text-blue-700 mb-6">🎓 Share Certificate</h1>

        <input
          type="text"
          value={prn}
          onChange={(e) => setPrn(e.target.value)}
          placeholder="Enter PRN"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={fetchCertificate}
          disabled={loading}
          className={`w-full py-3 mt-4 text-white font-semibold rounded-md transition duration-200 ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Fetching...' : 'Fetch Certificate'}
        </button>

        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

        {fileUrl && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-semibold">✅ Certificate found!</p>
            <p className="text-gray-700">Student: {studentName}</p>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-blue-600 hover:underline"
            >
              🔗 Download Certificate
            </a>

            <div className="mt-6 border-t pt-6">
              <h2 className="text-lg font-medium mb-4">Share via QR Code</h2>

              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={copyShareLink}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  Copy Link
                </button>
                {sharingStatus === 'copied' && (
                  <span className="text-green-600 self-center">✓ Copied</span>
                )}
              </div>

              {qrGenerating ? (
                <p>Generating QR Code...</p>
              ) : qrCodeUrl ? (
                <div className="flex flex-col items-center">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="w-64 h-64 border border-gray-300 p-2 rounded-md shadow"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      setError('QR Code failed to load.');
                    }}
                  />
                  <p className="text-gray-600 mt-2">Scan to access certificate</p>
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={downloadQRCode}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    >
                      Download QR
                    </button>
                    <button
                      onClick={() => generateQRCode(fileUrl)}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                    >
                      Refresh QR
                    </button>
                  </div>
                </div>
              ) : (
                <p>QR Code will appear after certificate fetch.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShareCertificate;
