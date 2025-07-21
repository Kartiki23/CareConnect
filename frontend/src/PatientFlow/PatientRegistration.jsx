
import React, { useState } from 'react';

const PatientRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    age: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    // You can send this formData to backend in future
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full border border-blue-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Patient Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChanges}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Enter your full name"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChanges}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">--- Select Gender ---</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChanges}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Enter your age"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChanges}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChanges}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="10-digit phone number"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChanges}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Create password"
            />
          </div>

          {/* Submit Button */}
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