import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const appointments = [
  {
    firstName: "Jane",
    lastName: "Cooper",
    phone: "9876543210",
    date: "Thu, 15 Aug 2023 at 10:00 AM",
    status: "Confirmed",
    reason: "General Checkup",
  },
  {
    firstName: "Wade",
    lastName: "Warren",
    phone: "9876543211",
    date: "Thu, 15 Aug 2023 at 10:00 AM",
    status: "Pending",
    reason: "Skin Allergy",
  },
  {
    firstName: "Brooklyn",
    lastName: "Henderson",
    phone: "9876543212",
    date: "Thu, 15 Aug 2023 at 10:00 AM",
    status: "Cancelled",
    reason: "Flu symptoms",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const DoctorAppointment = () => {
  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Appointments</h1>
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex justify-between">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Search className="absolute top-2.5 left-3 text-gray-400" size={16} />
        </div>
      </div>

      {/* Appointment Table */}
      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left px-6 py-3">First Name</th>
              <th className="text-left px-6 py-3">Last Name</th>
              <th className="text-left px-6 py-3">Phone Number</th>
              <th className="text-left px-6 py-3">Appointment Date & Time</th>
              <th className="text-left px-6 py-3">Reason</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">{appt.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appt.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appt.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appt.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{appt.reason}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      appt.status
                    )}`}
                  >
                    {appt.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm transition">
                    Accept
                  </button>
                  <button className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-green-700 text-sm transition">
                    Reschedule
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm transition">
                    Cancel
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default DoctorAppointment;