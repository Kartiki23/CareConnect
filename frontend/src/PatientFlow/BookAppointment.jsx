import React, { useState } from "react";
import { Label } from "recharts";

const BookAppointment = () => {
  const [form, setForm] = useState({
    patientName: "",
    email: "",
    phone: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Booked:", form);
    // axios.post("/api/appointments", form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl "
    >
      <h2 className="text-3xl font-bold text-center text-blue-700">Book Appointment</h2>

      {/* Patient Info */}
        <div>
            <label className="block font-semibold mb-1 text-2xl">Name</label>
            <input
              type="text"
              name="patientName"
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
              name="phone"
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
          required
          onChange={handleChange}
          className="w-full border-2 rounded px-3 py-2"
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
              onChange={handleChange}
              className="w-full border-2 rounded px-3 py-2"
              placeholder="Enter your age"
              required
            />
        </div>

      {/* Doctor Info */}

      <div>
        <label className="block font-semibold mb-1 text-2xl mt-2">Specialization</label>
        <select
          name="specialization"
          required
          onChange={handleChange}
          className="w-full border-2 rounded px-3 py-2"
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
          required
          onChange={handleChange}
          className="w-full border-2 rounded px-3 py-2"
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
          required
          onChange={handleChange}
          className="w-full border-2 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1 text-2xl mt-2">Time</label>
         <input
          type="time"
          name="appointmentTime"
          required
          onChange={handleChange}
          className="w-full border-2 rounded px-3 py-2"
        />
      </div>
    
      {/* Reason and History */}

      <div>
        <label className="block font-semibold mb-1 text-2xl mt-2">Reason to Visit</label>
        <textarea
        name="reason"
        placeholder="Reason for Visit"
        required
        onChange={handleChange}
        className="w-full border-2 rounded px-3 py-2"
      />
      </div>

      <div>
        <label className="block font-semibold mb-1 text-2xl mt-2">Medical History</label>
        <textarea
        name="medicalHistory"
        placeholder="Previous Medical History"
        onChange={handleChange}
        className="w-full border-2 rounded px-3 py-2"
      />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 text-lg bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
        Book Appointment
      </button>
    </form>
  );
};

export default BookAppointment;
