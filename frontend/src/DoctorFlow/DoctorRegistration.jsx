// frontend/src/DoctorFlow/DoctorRegistration.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { getBrowserPosition, reverseGeocode, forwardGeocode } from "../utils/Location";
import { 
  User, Phone, Mail, Lock, Calendar, CreditCard, 
  Building2, Stethoscope, Landmark, Hash, 
  Home, Globe, Map, Navigation, UploadCloud 
} from "lucide-react";

const API = "https://careconnect-9y8d.onrender.com";

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
  const [specializations, setSpecializations] = useState([]); // ✅ store specializations

  // Fetch specialization list
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
      const res = await axios.get(`${API}/api/v1/user/specialties`);
      const data = res.data.specialties;

      // ✅ handle if response is {specializations: [...]}
      if (Array.isArray(data)) {
        setSpecializations(data);
      } else if (Array.isArray(data.specializations)) {
        setSpecializations(data.specializations);
      } else {
        setSpecializations([]); // fallback
      }
    } catch (err) {
      console.error("Failed to load specializations", err);
      setSpecializations([]); // fallback
    }
    };
    fetchSpecializations();
  }, []);

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

  const iconMap = {
    fullName: <User className="w-5 h-5 text-gray-400" />,
    gender: <User className="w-5 h-5 text-gray-400" />,
    age: <Calendar className="w-5 h-5 text-gray-400" />,
    phone: <Phone className="w-5 h-5 text-gray-400" />,
    aadharNumber: <CreditCard className="w-5 h-5 text-gray-400" />,
    email: <Mail className="w-5 h-5 text-gray-400" />,
    password: <Lock className="w-5 h-5 text-gray-400" />,
    specialization: <Stethoscope className="w-5 h-5 text-gray-400" />,
    consultationFee: <Landmark className="w-5 h-5 text-gray-400" />,
    hospital: <Building2 className="w-5 h-5 text-gray-400" />,
    licenseNumber: <Hash className="w-5 h-5 text-gray-400" />,
    addressLine: <Home className="w-5 h-5 text-gray-400" />,
    city: <Building2 className="w-5 h-5 text-gray-400" />,
    state: <Map className="w-5 h-5 text-gray-400" />,
    postalCode: <Navigation className="w-5 h-5 text-gray-400" />,
    country: <Globe className="w-5 h-5 text-gray-400" />
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

        {/* Inputs with Icons */}
        {[
          { name: "fullName", placeholder: "Full Name" },
          { name: "gender", type: "select", options: ["Male", "Female", "Other"], placeholder: "Gender" },
          { name: "age", type: "number", placeholder: "Age" },
          { name: "phone", placeholder: "Phone" },
          { name: "aadharNumber", placeholder: "Aadhar Number" },
          { name: "email", type: "email", placeholder: "Email" },
          { name: "password", type: "password", placeholder: "Password" },
          { name: "consultationFee", type: "number", placeholder: "Consultation Fee" },
          { name: "hospital", placeholder: "Hospital / Clinic" },
          { name: "licenseNumber", placeholder: "License Number" }
        ].map((f, i) => (
          <motion.div key={i} variants={item} className="relative">
            {f.type === "select" ? (
              <div className="flex items-center border rounded">
                <span className="pl-2">{iconMap[f.name]}</span>
                <select
                  className="p-2 rounded w-full focus:outline-none"
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
              </div>
            ) : (
              <div className="flex items-center border rounded">
                <span className="pl-2">{iconMap[f.name]}</span>
                <input
                  className="p-2 rounded w-full focus:outline-none"
                  type={f.type || "text"}
                  name={f.name}
                  value={form[f.name]}
                  onChange={onChange}
                  placeholder={f.placeholder}
                  required
                />
              </div>
            )}
          </motion.div>
        ))}

        {/* Specialization Dropdown from backend */}
        <motion.div variants={item} className="relative">
          <div className="flex items-center border rounded">
            <span className="pl-2">{iconMap.specialization}</span>
            <select
              className="p-2 rounded w-full focus:outline-none"
              name="specialization"
              value={form.specialization}
              onChange={onChange}
              required
            >
              <option value="">Select Specialization</option>
              {specializations.map((s) => (
                <option key={s._id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Address Fields with Icons */}
        <motion.div variants={item} className="md:col-span-2 font-semibold mt-2">Clinic Address</motion.div>

        {["addressLine", "city", "state", "postalCode", "country"].map((field, i) => (
          <motion.div key={i} variants={item} className={field === "addressLine" ? "md:col-span-2" : ""}>
            <div className="flex items-center border rounded">
              <span className="pl-2">{iconMap[field]}</span>
              <input
                className="p-2 rounded w-full focus:outline-none"
                name={field}
                value={form[field]}
                onChange={onChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
              />
            </div>
          </motion.div>
        ))}

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
        <motion.div variants={item} className="flex flex-col gap-2">
          <label className="flex items-center gap-2 font-medium text-gray-700">
            <UploadCloud className="w-5 h-5 text-blue-500" /> Upload License Photo
          </label>
          <input 
            type="file" 
            className="border p-2 rounded cursor-pointer" 
            onChange={(e) => setLicensePhoto(e.target.files?.[0] || null)} 
            required 
          />
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-2">
          <label className="flex items-center gap-2 font-medium text-gray-700">
            <UploadCloud className="w-5 h-5 text-green-500" /> Upload Profile Photo
          </label>
          <input 
            type="file" 
            className="border p-2 rounded cursor-pointer" 
            onChange={(e) => setDoctorPhoto(e.target.files?.[0] || null)} 
            required 
          />
        </motion.div>

        {/* Submit */}
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
