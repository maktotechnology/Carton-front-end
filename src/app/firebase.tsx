// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl0lXAQRdvJQIuU2w72F9YTxqdqtKwQaM",
  authDomain: "ghostdelivery-99b14.firebaseapp.com",
  projectId: "ghostdelivery-99b14",
  storageBucket: "ghostdelivery-99b14.appspot.com",
  messagingSenderId: "69431046757",
  appId: "1:69431046757:web:2ea881099890c271750c8c",
  measurementId: "G-BN70PWJ5FK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db, app };
