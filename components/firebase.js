import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDR4g5Rs1r5yj4NAvw-EACUynvMlXU_81M",
  authDomain: "loco-musica-hacktoberfest.firebaseapp.com",
  projectId: "loco-musica-hacktoberfest",
  storageBucket: "loco-musica-hacktoberfest.appspot.com",
  messagingSenderId: "1068714579661",
  appId: "1:1068714579661:web:7c49b7a69dd1ec3b763b84",
  measurementId: "G-5J6FY11CXV",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, db };

