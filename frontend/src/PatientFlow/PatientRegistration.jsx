// src/PatientFlow/PatientRegistration.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const SERVER = "http://localhost:3001";

const PatientRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    age: "",
    address: "",
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [geoLoading, setGeoLoading] = useState(false);

  // get browser geolocation & reverse-geocode it (via backend)
  useEffect(() => {
    const fetchLocation = async (latitude, longitude) => {
      try {
        setGeoLoading(true);
        const res = await axios.get(
          `${SERVER}/api/v1/user/reverse-geocode?lat=${latitude}&lng=${longitude}`
        );
        const address = res.data?.address || "";
        setFormData((p) => ({ ...p, address }));
      } catch (err) {
        console.warn("Reverse geocode failed", err);
      } finally {
        setGeoLoading(false);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoords({ lat, lng });
          // instantly fetch pretty address from backend
          fetchLocation(lat, lng);
        },
        (err) => {
          console.warn("Geolocation permission denied or error:", err);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60 * 1000 }
      );
    } else {
      console.warn("Geolocation not supported by this browser.");
    }
  }, []);

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
      data.append("address", formData.address || "");
      if (coords.lat && coords.lng) {
        data.append("latitude", coords.lat);
        data.append("longitude", coords.lng);
      }
      if (selectedPhoto) data.append("patientPhoto", selectedPhoto);

      const response = await axios.post(
        "http://localhost:3001/api/v1/user/Pregister",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Patient registered successfully!");
      // Optionally store returned patient id or token
      // navigate to login
      setTimeout(() => navigate("/login"), 800);
    } catch (error) {
      console.log("Axios error:", error);
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  // ------------- animation variants (kept from your file) --------------
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };
  const fieldVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const buttonVariants = { hover: { scale: 1.05 }, tap: { scale: 0.95 } };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <ToastContainer />
      <motion.div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full">
        <motion.h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Patient Registration
        </motion.h2>

        <motion.form onSubmit={handleSubmit} className="space-y-5" variants={containerVariants}>
          {[
            { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter full name" },
            { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
            { label: "Password", name: "password", type: "password", placeholder: "Create password" },
            { label: "Age", name: "age", type: "number", placeholder: "Enter your age" },
            { label: "Phone", name: "phone", type: "tel", placeholder: "10-digit phone", pattern: "[0-9]{10}" },
          ].map((field) => (
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

          {/* Address (auto-filled) */}
          <motion.div variants={fieldVariants}>
            <label className="block font-medium mb-2">Address</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Your current address (auto-detected)"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={async () => {
                  // re-fetch coords & reverse geocode on demand
                  if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(
                      async (p) => {
                        const lat = p.coords.latitude;
                        const lng = p.coords.longitude;
                        setCoords({ lat, lng });
                        setGeoLoading(true);
                        try {
                          const res = await axios.get(
                            `${SERVER}/api/v1/user/reverse-geocode?lat=${lat}&lng=${lng}`
                          );
                          setFormData((f) => ({ ...f, address: res.data.address || "" }));
                        } catch (err) {
                          console.warn("Reverse geocode failed", err);
                        } finally {
                          setGeoLoading(false);
                        }
                      },
                      (err) => {
                        toast.error("Could not get location: " + err.message);
                      }
                    );
                  } else {
                    toast.error("Geolocation not supported in this browser.");
                  }
                }}
                className="px-3 py-2 bg-blue-600 text-white rounded"
              >
                {geoLoading ? "Detecting..." : "Use my location"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">If auto-detect fails, enter address manually.</p>
          </motion.div>

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