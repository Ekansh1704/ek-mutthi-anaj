// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-white text-center px-6">
      {/* Animated Icon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <AlertTriangle className="text-primary w-20 h-20 mb-6" />
        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
          404
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-md">
          Oops! The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back on track 🌾
        </p>
      </motion.div>

      {/* Return Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 bg-primary hover:bg-secondary text-white px-6 py-3 rounded-full font-medium shadow-md transition"
        >
          <Home className="w-5 h-5" /> Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
