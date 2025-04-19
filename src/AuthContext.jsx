// // import { createContext, useContext, useEffect, useState } from 'react';
// // import { auth } from '../firebase/config';
// // import { onAuthStateChanged } from 'firebase/auth';
// // import { useAuth } from '/firebase/auth';
// // const AuthContext = createContext();

// // export function AuthProvider({ children }) {
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       setCurrentUser(user);
// //       setLoading(false);
// //     });

// //     return unsubscribe;
// //   }, []);

// //   const value = {
// //     currentUser,
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export function useAuth() {
// //   return useContext(AuthContext);
// // }

// import { createContext, useContext, useEffect, useState } from 'react';
// import { auth } from '../firebase/config'; // make sure this path is correct
// import { onAuthStateChanged } from 'firebase/auth';
// import { useAuth } from '/firebase/auth';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '/src/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

// Create the context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth
export function useAuth() {
  return useContext(AuthContext);
}
