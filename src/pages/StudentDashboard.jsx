// // import React, { useState, useEffect } from 'react';

// // const StudentDashboard = () => {
// //   const [certificates, setCertificates] = useState([]);
// //   const [filter, setFilter] = useState('all');
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [notification, setNotification] = useState(null);
// //   const [selectedCertificate, setSelectedCertificate] = useState(null);

// //   // Mock data - replace with actual API calls
// //   useEffect(() => {
// //     const fetchCertificates = async () => {
// //       try {
// //         // Simulate API call delay
// //         await new Promise(resolve => setTimeout(resolve, 1000));
        
// //         // Mock data
// //         const mockCertificates = [
// //           {
// //             id: '1',
// //             title: 'Web Development Bootcamp',
// //             institution: 'Tech University',
// //             issueDate: '2023-05-15',
// //             thumbnail: 'https://via.placeholder.com/300x200?text=Web+Dev',
// //             fileUrl: 'https://example.com/certificates/cert1.pdf',
// //             verificationStatus: 'verified',
// //             description: 'Completed intensive 12-week web development program with honors'
// //           },
// //           {
// //             id: '2',
// //             title: 'Data Science Fundamentals',
// //             institution: 'Data Institute',
// //             issueDate: '2023-08-22',
// //             thumbnail: 'https://via.placeholder.com/300x200?text=Data+Science',
// //             fileUrl: 'https://example.com/certificates/cert2.pdf',
// //             verificationStatus: 'pending',
// //             description: 'Mastered core data science concepts and machine learning basics'
// //           },
// //           {
// //             id: '3',
// //             title: 'UX Design Masterclass',
// //             institution: 'Design Academy',
// //             issueDate: '2023-11-10',
// //             thumbnail: 'https://via.placeholder.com/300x200?text=UX+Design',
// //             fileUrl: 'https://example.com/certificates/cert3.pdf',
// //             verificationStatus: 'unverified',
// //             description: 'Advanced user experience design principles and prototyping'
// //           },
// //           {
// //             id: '4',
// //             title: 'Cloud Architecture',
// //             institution: 'Cloud Institute',
// //             issueDate: '2024-01-18',
// //             thumbnail: 'https://via.placeholder.com/300x200?text=Cloud+Arch',
// //             fileUrl: 'https://example.com/certificates/cert4.pdf',
// //             verificationStatus: 'verified',
// //             description: 'AWS and Azure cloud infrastructure design and implementation'
// //           }
// //         ];
        
// //         setCertificates(mockCertificates);
// //         setIsLoading(false);
// //       } catch (error) {
// //         console.error('Error fetching certificates:', error);
// //         setNotification({ type: 'error', message: 'Failed to load certificates' });
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchCertificates();
// //   }, []);

// //   const handleDownload = (certificateId) => {
// //     const cert = certificates.find(c => c.id === certificateId);
// //     if (cert) {
// //       // In a real app, you would call your API to generate a download link
// //       const link = document.createElement('a');
// //       link.href = cert.fileUrl;
// //       link.download = `${cert.title.replace(/\s+/g, '_')}_certificate.pdf`;
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
      
// //       setNotification({ type: 'success', message: 'Download started successfully' });
// //       setTimeout(() => setNotification(null), 3000);
// //     }
// //   };

// //   const handleShare = async (certificateId) => {
// //     const cert = certificates.find(c => c.id === certificateId);
// //     if (cert) {
// //       try {
// //         const shareUrl = `${window.location.origin}/certificates/${certificateId}`;
// //         const shareData = {
// //           title: `My ${cert.title} Certificate`,
// //           text: `Check out my ${cert.title} certificate from ${cert.institution}`,
// //           url: shareUrl,
// //         };

// //         if (navigator.share) {
// //           await navigator.share(shareData);
// //         } else {
// //           await navigator.clipboard.writeText(shareUrl);
// //           setNotification({ type: 'success', message: 'Certificate link copied to clipboard!' });
// //           setTimeout(() => setNotification(null), 3000);
// //         }
// //       } catch (err) {
// //         console.error('Error sharing:', err);
// //         if (err.name !== 'AbortError') {
// //           setNotification({ type: 'error', message: 'Failed to share certificate' });
// //           setTimeout(() => setNotification(null), 3000);
// //         }
// //       }
// //     }
// //   };

// //   const handleVerify = (certificateId) => {
// //     setCertificates(certs => 
// //       certs.map(cert => 
// //         cert.id === certificateId 
// //           ? { ...cert, verificationStatus: 'pending' } 
// //           : cert
// //       )
// //     );
    
// //     setNotification({ 
// //       type: 'success', 
// //       message: 'Verification request sent to institution' 
// //     });
// //     setTimeout(() => setNotification(null), 3000);
// //   };

// //   const filteredCertificates = certificates.filter(cert => {
// //     if (filter === 'all') return true;
// //     return cert.verificationStatus === filter;
// //   });

// //   const getStatusColor = (status) => {
// //     switch(status) {
// //       case 'verified': return 'bg-green-500';
// //       case 'pending': return 'bg-yellow-500';
// //       case 'unverified': return 'bg-red-500';
// //       default: return 'bg-gray-500';
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
// //       {/* Notification Toast */}
// //       {notification && (
// //         <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
// //           <div className="flex items-center">
// //             <span>{notification.message}</span>
// //             <button 
// //               onClick={() => setNotification(null)}
// //               className="ml-4 text-white hover:text-gray-200"
// //             >
// //               ✕
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Certificate Modal */}
// //       {selectedCertificate && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
// //           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
// //             <div className="p-6">
// //               <div className="flex justify-between items-start mb-4">
// //                 <h3 className="text-2xl font-bold text-gray-800">{selectedCertificate.title}</h3>
// //                 <button 
// //                   onClick={() => setSelectedCertificate(null)}
// //                   className="text-gray-500 hover:text-gray-700"
// //                 >
// //                   ✕
// //                 </button>
// //               </div>
              
// //               <div className="mb-4">
// //                 <img 
// //                   src={selectedCertificate.thumbnail} 
// //                   alt={selectedCertificate.title}
// //                   className="w-full h-auto rounded-lg border border-gray-200"
// //                 />
// //               </div>
              
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
// //                 <div>
// //                   <p className="text-sm text-gray-500">Institution</p>
// //                   <p className="font-medium">{selectedCertificate.institution}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-500">Issued Date</p>
// //                   <p className="font-medium">
// //                     {new Date(selectedCertificate.issueDate).toLocaleDateString('en-US', {
// //                       year: 'numeric',
// //                       month: 'long',
// //                       day: 'numeric'
// //                     })}
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-gray-500">Status</p>
// //                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedCertificate.verificationStatus)} text-white`}>
// //                     {selectedCertificate.verificationStatus}
// //                   </span>
// //                 </div>
// //               </div>
              
// //               <div className="mb-6">
// //                 <p className="text-sm text-gray-500">Description</p>
// //                 <p className="text-gray-700">{selectedCertificate.description}</p>
// //               </div>
              
// //               <div className="flex flex-wrap gap-3">
// //                 <button
// //                   onClick={() => {
// //                     handleDownload(selectedCertificate.id);
// //                     setSelectedCertificate(null);
// //                   }}
// //                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
// //                 >
// //                   Download PDF
// //                 </button>
// //                 <button
// //                   onClick={() => {
// //                     handleShare(selectedCertificate.id);
// //                     setSelectedCertificate(null);
// //                   }}
// //                   className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
// //                 >
// //                   Share Certificate
// //                 </button>
// //                 {selectedCertificate.verificationStatus !== 'verified' && (
// //                   <button
// //                     onClick={() => {
// //                       handleVerify(selectedCertificate.id);
// //                       setSelectedCertificate(null);
// //                     }}
// //                     disabled={selectedCertificate.verificationStatus === 'pending'}
// //                     className={`px-4 py-2 rounded-md transition-colors ${
// //                       selectedCertificate.verificationStatus === 'pending'
// //                         ? 'bg-gray-400 cursor-not-allowed'
// //                         : 'bg-orange-600 hover:bg-orange-700 text-white'
// //                     }`}
// //                   >
// //                     {selectedCertificate.verificationStatus === 'pending' ? 'Verification Pending' : 'Request Verification'}
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Main Dashboard Content */}
// //       <div className="max-w-7xl mx-auto">
// //         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
// //           <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">My Certificates</h1>
          
