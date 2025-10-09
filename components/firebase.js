import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY || "placeholder-api-key",
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || "placeholder-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "placeholder-project",
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET || "placeholder-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_APP_ID || "1:123456789:web:placeholder",
  measurementId: process.env.NEXT_PUBLIC_APP_MEASUREMENT_ID || "G-PLACEHOLDER",
};

// Only initialize Firebase if we have valid configuration
let app, auth, db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn('Firebase initialization failed:', error);
  // Create mock objects for development
  auth = null;
  db = null;
}

export { auth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, db };

