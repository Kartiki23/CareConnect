import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, Clock4, UserCircle2, MessageCircle } from "lucide-react";
import ChatBox from "../Components/ChatBox";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null); // ✅ Selected appointment for chat
  const patientId = localStorage.getItem("patientId");

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/v1/user/getAppointmentsForPatient",
        { params: { patientId } }
      );
      setAppointments(res.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/v1/user/cancelAppointment/${appointmentId}`,
        { params: { patientId } }
      );
      setAppointments((prev) => prev.filter((appt) => appt._id !== appointmentId));
    } catch (error) {
      console.error("Failed to cancel appointment", error);
    }
  };

  const fetchUnreadCounts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/v1/chat/unreadCounts/${patientId}`
      );
      setUnreadCounts(res.data);
    } catch (error) {
      console.error("Error fetching unread counts:", error);
    }
  };

  useEffect(() => {
    if (patientId) {
      getAppointments();
      fetchUnreadCounts();
    }
  }, [patientId]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <motion.div
      className="p-6 bg-gradient-to-br from-blue-50 to-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-6 text-blue-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Your Appointments
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {appointments.map((appt) => (
            <motion.div
              key={appt._id}
              className="bg-white rounded-xl shadow-md p-5 border cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 8px 15px rgba(0,0,0,0.1)",
              }}
            >
              {/* Patient Info */}
              <div className="flex items-center gap-3 mb-2">
                <UserCircle2 className="text-blue-500" size={28} />
                <h2 className="text-xl font-semibold">{appt.name}</h2>
              </div>

              {/* Appointment Info */}
              <div className="flex items-center text-gray-600 gap-2 mb-1">
                <CalendarCheck size={18} />
                <span>{formatDate(appt.appointmentDate)}</span>
              </div>
              <div className="flex items-center text-gray-600 gap-2 mb-1">
                <Clock4 size={18} />
                <span>{appt.appointmentTime}</span>
              </div>
              <div className="text-gray-600 mb-2">Reason: {appt.reason}</div>
              <div className="text-gray-600 mb-2">
                Doctor: {appt.doctorId?.fullName || "Unknown"}
              </div>
              <div className="text-gray-600 mb-2">
                Consultation Fee: {appt.consultationFeeAtBooking || "Unknown"}
              </div>

              {/* Status */}
              <motion.span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  appt.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : appt.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {appt.status}
              </motion.span>

              {/* Buttons */}
              <div className="mt-4 flex gap-2">
                {appt.status === "pending" && (
                  <motion.button
                    onClick={() => handleCancel(appt._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                )}

                {appt.status === "accepted" && (
                  <motion.button
                    onClick={() => setSelectedAppointment(appt)} // ✅ open chat dynamically
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle size={18} />
                    Chat
                    {unreadCounts[appt._id] > 0 && (
                      <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                        {unreadCounts[appt._id]}
                      </span>
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ✅ Render ChatBox if an appointment is selected */}
      {selectedAppointment && (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-xl shadow-lg w-11/12 md:w-3/4 lg:w-2/3 h-4/5">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-white font-bold text-xl z-10"
        onClick={() => setSelectedAppointment(null)}
      >
        ✕
      </button>

      {/* Chat Box */}
      <ChatBox
        senderId={patientId}
        senderModel="patients"
        appointmentId={selectedAppointment._id}
      />
    </div>
  </div>
)}
    </motion.div>
  );
};

export default PatientAppointments;
