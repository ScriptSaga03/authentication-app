import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaMicrosoft } from "react-icons/fa";
import {useAuth} from '../context/AuthProvider'
export default function OAuthMethod() {

  const {authType }= useAuth(); 

  return (
    <div className="flex flex-col items-center justify-center md:p-6">
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
        Choose a {authType} method
      </p>

      {/* OAuth Buttons */}
      <div className="md:mt-4 mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-sm">
        {/* Google Login */}
        <button className="flex items-center justify-center border border-gray-300 dark:border-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full">
          <FcGoogle className="text-2xl" />
        </button>

        {/* Facebook Login */}
        <button className="flex items-center justify-center border border-gray-300 dark:border-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full text-blue-600 dark:text-blue-400">
          <FaFacebook className="text-2xl" />
        </button>

        {/* Apple Login */}
        <button className="flex items-center justify-center border border-gray-300 dark:border-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full text-black dark:text-white">
          <FaApple className="text-2xl" />
        </button>

        {/* Microsoft Login */}
        <button className="flex items-center justify-center border border-gray-300 dark:border-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition w-full text-blue-800 dark:text-blue-500">
          <FaMicrosoft className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
