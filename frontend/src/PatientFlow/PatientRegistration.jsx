// frontend/src/PatientFlow/PatientRegistration.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import {
  getBrowserPosition,
  reverseGeocode,
  forwardGeocode,
} from "../utils/Location";

import {
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  MapPin,
  Building,
  Globe,
  Crosshair,
  Locate,
  UploadCloud,
} from "lucide-react";

const API = "https://careconnect-9y8d.onrender.com";

const PatientRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    age: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    latitude: "",
    longitude: "",
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loadingLoc, setLoadingLoc] = useState(false);

  const onChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const pickPhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const useMyLocation = async () => {
    try {
      setLoadingLoc(true);
      const { lat, lon } = await getBrowserPosition();
      const addr = await reverseGeocode(lat, lon);
      setFormData((p) => ({
        ...p,
        addressLine: addr.addressLine || addr.formattedAddress || "",
        city: addr.city || "",
        state: addr.state || "",
        postalCode: addr.postalCode || "",
        country: addr.country || "",
        latitude: String(lat),
        longitude: String(lon),
      }));
      toast.success("Location detected ✅");
    } catch (e) {
      console.error(e);
      toast.error("Could not get your location ❌");
    } finally {
      setLoadingLoc(false);
    }
  };

  const geocodeTyped = async () => {
    try {
      const q = [
        formData.addressLine,
        formData.city,
        formData.state,
        formData.postalCode,
        formData.country,
      ]
        .filter(Boolean)
        .join(", ");
      if (!q) return toast.error("Type an address to locate");
      const { lat, lon, formattedAddress } = await forwardGeocode(q);
      setFormData((p) => ({
        ...p,
        latitude: String(lat),
        longitude: String(lon),
        addressLine: formattedAddress || p.addressLine,
      }));
      toast.success("Address located 📍");
    } catch (e) {
      toast.error("Could not find that address ❌");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      if (selectedPhoto) fd.append("patientPhoto", selectedPhoto);

      await axios.post(`${API}/api/v1/user/Pregister`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Patient registered 🎉");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Registration failed ❌");
    }
  };

  // 🔥 Animation Variants (same style as DoctorRegistration)
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 p-6"
    >
      <ToastContainer />
      <motion.form
        onSubmit={submit}
        variants={container}
        initial="hidden"
        animate="show"
        className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <motion.h2
          variants={item}
          className="md:col-span-2 text-3xl font-bold text-blue-700 text-center mb-4"
        >
          🩺 Patient Registration
        </motion.h2>

        {/* Inputs with icons */}
        <motion.div variants={item} className="flex items-center border rounded">
          <User className="w-5 h-5 text-gray-400 ml-2" />
          <input
            className="p-2 rounded w-full focus:outline-none"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            placeholder="Full Name"
            required
          />
        </motion.div>

        <motion.div variants={item} className="flex items-center border rounded">
          <Mail className="w-5 h-5 text-gray-400 ml-2" />
          <input
            type="email"
            className="p-2 rounded w-full focus:outline-none"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Email"
            required
          />
        </motion.div>

        <motion.div variants={item} className="flex items-center border rounded">
          <Lock className="w-5 h-5 text-gray-400 ml-2" />
          <input
            type="password"
            className="p-2 rounded w-full focus:outline-none"
            name="password"
            value={formData.password}
            onChange={onChange}
            placeholder="Password"
            required
          />
        </motion.div>

        <motion.div variants={item} className="flex items-center border rounded">
          <Calendar className="w-5 h-5 text-gray-400 ml-2" />
          <input
            type="number"
            className="p-2 rounded w-full focus:outline-none"
            name="age"
            value={formData.age}
            onChange={onChange}
            placeholder="Age"
            required
          />
        </motion.div>

        <motion.div variants={item} className="flex items-center border rounded">
          <Phone className="w-5 h-5 text-gray-400 ml-2" />
          <input
            className="p-2 rounded w-full focus:outline-none"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="Phone (10 digits)"
            required
          />
        </motion.div>

        <motion.div variants={item} className="flex items-center border rounded">
          <User className="w-5 h-5 text-gray-400 ml-2" />
          <select
            className="p-2 rounded w-full focus:outline-none"
            name="gender"
            value={formData.gender}
            onChange={onChange}
            required
          >
            <option value="">--- Select Gender ---</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </motion.div>

        {/* Address fields */}
        <motion.div
          variants={item}
          className="md:col-span-2 font-semibold mt-2"
        >
          Address
        </motion.div>

        {[
          { name: "addressLine", icon: <MapPin className="w-5 h-5 text-gray-400 ml-2" />, placeholder: "House / Street / Area", span: "md:col-span-2" },
          { name: "city", icon: <Building className="w-5 h-5 text-gray-400 ml-2" />, placeholder: "City" },
          { name: "state", icon: <Building className="w-5 h-5 text-gray-400 ml-2" />, placeholder: "State" },
          { name: "postalCode", icon: <MapPin className="w-5 h-5 text-gray-400 ml-2" />, placeholder: "Postal Code" },
          { name: "country", icon: <Globe className="w-5 h-5 text-gray-400 ml-2" />, placeholder: "Country" },
        ].map((f, i) => (
          <motion.div
            key={i}
            variants={item}
            className={`flex items-center border rounded ${f.span || ""}`}
          >
            {f.icon}
            <input
              className="p-2 rounded w-full focus:outline-none"
              name={f.name}
              value={formData[f.name]}
              onChange={onChange}
              placeholder={f.placeholder}
            />
          </motion.div>
        ))}

        {/* Location buttons */}
        <motion.div
          variants={item}
          className="flex gap-2 items-center md:col-span-2"
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={useMyLocation}
            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-60"
            disabled={loadingLoc}
          >
            <Crosshair className="w-4 h-4" />
            {loadingLoc ? "Detecting..." : "Use my live location"}
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={geocodeTyped}
            className="flex items-center gap-1 border px-3 py-2 rounded"
          >
            <Locate className="w-4 h-4" />
            Locate typed address
          </motion.button>

          <div className="text-sm text-gray-500">
            lat: {formData.latitude || "-"} | lon: {formData.longitude || "-"}
          </div>
        </motion.div>

        {/* Submit button */}
        <motion.button
          variants={item}
          type="submit"
          whileHover={{ scale: 1.05, backgroundColor: "#0000cd" }}
          whileTap={{ scale: 0.95 }}
          className="md:col-span-2 bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
           Register
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default PatientRegistration;
