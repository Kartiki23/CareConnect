// BloodDonationForm.jsx
import React, { useState } from "react";
import { FaTint } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // ✅ no container here
import { motion } from "framer-motion";
import axios from "axios";

const BloodDonationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",
    lastDonation: "",
    healthIssues: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, phone, age, gender, bloodGroup, address } = formData;

    if (!fullName || !email || !phone || !age || !gender || !bloodGroup || !address) {
      toast.error("⚠️ Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/bloodDonationForm",
        formData
      );

      console.log("Form Submit Response:", response.data);

      toast.success(response.data.message || "✅ Form submitted successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        bloodGroup: "",
        lastDonation: "",
        healthIssues: "",
        address: "",
      });

      // ✅ Delay modal close so toast shows
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "❌ Server Error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ animation for each field
  const fieldVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  // ✅ form fields
  const fields = [
    { label: "Full Name *", name: "fullName", type: "text", placeholder: "John Doe" },
    { label: "Email *", name: "email", type: "email", placeholder: "example@mail.com" },
    { label: "Phone Number *", name: "phone", type: "tel", placeholder: "+91 9876543210" },
    { label: "Age *", name: "age", type: "number", placeholder: "18", min: 18, max: 65 },
    { label: "Gender *", name: "gender", type: "select", options: ["Male", "Female", "Other"] },
    { label: "Blood Group *", name: "bloodGroup", type: "select", options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
    { label: "Last Donation Date", name: "lastDonation", type: "date" },
    { label: "Any Health Issues", name: "healthIssues", type: "textarea", placeholder: "Mention if any" },
    { label: "Address *", name: "address", type: "textarea", placeholder: "Full address" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6 relative">
        {/* ✅ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition text-xl"
        >
          ✖
        </button>

        {/* ✅ Title with icon */}
        <h2 className="text-3xl font-bold mb-6 text-center text-red-500 flex justify-center items-center gap-2">
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <FaTint className="text-red-600" />
          </motion.span>
          Donation Form
        </h2>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field, index) => (
            <motion.div
              key={field.name}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={fieldVariants}
            >
              <label className="block font-medium">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-400 transition-all duration-300"
                >
                  <option value="">Select {field.label.replace("*", "").trim()}</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-400 transition-all duration-300"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  min={field.min}
                  max={field.max}
                  className="w-full border rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-400 transition-all duration-300"
                />
              )}
            </motion.div>
          ))}

          {/* ✅ Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
            whileTap={{ scale: 0.95 }}
            className={`w-full bg-red-500 text-white py-2 rounded-md transition-all duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </motion.button>
        </form>
         <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </motion.div>
  );
};

export default BloodDonationForm;
