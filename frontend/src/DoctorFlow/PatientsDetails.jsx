import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import DoctorSidebar from "./DoctorSidebar";
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
      const res = await axios.get("http://localhost:3001/api/v1/user/getAppointmentsForDoctor", {
        params: { doctorId },
      });
      setAppointments(res.data.appointments);
    } catch (error) {
      console.log("Error fetching appointments:", error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch("http://localhost:3001/api/v1/user/updateStatus", {
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
    <DoctorSidebar>
      <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Patients Details</h1>
        </div>

        <div className="mb-4 flex justify-between">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search by name or date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10"
            />
            <Search className="absolute top-2.5 left-3 text-gray-400" size={16} />
          </div>
        </div>

        <div className="overflow-auto rounded-lg shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Age</th>
                <th className="px-6 py-3 text-left">Gender</th>
                <th className="px-6 py-3 text-left">Contact</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Time</th>
                <th className="px-6 py-3 text-left">Reason</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appt, idx) => (
                <motion.tr
                  key={appt._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{appt.name}</td>
                   <td className="px-6 py-4">{appt.age}</td>
                    <td className="px-6 py-4">{appt.gender}</td>
                  <td className="px-6 py-4">{appt.contactNo}</td>
                  <td className="px-6 py-4">{appt.appointmentDate}</td>
                   <td className="px-6 py-4">{appt.appointmentTime}</td>
                  <td className="px-6 py-4">{appt.reason}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appt.status)}`}>
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DoctorSidebar>
  );
};

export default PatientsDetails;
