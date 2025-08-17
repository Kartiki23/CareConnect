// frontend/src/DoctorFlow/DoctorRegistration.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { getBrowserPosition, reverseGeocode, forwardGeocode } from "../utils/Location";

const API = "http://localhost:3001";

const DoctorRegistration = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "", gender: "", age: "", phone: "",
    aadharNumber: "", email: "", password: "",
    specialization: "", consultationFee: "", hospital: "", licenseNumber: "",
    addressLine: "", city: "", state: "", postalCode: "", country: "",
    latitude: "", longitude: ""
  });

  const [licensePhoto, setLicensePhoto] = useState(null);
  const [doctorPhoto, setDoctorPhoto]   = useState(null);

  const onChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const useMyLocation = async () => {
    try {
      const { lat, lon } = await getBrowserPosition();
      const addr = await reverseGeocode(lat, lon);
      setForm(p => ({
        ...p,
        addressLine: addr.addressLine || addr.formattedAddress || "",
        city: addr.city || "", state: addr.state || "",
        postalCode: addr.postalCode || "", country: addr.country || "",
        latitude: String(lat), longitude: String(lon)
      }));
      alert("Location detected ✅");
    } catch (e) {
      alert("Could not get location ❌");
    }
  };

  const geocodeTyped = async () => {
    try {
      const q = [form.addressLine, form.city, form.state, form.postalCode, form.country].filter(Boolean).join(", ");
      if (!q) return alert("Type an address first");
      const { lat, lon, formattedAddress } = await forwardGeocode(q);
      setForm(p => ({ ...p, latitude: String(lat), longitude: String(lon), addressLine: formattedAddress || p.addressLine }));
      alert("Address located 📍");
    } catch {
      alert("Could not find that address ❌");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (licensePhoto) fd.append("licensePhoto", licensePhoto);
      if (doctorPhoto)  fd.append("doctorPhoto", doctorPhoto);

      const res = await axios.post(`${API}/api/v1/user/register`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data?.message || "Doctor registered 🎉");
      navigate("/doctorDashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed ❌");
    }
  };

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100"
    >
      <motion.form
        onSubmit={submit}
        variants={container}
        initial="hidden"
        animate="show"
        className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <motion.h2 
          variants={item} 
          className="md:col-span-2 text-3xl font-bold text-blue-700 text-center mb-4"
        >
          🩺 Doctor Registration
        </motion.h2>

        {/* Inputs */}
        {[
          { name: "fullName", placeholder: "Full Name" },
          { name: "gender", type: "select", options: ["Male", "Female", "Other"] },
          { name: "age", type: "number", placeholder: "Age" },
          { name: "phone", placeholder: "Phone" },
          { name: "aadharNumber", placeholder: "Aadhar Number" },
          { name: "email", type: "email", placeholder: "Email" },
          { name: "password", type: "password", placeholder: "Password" },
          { name: "specialization", placeholder: "Specialization" },
          { name: "consultationFee", type: "number", placeholder: "Consultation Fee" },
          { name: "hospital", placeholder: "Hospital / Clinic" },
          { name: "licenseNumber", placeholder: "License Number" }
        ].map((f, i) => (
          <motion.div key={i} variants={item}>
            {f.type === "select" ? (
              <select
                className="border p-2 rounded w-full"
                name={f.name}
                value={form[f.name]}
                onChange={onChange}
                required
              >
                <option value="">{f.placeholder || "Select"}</option>
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                className="border p-2 rounded w-full"
                type={f.type || "text"}
                name={f.name}
                value={form[f.name]}
                onChange={onChange}
                placeholder={f.placeholder}
                required
              />
            )}
          </motion.div>
        ))}

        {/* Address */}
        <motion.div variants={item} className="md:col-span-2 font-semibold mt-2">Clinic Address</motion.div>
        <motion.input variants={item} className="border p-2 rounded md:col-span-2" name="addressLine" value={form.addressLine} onChange={onChange} placeholder="House / Street / Area"/>
        <motion.input variants={item} className="border p-2 rounded" name="city" value={form.city} onChange={onChange} placeholder="City"/>
        <motion.input variants={item} className="border p-2 rounded" name="state" value={form.state} onChange={onChange} placeholder="State"/>
        <motion.input variants={item} className="border p-2 rounded" name="postalCode" value={form.postalCode} onChange={onChange} placeholder="Postal Code"/>
        <motion.input variants={item} className="border p-2 rounded" name="country" value={form.country} onChange={onChange} placeholder="Country"/>

        {/* Location Buttons */}
        <motion.div variants={item} className="flex gap-2 items-center md:col-span-2">
          <motion.button 
            type="button" 
            onClick={useMyLocation} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-3 py-2 rounded"
          >
            📍 Use my live location
          </motion.button>
          <motion.button 
            type="button" 
            onClick={geocodeTyped}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="border px-3 py-2 rounded"
          >
            🔍 Locate typed address
          </motion.button>
          <div className="text-sm text-gray-500">
            lat: {form.latitude || "-"} | lon: {form.longitude || "-"}
          </div>
        </motion.div>

        {/* File Uploads */}
        <motion.div variants={item}>
          <div className="font-medium mb-1">Upload License Photo</div>
          <input type="file" onChange={(e) => setLicensePhoto(e.target.files?.[0] || null)} required />
        </motion.div>
        <motion.div variants={item}>
          <div className="font-medium mb-1">Upload Profile Photo</div>
          <input type="file" onChange={(e) => setDoctorPhoto(e.target.files?.[0] || null)} required />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          variants={item}
          type="submit"
          whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
          whileTap={{ scale: 0.95 }}
          className="md:col-span-2 bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          🚀 Register
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default DoctorRegistration;
