import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.js';

const GithubSignIn = () => {
  const { currentUser, githubSignIn } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [currentUser]);

  const handleSignIn = async () => {
    try {
      await githubSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? null : (
    <button
      onClick={handleSignIn}
      className='px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 dark:text-white hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150'
    >
      <img
        className='w-6 h-6'
        src='https://www.svgrepo.com/show/452211/github.svg'
        loading='lazy'
        alt='github logo'
      />
      <span>Login with Github</span>
    </button>
  );
};

export default GithubSignIn;
