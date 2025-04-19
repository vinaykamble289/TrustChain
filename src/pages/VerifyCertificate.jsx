// import React, { useState } from 'react';

// const VerifyCertificate = () => {
//   const [verificationId, setVerificationId] = useState('');
//   const [verificationResult, setVerificationResult] = useState(null);

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     // Handle verification logic here
//     console.log('Verifying certificate:', verificationId);
//     // Mock verification result
//     setVerificationResult({
//       isValid: true,
//       studentName: 'John Doe',
//       certificateName: 'Bachelor of Science in Computer Science',
//       issueDate: '2024-03-15',
//       institution: 'University of Technology',
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <span className="text-xl font-bold text-indigo-600">TrustChain</span>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="bg-white shadow rounded-lg p-6">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Verify Certificate</h2>
          
//           <form onSubmit={handleVerify} className="space-y-6">
//             <div>
//               <label htmlFor="verificationId" className="block text-sm font-medium text-gray-700">
//                 Certificate Verification ID
//               </label>
//               <div className="mt-1 flex rounded-md shadow-sm">
//                 <input
//                   type="text"
//                   name="verificationId"
//                   id="verificationId"
//                   required
//                   value={verificationId}
//                   onChange={(e) => setVerificationId(e.target.value)}
//                   className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   placeholder="Enter verification ID or scan QR code"
//                 />
//                 <button
//                   type="button"
//                   className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Scan QR
//                 </button>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Verify Certificate
//               </button>
//             </div>
//           </form>

//           {verificationResult && (
//             <div className="mt-8 border-t pt-8">
//               <div className={`p-4 rounded-md ${verificationResult.isValid ? 'bg-green-50' : 'bg-red-50'}`}>
//                 <div className="flex">
//                   <div className="flex-shrink-0">
//                     {verificationResult.isValid ? (
//                       <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                       </svg>
//                     ) : (
//                       <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                       </svg>
//                     )}
//                   </div>
//                   <div className="ml-3">
//                     <h3 className={`text-sm font-medium ${verificationResult.isValid ? 'text-green-800' : 'text-red-800'}`}>
//                       {verificationResult.isValid ? 'Certificate is Valid' : 'Certificate is Invalid'}
//                     </h3>
//                     <div className="mt-2 text-sm text-gray-700">
//                       <p>Student Name: {verificationResult.studentName}</p>
//                       <p>Certificate: {verificationResult.certificateName}</p>
//                       <p>Issued by: {verificationResult.institution}</p>
//                       <p>Issue Date: {verificationResult.issueDate}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default VerifyCertificate; 



import React, { useState } from 'react';

const VerifyCertificate = () => {
  const [verificationId, setVerificationId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVerificationResult({
        isValid: true,
        studentName: 'John Doe',
        certificateName: 'Bachelor of Science in Computer Science',
        issueDate: '2024-03-15',
        institution: 'University of Technology',
        certificateId: 'TC-2024-5678',
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-xl font-bold text-gray-800">CertiChain</span>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800">
            About
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Verification Section */}
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Certificate</h1>
              <p className="text-gray-600 max-w-md mx-auto">
                Enter the certificate ID or scan the QR code to verify its authenticity on the blockchain
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label htmlFor="verificationId" className="block text-sm font-medium text-gray-700 mb-1">
                  Certificate ID
                </label>
                <div className="relative flex rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="verificationId"
                    id="verificationId"
                    required
                    value={verificationId}
                    onChange={(e) => setVerificationId(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 py-3 border-gray-300 rounded-md"
                    placeholder="Enter certificate ID"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button
                      type="button"
                      className="h-full py-0 px-3 border-l border-gray-300 text-sm font-medium text-indigo-600 hover:text-indigo-800 focus:outline-none"
                    >
                      Scan QR
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isLoading ? 'opacity-80' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : 'Verify Certificate'}
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          {verificationResult && (
            <div className="border-t border-gray-200 bg-gray-50 p-8">
              <div className={`p-6 rounded-lg ${verificationResult.isValid ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {verificationResult.isValid ? (
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-medium ${verificationResult.isValid ? 'text-green-800' : 'text-red-800'}`}>
                      {verificationResult.isValid ? 'Certificate Verified Successfully' : 'Certificate Verification Failed'}
                    </h3>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Certificate ID</p>
                        <p className="mt-1 text-sm text-gray-900">{verificationResult.certificateId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Student Name</p>
                        <p className="mt-1 text-sm text-gray-900">{verificationResult.studentName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Certificate</p>
                        <p className="mt-1 text-sm text-gray-900">{verificationResult.certificateName}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Institution</p>
                        <p className="mt-1 text-sm text-gray-900">{verificationResult.institution}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Issue Date</p>
                        <p className="mt-1 text-sm text-gray-900">{verificationResult.issueDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <p className={`mt-1 text-sm font-medium ${verificationResult.isValid ? 'text-green-600' : 'text-red-600'}`}>
                          {verificationResult.isValid ? 'Valid' : 'Invalid'}
                        </p>
                      </div>
                    </div>
                    {verificationResult.isValid && (
                      <div className="mt-6">
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Download Certificate
                        </button>
                      </div>
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