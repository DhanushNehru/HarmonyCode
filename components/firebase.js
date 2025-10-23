import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Check if we have valid Firebase configuration
const hasValidFirebaseConfig = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  
  return apiKey && 
         apiKey !== "your-firebase-api-key" && 
         apiKey !== "placeholder-api-key" &&
         authDomain && 
         authDomain !== "your-project.firebaseapp.com" &&
         projectId && 
         projectId !== "your-project-id";
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_APP_MEASUREMENT_ID,
};

// Only initialize Firebase if we have valid configuration
let app, auth, db;

if (hasValidFirebaseConfig()) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
    auth = null;
    db = null;
  }
} else {
  console.log('Firebase not configured - using mock authentication');
  auth = null;
  db = null;
}

export { auth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, db };

