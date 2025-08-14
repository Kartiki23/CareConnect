import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import book_appointment from '../assets/book_appointment.gif';

const BookAppointment = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contactNo: "",
    gender: "",
    age: "",
    specialization: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
    medicalHistory: "",
    consultationFee: "", // added so fee is stored when booking
  });

  const [doctors, setDoctors] = useState([]);
  const [doctorFee, setDoctorFee] = useState(null); // for display
  const patientId = localStorage.getItem("patientId");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/user/doctor");
        setDoctors(res.data);
      } catch (err) {
        console.log("Error fetching doctors", err);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // If doctor is selected, fetch its fee
    if (name === "doctorId") {
      const selectedDoctor = doctors.find((doc) => doc._id === value);
      if (selectedDoctor) {
        setDoctorFee(selectedDoctor.consultationFee);
        setForm((prev) => ({
          ...prev,
          consultationFee: selectedDoctor.consultationFee,
        }));
      } else {
        setDoctorFee(null);
        setForm((prev) => ({ ...prev, consultationFee: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fullForm = { ...form, patientId };
      await axios.post(
        "http://localhost:3001/api/v1/user/bookAppointment",
        fullForm
      );
      alert("Appointment booked successfully!");
      setForm({
        name: "",
        email: "",
        contactNo: "",
        gender: "",
        age: "",
        specialization: "",
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        reason: "",
        medicalHistory: "",
        consultationFee: "",
      });
      setDoctorFee(null);
    } catch (error) {
      console.log("Booking failed:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-20">
      <motion.div
        className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-8 md:p-12"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left - Appointment Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-blue-800 mb-4">
              Book Appointment
            </h2>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium ">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Email & Contact */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium ">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium ">Contact No.</label>
                <input
                  type="tel"
                  name="contactNo"
                  value={form.contactNo}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {/* Gender & Age */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium ">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium ">Age</label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Your age"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {/* Specialization & Doctor */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium ">
                  Specialization
                </label>
                <select
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Specialization</option>
                  {[...new Set(doctors.map((doc) => doc.specialization))].map(
                    (spec, i) => (
                      <option key={i} value={spec}>
                        {spec}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium ">Doctor</label>
                <select
                  name="doctorId"
                  value={form.doctorId}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Doctor</option>
                  {doctors
                    .filter(
                      (doc) =>
                        doc.specialization === form.specialization ||
                        form.specialization === ""
                    )
                    .map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        Dr. {doc.fullName}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Consultation Fee (Display only) */}
            {doctorFee !== null && (
              <div>
                <label className="block text-sm font-medium ">
                  Consultation Fee
                </label>
                <input
                  type="text"
                  value={`₹${doctorFee} (Cash Only)`}
                  readOnly
                  className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl shadow-sm"
                />
              </div>
            )}

            {/* Date & Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium ">Date</label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={form.appointmentDate}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium ">Time</label>
                <input
                  type="time"
                  name="appointmentTime"
                  value={form.appointmentTime}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium ">Reason</label>
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                placeholder="Reason for visit"
                rows="3"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm resize-none focus:ring-2 focus:ring-blue-400"
                required
              ></textarea>
            </div>

            {/* Medical History */}
            <div>
              <label className="block text-sm font-medium ">
                Medical History
              </label>
              <textarea
                name="medicalHistory"
                value={form.medicalHistory}
                onChange={handleChange}
                placeholder="Mention if any"
                rows="3"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm resize-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Book Appointment
            </motion.button>
          </motion.form>

          {/* Right Side - Image */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <img
              src={book_appointment}
              alt="Doctor"
              className="h-100 w-100 object-cover mt-40 ml-10"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookAppointment;
