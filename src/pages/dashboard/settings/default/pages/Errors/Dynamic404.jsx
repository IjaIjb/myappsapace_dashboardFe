import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Dynamic404({ 
  name = "Page", 
  description = "The page you're looking for doesn't exist." 
}) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-10">
        
        {/* 404 Number */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-gray-800">404</h1>

        {/* Face */}
        <div className="relative mt-10 space-y-10">
          {/* Eyebrows */}
          <div className="flex justify-center space-x-10">
            <div className="w-12 h-5 bg-gray-800 rounded-t-full transform -rotate-12"></div>
            <div className="w-12 h-5 bg-gray-800 rounded-t-full transform rotate-12"></div>
          </div>

          {/* Eyes */}
          <div className="flex justify-center space-x-16 mt-4">
            <div className="relative w-20 h-20 bg-white rounded-full border-4 border-gray-800 flex items-center justify-center">
              <motion.div 
                animate={{ y: [0, -4, 0] }} 
                transition={{ repeat: Infinity, duration: 1 }} 
                className="w-7 h-7 bg-gray-800 rounded-full"
              ></motion.div>
            </div>
            <div className="relative w-20 h-20 bg-white rounded-full border-4 border-gray-800 flex items-center justify-center">
              <motion.div 
                animate={{ y: [0, -4, 0] }} 
                transition={{ repeat: Infinity, duration: 1 }} 
                className="w-7 h-7 bg-gray-800 rounded-full"
              ></motion.div>
            </div>
          </div>

          {/* Mouth */}
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-16 bg-black rounded-b-full overflow-hidden flex items-center justify-center">
              <div className="w-12 h-8 bg-red-500 rounded-t-full"></div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Oops! {name} Not Found
          </h2>
          <p className="text-lg text-gray-600">{description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mt-6">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-800 text-white text-sm font-semibold rounded-full shadow-md hover:bg-gray-900 transition-all"
          >
            Go Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 text-sm bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition-all"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dynamic404;
