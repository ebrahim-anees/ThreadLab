// ErrorPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

export default function StatusPage({
  code,
  title = 'Oops! Something went wrong',
  message = 'An unexpected error occurred.',
  image,
  theme = 'blue', // "red", "blue", "green", etc.
  showHomeButton = true,
  goBackSteps = -1,
  showCode = true, // For success pages, we might not want big "200" or similar
  btn1Path = '/',
  btn2Path,
  btn1Text = 'Go to Homepage',
  btn2Text = 'Go Back',
}) {
  const navigate = useNavigate();

  const handleBtn2 = () => {
    btn2Path ? navigate(btn2Path) : navigate(goBackSteps);
  };

  const bgMap = {
    red: 'bg-red-50',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    yellow: 'bg-yellow-50',
  };

  const textMap = {
    red: 'text-red-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
  };

  const btnMap = {
    red: 'bg-red-500 hover:bg-red-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    green: 'bg-green-500 hover:bg-green-600',
    yellow: 'bg-yellow-500 hover:bg-yellow-600',
  };

  const bgColor = bgMap[theme] || 'bg-blue-50';
  const textColor = textMap[theme] || 'text-blue-600';
  const btnColor = btnMap[theme] || 'bg-blue-500 hover:bg-blue-600';

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${bgColor} text-gray-800`}
    >
      <div className="text-center p-7 bg-white shadow-xl rounded-lg w-full sm:w-96 m-5">
        {image && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={image}
              alt="Status Illustration"
              className="w-full h-auto max-h-[250px] mx-auto"
            />
          </motion.div>
        )}

        {showCode && (
          <motion.div
            className={`text-9xl font-extrabold ${textColor}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {code}
          </motion.div>
        )}

        <motion.h1
          className="text-2xl font-semibold mt-4 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-lg mt-2 text-gray-500 break-words"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-4 flex gap-x-4 justify-center"
        >
          {showHomeButton && (
            <Link
              to={btn1Path}
              className={`px-6 py-2 text-white ${btnColor} rounded-md transition duration-200 transform hover:scale-105`}
            >
              {btn1Text}
            </Link>
          )}

          <button
            onClick={handleBtn2}
            className="px-6 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 transition duration-200 transform hover:scale-105 cursor-pointer"
          >
            {btn2Text}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
