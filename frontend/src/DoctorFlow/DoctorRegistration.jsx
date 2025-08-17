import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    consultationFee: "",
    hospital: "",
    licenseNumber: "",
    licensePhoto: "",
    doctorPhoto: "",
  });

  // 🧭 NEW: location state
  const [locationLat, setLocationLat] = useState("");
  const [locationLng, setLocationLng] = useState("");
  const [address, setAddress] = useState("");
  const [locLoading, setLocLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🧭 Auto-detect using browser GPS + reverse geocode via OpenStreetMap
  const useMyLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocationLat(String(lat));
        setLocationLng(String(lng));

        try {
          // Reverse geocode (free OSM service)
          const resp = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
          );
          const data = await resp.json();
          setAddress(data.display_name || "");
        } catch {
          // ignore, coords are still saved
        } finally {
          setLocLoading(false);
        }
      },
      (err) => {
        setLocLoading(false);
        alert("Unable to get location: " + err.message);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    for (const key in formData) submissionData.append(key, formData[key]);

    // 🧭 send location
    submissionData.append("locationLat", locationLat);
    submissionData.append("locationLng", locationLng);
    submissionData.append("address", address);

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/user/register",
        submissionData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data) {
        alert(res.data.message || "Doctor registered successfully ✅");
        navigate("/doctorDashboard");
      }
    } catch (err) {
      console.error("Frontend Error:", err);
      alert(err.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="rounded-xl shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Doctor Registration Form
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          {/* ...your existing inputs unchanged... */}
          {/* (Full Name, Gender, Age, Phone, Aadhar, Email, Password, Specialization, Fee, Hospital, LicenseNumber, Files) */}
          {/* For brevity, keeping just a couple, keep the rest as you already have: */}

          <label className="block font-medium mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />

          {/* ... keep the rest of your existing fields exactly as in your file ... */}

          <div>
            <label className="block font-medium mb-1">Upload License Photo</label>
            <input type="file" name="licensePhoto" onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block font-medium mb-1">Upload Profile Photo</label>
            <input type="file" name="doctorPhoto" onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          {/* 🧭 NEW: Location UI */}
          <div className="border rounded-lg p-3">
            <div className="font-semibold mb-2">Location</div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={useMyLocation}
                className="bg-blue-600 text-white px-3 py-2 rounded disabled:opacity-60"
                disabled={locLoading}
              >
                {locLoading ? "Detecting..." : "Use My Location"}
              </button>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address (auto or edit)"
                className="flex-1 border rounded px-3 py-2"
              />
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Lat: {locationLat || "-"} | Lng: {locationLng || "-"}
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegistration;