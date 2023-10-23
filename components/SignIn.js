import React from "react";
import GoogleSignIn from "./GoogleSignIn"; // Import your Google Sign-In component
import GithubSignIn from "./GithubSignIn"; // Import your GitHub Sign-In component
import ThemeToggler from "../components/ThemeToggler";

const SignIn = () => {
  return (
    <div
      className="bg-whitesmoke min-h-screen flex items-center justify-center
       dark:bg-[#303030] "
    >
      <div
        className="bg-white hover:bg-gray-200 p-8 rounded-lg shadow-lg w-96
        text-gray-500 dark:text-gray-200 dark:bg-[#252424] hover:dark:bg-[black]"
      >
        <h2 className="text-2xl font-semibold mb-6 ">Sign In</h2>

        {/* Include the Google Sign-In component */}
        <GoogleSignIn />

        {/* Add margin between the buttons */}
        <div className="mb-4"></div>

        {/* Include the GitHub Sign-In component */}
        <GithubSignIn />
      </div>
      <ThemeToggler />
    </div>
  );
};

export default SignIn;
