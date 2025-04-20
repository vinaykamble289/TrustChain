
// // UploadCertificate.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const UploadCertificate = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     studentName: '',
//     studentPRN: '',
//     studentEmail: '',
//     certificateName: '',
//     issueDate: '',
//     semester: '1',
//     file: null,
//   });

//   const [certificateFile, setCertificateFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState('');


//   const semesters = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: files ? files[0] : value
//     }));
//   };
//   const handleFileChange = (e) => {
//     setCertificateFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUploading(true);
//     setMessage('');

//     const form = new FormData();
//     Object.entries(formData).forEach(([key, val]) =>
//       form.append(key, val)
//     );
//     form.append("uploadedBy", "admin@example.com"); // Or get current user if using auth

//     try {
//       const res = await fetch('http://localhost:5000/upload-certificate', {
//         method: 'POST',
//         body: form,
//       });

//       const result = await res.json();
//       if (res.ok) {
//         setMessage('✅ Certificate successfully uploaded and stored.');
//         console.log("Blockchain Tx:", result.txHash);
//         navigate('/institute'); // or another route
//       } else {
//         setMessage('❌ Upload failed: ' + result.message);
//       }
//     } catch (error) {
//       setMessage('❌ Error: ' + error.message);
//     } finally {
//       setUploading(false);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-[#0f051d] text-white py-12 px-6 mt-15">
//       <div className="max-w-3xl mx-auto bg-[#1c0a35]/80 p-8 rounded-xl border border-indigo-500/20">
//         <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">
//           Upload Certificate
//         </h2>
       

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Institute Name (readonly) */}
//           {/* <div>
//             <label className="block mb-1 text-sm text-gray-300">Institute Name</label>
//             <input
//               type="text"
//               value=""
//               readOnly
//               className="w-full bg-[#0f051d] border border-indigo-500/30 rounded-md p-2 text-sm text-gray-300"
//             />
//           </div> */}

//           {/* Student Name */}
//           <div>
//             <label className="block mb-1 text-sm text-gray-300">Student Name</label>
//             <input
//               type="text"
//               name="studentName"
//               value={formData.studentName}
//               onChange={handleChange}
//               required
//               className="w-full bg-[#0f051d] border border-indigo-500/30 rounded-md p-2 text-sm text-gray-300"
//             />
//           </div>

// {/* PRN */}
// <div>
//   <label className="block mb-1 text-sm text-gray-300">Student PRN</label>
//   <input
//     type="text"
//     name="studentPRN" // ✅ corrected from "prn"
//     value={formData.studentPRN}
//     onChange={handleChange}
//     required
//     className="w-full bg-[#0f051d] border border-indigo-500/30 rounded-md p-2 text-sm text-gray-300"
//   />
// </div>

// {/* Email */}
// <div>
//   <label className="block mb-1 text-sm text-gray-300">Student Email</label>
//   <input
//     type="email"
//     name="studentEmail" // ✅ corrected from "email"
//     value={formData.studentEmail}
//     onChange={handleChange}
//     required
//     className="w-full bg-[#0f051d] border border-indigo-500/30 rounded-md p-2 text-sm text-gray-300"
//   />
// </div>


//           {/* Semester */}
//           <div>
//             <label className="block mb-1 text-sm text-gray-300">Semester</label>
//             <select
//               name="semester"
//               value={formData.semester}
//               onChange={handleChange}
//               required
//               className="w-full bg-[#0f051d] border border-indigo-500/30 rounded-md p-2 text-sm text-gray-300"
//             >
//               <option value="">Select Semester</option>
//               {semesters.map((sem, idx) => (
//                 <option key={idx} value={sem}>{sem}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//   <label className="block mb-1 text-sm text-gray-300">Certificate Name</label>
//   <input
//     type="text"
//     name="certificateName"
//     value={formData.certificateName}
//     onChange={handleChange}
//     required
//     className="w-full bg-[#0f051d] border border-indigo-500/30 rounded-md p-2 text-sm text-gray-300"
//   />
// </div>


//           {/* Issue Date */}
//           <div>
//             <label className="block mb-1 text-sm text-gray-300">Date Issued</label>
//             <input
//               type="date"
//               name="issueDate"
//               value={formData.issueDate}
//               onChange={handleChange}
//               required
//               className="w-full bg-[#0f051d] border border-indigo-500/30 rounded-md p-2 text-sm text-gray-300"
//             />
//           </div>

//           {/* File Upload */}
//           <div>
//   <label htmlFor="certificateName" className="block mb-1 text-sm text-gray-300">
//     Certificate Name
//   </label>
//   <input
//     type="text"
//     id="certificateName"
//     name="certificateName"
//     value={formData.certificateName}
//     onChange={handleChange}
//     required
//     placeholder="Enter certificate name"
//     className="w-full bg-[#0f051d] border border-indigo-500/30 rounded-md p-2 text-sm text-gray-300"
//   />
// </div>

//                {/* <div>
//              <label className="block mb-1 text-sm text-gray-300">Upload Certificate (PDF)</label>
//            <input
//               type="file"
//               accept=".pdf"
//               onChange={handleFileChange}
//               required
//               className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
//             />
//           </div>  */}
          
           

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={uploading}
//             className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded-md font-medium transition"
//           >
//             {uploading ? 'Uploading...' : 'Upload & Record on Blockchain'}
//           </button>

//           {/* Status Message */}
//           {message && (
//             <div className="text-center mt-4 font-medium text-sm">
//               {message}
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };


// export default UploadCertificate;

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
    <div className="max-w-2xl mx-auto bg-blue p-6 mt-10 rounded shadow">
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
