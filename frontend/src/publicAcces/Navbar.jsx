import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import CareConnect_Logo from '../assets/CareConnect_Logo.png';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to add shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (location.pathname === '/' && el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 60, duration: 0.8 }}
        className={`bg-blue-600 text-white fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${
          isScrolled ? 'shadow-lg' : 'shadow-md'
        }`}
      >
        <div className="max-w-19xl mx-auto px-4 py-3 flex justify-between items-center h-20">
          {/* ✅ Logo with text */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={CareConnect_Logo}
              alt="CareConnect Logo"
              className="h-15 w-15 object-contain"
            />
            <span className="text-3xl font-bold tracking-tight hover:text-gray-200 transition">
              CareConnect
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="space-x-6 hidden md:flex text-sm font-medium">
            <Link to="/" className="hover:text-gray-200 transition text-2xl">
              Home
            </Link>
            <button
              onClick={() => handleScrollToSection('specialties')}
              className="hover:text-gray-200 transition text-2xl"
            >
              Specialties
            </button>
            <button
              onClick={() => handleScrollToSection('donation')}
              className="hover:text-gray-200 transition text-2xl"
            >
              Donation
            </button>
            <Link to="/helpPage" className="hover:text-gray-200 transition text-2xl">
              Help
            </Link>
            <Link
              to="/about"
              className="hover:text-gray-200 transition text-2xl"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-gray-200 transition text-2xl"
            >
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="space-x-3 text-sm font-medium hidden md:flex">
            <Link
              to="/login"
              className="px-4 py-2 mr-7 bg-white text-blue-600 rounded hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Page Content Wrapper with padding */}
      <main className="pt-24 px-4">
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;

