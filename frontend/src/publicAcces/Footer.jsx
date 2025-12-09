// Footer.jsx
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        
        {/* Company Info */}
        <div>
          <h2 className="text-white font-bold text-xl mb-4">CareConnect</h2>
          <p className="text-sm">
            Your trusted partner for online doctor consultations, hospital bookings, 
            and healthcare solutions – anytime, anywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
            <li><a href="/services" className="hover:text-blue-400">Services</a></li>
            <li><a href="/specialties" className="hover:text-blue-400">Specialties</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-4">Resources</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/faqs" className="hover:text-blue-400">FAQs</a></li>
            <li><a href="/blogs" className="hover:text-blue-400">Health Blogs</a></li>
            <li><a href="/privacy" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-blue-400">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-4">Connect With Us</h2>
          <p className="text-sm">📍 Pune, Maharashtra, India</p>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm">✉ support@careconnect.com</p>

          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-blue-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-blue-400"><Twitter size={20} /></a>
            <a href="#" className="hover:text-blue-400"><Instagram size={20} /></a>
            <a href="#" className="hover:text-blue-400"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} CareConnect. All rights reserved.
      </div>
    </footer>
  );
}