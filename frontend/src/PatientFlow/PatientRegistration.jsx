import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const PatientRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    age: "",
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, phone, password, gender, age } = formData;
    if (!fullName || !email || !phone || !password || !gender || !age) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const data = new FormData();
      data.append("fullName", fullName);
      data.append("email", email);
      data.append("phone", phone);
      data.append("password", password);
      data.append("gender", gender);
      data.append("age", age);
      if (selectedPhoto) data.append("patientPhoto", selectedPhoto);

      const response = await axios.post(
        "http://localhost:3001/api/v1/user/Pregister",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Patient registered successfully!");
      navigate("/login");
    } catch (error) {
      console.log("Axios error:", error);
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  // ------------------ Animation Variants ------------------
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 4px 15px rgba(0,0,0,0.2)" },
    tap: { scale: 0.95 },
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  // ------------------ Render ------------------
  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <ToastContainer />

      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-blue-700 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Patient Registration
        </motion.h2>

        <motion.form onSubmit={handleSubmit} className="space-y-5" variants={containerVariants}>
          {[
            { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter full name" },
            { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
            { label: "Password", name: "password", type: "password", placeholder: "Create password" },
            { label: "Age", name: "age", type: "number", placeholder: "Enter your age" },
            { label: "Phone", name: "phone", type: "tel", placeholder: "10-digit phone", pattern: "[0-9]{10}" },
          ].map((field, i) => (
            <motion.div key={field.name} variants={fieldVariants}>
              <label className="block font-medium mb-2">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </motion.div>
          ))}

          {/* Gender Select */}
          <motion.div variants={fieldVariants}>
            <label className="block font-medium mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">--- Select Gender ---</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </motion.div>
          
          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Register
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default PatientRegistration;