// //           <div className="flex items-center space-x-2">
// //             <label htmlFor="filter" className="text-sm font-medium text-gray-700">Filter:</label>
// //             <select
// //               id="filter"
// //               value={filter}
// //               onChange={(e) => setFilter(e.target.value)}
// //               className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
// //             >
// //               <option value="all">All Certificates</option>
// //               <option value="verified">Verified</option>
// //               <option value="pending">Pending Verification</option>
// //               <option value="unverified">Not Verified</option>
// //             </select>
// //           </div>
// //         </div>

// //         {isLoading ? (
// //           <div className="flex justify-center items-center h-64">
// //             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //             {filteredCertificates.length > 0 ? (
// //               filteredCertificates.map(cert => (
// //                 <div 
// //                   key={cert.id} 
// //                   className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
// //                   onClick={() => setSelectedCertificate(cert)}
// //                 >
// //                   <div className="relative h-48 bg-gray-100">
// //                     <img 
// //                       src={cert.thumbnail} 
// //                       alt={cert.title}
// //                       className="w-full h-full object-cover"
// //                     />
// //                     <span className={`absolute top-2 right-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(cert.verificationStatus)} text-white`}>
// //                       {cert.verificationStatus}
// //                     </span>
// //                   </div>
// //                   <div className="p-4">
// //                     <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{cert.title}</h3>
// //                     <p className="text-sm text-gray-600 mb-2">{cert.institution}</p>
// //                     <p className="text-xs text-gray-500">
// //                       Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <div className="col-span-full text-center py-12">
// //                 <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
// //                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                   </svg>
// //                 </div>
// //                 <h3 className="text-lg font-medium text-gray-900 mb-1">No certificates found</h3>
// //                 <p className="text-gray-500 max-w-md mx-auto">
// //                   {filter === 'all' 
// //                     ? "You haven't received any certificates yet." 
// //                     : "No certificates match your current filter."}
// //                 </p>
// //                 {filter !== 'all' && (
// //                   <button
// //                     onClick={() => setFilter('all')}
// //                     className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
// //                   >
// //                     Clear filters
// //                   </button>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default StudentDashboard;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const StudentDashboard = () => {
//   return (
//     <div className="min-h-screen bg-[#0f051d] text-white py-12 px-6 mt-15">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl font-bold mb-4">
//             <span className="text-indigo-400">Student</span> Dashboard
//           </h1>
//           <p className="max-w-2xl mx-auto text-lg text-gray-300">
//             View your certificates and share them securely for verification
//           </p>
//         </div>

//         {/* Dashboard Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

//           {/* My Certificates */}
//           <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
//             <div className="flex items-center mb-4">
//               <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
//                 <span className="text-2xl">🎓</span>
//               </div>
//               <h3 className="text-xl font-semibold">My Certificates</h3>
//             </div>
//             <p className="text-gray-300 mb-4 text-sm">
//               View and download your academic certificates
//             </p>
//             <Link
//               to="/student/my-certificates"
//               className="block text-center bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition"
//             >
//               View Certificates
//             </Link>
//           </div>

//           {/* Share Certificate */}
//           <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
//             <div className="flex items-center mb-4">
//               <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
//                 <span className="text-2xl">🔗</span>
//               </div>
//               <h3 className="text-xl font-semibold">Share Certificate</h3>
//             </div>
//             <p className="text-gray-300 mb-4 text-sm">
//               Generate a secure link or QR code to share with verifiers
//             </p>
//             <Link
//               to="/student/share-certificate"
//               className="block text-center bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm font-medium transition"
//             >
//               Share Certificate
//             </Link>
//           </div>

