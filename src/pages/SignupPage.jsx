// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserPlus, FaUniversity, FaPhone } from "react-icons/fa";
// import { createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "../firebase/config";

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     role: "student",
//     name: "",
//     institutionName: "",
//     email: "",
//     contactNumber: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const googleProvider = new GoogleAuthProvider();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       // Validate password length
//       if (formData.password.length < 6) {
//         throw new Error("Password must be at least 6 characters");
//       }

//       // Create user in Firebase Auth
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         formData.email,
//         formData.password
//       );

//       // Prepare user data for Firestore
//       const userData = {
//         uid: userCredential.user.uid,
//         name: formData.name,
//         email: formData.email,
//         role: formData.role,
//         contactNumber: formData.contactNumber,
//         createdAt: new Date().toISOString(),
//         emailVerified: false
//       };

//       // Add institution name if role requires it
//       if (formData.role === "college" || formData.role === "admin") {
//         userData.institutionName = formData.institutionName;
//       }

//       // Save user data to Firestore
//       await setDoc(doc(db, "users", userCredential.user.uid), userData);

//       // Send email verification
//       await sendEmailVerification(userCredential.user);

//       alert("Registration successful! Please verify your email and login.");
//       navigate("/login", {
//         state: {
//           prefilledEmail: formData.email,
//           prefilledRole: formData.role
//         }
//       });
//     } catch (error) {
//       console.error("Signup error:", error);
//       let errorMessage = "Signup failed. Please try again.";
      
//       switch (error.code) {
//         case "auth/email-already-in-use":
//           errorMessage = "Email already in use. Please login instead.";
//           break;
//         case "auth/weak-password":
//           errorMessage = "Password should be at least 6 characters.";
//           break;
//         case "auth/invalid-email":
//           errorMessage = "Please enter a valid email address.";
//           break;
//         case "auth/operation-not-allowed":
//           errorMessage = "Account creation is currently disabled.";
//           break;
//       }
      
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignup = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;

//       // Prepare user data for Firestore
//       const userData = {
//         uid: user.uid,
//         name: user.displayName || "Google User",
//         email: user.email,
//         role: formData.role,
//         createdAt: new Date().toISOString(),
//         emailVerified: user.emailVerified
//       };

//       // Add institution name if role requires it
//       if (formData.role === "college" || formData.role === "admin") {
//         userData.institutionName = formData.institutionName;
//       }

//       // Save user data to Firestore
//       await setDoc(doc(db, "users", user.uid), userData);

//       navigate(`/${formData.role}-dashboard`);
//     } catch (error) {
//       console.error("Google signup error:", error);
//       setError("Google signup failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Left: Cover */}
//       <div
//         className="hidden md:flex md:w-1/2 relative items-center justify-center text-white bg-cover bg-center"
//         style={{ backgroundImage: "url('/cover_image.png')" }}
//       >
//         <div className="absolute inset-0 bg-black/50" />
//         <div className="relative px-8 text-center">
//           <h1 className="text-4xl font-bold mb-4">
//             Feel the Crowd, Predict the Future!
//           </h1>
//           <h3 className="text-lg font-semibold">
//             Understand the crowd's emotions today to shape a better tomorrow.
//           </h3>
//         </div>
//       </div>

//       {/* Right: Form */}
//       <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-8">
//         <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//             Create Your Account
//           </h2>

//           {error && (
//             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
//               {error}
//             </div>
//           )}

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             {/* Role Selection */}
//             <div>
//               <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
//                 Register As
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full border rounded-md px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               >
//                 <option value="student">Student</option>
//                 <option value="admin">Admin</option>
//                 <option value="verifier">Verifier</option>
//                 <option value="college">College</option>
//               </select>
//             </div>

//             {/* Name */}
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaUser className="text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="John Doe"
//                 />
//               </div>
//             </div>

//             {/* Institution Name (conditionally shown) */}
//             {(formData.role === "college" || formData.role === "admin") && (
//               <div>
//                 <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700 mb-1">
//                   {formData.role === "college" ? "College Name" : "Institution Name"}
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <FaUniversity className="text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     id="institutionName"
//                     name="institutionName"
//                     required={formData.role === "college" || formData.role === "admin"}
//                     value={formData.institutionName}
//                     onChange={handleChange}
//                     className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder={formData.role === "college" ? "College Name" : "Institution Name"}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaEnvelope className="text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="your@email.com"
//                 />
//               </div>
//             </div>

