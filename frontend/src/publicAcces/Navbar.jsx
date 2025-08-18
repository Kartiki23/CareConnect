import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [isLoginIn, setIsLoginIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const doctorId = localStorage.getItem("doctorId");
    const patientId = localStorage.getItem("patientId");

    setIsLoginIn(!!token);

    if (doctorId) {
      setRole("doctor");
    } else if (patientId) {
      setRole("patient");
    } else {
      setRole(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoginIn(false);
    setRole(null);
  };

  const handleScroll = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (location.pathname === '/' && el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const isDashboardRoute =
    location.pathname.includes("/doctor-dashboard") ||
    location.pathname.includes("/patient-dashboard");

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
          <button onClick={() => handleScroll('specialties')} className="hover:text-gray-200 transition text-2xl">
            Specialties
          </button>
          <button onClick={() => handleScroll('donation')} className="hover:text-gray-200 transition text-2xl">
            Donation
          </button>
          <Link to="/about" className="hover:text-gray-200 transition text-2xl">About</Link>
          <Link to="/contact" className="hover:text-gray-200 transition text-2xl">Contact</Link>
        </div>

        {/* Auth Buttons */}
        <div className="space-x-3 text-sm font-medium hidden md:flex">
          {!isLoginIn && !isDashboardRoute ? (
            <Link to="/login" className="px-4 py-2 mr-7 bg-white text-blue-600 rounded hover:bg-gray-100 transition">
              Login
            </Link>
          ) : (
            <>
              {role === "doctor" && (
                <Link to="/doctorDashboard" className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition">
                  Doctor Dashboard
                </Link>
              )}
              {role === "patient" && (
                <Link to="/patientDashboard" className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition">
                  Patient Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