//           {/* Verification Status */}
//           {/* <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 transition">
//             <div className="flex items-center mb-4">
//               <div className="bg-indigo-500/20 p-3 rounded-lg mr-4">
//                 <span className="text-2xl">✅</span>
//               </div>
//               <h3 className="text-xl font-semibold">Verification Status</h3>
//             </div>
//             <p className="text-gray-300 mb-4 text-sm">
//               Track who has viewed and verified your shared certificates
//             </p>
//             <Link
//               to="/student/verification-status"
//               className="block text-center bg-[#0f051d] hover:bg-[#1c0a35] border border-indigo-500/30 px-4 py-2 rounded-md text-sm font-medium transition"
//             >
//               Check Status
//             </Link>
//           </div> */}

//         </div>

//         {/* Optional Recent Activity Table */}
//         <div className="bg-[#1c0a35]/80 p-8 rounded-xl border border-indigo-500/20 mb-10">
//           <h3 className="text-xl font-semibold mb-6 flex items-center">
//             <span className="text-indigo-400 mr-2">📋</span>
//             Recent Certificate Activity
//           </h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-indigo-500/20">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Action</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Certificate</th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Date</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-indigo-500/20">
//                 {[
//                   { action: "Viewed", cert: "B.Tech Degree", date: "2 days ago" },
//                   { action: "Shared", cert: "Internship Certificate", date: "5 days ago" },
//                   { action: "Downloaded", cert: "Transcript", date: "1 week ago" },
//                 ].map((item, index) => (
//                   <tr key={index}>
//                     <td className="px-4 py-3 text-sm text-gray-300">{item.action}</td>
//                     <td className="px-4 py-3 text-sm text-gray-300">{item.cert}</td>
//                     <td className="px-4 py-3 text-sm text-gray-300">{item.date}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;


import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0f051d] text-white py-20 px-6 mt-15">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-indigo-400">Student</span> Dashboard
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            View your certificates and share them securely for verification
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center mb-20 px-4">
          
          {/* My Certificates */}
          <div className="bg-[#1c0a35]/90 p-8 rounded-2xl border border-indigo-500/30 hover:border-indigo-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-500/20 p-4 rounded-lg mr-4">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-2xl font-semibold text-indigo-300">My Certificates</h3>
            </div>
            <p className="text-gray-300 mb-6 text-sm">
              View and download your academic certificates
            </p>
            <Link
              to="/my-certificates"
              className="block text-center bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-md text-sm font-medium transition"
            >
              View Certificates
            </Link>
          </div>

          {/* Share Certificate */}
          <div className="bg-[#1c0a35]/90 p-8 rounded-2xl border border-indigo-500/30 hover:border-indigo-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-500/20 p-4 rounded-lg mr-4">
                <span className="text-3xl">🔗</span>
              </div>
              <h3 className="text-2xl font-semibold text-indigo-300">Share Certificate</h3>
            </div>
            <p className="text-gray-300 mb-6 text-sm">
              Generate a secure link or QR code to share with verifiers
            </p>
            <Link
              to="/share-certificate"
              className="block text-center bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-md text-sm font-medium transition"
            >
              Share Certificate
            </Link>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-[#1c0a35]/90 p-8 rounded-2xl border border-indigo-500/20">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <span className="text-indigo-400 mr-2">📋</span>
            Recent Certificate Activity
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-500/20">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Certificate</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-indigo-300 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-500/20">
                {[
                  { action: "Viewed", cert: "B.Tech Degree", date: "2 days ago" },
                  { action: "Shared", cert: "Internship Certificate", date: "5 days ago" },
                  { action: "Downloaded", cert: "Transcript", date: "1 week ago" },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-300">{item.action}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{item.cert}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
