import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs 
} from 'firebase/firestore';


const firebaseConfig =  {
    apiKey: "AIzaSyA4um6vwK9Fcj9vyY1AgmcR3q6SIBGuzjw",
    authDomain: "trustchain-28500.firebaseapp.com",
    projectId: "trustchain-28500",
    storageBucket: "trustchain-28500.firebasestorage.app",
    messagingSenderId: "987249347738",
    appId: "1:987249347738:web:12def98670548415a9a323",
    measurementId: "G-4Y3BZZ4RSD"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Authentication functions
export const createUser = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// User management functions
export const setUserRole = async (userId, role) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      role,
      createdAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error setting user role:", error);
    throw error;
  }
};

export const getUserRole = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    
    return null;
  } catch (error) {
    console.error("Error getting user role:", error);
    throw error;
  }
};

// Certificate management functions
export const saveCertificateMetadata = async (userId, certificateData) => {
  try {
    const certificateRef = doc(db, 'certificates', certificateData.certificateHash);
    await setDoc(certificateRef, {
      ...certificateData,
      issuerId: userId,
      timestamp: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error saving certificate metadata:", error);
    throw error;
  }
};

export const fetchUserCertificates = async (userId, limitCount = 100) => {
  try {
    const certificatesRef = collection(db, 'certificates');
    const q = query(
      certificatesRef,
      where('issuerId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const certificates = [];
    
    querySnapshot.forEach((doc) => {
      certificates.push({
        certificateHash: doc.id,
        ...doc.data()
      });
    });
    
    return certificates;
  } catch (error) {
    console.error("Error fetching user certificates:", error);
    throw error;
  }
};

export const getCertificateMetadata = async (certificateHash) => {
  try {
    const certificateRef = doc(db, 'certificates', certificateHash);
    const certificateDoc = await getDoc(certificateRef);
    
    if (certificateDoc.exists()) {
      return {
        certificateHash,
        ...certificateDoc.data()
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error getting certificate metadata:", error);
    throw error;
  }
};