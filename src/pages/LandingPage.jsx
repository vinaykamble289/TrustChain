
// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // const LandingPage = () => {
// //   return (
// //     <div className="relative min-h-screen bg-[#0f051d] text-white">

// // <nav className="relative z-10 w-full px-6 py-5 flex justify-between items-center bg-[#2a1255]/80 backdrop-blur-md shadow-md">
// //         <div className="text-2xl font-bold text-white tracking-wide">TrustChain</div>
// //         <div className="flex items-center space-x-6">
// //           <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
// //           <Link to="/signup" className="text-gray-300 hover:text-white transition">Register</Link>
// //           <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
// //         </div>
// //       </nav>

// //       {/* Background Image + Overlay */}
// //       <div
// //         className="absolute inset-0 bg-cover bg-center opacity-20"
// //         style={{ backgroundImage: `url('/your-image-path.jpg')` }} // Replace with actual path
// //       ></div>
// //       <div className="absolute inset-0 bg-gradient-to-br from-[#0f051d] to-[#1a0730] opacity-90 z-0"></div>


// //       {/* Hero Section */}
// //       <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
// //         <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight">
// //           Welcome to <span className="text-indigo-400">TrustChain</span>
// //         </h1>
// //         <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
// //           Empowering institutions and students through secure, verifiable academic credentials using blockchain.
// //         </p>

// //         <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
// //           <Link
// //             to="/signup"
// //             className="bg-indigo-500 hover:bg-indigo-600 px-8 py-3 rounded-md text-white font-medium text-lg shadow-lg transition"
// //           >
// //             Get Started
// //           </Link>
// //           <Link
// //             to="/verify"
// //             className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg shadow-lg transition"
// //           >
// //             Verify Certificate
// //           </Link>
// //         </div>
// //       </main>

// //       {/* Roles Section */}
// //       <section className="relative z-10 mt-20 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 max-w-6xl mx-auto">
// //         <div className="bg-[#1c0a35]/80 p-6 rounded-xl shadow-xl text-white border border-indigo-500/20">
// //           <h3 className="text-xl font-semibold mb-3">🏛️ Institutions</h3>
// //           <p className="text-gray-300">
// //             Issue tamper-proof certificates and manage student credentials securely.
// //           </p>
// //         </div>
// //         <div className="bg-[#1c0a35]/80 p-6 rounded-xl shadow-xl text-white border border-indigo-500/20">
// //           <h3 className="text-xl font-semibold mb-3">🎓 Students</h3>
// //           <p className="text-gray-300">
// //             Access, share, and manage your academic credentials with ease.
// //           </p>
// //         </div>
// //         <div className="bg-[#1c0a35]/80 p-6 rounded-xl shadow-xl text-white border border-indigo-500/20">
// //           <h3 className="text-xl font-semibold mb-3">🔍 Verifiers</h3>
// //           <p className="text-gray-300">
// //             Instantly verify the authenticity of academic certificates.
// //           </p>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default LandingPage;



// import React from 'react';
// import { Link } from 'react-router-dom';


// const LandingPage = () => {
//   return (
//     <div>
//       <div id="/"className='relative h-[120vh] bg-[#0f051d] bg-contain bg-no-repeat bg-center mt-4' style={{ backgroundImage: "url('./blue.jpeg')" }}>

//         <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
//           <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-white">
//             Welcome to <span className="text-indigo-400">TrustChain</span>
//           </h1>
//           <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
//             Empowering institutions and students through secure, verifiable academic credentials using blockchain.
//           </p>

//           <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               to="/signup"
//               className="bg-indigo-500 hover:bg-indigo-600 px-8 py-3 rounded-md text-white font-medium text-lg shadow-lg transition"
//             >
//               Get Started
//             </Link>
//             <Link
//               to="/verify"
//               className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg shadow-lg transition"
//             >
//               Verify Certificate
//             </Link>
//           </div>
//         </main>

