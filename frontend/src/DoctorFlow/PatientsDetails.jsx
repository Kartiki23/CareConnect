import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import axios from "axios";

const getStatusColor = (status) => {
  switch (status) {
    case "accepted": return "bg-green-100 text-green-700";
    case "pending": return "bg-yellow-100 text-yellow-700";
    case "rejected": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const PatientsDetails = () => {
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState([]);
  const doctorId = localStorage.getItem("doctorId");

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("https://careconnect-1-xvl2.onrender.com/api/v1/user/getAppointmentsForDoctor", {
        params: { doctorId },
      });
      setAppointments(res.data.appointments);
    } catch (error) {
      console.log("Error fetching appointments:", error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch("https://careconnect-1-xvl2.onrender.com/api/v1/user/updateStatus", {
        appointmentId: id,
        status,
      });
      fetchAppointments(); 
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  useEffect(() => {
    if (doctorId) fetchAppointments();
  }, [doctorId]);

  const filteredAppointments = appointments.filter(
    (appt) =>
      appt.name.toLowerCase().includes(search.toLowerCase()) ||
      appt.appointmentDate.includes(search)
  );

  return (
    <motion.div className="p-4 sm:p-6 md:p-8 lg:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Patients Details</h1>
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by name or date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Search className="absolute top-2.5 left-3 text-gray-400" size={16} />
        </div>
      </div>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-600 text-sm md:text-base">
            <tr>
              <th className="px-4 md:px-6 py-2 md:py-3 text-left">Name</th>
              <th className="px-4 md:px-6 py-2 md:py-3 text-left">Age</th>
              <th className="px-4 md:px-6 py-2 md:py-3 text-left">Gender</th>
              <th className="px-4 md:px-6 py-2 md:py-3 text-left">Contact</th>
              <th className="px-4 md:px-6 py-2 md:py-3 text-left">Date</th>
              <th className="px-4 md:px-6 py-2 md:py-3 text-left">Time</th>
              <th className="px-4 md:px-6 py-2 md:py-3 text-left">Reason</th>
              <th className="px-4 md:px-6 py-2 md:py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appt, idx) => (
              <motion.tr
                key={appt._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b hover:bg-gray-50 text-sm md:text-base"
              >
                <td className="px-4 md:px-6 py-2 md:py-3">{appt.name}</td>
                <td className="px-4 md:px-6 py-2 md:py-3">{appt.age}</td>
                <td className="px-4 md:px-6 py-2 md:py-3">{appt.gender}</td>
                <td className="px-4 md:px-6 py-2 md:py-3">{appt.contactNo}</td>
                <td className="px-4 md:px-6 py-2 md:py-3">{appt.appointmentDate}</td>
                <td className="px-4 md:px-6 py-2 md:py-3">{appt.appointmentTime}</td>
                <td className="px-4 md:px-6 py-2 md:py-3">{appt.reason}</td>
                <td className="px-4 md:px-6 py-2 md:py-3">
                  <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${getStatusColor(appt.status)}`}>
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredAppointments.map((appt) => (
          <motion.div
            key={appt._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border rounded-lg p-4 shadow bg-white flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{appt.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appt.status)}`}>
                {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600 gap-1">
              <span>Age: {appt.age}</span>
              <span>Gender: {appt.gender}</span>
              <span>Contact: {appt.contactNo}</span>
              <span>Date: {appt.appointmentDate}</span>
              <span>Time: {appt.appointmentTime}</span>
            </div>
            <div className="text-sm text-gray-600">Reason: {appt.reason}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PatientsDetails;
