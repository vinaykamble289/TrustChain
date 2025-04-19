// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // const LandingPage = () => {
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
// //       <nav className="bg-white shadow-lg">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between h-16">
// //             <div className="flex items-center">
// //               <span className="text-2xl font-bold text-indigo-600">TrustChain</span>
// //             </div>
// //             <div className="flex items-center space-x-4">
// //               <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
// //               <Link to="/signup" className="text-gray-600 hover:text-indigo-600">Sign Up</Link>
// //               <Link to="/verify" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
// //                 Verify Certificate
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </nav>

// //       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
// //         <div className="text-center">
// //           <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
// //             <span className="block">Secure Academic</span>
// //             <span className="block text-indigo-600">Credential Verification</span>
// //           </h1>
// //           <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
// //             TrustChain leverages blockchain technology to provide tamper-proof academic credential verification.
// //           </p>
// //           <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
// //             <div className="rounded-md shadow">
// //               <Link to="/signup" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
// //                 Get Started
// //               </Link>
// //             </div>
// //             <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
// //               <Link to="/verify" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
// //                 Verify Certificate
// //               </Link>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
// //           <div className="bg-white p-6 rounded-lg shadow-lg">
// //             <h3 className="text-lg font-medium text-gray-900">Institutions</h3>
// //             <p className="mt-2 text-gray-500">Issue tamper-proof certificates and manage student credentials securely.</p>
// //           </div>
// //           <div className="bg-white p-6 rounded-lg shadow-lg">
// //             <h3 className="text-lg font-medium text-gray-900">Students</h3>
// //             <p className="mt-2 text-gray-500">Access, share, and manage your academic credentials with ease.</p>
// //           </div>
// //           <div className="bg-white p-6 rounded-lg shadow-lg">
// //             <h3 className="text-lg font-medium text-gray-900">Verifiers</h3>
// //             <p className="mt-2 text-gray-500">Instantly verify the authenticity of academic certificates.</p>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default LandingPage; 

// import React from 'react';
// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#2c1f3e] to-[#1a0730] text-white">
//       {/* Navbar */}
//       <nav className="w-full px-6 py-4 flex justify-between items-center bg-[#0a0316] shadow-md">
//         <div className="text-2xl font-bold text-white">TrustChain</div>
//         <div className="flex items-center space-x-6">
//           <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
//           <Link to="/signup" className="text-gray-300 hover:text-white transition">Register</Link>
//           <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
//           <Link to="/products" className="text-gray-300 hover:text-white transition">Products</Link>
//           <Link to="/verify" className="text-gray-300 hover:text-white transition">Product History</Link>
//           <button className="ml-4 px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-100 transition">
//             Connect Wallet
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <main className="flex flex-col items-center justify-center px-4 py-20 text-center">
//         <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
//           Welcome to <span className="text-indigo-400">TrustChain</span>
//         </h1>
//         <p className="mt-4 max-w-xl text-gray-300 text-lg">
//           Decentralized Application <br />
//           Verify the authenticity of academic credentials by engaging blockchain technology.
//         </p>

//         <div className="mt-8 flex flex-col sm:flex-row gap-4">
//           <Link
//             to="/signup"
//             className="bg-indigo-500 hover:bg-indigo-600 px-8 py-3 rounded-md text-white font-medium"
//           >
//             Explore
//           </Link>
//           <Link
//             to="/verify"
//             className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-md font-medium"
//           >
//             Verify Certificate
//           </Link>
//         </div>

        
//       </main>

//       {/* Role Info */}
//       <section className="mt-20 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         <div className="bg-[#1c0a35] p-6 rounded-xl shadow-lg text-white">
//           <h3 className="text-lg font-semibold mb-2">Institutions</h3>
//           <p className="text-gray-300">
//             Issue tamper-proof certificates and manage student credentials securely.
//           </p>
//         </div>
//         <div className="bg-[#1c0a35] p-6 rounded-xl shadow-lg text-white">
//           <h3 className="text-lg font-semibold mb-2">Students</h3>
//           <p className="text-gray-300">
//             Access, share, and manage your academic credentials with ease.
//           </p>
//         </div>
//         <div className="bg-[#1c0a35] p-6 rounded-xl shadow-lg text-white">
//           <h3 className="text-lg font-semibold mb-2">Verifiers</h3>
//           <p className="text-gray-300">
//             Instantly verify the authenticity of academic certificates.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;


// import React from 'react';
// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen bg-[#e7ebf5] text-gray-900"> {/* Faint blue background */}
//       {/* Navbar */}
//       <nav className="bg-[#0a1b3d] h-20 flex items-center shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
//           <div className="flex items-center">
//             <span className="text-2xl font-bold text-white">TrustChain</span>
//           </div>
//           <div className="flex items-center space-x-4">
            
//             <Link to="/verify" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
//              Login
//             </Link>
//             <Link to="/verify" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
//              SignUp
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
//         <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
//           <span className="block">Secure Academic</span>
//           <span className="block text-indigo-600">Credential Verification</span>
//         </h1>
//         <p className="mt-4 max-w-xl mx-auto text-lg text-gray-600">
//           TrustChain leverages blockchain technology to provide tamper-proof academic credential verification.
//         </p>
//         <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
//           <Link
//             to="/signup"
//             className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-md"
//           >
//             Get Started
//           </Link>
//           <Link
//             to="/verify"
//             className="bg-white text-indigo-700 hover:bg-gray-100 font-medium px-8 py-3 rounded-md shadow"
//           >
//             Verify Certificate
//           </Link>
//         </div>
//       </main>

