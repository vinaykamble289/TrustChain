// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZJCigWBxQ8ZnLSqbCQpa7EaNs3zFy3D4",
  authDomain: "trustchain-4aefe.firebaseapp.com",
  projectId: "trustchain-4aefe",
  storageBucket: "trustchain-4aefe.firebasestorage.app",
  messagingSenderId: "1038598360598",
  appId: "1:1038598360598:web:82f7e86af4bf05b136ef37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider, signOut };
export default app;