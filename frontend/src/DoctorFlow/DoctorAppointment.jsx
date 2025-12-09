import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import axios from "axios";
import ChatBox from "../Components/ChatBox";

const getStatusColor = (status) => {
  switch (status) {
    case "accepted":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const DoctorAppointment = () => {
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const doctorId = localStorage.getItem("doctorId");

  const fetchAppointments = async () => {
    if (!doctorId) {
      setError("Doctor ID not found. Please log in again.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        "https://careconnect-1-xvl2.onrender.com/api/v1/user/getAppointmentsForDoctor",
        { params: { doctorId } }
      );
      setAppointments(res.data.appointments || []);
      setError("");
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(
        "https://careconnect-1-xvl2.onrender.com/api/v1/user/updateStatus",
        { appointmentId: id, status }
      );
      fetchAppointments();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update appointment status.");
    }
  };

  const markAsPaid = async (id) => {
    try {
      await axios.put(
        `https://careconnect-1-xvl2.onrender.com/api/v1/user/${id}/markPaid`
      );
      setAppointments((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, paymentStatus: "Paid" } : a
        )
      );
    } catch (err) {
      console.error("Error marking payment as paid:", err);
      alert("Failed to update payment status.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(
    (appt) =>
      appt.name?.toLowerCase().includes(search.toLowerCase()) ||
      appt.appointmentDate?.includes(search)
  );

  return (
    <motion.div
      className="p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <h1 className="text-2xl font-bold">Manage Appointments</h1>

        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by name or date..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:ring-2 focus:ring-indigo-400"
          />
          <Search className="absolute top-2.5 left-3 text-gray-400" size={16} />
        </div>
      </div>

      {loading && <p>Loading appointments...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white table-auto">
            <thead className="bg-gray-100 text-gray-600 text-sm sm:text-base">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left hidden sm:table-cell">Age</th>
                <th className="px-4 py-2 text-left hidden sm:table-cell">Gender</th>
                <th className="px-4 py-2 text-left">Contact</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left hidden sm:table-cell">Time</th>
                <th className="px-4 py-2 text-left hidden md:table-cell">Reason</th>
                <th className="px-4 py-2 text-left">Fee</th>
                <th className="px-4 py-2 text-left">Payment Status</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appt, idx) => (
                <motion.tr
                  key={appt._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b hover:bg-gray-50 text-sm sm:text-base"
                >
                  <td className="px-4 py-2">{appt.name}</td>
                  <td className="px-4 py-2 hidden sm:table-cell">{appt.age}</td>
                  <td className="px-4 py-2 hidden sm:table-cell">{appt.gender}</td>
                  <td className="px-4 py-2">{appt.contactNo}</td>
                  <td className="px-4 py-2">{appt.appointmentDate}</td>
                  <td className="px-4 py-2 hidden sm:table-cell">{appt.appointmentTime}</td>
                  <td className="px-4 py-2 hidden md:table-cell">{appt.reason}</td>
                  <td className="px-4 py-2">₹{appt.consultationFeeAtBooking ?? "N/A"}</td>
                  <td className="px-4 py-2">
                    {appt.paymentStatus === "Pending" ? (
                      <button
                        onClick={() => {
                          if (appt.status !== "accepted") {
                            alert("Payment can only be taken after the appointment is accepted.");
                            return;
                          }
                          markAsPaid(appt._id);
                        }}
                        disabled={appt.status !== "accepted"}
                        className={`px-2 py-1 rounded text-xs sm:text-sm ${
                          appt.status !== "accepted"
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        Paid
                      </button>
                    ) : (
                      <span className="text-green-700 font-bold text-xs sm:text-sm">Paid</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(appt.status)}`}>
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex flex-col sm:flex-row gap-1">
                    <button
                      onClick={() => handleUpdateStatus(appt._id, "accepted")}
                      disabled={appt.status !== "pending"}
                      className="bg-green-600 text-white px-2 py-1 rounded text-xs sm:text-sm disabled:opacity-50"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(appt._id, "rejected")}
                      disabled={appt.status !== "pending"}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs sm:text-sm disabled:opacity-50"
                    >
                      Reject
                    </button>
                    {appt.status === "accepted" && (
                      <button
                        onClick={() => setSelectedAppointment(appt)}
                        className="bg-indigo-600 text-white px-2 py-1 rounded text-xs sm:text-sm hover:bg-indigo-700"
                      >
                        Chat
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Chat Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-4xl h-[90vh] md:h-[80vh] overflow-hidden">
            <button
              className="absolute top-4 right-4 text-gray-600 text-xl z-10"
              onClick={() => setSelectedAppointment(null)}
            >
              ✕
            </button>
            <ChatBox
              appointmentId={selectedAppointment._id}
              senderId={doctorId}
              senderModel="docregmodels"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DoctorAppointment;
