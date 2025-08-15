// frontend/src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [role, setRole] = useState("patient"); // toggle between patient and doctor
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Forgot Password modal states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [fpEmail, setFpEmail] = useState("");
  const [fpNewPassword, setFpNewPassword] = useState("");

  const navigate = useNavigate();

  // Pre-fill email if remembered
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Toggle role
  const handleToggle = () => {
    setRole((prev) => (prev === "patient" ? "doctor" : "patient"));
  };

  // ===== Login =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      role === "patient"
        ? "http://localhost:3001/api/v1/user/Plogin"
        : "http://localhost:3001/api/v1/user/login";

    try {
      const response = await axios.post(endpoint, { email, password });
      const doctor = response.data?.doctor;
      const patient = response.data?.patient;

      // Remember Me
      if (rememberMe) localStorage.setItem("rememberedEmail", email);
      else localStorage.removeItem("rememberedEmail");

      if (role === "doctor" && doctor?._id) {
        localStorage.setItem("doctorId", doctor._id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("doctorEmail", doctor.email);
        navigate("/doctorDashboard");
      } else if (role === "patient" && patient?._id) {
        localStorage.setItem("patientId", patient._id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("patientEmail", patient.email);
        navigate("/patientDashboard");
      } else {
        alert("Login failed: Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed. Check credentials.");
    }
  };

  // ===== Forgot Password =====
  const resetPasswordDirect = async () => {
    if (!fpEmail || !fpNewPassword) return alert("Please fill all fields.");
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/user/reset-password",
        { email: fpEmail, newPassword: fpNewPassword }
      );
      if (res.data.success) {
        alert(res.data.message || "Password reset successful! Please login.");
        setShowForgotModal(false);
        setFpEmail("");
        setFpNewPassword("");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error resetting password");
    }
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
    setFpEmail("");
    setFpNewPassword("");
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

        <div className="flex justify-center mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleToggle}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200"
          >
            Switch to {role === "patient" ? "Doctor" : "Patient"}
          </motion.button>
        </div>

        <motion.form
          key={role}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          <label className="font-semibold">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="font-semibold">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Login as {role.charAt(0).toUpperCase() + role.slice(1)}
          </motion.button>
        </motion.form>

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

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-96"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
            >
              <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
                Reset Password
              </h2>

              <label className="font-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter your registered email"
                className="w-full p-2 border rounded mb-3"
                value={fpEmail}
                onChange={(e) => setFpEmail(e.target.value)}
              />

              <label className="font-semibold">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full p-2 border rounded mb-4"
                value={fpNewPassword}
                onChange={(e) => setFpNewPassword(e.target.value)}
              />

              <div className="flex gap-2">
                <button
                  onClick={resetPasswordDirect}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                >
                  Save Password
                </button>
                <button
                  onClick={closeForgotModal}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white p-2 rounded"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
