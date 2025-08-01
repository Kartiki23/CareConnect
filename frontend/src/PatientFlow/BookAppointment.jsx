import React, { useState } from "react";
import axios from "axios"; // ✅ Import axios

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
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl"
    >
      <h2 className="text-3xl font-bold text-center text-blue-700">Book Appointment</h2>

      {/* Input Fields */}
      <div>
        <label className="block font-semibold mb-1 text-2xl">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border-2 rounded px-3 py-2"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 text-2xl mt-2">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border-2 rounded px-3 py-2"
          placeholder="Enter your Email"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 text-2xl mt-2">Contact Number</label>
        <input
          type="tel"
          name="contactNo"
          value={form.phone}
          onChange={handleChange}
          className="w-full border-2 rounded px-3 py-2"
          placeholder="Enter your contact number"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 text-2xl mt-2">Gender</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border-2 rounded px-3 py-2"
          required
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1 text-2xl mt-2">Age</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          className="w-full border-2 rounded px-3 py-2"
          placeholder="Enter your age"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 text-2xl mt-2">Specialization</label>
        <select
          name="specialization"
          value={form.specialization}
          onChange={handleChange}
          className="w-full border-2 rounded px-3 py-2"
          required
        >
          <option value="">Select Specialization</option>
          <option>Cardiologist</option>
          <option>Dermatologist</option>
          <option>Orthopedic</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1 text-2xl mt-2">Doctor Name</label>
        <select
          name="doctorName"
          value={form.doctorName}
          onChange={handleChange}
          className="w-full border-2 rounded px-3 py-2"
          required
        >
          <option value="">Select Doctor</option>
          <option>Dr. Aarti Mehra</option>
          <option>Dr. Rakesh Shah</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1 text-2xl mt-2">Date</label>
        <input
          type="date"
          name="appointmentDate"
          value={form.appointmentDate}
          onChange={handleChange}
          className="w-full border-2 rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 text-2xl mt-2">Time</label>
        <input
          type="time"
          name="appointmentTime"
          value={form.appointmentTime}
          onChange={handleChange}
          className="w-full border-2 rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 text-2xl mt-2">Reason to Visit</label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Reason for Visit"
          className="w-full border-2 rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 text-2xl mt-2">Medical History</label>
        <textarea
          name="medicalHistory"
          value={form.medicalHistory}
          onChange={handleChange}
          placeholder="Previous Medical History"
          className="w-full border-2 rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="w-full mt-6 py-3 text-lg bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Book Appointment
      </button>
    </form>
  );
};

export default BookAppointment;
