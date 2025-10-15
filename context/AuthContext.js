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

  const googleSignIn = ()=>{
    if (!auth) {
      console.error('Firebase auth is not initialized. Please check your Firebase configuration.');
      alert('Authentication is not available. Please check the console for details.');
      return;
    }
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
  
  const githubSignIn = ()=>{
    if (!auth) {
      console.error('Firebase auth is not initialized. Please check your Firebase configuration.');
      alert('Authentication is not available. Please check the console for details.');
      return;
    }
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider);
  }

  function logOut() {
    if (!auth) {
      console.error('Firebase auth is not initialized.');
      return;
    }
    signOut(auth);
  }

  useEffect(() => {
    if (!auth) {
      console.warn('Firebase auth is not initialized. User state will not be tracked.');
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [currentUser]);


  return <AuthContext.Provider value={{currentUser, googleSignIn, githubSignIn, logOut}}>{children}</AuthContext.Provider>;
}
