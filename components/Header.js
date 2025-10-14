import React, { useState, useEffect } from "react";
import { Menu as MenuIcon, X, ChevronDown, ChevronUp } from "lucide-react";
import GoogleSignIn from "./GoogleSignIn";
import GithubSignIn from "./GithubSignIn";
import { useAuth } from '../context/AuthContext.js';

const Header = () => {
  const [stars, setStars] = useState(0);
  const { currentUser, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const fetchStars = async () => {
      const response = await fetch(
        `https://api.github.com/repos/DhanushNehru/HarmonyCode`
      );
      const repo = await response.json();
      setStars(repo.stargazers_count);
    };

    fetchStars();
  }, []);

  const handleSignOut = async () => {
    try {
      await logOut();
      setIsMenuOpen(false);
      setIsUserMenuOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <header className="w-full bg-gradient-to-r from-purple-50 to-pink-50 shadow-sm p-2 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="font-bold text-md md:text-2xl lg:text-2xl text-gray-700 dark:text-gray-300">
          Harmony Code 🎶
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-2">
          {currentUser ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : currentUser.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-bold text-gray-800 dark:text-white">
                  Welcome, {currentUser.displayName || currentUser.email.split('@')[0]}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="font-bold text-gray-700 dark:text-white border border-gray-300 rounded-md px-3 py-2 bg-white hover:bg-gray-100 dark:bg-black dark:border-gray-500 transition-all duration-200 hover:shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <GoogleSignIn />
              <GithubSignIn />
            </>
          )}
          <a
            href="https://github.com/DhanushNehru/HarmonyCode"
            className="flex items-center border border-gray-300 rounded-md px-2 py-1 bg-white transition-all duration-250 hover:bg-yellow-100 dark:bg-black dark:border-gray-500"
          >
            <div className="px-2">
              <svg
                height="32"
                width="32"
                aria-hidden="true"
                viewBox="0 0 16 16"
                version="1.1"
                className="dark:invert-[1]"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-gray-700 dark:text-gray-400">
                Star on GitHub
              </h2>
              <h3 className="text-yellow-500 text-sm text-semibold flex items-center">
                {stars} {stars === 1 ? "star" : "stars"} ⭐
              </h3>
            </div>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
          >
            {isMenuOpen ? (
              <X className="text-gray-700 dark:text-white" />
            ) : (
              <MenuIcon className="text-gray-700 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 py-2 bg-white dark:bg-gray-800 rounded-md shadow-lg">
          {currentUser ? (
            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : currentUser.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-bold text-gray-800 dark:text-white">
                  {currentUser.displayName || currentUser.email.split('@')[0]}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full text-left font-bold text-gray-700 dark:text-white border border-gray-300 rounded-md px-3 py-2 bg-white hover:bg-gray-100 dark:bg-black dark:border-gray-500 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="px-4 py-2 space-y-2">
              <GoogleSignIn />
              <GithubSignIn />
            </div>
          )}
          <a
            href="https://github.com/DhanushNehru/HarmonyCode"
            className="block px-4 py-2 mt-2"
          >
            <div className="flex items-center">
              <svg
                height="24"
                width="24"
                aria-hidden="true"
                viewBox="0 0 16 16"
                version="1.1"
                className="dark:invert-[1] mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
              <div>
                <h2 className="font-bold text-gray-700 dark:text-gray-400">
                  Star on GitHub
                </h2>
                <h3 className="text-yellow-500 text-sm text-semibold">
                  {stars} {stars === 1 ? "star" : "stars"} ⭐
                </h3>
              </div>
            </div>
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;