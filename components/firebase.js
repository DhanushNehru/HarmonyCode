import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Debug: Log environment variables (only in development)
if (process.env.NODE_ENV !== 'production') {
  console.log('🔍 Checking Firebase environment variables:');
  console.log('API Key exists:', !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  console.log('Auth Domain:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
  console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "placeholder-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "placeholder-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "placeholder-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "placeholder-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:placeholder",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-PLACEHOLDER",
};

// Only initialize Firebase if we have valid configuration
let app, auth, db;

try {
  // Check if we have a valid API key before initializing
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "placeholder-api-key") {
    throw new Error('Firebase API key is missing. Please check your .env.local file.');
  }
  
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization failed:', error.message);
  console.error('Please ensure your .env.local file contains valid Firebase credentials and restart the dev server.');
  // Set to null for safety
  auth = null;
  db = null;
}

export { auth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, db };

