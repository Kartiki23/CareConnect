// frontend/src/PatientFlow/PatientRegistration.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { getBrowserPosition, reverseGeocode, forwardGeocode } from "../utils/Location";

const API = "http://localhost:3001";

const PatientRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", password: "",
    gender: "", age: "",
    addressLine: "", city: "", state: "", postalCode: "", country: "",
    latitude: "", longitude: ""
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loadingLoc, setLoadingLoc] = useState(false);

  const onChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const pickPhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) { setSelectedPhoto(file); setPreview(URL.createObjectURL(file)); }
  };

  const useMyLocation = async () => {
    try {
      setLoadingLoc(true);
      const { lat, lon } = await getBrowserPosition();
      const addr = await reverseGeocode(lat, lon);
      setFormData(p => ({
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
      const q = [formData.addressLine, formData.city, formData.state, formData.postalCode, formData.country]
        .filter(Boolean).join(", ");
      if (!q) return toast.error("Type an address to locate");
      const { lat, lon, formattedAddress } = await forwardGeocode(q);
      setFormData(p => ({ ...p, latitude: String(lat), longitude: String(lon), addressLine: formattedAddress || p.addressLine }));
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

      await axios.post (`${API}/api/v1/user/Pregister, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      }`);

      toast.success("Patient registered!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 p-6">
      <ToastContainer />
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Patient Registration</h2>

        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic */}
          <input className="border p-2 rounded" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={onChange} required />
          <input className="border p-2 rounded" name="email" type="email" placeholder="Email" value={formData.email} onChange={onChange} required />
          <input className="border p-2 rounded" name="password" type="password" placeholder="Password" value={formData.password} onChange={onChange} required />
          <input className="border p-2 rounded" name="age" type="number" placeholder="Age" value={formData.age} onChange={onChange} required />
          <input className="border p-2 rounded" name="phone" placeholder="Phone (10 digits)" value={formData.phone} onChange={onChange} required />
          <select className="border p-2 rounded" name="gender" value={formData.gender} onChange={onChange} required>
            <option value="">--- Select Gender ---</option>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>

          {/* Address */}
          <div className="md:col-span-2 font-semibold mt-2">Address</div>
          <input className="border p-2 rounded md:col-span-2" name="addressLine" placeholder="House / Street / Area" value={formData.addressLine} onChange={onChange} />
          <input className="border p-2 rounded" name="city" placeholder="City" value={formData.city} onChange={onChange} />
          <input className="border p-2 rounded" name="state" placeholder="State" value={formData.state} onChange={onChange} />
          <input className="border p-2 rounded" name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={onChange} />
          <input className="border p-2 rounded" name="country" placeholder="Country" value={formData.country} onChange={onChange} />

          <div className="flex gap-2 items-center md:col-span-2">
            <button type="button" onClick={useMyLocation}
              className="bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-60"
              disabled={loadingLoc}>
              {loadingLoc ? "Detecting..." : "Use my live location"}
            </button>
            <button type="button" onClick={geocodeTyped} className="border px-3 py-2 rounded">
              Locate typed address
            </button>
            <div className="text-sm text-gray-500">
              lat: {formData.latitude || "-"} | lon: {formData.longitude || "-"}
            </div>
          </div>

          {/* Photo */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Profile Photo (optional)</label>
            <input type="file" onChange={pickPhoto} />
            {preview && <img src={preview} alt="preview" className="mt-2 w-24 h-24 rounded object-cover" />}
          </div>

          <button type="submit" className="md:col-span-2 bg-green-600 text-white py-3 rounded hover:bg-green-700">
            Register
          </button>
        </form>
      </div>
    </motion.div>
  );
};
export default PatientRegistration;