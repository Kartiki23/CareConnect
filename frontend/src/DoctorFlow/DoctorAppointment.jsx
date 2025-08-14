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

const DoctorAppointment = () => {
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const doctorId = localStorage.getItem("doctorId");

  const fetchAppointments = async () => {
    if (!doctorId) {
      setError("Doctor ID not found. Please log in again.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3001/api/v1/user/getAppointmentsForDoctor",
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
      await axios.patch("http://localhost:3001/api/v1/user/updateStatus", {
        appointmentId: id,
        status,
      });
      fetchAppointments();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update appointment status.");
    }
  };

  const markAsPaid = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/v1/user/${id}/markPaid`);
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
      className="p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Appointments</h1>
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

      {loading && <p>Loading appointments...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
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
                <th className="px-6 py-3 text-left">Consultation Fee</th>
                <th className="px-6 py-3 text-left">Payment Status</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
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
                    ₹{appt.consultationFeeAtBooking ?? "N/A"}
                  </td>
                   {/* Payment (only when Accepted) */}
                  <td className="px-6 py-4">
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
                        className={`px-3 py-1 rounded ${
                          appt.status !== "accepted"
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        Paid
                      </button>
                    ) : (
                      <span className="text-green-700 font-bold">Paid</span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        appt.status
                      )}`}
                    >
                      {appt.status.charAt(0).toUpperCase() +
                        appt.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleUpdateStatus(appt._id, "accepted")}
                      disabled={appt.status !== "pending"}
                      className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(appt._id, "rejected")}
                      disabled={appt.status !== "pending"}
                      className="bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default DoctorAppointment;
