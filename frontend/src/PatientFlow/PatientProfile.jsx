import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPen, FaCamera } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [newPhoto, setNewPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const patientId = localStorage.getItem("patientId");
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "https://careconnect-9y8d.onrender.com/api/v1/user/patientProfile",
          { patientId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = response.data;

        // Use uploaded photo if available, otherwise default avatar based on gender
        let profilePhoto = data.patientPhoto
          ? `https://careconnect-9y8d.onrender.com/uploads/patients/${data.patientPhoto}`
          : data.gender?.toLowerCase() === "female"
          ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
          : "https://up.yimg.com/ib/th/id/OIP.SJcycEiCnXZ6_AePYM_EZQHaHa?pid=Api&rs=1&c=1&qlt=95&w=123&h=123";

        setPatient({ ...data, profilePhoto });
        setFormData({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          age: data.age,
          gender: data.gender,
          addressLine: data.addressLine
        });
      } catch (error) {
        console.log("Error fetching profile:", error);
        toast.error("Failed to load profile.");
      }
    };

    fetchPatientProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const patientId = localStorage.getItem("patientId");

      const data = new FormData();
      data.append("patientId", patientId);

      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, val);
      });

      if (newPhoto) data.append("patientPhoto", newPhoto);

      await axios.put("https://careconnect-9y8d.onrender.com/api/v1/user/updatePatientInfo", data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully!");
      setEditMode(false);
      setNewPhoto(null);
      setPreview(null);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    }
  };

  if (!patient) {
    return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Patient Profile</h2>

        {/* Profile Photo */}
        <div className="relative flex flex-col items-center mb-6">
          <motion.img
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={preview || patient.profilePhoto}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
          />
          {editMode && (
            <>
              <label
                htmlFor="photoInput"
                className="absolute bottom-0 right-[35%] bg-white p-2 rounded-full shadow cursor-pointer hover:bg-blue-100"
              >
                <FaCamera className="text-blue-600 text-lg" />
              </label>
              <input id="photoInput" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </>
          )}
          <button
            onClick={() => {
              setEditMode(!editMode);
              if (!editMode) {
                setFormData(patient);
                setNewPhoto(null);
                setPreview(null);
              }
            }}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
          >
            <FaPen />
            {editMode ? "Close Edit" : "Edit"}
          </button>
        </div>

        {/* Editable Form */}
        <div className="space-y-4">
          {["fullName", "email", "phone", "age", "gender","addressLine"].map((field) => (
            <div key={field} className="flex items-center gap-4 border-b pb-1">
              <label className="text-gray-700 w-32">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              {editMode ? (
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                />
              ) : (
                <span className="font-semibold">{patient[field]}</span>
              )}
            </div>
          ))}
        </div>

        {/* Save/Cancel Buttons */}
        {editMode && (
          <div className="mt-6 text-center space-x-4">
            <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setFormData(patient);
                setNewPhoto(null);
                setPreview(null);
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
