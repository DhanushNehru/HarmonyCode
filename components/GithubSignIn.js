import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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
      <Image
        className='w-6 h-6'
        src='https://www.svgrepo.com/show/452211/github.svg'
        width={24}
        height={24}
        alt='github logo'
        unoptimized={true}
      />
      <span>Login with Github</span>
    </button>
  );
};

export default GithubSignIn;
