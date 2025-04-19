// UploadCertificate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadCertificate = () => {
  const navigate = useNavigate();

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
  const [message, setMessage] = useState('');

  const semesters = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) =>
      form.append(key, val)
    );
    form.append("uploadedBy", "admin@example.com"); // Or get current user if using auth

    try {
      const res = await fetch('http://localhost:5000/upload-certificate', {
        method: 'POST',
        body: form,
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('✅ Certificate successfully uploaded and stored.');
        console.log("Blockchain Tx:", result.txHash);
        navigate('/institute'); // or another route
      } else {
        setMessage('❌ Upload failed: ' + result.message);
      }
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Upload Certificate</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Student Name', name: 'studentName', type: 'text' },
          { label: 'PRN', name: 'studentPRN', type: 'text' },
          { label: 'Email', name: 'studentEmail', type: 'email' },
          { label: 'Certificate Name', name: 'certificateName', type: 'text' },
          { label: 'Issue Date', name: 'issueDate', type: 'date' }
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        <div>
          <label className="block font-medium">Semester</label>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            {semesters.map((s, idx) => (
              <option key={idx} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Upload Certificate</label>
          <input
  type="file"
  name="certificate"  // must match multer field name
  onChange={handleChange}
  required
/>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>

        {message && (
          <div className="mt-4 text-sm text-center font-medium text-gray-800">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadCertificate;
