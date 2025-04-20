
import React, { useState } from 'react';
import { db } from '../firebase/firebase.js';
import { doc, getDoc } from "firebase/firestore";

function CertificateFetcher() {
  const [prn, setPrn] = useState('');
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCertificate = async () => {
    const trimmedPrn = prn.trim();
  
    if (!trimmedPrn) {
      setError('Please enter a PRN');
      return;
    }
  
    setLoading(true);
    setError(null);
    setFileUrl(null);
  
    try {
      console.log("Fetching certificate for PRN:", trimmedPrn);
      const studentPRN = trimmedPrn.replace(/\s+/g, '');
      console.log("Trimmed PRN:", studentPRN);
  
      // 🔥 Define docRef correctly here
     
         const docSnap = await getDoc(doc(db, "students", studentPRN));
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Document data:", data);
  
        if (data.fileUrl) {
          setFileUrl(data.fileUrl);
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
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 transition-transform hover:scale-105 duration-300">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Fetch Certificate</h2>

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
          <div className="mt-6 text-center">
            <p className="text-green-600 font-medium">✅ Certificate found!</p>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-blue-600 hover:underline font-semibold"
            >
              🔗 Download Certificate
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default CertificateFetcher;