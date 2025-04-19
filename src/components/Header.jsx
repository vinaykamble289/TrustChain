import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-indigo-600">
                TrustChain
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/verify"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Verify Certificate
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// function Header() {
//   const { isLoggedIn, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-[#001f3d] border-b border-gray-300 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
//         <h3 className="text-3xl font-bold text-white">Emotion Detection</h3>
        
//         <div className="flex items-center space-x-8">
//           <ul className="flex space-x-8 list-none">
//             <li>
//               <Link
//                 to="/"
//                 className="text-2xl font-semibold text-white hover:text-crimson hover:py-2 hover:px-4 hover:border-2 hover:border-white transition duration-400"
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <a href="#services-section" className="text-2xl font-semibold text-white hover:text-crimson hover:py-2 hover:px-4 hover:border-2 hover:border-white transition duration-400">Services</a>
//             </li>
//             <li>
//               <Link
//                 to="/contact"
//                 className="text-2xl font-semibold text-white hover:text-crimson hover:py-2 hover:px-4 hover:border-2 hover:border-white transition duration-400"
//               >
//                 Contact
//               </Link>
//             </li>
//             <li>
//               <a href="#about-section" className="text-2xl font-semibold text-white hover:text-crimson hover:py-2 hover:px-4 hover:border-2 hover:border-white transition duration-400">About</a>
//             </li>
//           </ul>

//           <div className="flex items-center space-x-4">
//             {isLoggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className="text-xl font-semibold text-white bg-red-500 px-6 py-2 rounded-xl hover:bg-red-600 transition duration-300"
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link
//                 to="/signin"
//                 className="text-xl font-semibold text-white bg-red-500 px-6 py-2 rounded-xl hover:bg-blue-700"
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Header;
