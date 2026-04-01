import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import axios from "axios";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

const COLORS = ["#4F46E5", "#F59E0B"];

const Card = ({ title, value, sub, subColor = "text-gray-400" }) => (
  <motion.div
    className="bg-white p-4 rounded-xl shadow-md flex flex-col"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    whileHover={{ scale: 1.05 }}
  >
    <h3 className="text-sm font-semibold">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value ?? 0}</p>
    <p className={`text-xs mt-1 ${subColor}`}>{sub}</p>
  </motion.div>
);

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    activity: [],
    ageGroups: [],
    genderCount: [],
    totalAppointments: 0,
    newAppointments: 0,
    paymentSummary: { totalCashPayments: 0, totalCashAmount: 0 },
  });

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const getDoctorInfo = async () => {
    try {
      const doctorId = localStorage.getItem("doctorId");
      const token = localStorage.getItem("token");

      if (!doctorId || !token) {
        console.log("Missing doctorId or token");
        return;
      }

      const [doctorRes, dashboardRes, notificationRes] = await Promise.all([
        axios.post(
          "https://careconnect-1-xvl2.onrender.com/api/v1/user/doctorProfile",
          { doctorId },
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        axios.get(
          `https://careconnect-1-xvl2.onrender.com/api/v1/user/dashboard/${doctorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        // axios.get(
        //   `https://careconnect-1-xvl2.onrender.com/api/v1/user/notifications/${doctorId}`,
        //   { headers: { Authorization: `Bearer ${token}` } }
        // ),
      ]);

      console.log("Doctor API:", doctorRes.data);

      // 🔥 Handle both possible API formats
      const doctorData = doctorRes.data.doctor || doctorRes.data;

      const imageUrl = doctorData?.doctorPhoto
        ? `https://careconnect-1-xvl2.onrender.com/uploads/${doctorData.doctorPhoto}`
        : "https://i.pravatar.cc/40";

      setDoctor({
        fullName: doctorData?.fullName || "Doctor",
        doctorPhoto: imageUrl,
      });

      setDashboardData(dashboardRes.data || {});
      setNotifications(notificationRes.data || []);
    } catch (error) {
      console.log("Error fetching doctor info:", error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  const handleMarkAllRead = () => {
    setNotifications([]);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-pink-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <main className="flex-1 p-4 md:p-6 overflow-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-3xl font-semibold">Dashboard</h1>

          <div className="flex items-center gap-4 relative">

            {/* 🔔 Notifications */}
            <div
              className="relative cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-6 h-6 text-gray-700" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                  {notifications.length}
                </span>
              )}
            </div>

            {/* Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-8 bg-white shadow-lg rounded-xl w-72 max-h-80 overflow-y-auto z-50 p-3">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                  <button onClick={handleMarkAllRead} className="text-xs text-blue-500">
                    Clear
                  </button>
                </div>

                {notifications.length > 0 ? (
                  notifications.map((note, idx) => (
                    <div key={idx} className="border-b py-2 text-sm">
                      {note.message}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No notifications</p>
                )}
              </div>
            )}

            {/* 👨‍⚕️ Doctor Info */}
            <div className="flex items-center gap-3">
              <span className="font-semibold">
                Dr. {doctor?.fullName || "Loading..."}
              </span>

              {/* ✅ FIXED IMAGE */}
              <img
                src={doctor?.doctorPhoto || "https://i.pravatar.cc/40"}
                alt="Doctor"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card title="New Appointments" value={dashboardData.newAppointments} sub="Last 30 days" />
          <Card title="Total Appointments" value={dashboardData.totalAppointments} sub="All time" />
          <Card
            title="Cash Payments"
            value={`₹${dashboardData.paymentSummary?.totalCashAmount || 0}`}
            sub={`${dashboardData.paymentSummary?.totalCashPayments || 0} payments`}
            subColor="text-green-500"
          />
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* Activity */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="mb-2 font-semibold">Activity</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dashboardData.activity || []}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="thisYear" stroke="#4F46E5" />
                <Line type="monotone" dataKey="lastYear" stroke="#9CA3AF" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gender */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="mb-2 font-semibold">Gender</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={dashboardData.genderCount || []} dataKey="value">
                  {(dashboardData.genderCount || []).map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default DoctorDashboard;