//       {/* Role Info Section */}
//       <section className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 px-6 pb-16">
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="text-lg font-semibold text-gray-900">Institutions</h3>
//           <p className="mt-2 text-gray-600">Issue tamper-proof certificates and manage student credentials securely.</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="text-lg font-semibold text-gray-900">Students</h3>
//           <p className="mt-2 text-gray-600">Access, share, and manage your academic credentials with ease.</p>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="text-lg font-semibold text-gray-900">Verifiers</h3>
//           <p className="mt-2 text-gray-600">Instantly verify the authenticity of academic certificates.</p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;

// import React from 'react';
// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f051d] to-[#1a0730] text-white">
//       {/* Navbar */}
//       <nav className="w-full px-6 py-5 flex justify-between items-center bg-[#2a1255] shadow-md">
//         <div className="text-2xl font-bold text-white">TrustChain</div>
//         <div className="flex items-center space-x-6">
//           <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
//           <Link to="/signup" className="text-gray-300 hover:text-white transition">Register</Link>
//           <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
         
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
//         <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
//           Welcome to <span className="text-indigo-400">TrustChain</span>
//         </h1>
//         <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
//           Decentralized Application <br />
//           Verify the authenticity of academic credentials by engaging blockchain technology.
//         </p>

//         <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
//           <Link
//             to="/signup"
//             className="bg-indigo-500 hover:bg-indigo-600 px-8 py-3 rounded-md text-white font-medium"
//           >
//             Explore
//           </Link>
//           <Link
//             to="/verify"
//             className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-md font-medium"
//           >
//             Verify Certificate
//           </Link>
//         </div>

//         {/* Illustration */}
//         <div className="mt-12">
//           <img
//             src="/mnt/data/a0571aef-8a7a-49e2-b7a7-987848ed2b4b.png"
//             alt="Shield Illustration"
//             className="w-64 h-64 mx-auto"
//           />
//         </div>
//       </main>

//       {/* Roles Section */}
//       <section className="mt-20 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
//         <div className="bg-[#1c0a35] p-6 rounded-xl shadow-lg text-white">
//           <h3 className="text-lg font-semibold mb-2">Institutions</h3>
//           <p className="text-gray-300">
//             Issue tamper-proof certificates and manage student credentials securely.
//           </p>
//         </div>
//         <div className="bg-[#1c0a35] p-6 rounded-xl shadow-lg text-white">
//           <h3 className="text-lg font-semibold mb-2">Students</h3>
//           <p className="text-gray-300">
//             Access, share, and manage your academic credentials with ease.
//           </p>
//         </div>
//         <div className="bg-[#1c0a35] p-6 rounded-xl shadow-lg text-white">
//           <h3 className="text-lg font-semibold mb-2">Verifiers</h3>
//           <p className="text-gray-300">
//             Instantly verify the authenticity of academic certificates.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingPage;

import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-[#0f051d] text-white">

<nav className="relative z-10 w-full px-6 py-5 flex justify-between items-center bg-[#2a1255]/80 backdrop-blur-md shadow-md">
        <div className="text-2xl font-bold text-white tracking-wide">TrustChain</div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
          <Link to="/signup" className="text-gray-300 hover:text-white transition">Register</Link>
          <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
        </div>
      </nav>
      
      {/* Background Image + Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('/your-image-path.jpg')` }} // Replace with actual path
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f051d] to-[#1a0730] opacity-90 z-0"></div>

      {/* Navbar */}
      

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
          Welcome to <span className="text-indigo-400">TrustChain</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
          Empowering institutions and students through secure, verifiable academic credentials using blockchain.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="bg-indigo-500 hover:bg-indigo-600 px-8 py-3 rounded-md text-white font-medium text-lg shadow-lg transition"
          >
            Get Started
          </Link>
          <Link
            to="/verify"
            className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg shadow-lg transition"
          >
            Verify Certificate
          </Link>
        </div>
      </main>

      {/* Roles Section */}
      <section className="relative z-10 mt-20 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 max-w-6xl mx-auto">
        <div className="bg-[#1c0a35]/80 p-6 rounded-xl shadow-xl text-white border border-indigo-500/20">
          <h3 className="text-xl font-semibold mb-3">🏛️ Institutions</h3>
          <p className="text-gray-300">
            Issue tamper-proof certificates and manage student credentials securely.
          </p>
        </div>
        <div className="bg-[#1c0a35]/80 p-6 rounded-xl shadow-xl text-white border border-indigo-500/20">
          <h3 className="text-xl font-semibold mb-3">🎓 Students</h3>
          <p className="text-gray-300">
            Access, share, and manage your academic credentials with ease.
          </p>
        </div>
        <div className="bg-[#1c0a35]/80 p-6 rounded-xl shadow-xl text-white border border-indigo-500/20">
          <h3 className="text-xl font-semibold mb-3">🔍 Verifiers</h3>
          <p className="text-gray-300">
            Instantly verify the authenticity of academic certificates.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
