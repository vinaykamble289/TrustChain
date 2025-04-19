import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/config.js';
import { useAuth } from '../AuthContext';

const UploadCertificate = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    studentName: '',
    studentPRN: '',
    studentEmail: '',
    certificateName: '',
    issueDate: '',
    semester: '1',
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    const formDataToSend = new FormData();
    formDataToSend.append("certificate", formData.file);
    formDataToSend.append("studentName", formData.studentName);
    formDataToSend.append("studentPRN", formData.studentPRN);
    formDataToSend.append("studentEmail", formData.studentEmail);
    formDataToSend.append("certificateName", formData.certificateName);
    formDataToSend.append("issueDate", formData.issueDate);
    formDataToSend.append("semester", formData.semester);
    formDataToSend.append("uploadedBy", currentUser?.email || 'unknown');
  
    try {
      const response = await fetch("http://localhost:5000/upload-certificate", {
        method: "POST",
        body: formDataToSend,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("✅ Certificate uploaded successfully!");
        console.log("Transaction Hash:", result.txHash);
        navigate("/upload"); // Optional navigation
      } else {
        setError(result.message || "Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Server error occurred.");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Upload Certificate</h1>
            <p className="text-gray-600 mt-2">
              Secure academic credentials on the blockchain.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Name
              </label>
              <input
                type="text"
                name="studentName"
                placeholder="Enter full name"
                required
                value={formData.studentName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Student PRN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student PRN (Permanent Registration Number)
              </label>
              <input
                type="text"
                name="studentPRN"
                placeholder="Enter PRN"
                required
                value={formData.studentPRN}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Student Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Email
              </label>
              <input
                type="email"
                name="studentEmail"
                placeholder="Enter student email"
                required
                value={formData.studentEmail}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Certificate Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Certificate Name
              </label>
              <input
                type="text"
                name="certificateName"
                placeholder="e.g., Blockchain Developer Program"
                required
                value={formData.certificateName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Semester */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <select
                name="semester"
                required
                value={formData.semester}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* Issue Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Date
              </label>
              <input
                type="date"
                name="issueDate"
                required
                value={formData.issueDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Certificate (PDF)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 hover:border-indigo-400 transition rounded-lg cursor-pointer justify-center items-center bg-gray-50">
                  {formData.file ? (
                    <span className="text-sm text-gray-600">{formData.file.name}</span>
                  ) : (
                    <>
                      <svg
                        className="w-10 h-10 text-indigo-500 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="text-sm text-gray-600">Click to upload or drag file</span>
                    </>
                  )}
                  <input
                    type="file"
                    name="file"
                    accept=".pdf"
                    required
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 transition duration-300"
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Upload Certificate'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadCertificate;
