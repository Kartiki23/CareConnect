import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleToggle = () => {
    setRole((prev) => (prev === "patient" ? "doctor" : "patient"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      role === "patient" ? "/api/patient/login" : "http://localhost:3001/api/v1/user/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        // Optionally store token if your backend returns one
        // localStorage.setItem("token", data.token);
        navigate(role === "patient" ? "/patientDashboard" : "/doctorDashboard");
      } else {
        console.error("Login failed:", data.message);
        alert("Login failed: " + (data.message || "Invalid credentials"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Check server or network.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-blue-200 p-4">
      <motion.div
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          {role === "patient" ? "Patient" : "Doctor"} Login
        </h2>

        {/* Toggle Button */}
        <div className="flex justify-center mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleToggle}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200"
          >
            Switch to {role === "patient" ? "Doctor" : "Patient"}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={role}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Login as {role.charAt(0).toUpperCase() + role.slice(1)}
            </motion.button>
          </motion.form>
        </AnimatePresence>

        {/* Registration Links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {role === "patient" ? (
            <>
              Don't have an account?{" "}
              <Link
                to="/patientRegistration"
                className="text-blue-600 hover:underline font-medium"
              >
                Register as Patient
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Link
                to="/doctorRegistration"
                className="text-blue-600 hover:underline font-medium"
              >
                Register as Doctor
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;