//         {/* Roles Section */}
//         <section className="relative z-10 mt-0 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 max-w-6xl mx-auto mt-">
//           <div className="bg-[#1c0a35]/80 p-6 rounded-xl shadow-xl text-white border border-indigo-500/20">
//             <h3 className="text-xl font-semibold mb-3">🏛️ Institutions</h3>
//             <p className="text-gray-300">
//               {/* Issue tamper-proof certificates and manage student credentials securely. */}
//               Institutions can securely issue tamper-proof certificates using blockchain. All student credentials are digitally signed and stored, simplifying verification and reducing administrative overhead.
//             </p>
//           </div>
//           <div className="bg-[#1c0a35]/80 p-6 rounded-xl shadow-xl text-white border border-indigo-500/20">
//             <h3 className="text-xl font-semibold mb-3">🎓 Students</h3>
//             <p className="text-gray-300">
//               {/* Access, share, and manage your academic credentials with ease. */}
//               Students can easily access and share their academic records from a secure digital vault. Verified credentials help build trust with universities and employers.
//             </p>
//           </div>
//           <div className="bg-[#1c0a35]/80 p-6 rounded-xl shadow-xl text-white border border-indigo-500/20">
//             <h3 className="text-xl font-semibold mb-3">🔍 Verifiers</h3>
//             <p className="text-gray-300">
//               Instantly verify the authenticity of academic certificates.
//             </p>
//           </div>
//         </section>
//       </div>


//       <div  class='about-section'className="bg-[#0f051d] text-white py-20 px-4 sm:px-6 lg:px- mt-0">
//         <div className="max-w-7xl mx-auto">
//           {/* Workflow Section */}
//           <div className="mb-20">
//             <h3 className=' text-4xl font-bold text-white text-center mb-5'>About Us</h3>
//             <h3 className="text-2xl font-semibold mb-8 text-center text-indigo-300">
//               📌 TrustChain Full Workflow
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Institution Card */}
//               <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20">
//                 <div className="flex items-center mb-4">
//                   <div className="bg-indigo-500/20 p-2 rounded-lg mr-3">
//                     <span className="text-2xl">🏫</span>
//                   </div>
//                   <h4 className="text-xl font-medium">Institution</h4>
//                 </div>
//                 <ol className="list-decimal list-inside text-gray-300 space-y-2 pl-2 text-sm">
//                   <li>Login with institutional credentials</li>
//                   <li>Upload student certificates</li>
//                   <li>System generates unique hash</li>
//                   <li>Data stored on blockchain + IPFS</li>
//                   <li>Student receives verification ID</li>
//                 </ol>
//               </div>

//               {/* Student Card */}
//               <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20">
//                 <div className="flex items-center mb-4">
//                   <div className="bg-indigo-500/20 p-2 rounded-lg mr-3">
//                     <span className="text-2xl">🎓</span>
//                   </div>
//                   <h4 className="text-xl font-medium">Student</h4>
//                 </div>
//                 <ol className="list-decimal list-inside text-gray-300 space-y-2 pl-2 text-sm">
//                   <li>Access your credentials</li>
//                   <li>View/download certificates</li>
//                   <li>Share verification links</li>
//                   <li>Track verification requests</li>
//                 </ol>
//               </div>

//               {/* Verifier Card */}
//               <div className="bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20">
//                 <div className="flex items-center mb-4">
//                   <div className="bg-indigo-500/20 p-2 rounded-lg mr-3">
//                     <span className="text-2xl">🔍</span>
//                   </div>
//                   <h4 className="text-xl font-medium">Verifier</h4>
//                 </div>
//                 <ol className="list-decimal list-inside text-gray-300 space-y-2 pl-2 text-sm">
//                   <li>Enter verification ID</li>
//                   <li>System checks blockchain</li>
//                   <li>Retrieves certificate data</li>
//                   <li>Displays authenticity status</li>
//                 </ol>
//               </div>
//             </div>
//           </div>

