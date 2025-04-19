import { getStorage } from "firebase/storage"; 
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  signInWithPopup 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcCsT7TlFSDpCKLZfuVHbvPNaE-MdUwPI",
  authDomain: "hakethon-a6041.firebaseapp.com",
  projectId: "hakethon-a6041",
  storageBucket: "hakethon-a6041.appspot.com",
  messagingSenderId: "499014847062",
  appId: "1:499014847062:web:ca6939c2760d8616cf49f7",
  measurementId: "G-FN5K56RMT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export { 
  auth, 
  db, 
  googleProvider, 
  signInWithEmailAndPassword, 
  signInWithPopup 
};