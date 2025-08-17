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

// ✅ Lucide icons
import {
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  MapPin,
  Building,
  Globe,
  Image as ImageIcon,
  Locate,
  Crosshair,
} from "lucide-react";

const API = "http://localhost:3001";

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
      toast.success("Location detected");
    } catch (e) {
      console.error(e);
      toast.error("Could not get your location");
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
      toast.success("Address located on map");
    } catch (e) {
      toast.error("Could not find that address");
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

      toast.success("Patient registered!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  // 🔥 Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
  };

  // ✅ Wrapper for input with icons
  const InputWithIcon = ({ icon: Icon, ...props }) => (
    <motion.div
      className="flex items-center border rounded p-2 gap-2"
      variants={itemVariants}
    >
      <Icon className="text-blue-500 w-5 h-5" />
      <input {...props} className="flex-1 outline-none" />
    </motion.div>
  );

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ToastContainer />
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-2xl font-bold text-blue-700 mb-6 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          🩺 Patient Registration
        </motion.h2>

        <motion.form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
        >
          {/* Basic */}
          <InputWithIcon
            icon={User}
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={onChange}
            required
          />
          <InputWithIcon
            icon={Mail}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={onChange}
            required
          />
          <InputWithIcon
            icon={Lock}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={onChange}
            required
          />
          <InputWithIcon
            icon={Calendar}
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={onChange}
            required
          />
          <InputWithIcon
            icon={Phone}
            name="phone"
            placeholder="Phone (10 digits)"
            value={formData.phone}
            onChange={onChange}
            required
          />

          <motion.div className="flex items-center border rounded p-2 gap-2" variants={itemVariants}>
            <User className="text-blue-500 w-5 h-5" />
            <select
              className="flex-1 outline-none"
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

          {/* Address */}
          <motion.div
            className="md:col-span-2 font-semibold mt-2"
            variants={itemVariants}
          >
            Address
          </motion.div>
          <InputWithIcon
            icon={MapPin}
            name="addressLine"
            placeholder="House / Street / Area"
            value={formData.addressLine}
            onChange={onChange}
          />
          <InputWithIcon
            icon={Building}
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={onChange}
          />
          <InputWithIcon
            icon={Building}
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={onChange}
          />
          <InputWithIcon
            icon={MapPin}
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={onChange}
          />
          <InputWithIcon
            icon={Globe}
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={onChange}
          />

          {/* Location Buttons */}
          <motion.div
            className="flex gap-2 items-center md:col-span-2"
            variants={itemVariants}
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

          {/* Submit */}
          <motion.button
            type="submit"
            className="md:col-span-2 bg-green-600 text-white py-3 rounded hover:bg-green-700 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            <User className="w-5 h-5" /> Register
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default PatientRegistration;
