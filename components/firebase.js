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
  // Validate required Firebase configuration
  const requiredFields = ['apiKey', 'authDomain', 'projectId'];
  const missingFields = requiredFields.filter(field => 
    !firebaseConfig[field] || 
    firebaseConfig[field].includes('placeholder')
  );

  if (missingFields.length > 0) {
    throw new Error(`Missing Firebase configuration: ${missingFields.join(', ')}`);
  }
  
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('✅ Firebase initialized successfully');
  }
} catch (error) {
  const errorMsg = `Firebase initialization failed: ${error.message}`;
  
  if (process.env.NODE_ENV === 'production') {
    // In production, log but don't expose details
    console.error('Firebase configuration error');
  } else {
    console.error('❌', errorMsg);
    console.error('📋 Please check your Firebase environment variables in .env.local');
  }
  
  // Set to null for safety - components should handle this gracefully
  auth = null;
  db = null;
}

export { auth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, db };

