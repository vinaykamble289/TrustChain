// import React, { createContext, useState, useContext } from 'react';

// import { auth, getUserRole } from '../services/firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import LoadingSpinner from '../components/LoadingSpinner';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   const login = (userData) => {
//     setIsLoggedIn(true);
//     setUser(userData);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };





// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       setCurrentUser(user);
      
//       if (user) {
//         try {
//           const role = await getUserRole(user.uid);
//           setUserRole(role);
//         } catch (error) {
//           console.error("Error fetching user role:", error);
//         }
//       } else {
//         setUserRole(null);
//       }
      
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     userRole,
//     loading
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
//   }
// };



// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }; 


// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { auth, provider } from "./firebase.js";
// import { onAuthStateChanged } from 'firebase/auth';
// import LoadingSpinner from '../components/LoadingSpinner';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, provider } from "../firebase/config"; // ✅ fixed import
import { onAuthStateChanged } from 'firebase/auth';
import LoadingSpinner from '../components/LoadingSpinner';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        try {
          const role = await getUserRole(user.uid);
          setUserRole(role);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    setUserRole(null); // optionally fetch role if needed
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
  };

  const value = {
    currentUser,
    userRole,
    loading,
    login,
    logout,
  };

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

if (loading) {
  return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
}

return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

