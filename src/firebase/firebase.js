// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDbwflWkbJ_98ZDEZ97mpWOyIDs6RFT-lk",
  authDomain: "student-dd35b.firebaseapp.com",
  projectId: "student-dd35b",
  storageBucket: "student-dd35b.firebasestorage.app",
  messagingSenderId: "72941404312",
  appId: "1:72941404312:web:5f4e3da23958cacc1b10ed",
  measurementId: "G-NP7672Z0T3",
};

const app = initializeApp(firebaseConfig,"student-app");
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 