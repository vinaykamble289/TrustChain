// // src/pages/RegisterCollege.jsx
// import React, { useState } from 'react';

// const RegisterCollege = () => {
//   const [formData, setFormData] = useState({
//     collegeName: '',
//     email: '',
//     location: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle registration logic here
//     console.log('College Registered:', formData);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center px-4">
//       <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full">
//         <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Register New College</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="collegeName"
//             value={formData.collegeName}
//             onChange={handleChange}
//             placeholder="College Name"
//             required
//             className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email Address"
//             required
//             className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
//           />
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             placeholder="Location"
//             required
//             className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
//           />

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition duration-200"
//           >
//             Register College
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterCollege;


// src/pages/RegisterCollege.jsx
import React, { useState } from 'react';

const RegisterCollege = () => {
  const [formData, setFormData] = useState({
    collegeName: '',
    email: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('College Registered:', formData);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <div
        className="w-1/2 relative flex items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('cover_image.png')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center px-6">
          <h1 className="text-4xl font-bold mb-4">Empower Institutions!</h1>
          <h3 className="text-lg font-bold">Register your college to join the future of decentralized credential verification.</h3>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100 px-6 py-8">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold text-gray-900 tracking-wide text-center">Register New College</h2>
          <p className="text-md text-gray-600 mt-2 text-center">Join the verified academic network.</p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="College Name"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Register College
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCollege;
