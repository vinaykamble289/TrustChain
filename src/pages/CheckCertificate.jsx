// CheckCertificate.jsx
import React, { useState } from 'react';

const CheckCertificate = () => {
  const [formData, setFormData] = useState({
    prn: '',
    semester: '1',
    hash: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const semesters = Array.from({ length: 8 }, (_, i) => `${i + 1}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('http://localhost:5000/check-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      
      if (res.ok) {
        setResult({ success: true, data });
      } else {
        setResult({ success: false, message: data.message });
      }
    } catch (err) {
      setResult({ 
        success: false, 
        message: 'Network error. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Check Certificate Hash
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Student PRN</label>
            <input
              type="text"
              name="prn"
              value={formData.prn}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter PRN number"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Semester</label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {semesters.map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Certificate Hash</label>
            <input
              type="text"
              name="hash"
              value={formData.hash}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 font-mono text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter certificate hash"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
            >
              {loading ? 'Checking...' : 'Verify Hash'}
            </button>
          </div>
        </form>

        {result && (
          <div className={`mt-8 p-4 rounded-md ${
            result.success && result.data.isValid 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-start">
              <div className={`flex-shrink-0 ${
                result.success && result.data.isValid ? 'text-green-600' : 'text-red-600'
              }`}>
                {result.success && result.data.isValid ? (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
              // CheckCertificate.jsx (continued)
                <h3 className={`text-lg font-medium ${
                  result.success && result.data.isValid ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.success && result.data.isValid 
                    ? 'Certificate Authentic' 
                    : 'Verification Failed'}
                </h3>
                <div className="mt-2 text-sm text-gray-700">
                  {result.success ? (
                    <>
                      <p className="mb-1">{result.data.message}</p>
                      {result.data.isValid && (
                        <>
                          <p className="mb-1">Name: {result.data.student.name}</p>
                          <p className="mb-1">PRN: {result.data.student.prn}</p>
                          <p className="mb-1">Semester: {result.data.student.semester}</p>
                        </>
                      )}
                    </>
                  ) : (
                    <p>{result.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckCertificate;