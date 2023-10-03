import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.js';

const GoogleSignIn = () => {
    const { currentUser, googleSignIn, logOut } = useAuth();
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        }
        checkAuthentication();
    }, [currentUser]);

    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    }
    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    }
    return loading ? null : !currentUser ? (
      <button
        onClick={handleSignIn}
        className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
      >
        <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span>Login with Google</span>
      </button>
    ) : (
      <div className='flex items-center border border-gray-300 rounded-md px-2 py-1 bg-white transition-all duration-250 hover:bg-gray-100 dark:bg-black dark:border-gray-500'>
        <button
          onClick={handleSignOut}
          className="font-bold text-gray-700 dark:text-gray-400"
        >
          <span>Logout</span>
        </button>
      </div>
    );
};

export default GoogleSignIn