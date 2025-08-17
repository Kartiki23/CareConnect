import React from "react";
import { motion } from "framer-motion";
import { HeartPulse, Stethoscope, Users, ShieldCheck, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function About() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-100 py-16 px-6 text-center">
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} // ⚡ Faster (2s)
        >
          About Us
        </motion.h1>
        <motion.p
          className="max-w-3xl mx-auto text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }} // ⚡
        >
          We are dedicated to making healthcare accessible, reliable, and
          patient-focused. Our platform connects patients with trusted doctors
          and healthcare services seamlessly.
        </motion.p>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-8 grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-8"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }} // ⚡
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            To empower patients with the right healthcare resources and provide
            doctors with the tools to deliver efficient and compassionate care.
          </p>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-2xl p-8"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }} // ⚡
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Vision</h2>
          <p className="text-gray-600">
            To create a world where quality healthcare is accessible to everyone
            — anytime, anywhere.
          </p>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16 px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Stethoscope className="w-10 h-10 text-blue-500" />,
              title: "Experienced Doctors",
              desc: "Connect with trusted and verified healthcare professionals.",
            },
            {
              icon: <HeartPulse className="w-10 h-10 text-red-500" />,
              title: "Patient First",
              desc: "We prioritize patient well-being above everything else.",
            },
            {
              icon: <Users className="w-10 h-10 text-green-500" />,
              title: "Community",
              desc: "Building a network that empowers patients & doctors.",
            },
            {
              icon: <ShieldCheck className="w-10 h-10 text-purple-500" />,
              title: "Secure",
              desc: "Your data is safe with enterprise-grade security.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md text-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8}} // ⚡
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
              <p className="text-gray-500 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center bg-gradient-to-r from-cyan-100 to-blue-50">
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }} // ⚡
        >
          Join Us in Transforming Healthcare
        </motion.h2>
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }} // ⚡
        >
          Whether you are a patient seeking care or a doctor wanting to expand
          your reach, our platform is built for you.
        </motion.p>
        <motion.button
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium shadow hover:bg-blue-700 transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }} // ⚡
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </section>

      {/* Footer */}
        <footer className="bg-blue-900 text-gray-200 px-6 py-10">
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
  <div className="text-center text-sm text-gray-300 mt-8 border-t border-blue-800 pt-4">
    © {new Date().getFullYear()} CareConnect. All rights reserved.
  </div>
</footer>

    </div>
  );
}