//           {/* Tech Stack Section */}
//           <div className="mb-20">
//             <h3 className="text-2xl font-semibold mb-8 text-center text-indigo-300">
//               🛠️ Our Technology
//             </h3>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {[
//                 { name: "Ethereum", icon: "⛓️", desc: "Blockchain" },
//                 { name: "IPFS", icon: "🗄️", desc: "Storage" },
//                 { name: "React", icon: "⚛️", desc: "Frontend" },
//                 { name: "Node.js", icon: "🖥️", desc: "Backend" },
//                 { name: "Solidity", icon: "📜", desc: "Smart Contracts" },
//                 { name: "Firebase", icon: "🔥", desc: "Authentication" },
//                 { name: "Hardhat", icon: "🛠️", desc: "Development" },
//                 { name: "Google Drive", icon: "📁", desc: "Backup" },
//               ].map((tech, index) => (
//                 <div key={index} className="bg-[#1c0a35]/50 p-4 rounded-lg border border-indigo-500/20 text-center">
//                   <div className="text-3xl mb-2">{tech.icon}</div>
//                   <h4 className="font-medium mb-1">{tech.name}</h4>
//                   <p className="text-xs text-gray-400">{tech.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Benefits Section */}
//           <div className="bg-[#1c0a35]/80 p-8 rounded-xl border border-indigo-500/20">
//             <h3 className="text-2xl font-semibold mb-6 text-center text-indigo-300">
//               ✨ Why TrustChain?
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 "Instant verification worldwide",
//                 "Tamper-proof certificates",
//                 "Reduces administrative work",
//                 "Students control their data",
//                 "No certificate fraud",
//                 "Decentralized and secure"
//               ].map((benefit, index) => (
//                 <div key={index} className="flex items-start">
//                   <span className="text-indigo-400 mr-3 mt-1">✓</span>
//                   <span className="text-gray-300">{benefit}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [activeRole, setActiveRole] = useState(null);
  const [activeTech, setActiveTech] = useState(null);
  const [activeWorkflow, setActiveWorkflow] = useState(null);
  const [activeService, setActiveService] = useState(null);

  const handleRoleClick = (index) => {
    setActiveRole(activeRole === index ? null : index);
  };

  const handleTechClick = (index) => {
    setActiveTech(activeTech === index ? null : index);
  };

  const handleWorkflowClick = (index) => {
    setActiveWorkflow(activeWorkflow === index ? null : index);
  };

  const handleServiceClick = (index) => {
    setActiveService(activeService === index ? null : index);
  };

  return (
    <div className="bg-[#0f051d] text-white -mt-8">
      {/* Hero Section */}
      <div  className='relative bg-contain bg-no-repeat bg-center mt-1 ' style={{ backgroundImage: "url('./blue.jpeg')" }} >
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight text-white">
            Welcome to <span className="text-indigo-400">TrustChain</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300">
            Empowering institutions and students through secure, verifiable academic credentials using blockchain.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-indigo-500 hover:bg-indigo-600 px-8 py-3 rounded-md text-white font-medium text-lg shadow-lg transition transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg shadow-lg transition transform hover:scale-105"
            >
              Verify Certificate
            </Link>
          </div>
        </main>

        {/* Roles Section */}
        <section className="relative z-10  px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 max-w-6xl mx-auto -mt-18 ">
          {[
            {
              title: "🏛️ Institutions",
              description: " Institutions can securely issue tamper-proof certificates using blockchain. All student credentials are digitally signed and stored, simplifying verification and reducing administrative overhead.",
              details: [
                "Secure certificate issuance platform",
                "Batch processing for multiple certificates",
                "Real-time verification tracking",
                "Dashboard with analytics",
                "Automated notifications"
              ],
              link: "/institution-login"
            },
            {
              title: "🎓 Students",
              description: " Students can easily access and share their academic records from a secure digital vault. Verified credentials help build trust with universities and employers.",
              details: [
                "Lifetime access to all credentials",
                "One-click verification sharing",
                "Digital wallet for certificates",
                "Verification history tracking",
                "Secure cloud backup"
              ],
              link: "/student-login"
            },
            {
              title: "🔍 Verifiers",
              description: " Students can easily access and share their academic records from a secure digital vault. Verified credentials help build trust with universities and employers.",
              details: [
                "Instant verification results",
                "Detailed certificate information",
                "Fraud detection alerts",
                "Verification history logs",
                "API integration options"
              ],
              link: "/verifier-login"
            }
          ].map((role, index) => (
            <div 
              key={index}
              className={`bg-[#1c0a35]/80 p-6 rounded-xl shadow-xl text-white border border-indigo-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-indigo-500/20 hover:border-indigo-400 cursor-pointer ${activeRole === index ? 'scale-110 border-indigo-400 shadow-indigo-500/30' : ''}`}
              onClick={() => handleRoleClick(index)}
            >
              <Link to={role.link} className="block">
                <h3 className="text-xl font-semibold mb-3">{role.title}</h3>
                <p className="text-gray-300 mb-4">{role.description}</p>
              </Link>
              {activeRole === index && (
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  {role.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-indigo-400 mr-2">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      </div>

      {/* About Section */}
      <div id='about-section' className="bg-[#0f051d] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className='text-4xl font-bold text-white text-center mb-5'>About Us</h3>
          
          {/* Workflow Section */}
          <div className="mb-20">
            <h3 className="text-2xl font-semibold mb-8 text-center text-indigo-300">
              📌 TrustChain Full Workflow
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🏫",
                  title: "Institution",
                  description: "Educational institutions can securely issue digital certificates",
                  items: [
                    "Login with institutional credentials",
                    "Upload student certificates",
                    "System generates unique hash",
                    "Data stored on blockchain + IPFS",
                    "Student receives verification ID"
                  ],
                  details: [
                    "Role-based access control",
                    "Bulk certificate upload",
                    "Automated metadata extraction",
                    "Secure blockchain integration",
                    "Email notifications"
                  ]
                },
                {
                  icon: "🎓",
                  title: "Student",
                  description: "Students get lifetime access to their credentials",
                  items: [
                    "Access your credentials",
                    "View/download certificates",
                    "Share verification links",
                    "Track verification requests"
                  ],
                  details: [
                    "Mobile-friendly interface",
                    "One-time password verification",
                    "Social media sharing",
                    "Verification analytics",
                    "Export options"
                  ]
                },
                {
                  icon: "🔍",
                  title: "Verifier",
                  description: "Employers and organizations can instantly verify credentials",
                  items: [
                    "Enter verification ID",
                    "System checks blockchain",
                    "Retrieves certificate data",
                    "Displays authenticity status"
                  ],
                  details: [
                    "QR code scanning",
                    "Detailed verification report",
                    "Fraud detection",
                    "API integration",
                    "Verification history"
                  ]
                }
              ].map((workflow, index) => (
                <div 
                  key={index}
                  className={`bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-indigo-500/10 hover:border-indigo-400 cursor-pointer ${activeWorkflow === index ? 'scale-110 border-indigo-400 shadow-indigo-500/30' : ''}`}
                  onClick={() => handleWorkflowClick(index)}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-500/20 p-2 rounded-lg mr-3">
                      <span className="text-2xl">{workflow.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium">{workflow.title}</h4>
                      <p className="text-sm text-gray-400">{workflow.description}</p>
                    </div>
                  </div>
                  <ol className="list-decimal list-inside text-gray-300 space-y-2 pl-2 text-sm mb-4">
                    {workflow.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                  {activeWorkflow === index && (
                    <div className="mt-4 pt-4 border-t border-indigo-500/20">
                      <h5 className="text-sm font-medium text-indigo-300 mb-2">Additional Features:</h5>
                      <ul className="text-xs text-gray-400 space-y-1">
                        {workflow.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-indigo-400 mr-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="mb-20">
            <h3 className="text-2xl font-semibold mb-8 text-center text-indigo-300">
              🛠️ Our Technology
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { 
                  name: "Ethereum", 
                  icon: "⛓️", 
                  desc: "Blockchain network for immutable records",
                  details: [
                    "Smart contract deployment",
                    "Gas-efficient transactions",
                    "Mainnet and testnet support",
                    "ERC-721 token standard"
                  ]
                },
                { 
                  name: "IPFS", 
                  icon: "🗄️", 
                  desc: "Decentralized file storage",
                  details: [
                    "Content-addressable storage",
                    "Data redundancy",
                    "Permanent file addressing",
                    "256-bit encryption"
                  ]
                },
                { 
                  name: "React", 
                  icon: "⚛️", 
                  desc: "Frontend framework",
                  details: [
                    "Responsive design",
                    "Component-based architecture",
                    "State management",
                    "Progressive Web App"
                  ]
                },
                { 
                  name: "Node.js", 
                  icon: "🖥️", 
                  desc: "Backend runtime",
                  details: [
                    "REST API endpoints",
                    "JWT authentication",
                    "Blockchain interaction",
                    "IPFS integration"
                  ]
                },
                { 
                  name: "Solidity", 
                  icon: "📜", 
                  desc: "Smart contract language",
                  details: [
                    "Vulnerability protection",
                    "Optimized bytecode",
                    "Upgradeable contracts",
                    "OpenZeppelin integration"
                  ]
                },
                { 
                  name: "Firebase", 
                  icon: "🔥", 
                  desc: "Authentication & database",
                  details: [
                    "Email/password auth",
                    "Google OAuth",
                    "Real-time database",
                    "Cloud functions"
                  ]
                },
                { 
                  name: "Hardhat", 
                  icon: "🛠️", 
                  desc: "Development environment",
                  details: [
                    "Testing framework",
                    "Debugging tools",
                    "Network simulation",
                    "Plugin ecosystem"
                  ]
                },
                { 
                  name: "Google Drive", 
                  icon: "📁", 
                  desc: "Backup solution",
                  details: [
                    "Automated backups",
                    "Version history",
                    "Encrypted storage",
                    "User-controlled access"
                  ]
                },
              ].map((tech, index) => (
                <div 
                  key={index} 
                  className={`bg-[#1c0a35]/50 p-4 rounded-lg border border-indigo-500/20 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-indigo-500/10 hover:border-indigo-400 cursor-pointer ${activeTech === index ? 'scale-110 border-indigo-400 shadow-indigo-500/30' : ''}`}
                  onClick={() => handleTechClick(index)}
                >
                  <div className="text-3xl mb-2">{tech.icon}</div>
                  <h4 className="font-medium mb-1">{tech.name}</h4>
                  <p className="text-xs text-gray-400 mb-2">{tech.desc}</p>
                  {activeTech === index && (
                    <div className="mt-2 pt-2 border-t border-indigo-500/20">
                      <ul className="text-xxs text-gray-500 space-y-1">
                        {tech.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div  id="services-section"className="mb-20">
            <h3 className="text-2xl font-semibold mb-8 text-center text-indigo-300">
              🚀 Our Services
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Blockchain Verification",
                  description: "Immutable verification of academic credentials using Ethereum blockchain",
                  icon: "🔗",
                  details: [
                    "Permanent record on blockchain",
                    "Smart contract verification",
                    "Publicly auditable",
                    "No single point of failure"
                  ]
                },
                {
                  title: "Secure Storage",
                  description: "Decentralized storage of certificates using IPFS for redundancy and security",
                  icon: "🔒",
                  details: [
                    "Content-addressed storage",
                    "Data replication",
                    "256-bit encryption",
                    "No data loss"
                  ]
                },
                {
                  title: "Instant Verification",
                  description: "Real-time verification of certificates with unique verification IDs",
                  icon: "⚡",
                  details: [
                    "Sub-second response time",
                    "QR code scanning",
                    "API integration",
                    "Detailed verification report"
                  ]
                },
                {
                  title: "Student Portal",
                  description: "Personal dashboard for students to manage and share their credentials",
                  icon: "🎓",
                  details: [
                    "Lifetime access",
                    "Credential organization",
                    "Sharing controls",
                    "Verification tracking"
                  ]
                },
                {
                  title: "Institution Dashboard",
                  description: "Comprehensive tools for institutions to issue and manage certificates",
                  icon: "🏛️",
                  details: [
                    "Bulk processing",
                    "Template management",
                    "Analytics dashboard",
                    "Automated notifications"
                  ]
                },
                {
                  title: "API Integration",
                  description: "Seamless integration with existing education management systems",
                  icon: "🔄",
                  details: [
                    "RESTful API",
                    "Webhooks",
                    "Documentation",
                    "Developer support"
                  ]
                }
              ].map((service, index) => (
                <div 
                  key={index}
                  className={`bg-[#1c0a35]/80 p-6 rounded-xl border border-indigo-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-indigo-500/10 hover:border-indigo-400 cursor-pointer ${activeService === index ? 'scale-110 border-indigo-400 shadow-indigo-500/30' : ''}`}
                  onClick={() => handleServiceClick(index)}
                >
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h4 className="text-xl font-medium mb-2">{service.title}</h4>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  {activeService === index && (
                    <div className="mt-4 pt-4 border-t border-indigo-500/20">
                      <ul className="text-sm text-gray-400 space-y-2">
                        {service.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-indigo-400 mr-2">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-[#1c0a35]/80 p-8 rounded-xl border border-indigo-500/20">
            <h3 className="text-2xl font-semibold mb-6 text-center text-indigo-300">
              ✨ Why TrustChain?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Instant verification worldwide",
                "Tamper-proof certificates",
                "Reduces administrative work",
                "Students control their data",
                "No certificate fraud",
                "Decentralized and secure"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-indigo-400 mr-3 mt-1">✓</span>
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;