import React, { useEffect, useState } from 'react';
import { Download, ClipboardCopy } from 'lucide-react';

const IssuedCertificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/students'); // 🔁 Use your backend route
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();

        // Correctly extract the certificates from the response
        setCertificates(data.students); // 'students' contains the certificates array
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-400 mb-10 text-center">🎓 Issued Certificates</h2>

        {loading ? (
          <div className="text-center text-indigo-300">Loading...</div>
        ) : certificates.length === 0 ? (
          <div className="text-center text-red-300">No certificates found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="bg-[#1c0a35]/80 border border-indigo-500/30 rounded-2xl p-6 shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
              >
                <div className="mb-3">
                  <p className="text-sm text-indigo-300">Student Name</p>
                  <p className="text-lg font-semibold text-white">{cert.studentName}</p>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-indigo-300">PRN</p>
                  <p className="text-gray-200">{cert.studentPRN}</p>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-indigo-300">Semester</p>
                  <p className="text-gray-200">{cert.semester}</p>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-indigo-300">Email</p>
                  <p className="text-gray-200">{cert.studentEmail}</p>
                </div>

                <div className="mb-3 flex items-start justify-between">
                  <div className="max-w-xs">
                    <p className="text-sm text-indigo-300">Blockchain Hash</p>
                    <p className="text-gray-400 text-sm break-all">{cert.certHash}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(cert.certHash, index)}
                    className="ml-3 text-indigo-400 hover:text-indigo-200"
                    title="Copy Hash"
                  >
                    {copiedIndex === index ? '✅' : <ClipboardCopy className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm text-indigo-300">Issued At</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(cert.issueDate).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-300 hover:text-indigo-100 underline"
                    >
                      View
                    </a>
                    <a
                      href={cert.fileUrl}
                      download
                      className="text-indigo-400 hover:text-indigo-100"
                      title="Download Certificate"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuedCertificate;
