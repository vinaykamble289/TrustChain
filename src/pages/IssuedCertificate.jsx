import React, { useEffect, useState } from 'react';

const IssuedCertificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/students');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setCertificates(data.students); // ⬅️ Correct key: `students`
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f051d] text-white py-12 px-6 mt-15">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-400 mb-6">Issued Certificates</h2>

        {loading ? (
          <div className="text-center text-indigo-300">Loading...</div>
        ) : certificates.length === 0 ? (
          <div className="text-center text-red-300">No certificates found.</div>
        ) : (
          <div className="overflow-x-auto bg-[#1c0a35]/80 border border-indigo-500/20 rounded-xl p-6">
            <table className="min-w-full text-sm divide-y divide-indigo-500/20">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-indigo-300">Student Name</th>
                  <th className="px-4 py-2 text-left text-indigo-300">PRN</th>
                  <th className="px-4 py-2 text-left text-indigo-300">Semester</th>
                  <th className="px-4 py-2 text-left text-indigo-300">Email</th>
                  <th className="px-4 py-2 text-left text-indigo-300">Certificate</th>
                  <th className="px-4 py-2 text-left text-indigo-300">Blockchain Hash</th>
                  <th className="px-4 py-2 text-left text-indigo-300">Issued At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-500/20">
                {certificates.map((cert, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-gray-300">{cert.studentName}</td>
                    <td className="px-4 py-2 text-gray-300">{cert.studentPRN}</td>
                    <td className="px-4 py-2 text-gray-300">{cert.semester}</td>
                    <td className="px-4 py-2 text-gray-300">{cert.studentEmail}</td>
                    <td className="px-4 py-2">
                      <a
                        href={cert.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 underline hover:text-indigo-300"
                      >
                        View
                      </a>
                    </td>
                    <td className="px-4 py-2 text-gray-400 truncate max-w-xs">{cert.certHash}</td>
                    <td className="px-4 py-2 text-gray-400">{cert.issueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuedCertificate;


// import React, { useEffect, useState } from 'react';
// import { Download } from 'lucide-react'; // You need lucide-react for this icon

// const IssuedCertificate = () => {
//   const [certificates, setCertificates] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:5000/students');
//         if (!response.ok) throw new Error('Failed to fetch');
//         const data = await response.json();
//         setCertificates(data.students);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#0f051d] text-white py-12 px-4 sm:px-6 lg:px-12 mt-10">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-indigo-400 mb-10 text-center">🎓 Issued Certificates</h2>

//         {loading ? (
//           <div className="text-center text-indigo-300">Loading...</div>
//         ) : certificates.length === 0 ? (
//           <div className="text-center text-red-300">No certificates found.</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {certificates.map((cert, index) => (
//               <div
//                 key={index}
//                 className="bg-[#1c0a35]/80 border border-indigo-500/30 rounded-2xl p-6 shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
//               >
//                 <div className="mb-3">
//                   <p className="text-sm text-indigo-300">Student Name</p>
//                   <p className="text-lg font-semibold text-white">{cert.studentName}</p>
//                 </div>

//                 <div className="mb-3">
//                   <p className="text-sm text-indigo-300">PRN</p>
//                   <p className="text-gray-200">{cert.studentPRN}</p>
//                 </div>

//                 <div className="mb-3">
//                   <p className="text-sm text-indigo-300">Semester</p>
//                   <p className="text-gray-200">{cert.semester}</p>
//                 </div>

//                 <div className="mb-3">
//                   <p className="text-sm text-indigo-300">Email</p>
//                   <p className="text-gray-200">{cert.studentEmail}</p>
//                 </div>

//                 <div className="mb-3 flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-indigo-300">Blockchain Hash</p>
//                     <p className="text-gray-400 text-sm truncate max-w-xs">{cert.certHash}</p>
//                   </div>
//                   <a
//                     href={cert.fileUrl}
//                     download
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-indigo-400 hover:text-indigo-200 transition"
//                   >
//                     <Download className="w-6 h-6" />
//                   </a>
//                 </div>

//                 <div>
//                   <p className="text-sm text-indigo-300">Issued At</p>
//                   <p className="text-gray-400 text-sm">{cert.issueDate}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default IssuedCertificate;
