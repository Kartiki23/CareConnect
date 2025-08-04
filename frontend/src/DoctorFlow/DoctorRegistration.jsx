import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: "",
    phone: "",
    aadharNumber: "",
    email: "",
    password: "",
    specialization: "",
    hospital: "",
    licenseNumber: "",
    licensePhoto: "",
    doctorPhoto: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    for (const key in formData) {
      submissionData.append(key, formData[key]);
    }

    try {
      const res = await fetch("http://localhost:3001/api/v1/user/register", {
        method: "POST",
        body: submissionData,
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("doctorInfo",JSON.stringify(res.data.doctor));
        alert(result.message || "Doctor registered successfully ✅");
        navigate("/doctorDashboard");
      } else {
        alert(result.message || "Registration failed ❌");
      }
    } catch (err) {
      console.log("Frontend Error:", err);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="rounded-xl shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Doctor Registration Form
        </h2>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full border rounded px-3 py-2" />

          <div className="flex gap-4">
            <label>
              <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} />
              <span className="ml-1">Male</span>
            </label>
            <label>
              <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} />
              <span className="ml-1">Female</span>
            </label>
          </div>

          <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="w-full border rounded px-3 py-2" />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full border rounded px-3 py-2" />
          <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} placeholder="Aadhar Number" className="w-full border rounded px-3 py-2" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border rounded px-3 py-2" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full border rounded px-3 py-2" />
          <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Specialization" className="w-full border rounded px-3 py-2" />
          <input type="text" name="hospital" value={formData.hospital} onChange={handleChange} placeholder="Hospital Name" className="w-full border rounded px-3 py-2" />
          <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} placeholder="License Number" className="w-full border rounded px-3 py-2" />

          <div>
            <label className="block font-medium mb-1">Upload License Photo</label>
            <input type="file" name="licensePhoto" onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block font-medium mb-1">Upload Profile Photo</label>
            <input type="file" name="doctorPhoto" onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegistration;