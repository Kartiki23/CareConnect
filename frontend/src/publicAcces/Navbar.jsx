import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 60, duration: 0.8 }}
      className="bg-blue-600 text-white shadow-lg"
    >
      <div className="max-w-19xl mx-auto px-4 py-3 flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold tracking-tight hover:text-gray-200 transition">
          CareConnect
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 hidden md:flex text-sm font-medium">
          <Link to="/" className="hover:text-gray-200 transition text-2xl">Home</Link>
          <Link to="/specialties" className="hover:text-gray-200 transition text-2xl">Specialties</Link>
          <Link to="/donation" className="hover:text-gray-200 transition text-2xl">Donation</Link>
          <Link to="/about" className="hover:text-gray-200 transition text-2xl">About</Link>
          <Link to="/contact" className="hover:text-gray-200 transition text-2xl">Contact</Link>
        </div>

        {/* Auth Buttons */}
        <div className="space-x-3 text-sm font-medium hidden md:flex">
          <Link to="/login" className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition">
            Login
          </Link>
          <Link to="/register" className="px-4 py-2 border border-white rounded hover:bg-blue-500 transition">
            Register
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;