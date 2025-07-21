import React, { useState } from "react";

const LoginPage = () => {
  const [role, setRole] = useState("patient"); 
  // 'patient' or 'doctor'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setFormData({ email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in as:", role, formData);
    // You can send role and credentials to backend here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Login as {role === "patient" ? "Patient" : "Doctor"}
        </h2>

        {/* Role Toggle Buttons */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => handleRoleChange("patient")}
            className={`px-4 py-2 rounded-l-lg ${
              role === "patient"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => handleRoleChange("doctor")}
            className={`px-4 py-2 rounded-r-lg ${
              role === "doctor"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Doctor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border rounded px-3 py-2"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border rounded px-3 py-2"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Register now
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;