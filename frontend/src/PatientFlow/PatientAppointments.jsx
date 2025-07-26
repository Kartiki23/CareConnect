import React from "react"; import { motion } from "framer-motion"; import { CalendarCheck, Clock4, UserCircle2 } from "lucide-react";
import PatientSidebar from "./PatientSidebar";

const appointments = [ { id: 1, patient: "John Doe", date: "2025-07-25", time: "10:30 AM", doctor: "Dr. Smith", status: "Upcoming", }, { id: 2, patient: "Anna Wilson", date: "2025-07-25", time: "11:30 AM", doctor: "Dr. Lee", status: "Confirmed", }, { id: 3, patient: "Michael Johnson", date: "2025-07-25", time: "01:00 PM", doctor: "Dr. Khan", status: "Pending", }, ];

const PatientAppointments = () => { return ( 
<PatientSidebar>
<motion.div className="p-6 bg-gradient-to-br from-blue-50 to-white min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} > <motion.h1 className="text-3xl font-bold mb-6 text-blue-800" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} > Your Appointments </motion.h1>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {appointments.map((appt, index) => (
      <motion.div
        key={appt.id}
        className="bg-white rounded-xl shadow-md p-5 border hover:shadow-xl transition-all duration-300"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.2, duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <UserCircle2 className="text-blue-500" size={28} />
          <h2 className="text-xl font-semibold">{appt.patient}</h2>
        </div>
        <div className="flex items-center text-gray-600 gap-2 mb-1">
          <CalendarCheck size={18} />
          <span>{appt.date}</span>
        </div>
        <div className="flex items-center text-gray-600 gap-2 mb-1">
          <Clock4 size={18} />
          <span>{appt.time}</span>
        </div>
        <div className="text-gray-600 mb-2">Doctor: {appt.doctor}</div>
        <motion.span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            appt.status === "Upcoming"
              ? "bg-yellow-100 text-yellow-700"
              : appt.status === "Confirmed"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.3 + 0.3 }}
        >
          {appt.status}
        </motion.span>
      </motion.div>
    ))}
  </div>
</motion.div>
</PatientSidebar>
); };

export default PatientAppointments;