import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, MessageCircle, MapPin } from "lucide-react";
import axios from "axios";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await axios.post("https://careconnect-1-xvl2.onrender.com/api/v1/user/contact", form); // ✅ Backend API
      if (res.data.success) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-20">
      <motion.div
        className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8 md:p-12"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info Section */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              Feel free to reach out to us for appointments, feedback, or any
              questions.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-700">
                <Phone className="text-blue-600" /> <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Mail className="text-blue-600" />{" "}
                <span>support@careconnect.com</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <MessageCircle className="text-blue-600" />{" "}
                <span>WhatsApp Support Available</span>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <Linkedin className="text-blue-600" />{" "}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  linkedin.com/company/careconnect
                </a>
              </div>
              <div className="flex items-center gap-4 text-gray-700">
                <MapPin className="text-blue-600" />{" "}
                <span>Pune, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                placeholder="Write your message here..."
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Send Message
            </motion.button>

            {status && (
              <p className="text-center text-sm text-gray-700 mt-2">{status}</p>
            )}
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
