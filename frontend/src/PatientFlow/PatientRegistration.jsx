import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: "",
    email: "",
    phone: "",
    password: ""
  });

  // Handles input changes
  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/Pregister",
        formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 200) {
        alert(" Patient Registered Successfully");
        console.log("Server Response:", response.data);

        setFormData({
          fullName: "",
          gender: "",
          age: "",
          email: "",
          phone: "",
          password: ""
        });

        navigate("/patientDashboard");
      } else {
        alert(` Registration failed: ${response.data.message || "Server error"}`);
        console.log("Backend error:", response.data);
      }
    } catch (error) {
      console.error("Axios error:", error);
      alert("Could not connect to server. Please check if backend is running on port 3001.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Patient Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChanges}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChanges}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">--- Select Gender ---</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChanges}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your age"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChanges}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChanges}
              className="w-full border rounded px-3 py-2"
              placeholder="10-digit phone number"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChanges}
              className="w-full border rounded px-3 py-2"
              placeholder="Create password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;
