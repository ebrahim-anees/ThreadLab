import React from 'react';
import { motion } from 'framer-motion';
import NotFoundImage from '@/assets/pageNotFound.png';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-2);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-gray-800">
      <div className="text-center p-7 bg-white shadow-xl rounded-lg w-full sm:w-96">
        {/* Animated Illustration */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={NotFoundImage} // Replace with the actual image path
            alt="404 Error - Page Not Found Illustration"
            className="w-full h-auto mx-auto"
          />
        </motion.div>

        {/* 404 Text */}
        <motion.div
          className="text-9xl font-extrabold text-blue-600 "
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.div>

        {/* Page Not Found Text */}
        <motion.h1
          className="text-2xl font-semibold mt-4 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Oops! Page Not Found
        </motion.h1>

        <motion.p
          className="text-lg mt-2 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          We couldn't find what you're looking for. Please check the URL.
        </motion.p>

        {/* Go to Homepage Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-4 flex gap-x-4 justify-center"
        >
          <Link
            to="/"
            className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200 transform hover:scale-105"
          >
            Go to Homepage
          </Link>
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

export default NotFound;
