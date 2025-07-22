import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Search } from "lucide-react";

const currentDoctor = "Dr. Alex";

const patients = [
  {
    admitted: "27 Dec, 2024",
    name: "Dianne Russell",
    room: "BC5001",
    concern: "Upper Abdomen General",
    status: "Report Pending",
    doctor: "Dr. Kristin",
  },
  {
    admitted: "03 Feb, 2023",
    name: "Bessie Cooper",
    room: "DMK502",
    concern: "Gynecologic Disorders",
    status: "Life Support",
    doctor: "Dr. Kristin",
  },
  {
    admitted: "02 Mar, 2023",
    name: "Guy Hawkins",
    room: "BC1022",
    concern: "Medical Care During Pregnancy",
    status: "Life Support",
    doctor: "Dr. Alex",
  },
  {
    admitted: "05 Apr, 2023",
    name: "Cameron Williamson",
    room: "BC1022",
    concern: "Liver and Gallbladder Disorders",
    status: "Report Pending",
    doctor: "Dr. Alex",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Discharged":
      return "text-green-600";
    case "Report Pending":
      return "text-blue-600";
    case "ICU":
      return "text-purple-600";
    case "In Recovery":
      return "text-yellow-600";
    case "Life Support":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const PatientDetails = () => {
  const [search, setSearch] = useState("");

  const myPatients = patients.filter((p) => p.doctor === currentDoctor);

  const filteredPatients = myPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.concern.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      className="p-6 bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Patients</h1>
        <p className="text-gray-500">Patients previously handled by you</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Search by name or concern..."
          className="w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Admitted</th>
              <th className="px-6 py-3 text-left">Patient</th>
              <th className="px-6 py-3 text-left">Room</th>
              <th className="px-6 py-3 text-left">Area of Concern</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <motion.tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="px-6 py-4">{patient.admitted}</td>
                  <td className="px-6 py-4">{patient.name}</td>
                  <td className="px-6 py-4">{patient.room}</td>
                  <td className="px-6 py-4">{patient.concern}</td>
                  <td className={`px-6 py-4 font-medium ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </td>
                  <td className="px-6 py-4 flex space-x-3 text-blue-500">
                    <Phone className="cursor-pointer" />
                    <MessageCircle className="cursor-pointer" />
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No matching patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default PatientDetails;