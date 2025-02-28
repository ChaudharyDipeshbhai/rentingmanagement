import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore'; // Changed getDoc to getDocs
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBSc22PLhaoXuW5Qc-fPHGf8-r0HffXqL8",
  authDomain: "aptxmng.firebaseapp.com",
  projectId: "aptxmng",
  storageBucket: "aptxmng.appspot.com", // Corrected storageBucket format
  messagingSenderId: "210845917277",
  appId: "1:210845917277:web:85fb2a76ef8337e39d2db4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth (if you need authentication)
const auth = getAuth(app);

export { db, collection, addDoc, getDocs, auth }; // Export db, collection, addDoc, getDocs, and auth


// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc, getDoc } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyBSc22PLhaoXuW5Qc-fPHGf8-r0HffXqL8",
//   authDomain: "aptxmng.firebaseapp.com",
//   projectId: "aptxmng",
//   storageBucket: "aptxmng.appspot.com", // Corrected storageBucket format
//   messagingSenderId: "210845917277",
//   appId: "1:210845917277:web:85fb2a76ef8337e39d2db4"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore
// const db = getFirestore(app);

// // Initialize Firebase Auth (if you need authentication)
// const auth = getAuth(app);

// export { db, collection, addDoc, getDoc, auth }; // Export db, collection, addDoc, and auth
