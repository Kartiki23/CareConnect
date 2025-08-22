import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, Clock4, UserCircle2, MessageCircle } from "lucide-react";
import ChatBox from "../Components/ChatBox";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const patientId = localStorage.getItem("patientId");

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "https://careconnect-9y8d.onrender.com/api/v1/user/getAppointmentsForPatient",
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
        `https://careconnect-9y8d.onrender.com/api/v1/user/cancelAppointment/${appointmentId}`,
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
        `https://careconnect-9y8d.onrender.com/api/v1/chat/unreadCounts/${patientId}`
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
      className="p-4 md:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Page Title */}
      <motion.h1
        className="text-2xl md:text-3xl font-bold mb-6 text-blue-800"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Your Appointments
      </motion.h1>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <AnimatePresence>
          {appointments.map((appt) => (
            <motion.div
              key={appt._id}
              className="bg-white rounded-xl shadow-md p-4 md:p-5 border cursor-pointer flex flex-col justify-between"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.02, boxShadow: "0px 8px 15px rgba(0,0,0,0.1)" }}
            >
              {/* Patient Info */}
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <UserCircle2 className="text-blue-500" size={24} />
                <h2 className="text-lg md:text-xl font-semibold">{appt.name}</h2>
              </div>

              {/* Appointment Info */}
              <div className="flex flex-col gap-1 text-gray-600 mb-2 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <CalendarCheck size={16} />
                  <span>{formatDate(appt.appointmentDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock4 size={16} />
                  <span>{appt.appointmentTime}</span>
                </div>
                <div>Reason: {appt.reason}</div>
                <div>Doctor: {appt.doctorId?.fullName || "Unknown"}</div>
                <div>Consultation Fee: {appt.consultationFeeAtBooking || "Unknown"}</div>
              </div>

              {/* Status Badge */}
              <motion.span
                className={`inline-block px-3 py-1 rounded-full text-xs md:text-sm font-medium ${
                  appt.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : appt.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {appt.status}
              </motion.span>

              {/* Action Buttons */}
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                {appt.status === "pending" && (
                  <motion.button
                    onClick={() => handleCancel(appt._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 text-sm md:text-base"
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                )}

                {appt.status === "accepted" && (
                  <motion.button
                    onClick={() => setSelectedAppointment(appt)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm md:text-base"
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle size={16} />
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

      {/* ChatBox Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-2 md:p-4">
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-3xl h-[85vh] md:h-[80vh] flex flex-col overflow-hidden">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-700 font-bold text-xl z-10"
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
