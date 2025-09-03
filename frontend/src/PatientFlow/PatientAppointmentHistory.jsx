import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
// optional: wrap main layout
import { ToastContainer } from "react-toastify";

// Function to get badge colors based on status
const getStatusColor = (status) => {
  switch (status) {
    case "accepted": return "bg-green-100 text-green-700";
    case "pending": return "bg-yellow-100 text-yellow-700";
    case "rejected": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const PatientAppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const patientId = localStorage.getItem("patientId");

  // Fetch appointments from backend
  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "https://careconnect-1-xvl2.onrender.com/api/v1/user/getAppointmentsForPatient",
        { params: { patientId } }
      );
      setAppointments(res.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    if (patientId) getAppointments();
  }, []);

  // Filter appointments by name or date
  const filteredAppointments = appointments.filter(
    (appt) =>
      appt.name.toLowerCase().includes(search.toLowerCase()) ||
      appt.appointmentDate.includes(search)
  );

  return (
   
      <motion.div
        className="p-4 md:p-6 lg:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Appointment Details</h1>

          {/* Search Box */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by name or date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 text-sm md:text-base focus:ring-2 focus:ring-blue-400"
            />
            <Search className="absolute top-2.5 left-3 text-gray-400" size={16} />
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 text-gray-600 text-sm md:text-base">
              <tr>
                <th className="px-4 md:px-6 py-2 text-left">Name</th>
                <th className="px-4 md:px-6 py-2 text-left">Age</th>
                <th className="px-4 md:px-6 py-2 text-left">Gender</th>
                <th className="px-4 md:px-6 py-2 text-left">Contact</th>
                <th className="px-4 md:px-6 py-2 text-left">Doctor</th>
                <th className="px-4 md:px-6 py-2 text-left">Specialization</th>
                <th className="px-4 md:px-6 py-2 text-left">Date</th>
                <th className="px-4 md:px-6 py-2 text-left">Time</th>
                <th className="px-4 md:px-6 py-2 text-left">Reason</th>
                <th className="px-4 md:px-6 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-base">
              {filteredAppointments.map((appt, idx) => (
                <motion.tr
                  key={appt._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 md:px-6 py-2">{appt.name}</td>
                  <td className="px-4 md:px-6 py-2">{appt.age}</td>
                  <td className="px-4 md:px-6 py-2">{appt.gender}</td>
                  <td className="px-4 md:px-6 py-2">{appt.contactNo}</td>
                  <td className="px-4 md:px-6 py-2">{appt.doctorId?.fullName || "N/A"}</td>
                  <td className="px-4 md:px-6 py-2">{appt.doctorId?.specialization || "N/A"}</td>
                  <td className="px-4 md:px-6 py-2">{appt.appointmentDate}</td>
                  <td className="px-4 md:px-6 py-2">{appt.appointmentTime}</td>
                  <td className="px-4 md:px-6 py-2">{appt.reason}</td>
                  <td className="px-4 md:px-6 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${getStatusColor(appt.status)}`}
                    >
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Optional: Toast container */}
        <ToastContainer position="top-right" autoClose={3000} />
      </motion.div>
    
  );
};

export default PatientAppointmentHistory;
