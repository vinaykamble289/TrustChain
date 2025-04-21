
import React, { useState } from 'react';

const VerifyCertificate = () => {
  const [studentPRN, setStudentPRN] = useState('');
  const [certificateFile, setCertificateFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // Ensure loading is defined

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("studentPRN", studentPRN);
    formData.append("certificate", certificateFile);

    try {
      const res = await fetch('http://localhost:5000/verify-certificate', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ success: true, data });
      } else {
        setResult({ success: false, message: data.message });
      }
    } catch (err) {
      setResult({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f051d] py-16 px-6 mt-15">
      <main className="max-w-3xl mx-auto">
        <div className="bg-[#1c0a35]/90 shadow-xl rounded-2xl border border-indigo-500/20 p-8 text-white">
          <h2 className="text-3xl font-bold text-indigo-400 mb-8 text-center">
            🔍 Verify Certificate
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Student PRN */}
            <div>
              <label className="block text-sm font-medium text-indigo-300 mb-1">Student PRN</label>
              <input
                type="text"
                value={studentPRN}
                onChange={(e) => setStudentPRN(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-[#0f051d] border border-indigo-500/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter PRN"
              />
            </div>

            {/* Certificate File Upload */}
            <div>
              <label className="block text-sm font-medium text-indigo-300 mb-1">
                Upload Certificate File (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                required
                onChange={(e) => setCertificateFile(e.target.files[0])}
                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md 
                           file:border-0 file:font-semibold file:bg-indigo-600 hover:file:bg-indigo-700 
                           file:text-white bg-[#0f051d] border border-indigo-500/30 rounded-md"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md 
                           transition-shadow shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify Certificate'}
              </button>
            </div>
          </form>

          {/* Result */}
          {result && (
            <div className="mt-10 border-t border-indigo-500/20 pt-6">
              <div className={`p-4 rounded-lg ${result.success ? 'bg-green-800/20' : 'bg-red-800/20'}`}>
                <div className="flex items-start gap-3">
                  <div className="pt-1">
                    {result.success ? (
                      <svg className="h-6 w-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="text-sm text-gray-300 space-y-1">
                    {result.success ? (
                      <>
                        <p className="text-green-300 font-medium">✅ Certificate Verified</p>
                        <p>Name: <span className="text-white">{result.data.student.studentName}</span></p>
                        <p>Certificate: <span className="text-white">{result.data.student.certificateName}</span></p>
                        <p>Issued: <span className="text-white">{result.data.student.issueDate}</span></p>
                        <p>Semester: <span className="text-white">{result.data.student.semester}</span></p>
                        <p>
                          File:{" "}
                          <a
                            href={result.data.student.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-400 underline hover:text-indigo-300"
                          >
                            Download
                          </a>
                        </p>
                      </>
                    ) : (
                      <p className="text-red-300 font-medium">❌ {result.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VerifyCertificate;