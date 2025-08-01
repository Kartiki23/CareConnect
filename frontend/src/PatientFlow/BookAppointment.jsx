import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; 

const BookAppointment = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contactNo: "",
    gender: "",
    age: "",
    specialization: "",
    doctorName: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    medicalHistory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/v1/user/bookAppointment", form);
      alert("Appointment booked successfully!");
      console.log("Response:", res.data);
      setForm({
        name: "",
        email: "",
        contactNo: "",
        gender: "",
        age: "",
        specialization: "",
        doctorName: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
        medicalHistory: "",
      });
    } catch (error) {
      console.log("Booking failed:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-150 mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl"
    >
      <motion.h2
        className="text-3xl font-bold text-center text-blue-700 mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Book Appointment
      </motion.h2>

      {[
        { label: "Name", name: "name", type: "text", placeholder: "Enter your full name" },
        { label: "Email", name: "email", type: "email", placeholder: "Enter your Email" },
        { label: "Contact Number", name: "contactNo", type: "tel", placeholder: "Enter contact number" },
        { label: "Age", name: "age", type: "number", placeholder: "Enter your age" },
      ].map((input, idx) => (
        <motion.div key={input.name} className="mb-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 * idx }}
        >
          <label className="block font-semibold mb-1 text-xl">{input.label}</label>
          <input
            type={input.type}
            name={input.name}
            value={form[input.name]}
            onChange={handleChange}
            placeholder={input.placeholder}
            className="w-full border-2 rounded px-3 py-2"
            required
          />
        </motion.div>
      ))}

      {/* Dropdowns and Date/Time */}
      {[
        {
          label: "Gender", name: "gender", options: ["Male", "Female", "Other"]
        },
        {
          label: "Specialization", name: "specialization", options: ["Cardiologist", "Dermatologist", "Orthopedic"]
        },
        {
          label: "Doctor Name", name: "doctorName", options: ["Dr. Aarti Mehra", "Dr. Rakesh Shah"]
        }
      ].map((select, idx) => (
        <motion.div key={select.name} className="mb-4"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.15 * idx }}
        >
          <label className="block font-semibold mb-1 text-xl">{select.label}</label>
          <select
            name={select.name}
            value={form[select.name]}
            onChange={handleChange}
            className="w-full border-2 rounded px-3 py-2"
            required
          >
            <option value="">Select {select.label}</option>
            {select.options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </motion.div>
      ))}

      {/* Date and Time */}
      {[
        { label: "Appointment Date", name: "appointmentDate", type: "date" },
        { label: "Appointment Time", name: "appointmentTime", type: "time" }
      ].map((input, idx) => (
        <motion.div key={input.name} className="mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 + 0.1 * idx }}
        >
          <label className="block font-semibold mb-1 text-xl">{input.label}</label>
          <input
            type={input.type}
            name={input.name}
            value={form[input.name]}
            onChange={handleChange}
            className="w-full border-2 rounded px-3 py-2"
            required
          />
        </motion.div>
      ))}

      {/* Textareas */}
      {[
        { label: "Reason to Visit", name: "reason", placeholder: "Reason for Visit" },
        { label: "Medical History", name: "medicalHistory", placeholder: "Previous Medical History" }
      ].map((area, idx) => (
        <motion.div key={area.name} className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + 0.1 * idx }}
        >
          <label className="block font-semibold mb-1 text-xl">{area.label}</label>
          <textarea
            name={area.name}
            value={form[area.name]}
            onChange={handleChange}
            placeholder={area.placeholder}
            className="w-full border-2 rounded px-3 py-2"
            required={area.name === "reason"}
          />
        </motion.div>
      ))}

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full mt-6 py-3 text-lg bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Book Appointment
      </motion.button>
    </motion.form>
  );
};

export default BookAppointment;
