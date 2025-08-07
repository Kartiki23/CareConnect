import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CalendarCheck, Clock4, UserCircle2 } from "lucide-react";
import PatientSidebar from "./PatientSidebar";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const patientId = localStorage.getItem("patientId");

  const getAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/v1/user/getAppointmentsForPatient", {
        params: { patientId },
      });
      setAppointments(res.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/user/cancelAppointment/${appointmentId}`, {
        params: { patientId },
      });
      getAppointments();
    } catch (error) {
      console.error("Failed to cancel appointment", error);
    }
  };

  useEffect(() => {
    if (patientId) getAppointments();
  }, []);

  return (
    <PatientSidebar>
      <motion.div className="p-6 bg-gradient-to-br from-blue-50 to-white min-h-screen">
        <motion.h1 className="text-3xl font-bold mb-6 text-blue-800">Your Appointments</motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appt, index) => (
            <motion.div key={appt._id} className="bg-white rounded-xl shadow-md p-5 border">
              <div className="flex items-center gap-3 mb-2">
                <UserCircle2 className="text-blue-500" size={28} />
                <h2 className="text-xl font-semibold">{appt.name}</h2>
              </div>
              <div className="flex items-center text-gray-600 gap-2 mb-1">
                <CalendarCheck size={18} />
                <span>{appt.appointmentDate}</span>
              </div>
              <div className="flex items-center text-gray-600 gap-2 mb-1">
                <Clock4 size={18} />
                <span>{appt.appointmentTime}</span>
              </div>
              <div className="flex items-center text-gray-600 gap-2 mb-1">
                <Clock4 size={18} />
                <span>{appt.reason}</span>
              </div>
              <div className="text-gray-600 mb-2"> Doctor: {appt.doctorId?.fullName || "Unknown"}</div>
              <motion.span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  appt.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : appt.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {appt.status}
              </motion.span>

              <button
                onClick={() => handleCancel(appt._id)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Cancel Appointment
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PatientSidebar>
  );
};

export default PatientAppointments;
