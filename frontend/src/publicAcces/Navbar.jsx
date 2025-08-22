import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // hamburger & close icons
import CareConnect_Logo from "../assets/CareConnect_Logo.png";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (location.pathname === "/" && el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${sectionId}`;
    }
    setIsMenuOpen(false); // close menu on navigation
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, duration: 0.8 }}
        className={`bg-blue-600 text-white fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${
          isScrolled ? "shadow-lg" : "shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={CareConnect_Logo}
              alt="CareConnect Logo"
              className="h-12 w-12 object-contain"
            />
            <span className="text-2xl sm:text-3xl font-bold tracking-tight hover:text-gray-200 transition">
              CareConnect
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 text-2xl font-medium">
            <Link to="/" className="hover:text-gray-200 transition">
              Home
            </Link>
            <button
              onClick={() => handleScrollToSection("specialties")}
              className="hover:text-gray-200 transition"
            >
              Specialties
            </button>
            <button
              onClick={() => handleScrollToSection("donation")}
              className="hover:text-gray-200 transition"
            >
              Donation
            </button>
            <Link to="/helpPage" className="hover:text-gray-200 transition">
              Help
            </Link>
            <Link to="/about" className="hover:text-gray-200 transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-gray-200 transition">
              Contact
            </Link>
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex space-x-3 text-sm font-medium">
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded hover:bg-blue-500 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-blue-700 px-4 py-4 space-y-4 text-lg font-medium"
            >
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-gray-200"
              >
                Home
              </Link>
              <button
                onClick={() => handleScrollToSection("specialties")}
                className="block hover:text-gray-200"
              >
                Specialties
              </button>
              <button
                onClick={() => handleScrollToSection("donation")}
                className="block hover:text-gray-200"
              >
                Donation
              </button>
              <Link
                to="/helpPage"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-gray-200"
              >
                Help
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-gray-200"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block hover:text-gray-200"
              >
                Contact
              </Link>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition"
              >
                Login
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Page Wrapper */}
      <main className="pt-24 px-4">
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
