// UnAuth.jsx
import React from 'react';
import { motion } from 'framer-motion';
import UnAuthImage from '@/assets/unAuth.png';
import { Link, useNavigate } from 'react-router-dom';

const UnAuth = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-2); // This simulates going back in history
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-gray-800">
      <div className="text-center p-7 bg-white shadow-xl rounded-lg w-full sm:w-96">
        {/* Animated Illustration */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={UnAuthImage} // Replace with the actual image path
            alt="Unauthorized Access Illustration"
            className="w-full h-auto mx-auto"
          />
        </motion.div>

        {/* Unauthorized Text */}
        <motion.div
          className="text-9xl font-extrabold text-red-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          401
        </motion.div>

        {/* Unauthorized Access Text */}
        <motion.h1
          className="text-2xl font-semibold mt-4 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Oops! Unauthorized Access
        </motion.h1>

        <motion.p
          className="text-lg mt-2 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          You don't have permission to view this page. Please contact support if
          you believe this is a mistake.
        </motion.p>
        {/* Buttons for navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-4 flex gap-x-4 justify-center"
        >
          {/* Go to Homepage Button */}
          <Link
            to="/"
            className="px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200 transform hover:scale-105"
          >
            Go to Homepage
          </Link>

          {/* Go Back Button */}
          <button
            onClick={handleGoBack}
            className="px-6 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 transition duration-200 transform hover:scale-105 cursor-pointer"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default UnAuth;
