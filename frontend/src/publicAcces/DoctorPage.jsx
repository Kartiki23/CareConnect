// frontend/src/DoctorFlow/DoctorPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FaHospital, FaStethoscope, FaEnvelope } from "react-icons/fa";
import { Building } from "lucide-react";

const DoctorPage = () => {
  const location = useLocation();
  const { specialization } = location.state || {};
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (specialization) {
      fetchDoctors(specialization);
    }
  }, [specialization]);

  const fetchDoctors = async (specialization) => {
    try {
      const res = await axios.get(
        `https://careconnect-9y8d.onrender.com/api/v1/user/specialty/${specialization}`
      );
      setDoctors(res.data);

      const doctorsWithPhotos = res.data.map((doc) => ({
        ...doc,
        doctorPhoto: doc.doctorPhoto
          ? `https://careconnect-9y8d.onrender.com/uploads/${doc.doctorPhoto}`
          : "https://i.pravatar.cc/150?img=12", // fallback image
      }));

      setDoctors(doctorsWithPhotos);

    } catch (error) {
      console.error("Error fetching doctors:", error.response?.data || error.message);
      setDoctors([]);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        {specialization ? `${specialization} Doctors` : "All Doctors"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.length > 0 ? (
          doctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white shadow-md rounded-xl overflow-hidden border 
                         hover:shadow-xl transform hover:-translate-y-2 
                         transition duration-300 w-80 max-w-sm mx-auto"
            >
              {/* Doctor Profile Photo */}
              <div className="flex justify-center items-center mt-4">
            <img
                src={doc.doctorPhoto}
                alt={doc.fullName}
                className="w-28 h-28 rounded-full object-cover hover:scale-105 transition-transform duration-500 shadow-md"
                />
            </div>

              {/* Doctor Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {doc.fullName}
                </h3>
                <p className="flex items-center text-gray-600 mt-1 text-sm">
                  <FaStethoscope className="mr-2 text-blue-500" />
                  {doc.specialization}
                </p>
                <p className="flex items-center text-gray-600 mt-1 text-sm">
                  <FaHospital className="mr-2 text-green-500" />
                  {doc.hospital}
                </p>
                <p className="flex items-center text-gray-600 mt-1 text-sm">
                  <Building className="mr-1 text-green-500" />
                  {doc.addressLine}
                </p>
                <p className="flex items-center text-gray-600 mt-1 text-sm">
                  <FaEnvelope className="mr-2 text-red-500" />
                  {doc.email}
                </p>

                {/* Consultation Fee */}
                <p className="mt-2 text-sm font-medium text-gray-700">
                  Fee:{" "}
                  <span className="text-blue-600 font-semibold">
                    ₹{doc.consultationFee || "N/A"}
                  </span>
                </p>

                {/* Book Appointment Button */}
                <Link to ="/login">
                <button className="mt-3 w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition">
                  Book Appointment
                </button></Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-600 text-center text-lg col-span-3">
            No doctors found for {specialization}
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorPage;
