import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-gray-800">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center p-7 bg-white shadow-xl rounded-lg w-full sm:w-96"
      >
        {/* Loading Spinner */}
        <div className="flex justify-center items-center">
          <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <motion.h1
          className="text-2xl font-semibold mt-4 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Loading...
        </motion.h1>

        {/* Optional Subtext */}
        <motion.p
          className="text-lg mt-2 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Please wait a moment while we load the content.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loading;
