import React, { useState } from 'react';

const VerifyCertificate = () => {
  const [studentPRN, setStudentPRN] = useState('');
  const [certificateFile, setCertificateFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Verify Certificate</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Student PRN</label>
          <input
            type="text"
            value={studentPRN}
            onChange={(e) => setStudentPRN(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Upload Certificate File</label>
          <input
            type="file"
            accept=".pdf"
            required
            onChange={(e) => setCertificateFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          {result.success ? (
            <>
              <p className="text-green-600 font-semibold">✅ Certificate Verified</p>
              <p><strong>Name:</strong> {result.data.student.studentName}</p>
              <p><strong>Certificate:</strong> {result.data.student.certificateName}</p>
              <p><strong>Issued:</strong> {result.data.student.issueDate}</p>
              <p><strong>Semester:</strong> {result.data.student.semester}</p>
              <p><strong>File:</strong> <a href={result.data.student.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">Download</a></p>
            </>
          ) : (
            <p className="text-red-600 font-semibold">❌ {result.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;
