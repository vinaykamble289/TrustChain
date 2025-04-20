// import React from 'react';
// import { Link } from 'react-router-dom';

// const InstituteDashboard = () => {
//   return (
//     <div className="min-h-screen bg-[#0f051d] text-white py-12 px-6 mt-15">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl font-bold mb-4">
//             <span className="text-indigo-400">Institution</span> Dashboard
//           </h1>
//           <p className="max-w-2xl mx-auto text-lg text-gray-300">
//             Upload certificates, record on blockchain, and manage issued credentials
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          
//           {/* Upload Certificate */}
//           <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
//             <div className="flex items-center mb-4">
//               <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
//                 <span className="text-2xl">📤</span>
//               </div>
//               <h3 className="text-xl font-semibold">Upload Certificate</h3>
//             </div>
//             <p className="text-gray-300 mb-4 text-sm">
//               Upload student certificate files to Google Drive securely
//             </p>
//             <Link
//               to="/instituteUpload"
//               className="block text-center bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition"
//             >
//               Upload Now
//             </Link>
//           </div>


//           {/* Issue on Blockchain */}
//           <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
//             <div className="flex items-center mb-4">
//               <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
//                 <span className="text-2xl">⛓️</span>
//               </div>
//               <h3 className="text-xl font-semibold">Issue Certificate</h3>
//             </div>
//             <p className="text-gray-300 mb-4 text-sm">
//               Record document hash and metadata on the blockchain
//             </p>
//             <Link
//               to="/issuedCertificate"
//               className="block text-center bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition"
//             >
//               Issue Certificate
//             </Link>
//           </div>

//           {/* Manage Issued Certificates */}
//           <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
//             <div className="flex items-center mb-4">
//               <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
//                 <span className="text-2xl">📚</span>
//               </div>
//               <h3 className="text-xl font-semibold">Issued Certificates</h3>
//             </div>
//             <p className="text-gray-300 mb-4 text-sm">
//               View and manage all certificates issued by your institution
//             </p>
//             <Link
//               to="/issuedCertificate"
//               className="block text-center bg-[#0f051d] hover:bg-[#1c0a35] border border-indigo-500/30 px-4 py-2 rounded-md text-sm font-medium transition"
//             >
//               View Certificates
//             </Link>
//           </div>

//           {/* Blockchain Logs */}
//           <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition col-span-full md:col-span-2 lg:col-span-1">
//             <div className="flex items-center mb-4">
//               <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
//                 <span className="text-2xl">🧾</span>
//               </div>
//               <h3 className="text-xl font-semibold">Blockchain Logs</h3>
//             </div>
//             <p className="text-gray-300 mb-4 text-sm">
//               View logs of all blockchain interactions for auditing
//             </p>
//             <Link
//               to="/institution/logs"
//               className="block text-center bg-[#0f051d] hover:bg-[#1c0a35] border border-indigo-500/30 px-4 py-2 rounded-md text-sm font-medium transition"
//             >
//               View Logs
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstituteDashboard;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const InstituteDashboard = () => {
//   return (
//     <div className="min-h-screen bg-[#0f051d] text-white py-12 px-6 mt-15">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl font-bold mb-4">
//             <span className="text-indigo-400">Institution</span> Dashboard
//           </h1>
//           <p className="max-w-2xl mx-auto text-lg text-gray-300">
//             Upload certificates, record on blockchain, and manage issued credentials
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          
//           {/* Upload Certificate */}
//           <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
//             <div className="flex items-center mb-4">
//               <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
//                 <span className="text-2xl">📤</span>
//               </div>
//               <h3 className="text-xl font-semibold">Upload Certificate</h3>
//             </div>
//             <p className="text-gray-300 mb-4 text-sm">
//               Upload student certificate files to Google Drive securely
//             </p>
//             <Link
//               to="/instituteUpload"
//               className="block text-center bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition"
//             >
//               Upload Now
//             </Link>
//           </div>


//           {/* Issue on Blockchain */}
          

//           {/* Manage Issued Certificates */}
//           <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
//             <div className="flex items-center mb-4">
//               <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
//                 <span className="text-2xl">📚</span>
//               </div>
//               <h3 className="text-xl font-semibold">Issued Certificates</h3>
//             </div>
//             <p className="text-gray-300 mb-4 text-sm">
//               View and manage all certificates issued by your institution
//             </p>
//             <Link
//               to="/issuedCertificate"
//               className="block text-center bg-[#0f051d] hover:bg-[#1c0a35] border border-indigo-500/30 px-4 py-2 rounded-md text-sm font-medium transition"
//             >
//               View Certificates
//             </Link>
//           </div>

//           {/* Blockchain Logs */}
        
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstituteDashboard;

import React from 'react';
import { Link } from 'react-router-dom';

const InstituteDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0f051d] text-white py-20 px-6 mt-5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
            <span className="text-indigo-400">Institution</span> Dashboard
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Upload certificates and manage all issued credentials with ease and security.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Upload Certificate */}
          <div className="bg-[#1c0a35]/90 p-10 rounded-3xl border border-indigo-500/30 shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition duration-300 ease-in-out">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-500/30 p-4 rounded-xl mr-4">
                <span className="text-3xl">📤</span>
              </div>
              <h3 className="text-2xl font-semibold">Upload Certificate</h3>
            </div>
            <p className="text-gray-300 mb-8 text-base leading-relaxed">
              Securely upload student certificates to Google Drive.
            </p>
            <Link
              to="/instituteUpload"
              className="block text-center bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-lg text-base font-medium transition"
            >
              Upload Now
            </Link>
          </div>

          {/* Issued Certificates */}
          <div className="bg-[#1c0a35]/90 p-10 rounded-3xl border border-indigo-500/30 shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition duration-300 ease-in-out">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-500/30 p-4 rounded-xl mr-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-2xl font-semibold">Issued Certificates</h3>
            </div>
            <p className="text-gray-300 mb-8 text-base leading-relaxed">
              View and manage all the certificates your institution has issued.
            </p>
            <Link
              to="/issuedCertificate"
              className="block text-center bg-transparent border border-indigo-500 text-indigo-300 hover:bg-indigo-500 hover:text-white px-6 py-3 rounded-lg text-base font-medium transition"
            >
              View Certificates
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InstituteDashboard;

