// AddStudents.jsx
import React, { useState } from 'react';

const AddStudents = () => {
  const [singleData, setSingleData] = useState({
    studentName: '',
    studentPRN: '',
    studentEmail: ''
  });
  const [excelFile, setExcelFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSingleChange = (e) => {
    const { name, value } = e.target;
    setSingleData(prev => ({ ...prev, [name]: value }));
  };

  const handleExcelChange = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const submitSingleStudent = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/add-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(singleData)
      });
      const result = await res.json();
      if (res.ok) {
        setMessage('✅ Student added successfully!');
        setSingleData({ studentName: '', studentPRN: '', studentEmail: '' });
      } else {
        setMessage('❌ Error: ' + result.message);
      }
    } catch (err) {
      setMessage('❌ Network error');
    }
  };

  const submitExcel = async (e) => {
    e.preventDefault();
    if (!excelFile) return setMessage('❌ Upload an Excel file first.');
    const formData = new FormData();
    formData.append('excel', excelFile);

    try {
      const res = await fetch('http://localhost:5000/add-multiple-students', {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      if (res.ok) {
        setMessage('✅ Excel processed successfully!');
        setExcelFile(null);
      } else {
        setMessage('❌ Error: ' + result.message);
      }
    } catch (err) {
      setMessage('❌ Network error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f051d] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Add One Student */}
        <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4">Add One Student</h2>
          <form onSubmit={submitSingleStudent} className="space-y-4">
            <input
              type="text"
              name="studentName"
              value={singleData.studentName}
              onChange={handleSingleChange}
              required
              placeholder="Student Name"
              className="w-full p-2 rounded bg-[#0f051d] border border-indigo-500/30 text-gray-300"
            />
            <input
              type="text"
              name="studentPRN"
              value={singleData.studentPRN}
              onChange={handleSingleChange}
              required
              placeholder="Student PRN"
              className="w-full p-2 rounded bg-[#0f051d] border border-indigo-500/30 text-gray-300"
            />
            <input
              type="email"
              name="studentEmail"
              value={singleData.studentEmail}
              onChange={handleSingleChange}
              required
              placeholder="Student Email"
              className="w-full p-2 rounded bg-[#0f051d] border border-indigo-500/30 text-gray-300"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-medium"
            >
              Add Student
            </button>
          </form>
        </div>

        {/* Upload Excel */}
        <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20">
          <h2 className="text-2xl font-bold text-indigo-400 mb-4">Add Multiple Students via Excel</h2>
          <form onSubmit={submitExcel} className="space-y-4">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleExcelChange}
              required
              className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-medium"
            >
              Upload Excel
            </button>
          </form>
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div className="text-center mt-6 font-medium text-sm text-white">{message}</div>
      )}
    </div>
  );
};

export default AddStudents;