//             {/* Contact Number */}
//             <div>
//               <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
//                 Contact Number
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaPhone className="text-gray-400" />
//                 </div>
//                 <input
//                   type="tel"
//                   id="contactNumber"
//                   name="contactNumber"
//                   required
//                   value={formData.contactNumber}
//                   onChange={handleChange}
//                   className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="+1 234 567 8900"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaLock className="text-gray-400" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   name="password"
//                   required
//                   minLength="6"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="pl-10 pr-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
//                   ) : (
//                     <FaEye className="text-gray-400 hover:text-gray-600" />
//                   )}
//                 </button>
//               </div>
//               <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <FaUserPlus className="mr-2" />
//               {loading ? "Signing Up..." : "Sign Up"}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="relative mt-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">Or continue with</span>
//             </div>
//           </div>

//           {/* Google Signup Button */}
//           <button
//             onClick={handleGoogleSignup}
//             disabled={loading}
//             className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
//           >
//             <img 
//               src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
//               alt="Google logo" 
//               className="h-5 w-5 mr-2"
//             />
//             {loading ? "Processing..." : "Google"}
//           </button>

//           {/* Login Link */}
//           <p className="text-center mt-4 text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800">
//               Log in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;


// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import {
// //   FaEnvelope,
// //   FaLock,
// //   FaUser,
// //   FaUniversity,
// //   FaPhone,
// //   FaEye,
// //   FaEyeSlash,
// //   FaUserPlus
// // } from 'react-icons/fa';
// // import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// // import { doc, setDoc, getDoc } from 'firebase/firestore';
// // import { auth, db, provider } from './firebase';

// // const SignupPage = () => {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //     confirmPassword: '',
// //     role: 'student',
// //     name: '',
// //     institutionName: '',
// //     contactNumber: ''
// //   });

// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');

// //     if (formData.password !== formData.confirmPassword) {
// //       setError("Passwords do not match!");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const userCredential = await createUserWithEmailAndPassword(
// //         auth,
// //         formData.email,
// //         formData.password
// //       );
// //       const user = userCredential.user;

// //       await setDoc(doc(db, "users", user.uid), {
// //         email: formData.email,
// //         name: formData.name,
// //         role: formData.role,
// //         institutionName: formData.role === "college" ? formData.institutionName : '',
// //         contactNumber: formData.contactNumber,
// //         createdAt: new Date().toISOString()
// //       });

// //       alert("You have created your account successfully!");
// //       navigate('/login');
// //     } catch (error) {
// //       setError(error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleGoogleSignup = async () => {
// //     try {
// //       setLoading(true);
// //       setError('');
      
// //       const result = await signInWithPopup(auth, provider);
// //       const user = result.user;

// //       // Check if user already exists
// //       const userDoc = await getDoc(doc(db, "users", user.uid));
      
// //       if (!userDoc.exists()) {
// //         // Create new user document
// //         await setDoc(doc(db, "users", user.uid), {
// //           email: user.email,
// //           name: user.displayName || '',
// //           role: 'student', // Default role
// //           createdAt: new Date().toISOString()
// //         });
// //       }

// //       alert("You have successfully signed up with Google!");
// //       navigate('/dashboard');
// //     } catch (error) {
// //       setError(error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col md:flex-row h-screen mt-5">
// //       {/* Left Half - Welcome Section */}
// //       <div
// //         className="hidden md:flex md:w-1/2 relative items-center justify-center text-white bg-cover bg-center"
// //         style={{ backgroundImage: "url('img2sign.jpeg')" }}
// //       >
// //         <div className="relative text-white min-h-screen flex items-center justify-center">
// //           <div className="absolute inset-0" />
// //           <div className="relative px-8 text-center max-w-2xl mx-auto">
// //             {/* Main heading */}
// //             <h1 className="text-4xl font-bold mb-4">
// //               Welcome to TrustChain
// //             </h1>
            
// //             {/* Subheading */}
// //             <h3 className="text-xl font-semibold mb-8">
// //               Secure blockchain-powered credential verification
// //             </h3>
            
// //             {/* Slogan paragraph */}
// //             <p className="text-lg text-bg-black-300 mb-12">
// //               "Where every certificate is permanently secured on the blockchain - 
// //               immutable, verifiable, and trusted by institutions worldwide."
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Right Half - Signup Form */}
// //       <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-8">
// //         <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg mt-10">
// //           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center mt-20">
// //             Create Your Account
// //           </h2>

// //           {error && (
// //             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
// //               {error}
// //             </div>
// //           )}

// //           {/* Google Signup Button */}
// //           <button
// //             onClick={handleGoogleSignup}
// //             disabled={loading}
// //             className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors mb-4"
// //           >
// //             <img
// //               src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
// //               alt="Google"
// //               className="w-5 h-5"
// //             />
// //             Continue with Google
// //           </button>

// //           <div className="relative my-4">
// //             <div className="absolute inset-0 flex items-center">
// //               <div className="w-full border-t border-gray-300"></div>
// //             </div>
// //             <div className="relative flex justify-center text-sm">
// //               <span className="px-2 bg-white text-gray-500">Or</span>
// //             </div>
// //           </div>

// //           <form className="space-y-4" onSubmit={handleSubmit}>
// //             {/* Role */}
// //             <div>
// //               <select
// //                 id="role"
// //                 name="role"
// //                 value={formData.role}
// //                 onChange={handleChange}
// //                 className="w-full border rounded-md px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500"
// //                 required
// //               >
// //                lab
// //                 <option value="student">Student</option>
// //                 <option value="verifier">Verifier</option>
// //                 <option value="college">Institution</option>
// //               </select>
// //             </div>

// //             {/* Name */}
// //             <InputWithIcon
// //               icon={<FaUser className="text-gray-400" />}
// //               type="text"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               placeholder="Full Name"
// //               required
// //             />

// //             {/* Institution Name */}
// //             {formData.role === "college" && (
// //               <InputWithIcon
// //                 icon={<FaUniversity className="text-gray-400" />}
// //                 type="text"
// //                 name="institutionName"
// //                 value={formData.institutionName}
// //                 onChange={handleChange}
// //                 placeholder="Institution Name"
// //                 required
// //               />
// //             )}

// //             {/* Email */}
// //             <InputWithIcon
// //               icon={<FaEnvelope className="text-gray-400" />}
// //               type="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               placeholder="Email"
// //               required
// //             />

// //             {/* Contact Number */}
// //             <InputWithIcon
// //               icon={<FaPhone className="text-gray-400" />}
// //               type="tel"
// //               name="contactNumber"
// //               value={formData.contactNumber}
// //               onChange={handleChange}
// //               placeholder="Contact"
// //               required
// //             />

// //             {/* Password */}
// //             <PasswordInput
// //               label="Password"
// //               name="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               show={showPassword}
// //               toggleShow={() => setShowPassword(!showPassword)}
// //             />

// //             {/* Confirm Password */}
// //             <PasswordInput
// //               label="Confirm Password"
// //               name="confirmPassword"
// //               value={formData.confirmPassword}
// //               onChange={handleChange}
// //               show={showConfirmPassword}
// //               toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
// //             />

// //             {/* Submit */}
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
// //             >
// //               <FaUserPlus className="mr-2" />
// //               {loading ? "Signing Up..." : "Sign Up"}
// //             </button>
// //           </form>

// //           {/* Footer */}
// //           <p className="mt-4 text-center text-sm text-gray-600">
// //             Already have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline">Log in</Link>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const InputWithIcon = ({ icon, ...props }) => (
// //   <div className="relative">
// //     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
// //     <input
// //       {...props}
// //       className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //     />
// //   </div>
// // );

// // const PasswordInput = ({ label, name, value, onChange, show, toggleShow }) => (
// //   <div>
// //     <div className="relative">
// //       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //         <FaLock className="text-gray-400" />
// //       </div>
// //       <input
// //         type={show ? 'text' : 'password'}
// //         name={name}
// //         value={value}
// //         onChange={onChange}
// //         required
// //         className="pl-10 pr-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
// //         placeholder={label}
// //         minLength={6}
// //       />
// //       <button
// //         type="button"
// //         className="absolute inset-y-0 right-0 pr-3 flex items-center"
// //         onClick={toggleShow}
// //       >
// //         {show ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
// //       </button>
// //     </div>
// //     <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
// //   </div>
// // );

// // export default SignupPage;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   FaEnvelope,
//   FaLock,
//   FaUser,
//   FaUniversity,
//   FaPhone,
//   FaEye,
//   FaEyeSlash,
//   FaUserPlus,
//   FaSignInAlt
// } from 'react-icons/fa';
// import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// import { doc, setDoc, getDoc } from 'firebase/firestore';
// import { auth, db, provider } from './firebase';

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'student',
//     name: '',
//     institutionName: '',
//     contactNumber: ''
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       setLoading(false);
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         formData.email,
//         formData.password
//       );
//       const user = userCredential.user;

//       await setDoc(doc(db, "users", user.uid), {
//         email: formData.email,
//         name: formData.name,
//         role: formData.role,
//         institutionName: formData.role === "college" ? formData.institutionName : '',
//         contactNumber: formData.contactNumber,
//         createdAt: new Date().toISOString()
//       });

//       alert("You have created your account successfully!");
//       navigate('/login');
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignup = async () => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       // Check if user already exists
//       const userDoc = await getDoc(doc(db, "users", user.uid));
      
//       if (!userDoc.exists()) {
//         // Create new user document
//         await setDoc(doc(db, "users", user.uid), {
//           email: user.email,
//           name: user.displayName || '',
//           role: 'student', // Default role
//           createdAt: new Date().toISOString()
//         });
//       }

//       alert("You have successfully signed up with Google!");
//       navigate('/dashboard');
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Half with Background Image */}
//       <div className="hidden lg:block relative w-1/2 bg-gradient-to-r from-blue-500 to-blue-700">
//         <div 
//           className="absolute inset-0 bg-cover bg-center opacity-90"
//           style={{ 
//             backgroundImage: 'url(./img3.webp)'
//           }}
//         ></div>
//         <div className="relative z-10 flex flex-col justify-center h-full p-12 text-white">
//           <h1 className="text-4xl font-bold mb-6">Welcome to TrustChain</h1>
//           <p className="text-xl mb-8">
//             Join thousands of students and institutions in our learning community.
//           </p>
//           <div className="space-y-4">
//             <div className="flex items-center">
//               <div className="bg-white rounded-full p-2 mr-4">
//                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//               </div>
//               <span>Blockchain-powered credential verification</span>
//             </div>
//             <div className="flex items-center">
//               <div className="bg-white rounded-full p-2 mr-4">
//                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//               </div>
//               <span>Secure and immutable records</span>
//             </div>
//             <div className="flex items-center">
//               <div className="bg-white rounded-full p-2 mr-4">
//                 <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                 </svg>
//               </div>
//               <span>Verified by institutions worldwide</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Half with Signup Form */}
//       <div className="w-full lg:w-1/2 bg-gray-50 flex flex-col justify-center py-12 px-6 sm:px-12 mt-10">
//         <div className="sm:mx-auto sm:w-full sm:max-w-md">
//           <h2 className="text-center text-3xl font-extrabold text-gray-900">
//             Create your account
//           </h2>
//         </div>

//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10">
//             {error && (
//               <div className="text-red-600 text-sm text-center mb-4">{error}</div>
//             )}

//             {/* Google Signup Button */}
            
// {/* 
//             <div className="mt-6">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300" />
//                 </div>
                
//               </div>
//             </div> */}

//             <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
//               {/* Role Selection */}
//               <div>
//                 <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//                   I am a
//                 </label>
//                 <select
//                   id="role"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                 >
//                   <option value="student">Student</option>
//                   <option value="institution">Institution</option>
//                   <option value="verifier">Verifier</option>
//                 </select>
//               </div>

//               {/* Name */}
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                   Full Name
//                 </label>
//                 <div className="mt-1 relative">
//                   <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                     <FaUser className="text-gray-400" />
//                   </span>
//                   <input
//                     type="text"
//                     name="name"
//                     id="name"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2"
//                     placeholder="John Doe"
//                   />
//                 </div>
//               </div>

//               {/* Institution Name (conditionally shown) */}
//               {formData.role === "institution" && (
//                 <div>
//                   <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700">
//                     Institution Name
//                   </label>
//                   <div className="mt-1 relative">
//                     <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                       <FaUniversity className="text-gray-400" />
//                     </span>
//                     <input
//                       type="text"
//                       name="institutionName"
//                       id="institutionName"
//                       required
//                       value={formData.institutionName}
//                       onChange={handleChange}
//                       className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2"
//                       placeholder="University of Example"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Email */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email address
//                 </label>
//                 <div className="mt-1 relative">
//                   <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                     <FaEnvelope className="text-gray-400" />
//                   </span>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2"
//                     placeholder="you@example.com"
//                   />
//                 </div>
//               </div>

//               {/* Contact Number */}
//               <div>
//                 <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
//                   Contact Number
//                 </label>
//                 <div className="mt-1 relative">
//                   <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                     <FaPhone className="text-gray-400" />
//                   </span>
//                   <input
//                     type="tel"
//                     name="contactNumber"
//                     id="contactNumber"
//                     required
//                     value={formData.contactNumber}
//                     onChange={handleChange}
//                     className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2"
//                     placeholder="+1 (555) 123-4567"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <div className="mt-1 relative">
//                   <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                     <FaLock className="text-gray-400" />
//                   </span>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     id="password"
//                     required
//                     minLength="6"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="pl-10 pr-10 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? (
//                       <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
//                     ) : (
//                       <FaEye className="text-gray-400 hover:text-gray-600" />
//                     )}
//                   </button>
//                 </div>
//                 <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                   Confirm Password
//                 </label>
//                 <div className="mt-1 relative">
//                   <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                     <FaLock className="text-gray-400" />
//                   </span>
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     id="confirmPassword"
//                     required
//                     minLength="6"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="pl-10 pr-10 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? (
//                       <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
//                     ) : (
//                       <FaEye className="text-gray-400 hover:text-gray-600" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//                     loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//                   } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
//                 >
//                   {loading ? (
//                     <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//                       />
//                     </svg>
//                   ) : (
//                     <FaUserPlus className="mr-2" />
//                   )}
//                   {loading ? 'Creating account...' : 'Sign Up'}
//                 </button>

//               </div>

//               <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">Or register with email</span>
//                 </div>
//               <button
//               onClick={handleGoogleSignup}
//               disabled={loading}
//               type="button"
//               className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
//             >
//               <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
//                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
//                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
//                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
//                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
//               </svg>
//               <span className="ml-2">Continue With Google</span>
//             </button>
//             </form>

//             {/* Login Link */}
//             <div className="mt-6 text-center text-sm">
//               <span className="text-gray-600">Already have an account? </span>
//               <Link 
//                 to="/login" 
//                 className="font-medium text-blue-600 hover:text-blue-500"
//               >
//                 Log in
//               </Link>
//             </div>

//             {/* Back to Home */}
//             <div className="mt-4 text-center text-sm">
//               <Link to="/" className="font-medium text-gray-600 hover:text-gray-500">
//                 ← Back to home
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserPlus, FaUniversity, FaPhone } from "react-icons/fa";
import { createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "student",
    name: "",
    institutionName: "",
    email: "",
    contactNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const googleProvider = new GoogleAuthProvider();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate password length
      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Prepare user data for Firestore
      const userData = {
        uid: userCredential.user.uid,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        contactNumber: formData.contactNumber,
        createdAt: new Date().toISOString(),
        emailVerified: false
      };

      // Add institution name if role is college
      if (formData.role === "college") {
        userData.institutionName = formData.institutionName;
      }

      // Save user data to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), userData);

      // Send email verification
      await sendEmailVerification(userCredential.user);

      alert("Registration successful! Please verify your email and login.");
      navigate("/login", {
        state: {
          prefilledEmail: formData.email,
          prefilledRole: formData.role
        }
      });
    } catch (error) {
      console.error("Signup error:", error);
      let errorMessage = "Signup failed. Please try again.";
      
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use. Please login instead.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Account creation is currently disabled.";
          break;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Prepare user data for Firestore
      const userData = {
        uid: user.uid,
        name: user.displayName || "Google User",
        email: user.email,
        role: formData.role,
        createdAt: new Date().toISOString(),
        emailVerified: user.emailVerified
      };

      // Add institution name if role is college
      if (formData.role === "college") {
        userData.institutionName = formData.institutionName;
      }

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), userData);

      navigate(`/${formData.role}-dashboard`);
    } catch (error) {
      console.error("Google signup error:", error);
      setError("Google signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen mt-18">
      {/* Left: Cover */}
      <div
        className="hidden md:flex md:w-1/2 relative items-center justify-center text-white bg-cover bg-center bg-blue-900"
        style={{ backgroundImage: "url('s.jpg')" }}
      >
        <div className="relative text-white min-h-screen flex items-center justify-center">
          <div className="relative px-8 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to TrustChain
            </h1>
            <h3 className="text-xl font-semibold mb-8">
              Secure blockchain-powered credential verification
            </h3>
            <p className="text-lg text-bg-black-300 mb-12">
              "Where every certificate is permanently secured on the blockchain - 
              immutable, verifiable, and trusted by institutions worldwide."
            </p>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-8 -mt-15">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create Your Account
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="student">Student</option>
                <option value="verifier">Verifier</option>
                <option value="college">Institution</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Full Name"
                />
              </div>
            </div>

            {/* Institution Name - Only shown when role is college */}
            {formData.role === "college" && (
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUniversity className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="institutionName"
                    name="institutionName"
                    required
                    value={formData.institutionName}
                    onChange={handleChange}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Institution Name"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email"
                />
              </div>
            </div>

            {/* Contact Number */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  required
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contact Number"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  minLength="6"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaUserPlus className="mr-2" />
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Google Signup Button */}
          <button 
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
             <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
            {loading ? "Processing..." : " Continue With Google"}
          </button>

          {/* Login Link */}
          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;