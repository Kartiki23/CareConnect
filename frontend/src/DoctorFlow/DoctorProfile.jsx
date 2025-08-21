import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPen } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [newPhoto, setNewPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const storedDoctorId = localStorage.getItem("doctorId");
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "https://careconnect-9y8d.onrender.com/api/v1/user/doctorProfile",
          { doctorId: storedDoctorId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const imageUrl = response.data.doctorPhoto
          ? `https://careconnect-9y8d.onrender.com/uploads/${response.data.doctorPhoto}`
          : "https://i.pravatar.cc/100";

        const licenseUrl = response.data.licensePhoto
          ? `https://careconnect-9y8d.onrender.com/uploads/${response.data.licensePhoto}`
          : null;

        const doc = {
          fullName: response.data.fullName || "Doctor",
          email: response.data.email,
          phone: response.data.phone,
          specialization: response.data.specialization,
          age: response.data.age,
          gender: response.data.gender,
          hospital: response.data.hospital,
          addressLine: response.data.addressLine,
          licenseNumber: response.data.licenseNumber,
          licensePhoto: licenseUrl,
          doctorPhoto: imageUrl,
        };

        setDoctor(doc);
        setFormData(doc);
      } catch (error) {
        console.log("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfile();
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
      const doctorId = localStorage.getItem("doctorId");

      const data = new FormData();
      data.append("doctorId", doctorId);
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (newPhoto) {
        data.append("doctorPhoto", newPhoto);
      }

      await axios.put(
        "https://careconnect-9y8d.onrender.com/api/v1/user/updatedoctorInfo",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Profile updated successfully!");

      // Wait for toast before refreshing
      setTimeout(() => {
        setEditMode(false);
        setNewPhoto(null);
        setPreview(null);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log("Error updating doctor profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} toastClassName="bg-blue-500 text-white rounded-lg shadow-md" />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Doctor Profile
          </h2>

          {/* Profile Photo with Edit Icon and Preview */}
          <div className="flex flex-col items-center mb-6 relative">
            <motion.img
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={preview || doctor.doctorPhoto}
              alt="Doctor Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
            />
            {editMode && (
              <>
                <label
                  htmlFor="photoInput"
                  className="absolute bottom-0 right-[35%] bg-white p-1 rounded-full shadow-md cursor-pointer"
                >
                  <FaPen className="text-blue-500" />
                </label>
                <input
                  id="photoInput"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </>
            )}
            <button
              onClick={() => {
                setEditMode(!editMode);
                if (!editMode) {
                  setPreview(null);
                  setNewPhoto(null);
                  setFormData(doctor);
                }
              }}
              className="mt-2 flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
            >
              <FaPen className="inline-block" />
              {editMode ? "Close Edit" : "Edit"}
            </button>
          </div>

          {/* Editable Form */}
          <div className="space-y-4">
            {[
              { label: "Full Name", name: "fullName" },
              { label: "Email", name: "email" },
              { label: "Contact", name: "phone" },
              { label: "Specialization", name: "specialization" },
              { label: "Age", name: "age" },
              { label: "Gender", name: "gender" },
              { label: "Hospital", name: "hospital" },
              { label: "Address", name: "addressLine" },
              { label: "License Number", name: "licenseNumber" },
            ].map(({ label, name }) => (
              <div key={name} className="flex items-center gap-4 border-b pb-1">
                <h1 className="text-gray-700 w-40">{label}:</h1>
                {editMode ? (
                  <input
                    type="text"
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                  />
                ) : (
                  <span className="font-semibold">{doctor[name]}</span>
                )}
              </div>
            ))}

            <div className="flex items-center gap-4 border-b pb-1">
              <h1 className="text-gray-700 w-40">License Photo:</h1>
              {doctor.licensePhoto ? (
                <a
                  href={doctor.licensePhoto}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="text-blue-600 underline font-semibold"
                >
                  Open document
                </a>
              ) : (
                <span className="text-gray-500">No file</span>
              )}
            </div>
          </div>

          {editMode && (
            <div className="mt-6 text-center">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded mr-3"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setPreview(null);
                  setNewPhoto(null);
                  setFormData(doctor);
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
   </div>
  );
};

export default DoctorProfile;
