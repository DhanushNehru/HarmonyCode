// src/context/AuthContext.js
import React, { useContext, useState, useEffect } from "react";
import { GoogleAuthProvider, GithubAuthProvider, auth, signInWithPopup } from "../components/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isFirebaseAvailable, setIsFirebaseAvailable] = useState(false);

  // Check if Firebase is properly configured
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const hasValidConfig = apiKey && apiKey !== "your-firebase-api-key" && apiKey !== "placeholder-api-key";
    setIsFirebaseAvailable(hasValidConfig && auth !== null);
  }, []);

  const googleSignIn = async () => {
    if (!isFirebaseAvailable || !auth) {
      console.warn('Firebase not configured. Please add your Firebase credentials to .env.local');
      alert('Authentication not configured. Please check the console for setup instructions.');
      return Promise.reject('Firebase not configured');
    }
    
    try {
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }
  
  const githubSignIn = async () => {
    if (!isFirebaseAvailable || !auth) {
      console.warn('Firebase not configured. Please add your Firebase credentials to .env.local');
      alert('Authentication not configured. Please check the console for setup instructions.');
      return Promise.reject('Firebase not configured');
    }
    
    try {
      const provider = new GithubAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      throw error;
    }
  }

  function logOut() {
    if (!isFirebaseAvailable || !auth) {
      console.warn('Firebase not configured');
      return;
    }
    
    try {
      signOut(auth);
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  }

  useEffect(() => {
    if (!isFirebaseAvailable || !auth) {
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Auth state change error:', error);
    }
  }, [isFirebaseAvailable]);

  return (
    <AuthContext.Provider 
      value={{
        currentUser, 
        googleSignIn, 
        githubSignIn, 
        logOut, 
        isFirebaseAvailable
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
