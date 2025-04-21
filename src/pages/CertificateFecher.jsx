import React, { useState } from 'react';
import { Download, ClipboardCopy } from 'lucide-react';

const CertificateFetcher =  () => {
  const [prn, setPrn] = useState('');
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!prn.trim()) {
      setError('Please enter a PRN.');
      return;
    }

    setLoading(true);
    setError('');
    setCertificates([]);

    try {
      const response = await fetch(`http://localhost:5000/students/${prn}`);
      if (!response.ok) {
        throw new Error('Failed to fetch certificates.');
      }
      const data = await response.json();
      setCertificates(data.certificates);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f051d] text-white py-12 px-6 mt-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">🔎 Search Student Certificates</h2>

        <form onSubmit={handleSearch} className="mb-6 flex justify-center">
          <input
            type="text"
            value={prn}
            onChange={(e) => setPrn(e.target.value)}
            placeholder="Enter PRN"
            className="px-4 py-2 text-white rounded-lg border border-indigo-400"
          />
          <button
            type="submit"
            className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
          >
            Search
          </button>
        </form>

        {loading && <p className="text-center text-indigo-300">Loading...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {certificates.length > 0 && (
          <div className="grid gap-6">
            {certificates.map((cert, index) => (
              <div key={index} className="p-4 border border-indigo-500/30 bg-[#1c0a35]/80 rounded-xl">
                <p><span className="text-indigo-300">Name:</span> {cert.studentName}</p>
                <p><span className="text-indigo-300">PRN:</span> {cert.studentPRN}</p>
                <p><span className="text-indigo-300">Semester:</span> {cert.semester}</p>
                <p><span className="text-indigo-300">Email:</span> {cert.studentEmail}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-indigo-300 text-sm">Hash: {cert.certHash}</p>
                  <button
                    onClick={() => copyToClipboard(cert.certHash, index)}
                    className="text-indigo-400 hover:text-white"
                  >
                    {copiedIndex === index ? '✅' : <ClipboardCopy className="w-5 h-5" />}
                  </button>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <a
                    href={cert.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-indigo-300"
                  >
                    View
                  </a>
                  <a
                    href={cert.fileUrl}
                    download
                    className="text-indigo-400"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateFetcher;