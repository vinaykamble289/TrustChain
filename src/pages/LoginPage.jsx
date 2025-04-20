import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/config.js';

import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      
      // Set authentication state
      login({
        email: user.email,
        role: formData.role
      });
      
      // Navigate based on selected role
      switch(formData.role) {
        case 'student':
          navigate('/student');
          break;
        case 'institution':
          navigate('/institute');
          break;
        case 'verifier':
          navigate('/verifier');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Set authentication state
      login({
        email: user.email,
        role: formData.role // Default role for Google sign-in
      });
      
      switch(formData.role) {
        case 'student':
          navigate('/student');
          break;
        case 'institution':
          navigate('/institute');
          break;
        case 'verifier':
          navigate('/verifier');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex ">
      {/* Left Half with Background Image */}
      <div className="hidden lg:block relative w-1/2 bg-gradient-to-r from-blue-500 to-blue-700">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ 
            backgroundImage: 'url(./img3.webp)'
          }}
        ></div>
        <div className="relative z-10 flex flex-col justify-center h-full p-12 text-white mb-30">
          <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
          <p className="text-xl mb-8">
            Join thousands of students and institutions in our learning community.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span>Access your courses and certificates</span>
            </div>
            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span>Connect with institutions and verifiers</span>
            </div>
            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span>Secure and verified credentials</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Half with Login Form */}
      {/* Right Half with Login Form */}
<div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center px-6 sm:px-12 py-12 mt-10">
  <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
    <div>
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="text-red-600 text-sm text-center">{error}</div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
        <div className="mt-1 relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FaEnvelope className="text-gray-400" />
          </span>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="pl-10 pr-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <div className="mt-1 relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FaLock className="text-gray-400" />
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="pl-10 pr-10 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash className="text-gray-400 hover:text-gray-600" /> : <FaEye className="text-gray-400 hover:text-gray-600" />}
          </button>
        </div>
      </div>

      {/* Role Select */}
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">I am a</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="student">Student</option>
          <option value="institution">Institution</option>
          <option value="verifier">Verifier</option>
        </select>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-800">
            Forgot your password?
          </Link>
        </div>
      </div>

      {/* Sign In Button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          ) : (
            <FaSignInAlt className="mr-2" />
          )}
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </div>
    </form>

    {/* Social Sign In */}
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleGoogleSignIn}
          type="button"
          disabled={loading}
          className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24 mt-3">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span className="ml-2">Continue With Google</span>
        </button>
      </div>
    </div>

    {/* Sign Up Link */}
    <div className="mt-6 text-center text-sm">
      <span className="text-gray-600">Don't have an account? </span>
      <Link 
        to="/signup" 
        className="font-medium text-blue-600 hover:text-blue-500"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }}
      >
        Sign Up
      </Link>
    </div>

    {/* Back to Home */}
   
  </div>
</div>

    </div>
  );
};

export default LoginPage;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// import { auth, provider } from '../firebase/config';
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
// // import { useAuth } from '../context/AuthContext';
// import {useAuth} from '../AuthContext';
// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     role: 'student',
//   });
//   const [showPassword, setShowPassword] = useState(false);
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

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
//       const user = userCredential.user;
      
//       login({
//         email: user.email,
//         role: formData.role
//       });
      
//       switch(formData.role) {
//         case 'student':
//           navigate('/student');
//           break;
//         case 'institution':
//           navigate('/institute');
//           break;
//         case 'verifier':
//           navigate('/verifier');
//           break;
//         default:
//           navigate('/dashboard');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
      
//       login({
//         email: user.email,
//         role: formData.role
//       });
      
//       switch(formData.role) {
//         case 'student':
//           navigate('/student');
//           break;
//         case 'institution':
//           navigate('/institute');
//           break;
//         case 'verifier':
//           navigate('/verifier');
//           break;
//         default:
//           navigate('/dashboard');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       {/* Navigation Bar */}
//       <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
//         <div className="text-2xl font-bold text-blue-600">CertiChain</div>
//         <div className="flex space-x-6">
//           <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
//           <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
//           <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
//           <Link to="/services" className="text-gray-600 hover:text-blue-600">Services</Link>
//           <Link to="/logout" className="text-gray-600 hover:text-blue-600">Logout</Link>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="flex flex-1">
//         {/* Left Side - Branding */}
//         <div className="hidden lg:flex w-1/2 bg-blue-50 flex-col items-center justify-center p-12">
//           <h1 className="text-4xl font-bold text-blue-800 mb-6">Welcome Back!</h1>
//           <p className="text-xl text-blue-700 mb-8">
//             Secure blockchain-powered credential verification
//           </p>
//           <p className="text-lg text-blue-600 mb-12 text-center max-w-md">
//             Where every certificate is permanently secured on the blockchain - immutable, verifiable, and trusted by institutions worldwide.
//           </p>
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//           <div className="w-full max-w-md">
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
//             <p className="text-gray-600 mb-8">Welcome back! Please enter your details.</p>

//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {error && (
//                 <div className="text-red-600 text-sm p-3 bg-red-50 rounded-md">
//                   {error}
//                 </div>
//               )}

//               {/* Role Selection */}
//               <div className="flex space-x-4">
//               <label htmlFor="role" className="block text-sm font-medium text-gray-700">
//                  Select Role
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => setFormData({...formData, role: 'student'})}
//                   className={`py-2 px-4 rounded-md flex-1 ${formData.role === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
//                 >
//                   Student
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setFormData({...formData, role: 'institution'})}
//                   className={`py-2 px-4 rounded-md flex-1 ${formData.role === 'institution' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
//                 >
//                   Institution
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setFormData({...formData, role: 'verifier'})}
//                   className={`py-2 px-4 rounded-md flex-1 ${formData.role === 'verifier' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
//                 >
//                   Verifier
//                 </button>
//               </div>

//               {/* Email Field */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Your Email
//                 </label>
//                 <div className="relative">
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
//                     className="pl-10 pr-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="your@email.com"
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                   Enter Your Password
//                 </label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
//                     <FaLock className="text-gray-400" />
//                   </span>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     id="password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="pl-10 pr-10 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="••••••••"
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
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                     Remember me
//                   </label>
//                 </div>
//                 <div className="text-sm">
//                   <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
//                     Forgot password?
//                   </Link>
//                 </div>
//               </div>

//               {/* Sign In Button */}
//               <div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//                     loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//                   } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Signing in...
//                     </>
//                   ) : (
//                     'Sign in'
//                   )}
//                 </button>
//               </div>
//             </form>

//             {/* Divider */}
//             <div className="mt-6 relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Or continue with</span>
//               </div>
//             </div>

//             {/* Google Sign-In */}
//             <div className="mt-6">
//               <button
//                 onClick={handleGoogleSignIn}
//                 type="button"
//                 disabled={loading}
//                 className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                   <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
//                   <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
//                   <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
//                   <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
//                 </svg>
//                 Google
//               </button>
//             </div>

//             {/* Sign Up Link */}
//             <div className="mt-6 text-center text-sm">
//               <span className="text-gray-600">Don't have an account? </span>
//               <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
//                 Sign up
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;