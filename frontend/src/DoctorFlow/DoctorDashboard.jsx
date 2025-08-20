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

const COLORS = ["#4F46E5", "#F59E0B"];

const Card = ({ title, value, sub, subColor = "text-gray-400" }) => (
  <motion.div
    className="bg-white p-4 rounded-xl shadow-md"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    whileHover={{ scale: 1.05, boxShadow: "0px 6px 20px rgba(0,0,0,0.15)" }}
  >
    <h3 className="text-sm font-semibold">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
    <p className={`text-xs mt-1 ${subColor}`}>{sub}</p>
  </motion.div>
);

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState({ fullName: "", doctorPhoto: "" });
  const [dashboardData, setDashboardData] = useState({
    activity: [],
    ageGroups: [],
    genderCount: [],
    totalAppointments: 0,
    newAppointments: 0,
    paymentSummary: {
      totalCashPayments: 0,
      totalCashAmount: 0,
    },
  });

  const getDoctorInfo = async () => {
    try {
      const storedDoctorId = localStorage.getItem("doctorId");
      const token = localStorage.getItem("token");
      if (!storedDoctorId) return;

      const [doctorRes, dashboardRes] = await Promise.all([
        axios.post(
          "https://careconnect-9y8d.onrender.com/api/v1/user/doctorProfile",
          { doctorId: storedDoctorId },
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        axios.get(
          `https://careconnect-9y8d.onrender.com/api/v1/user/dashboard/${storedDoctorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        ),
      ]);

      const imageUrl = doctorRes.data.doctorPhoto
        ? `https://careconnect-9y8d.onrender.com/uploads/${doctorRes.data.doctorPhoto}`
        : "https://i.pravatar.cc/40";

      setDoctor({
        fullName: doctorRes.data.fullName || "Doctor",
        doctorPhoto: imageUrl,
      });

      setDashboardData(dashboardRes.data);
    } catch (error) {
      console.log("Error fetching doctor info:", error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-pink-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <main className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <motion.div
            className="flex items-center gap-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="font-semibold">Dr. {doctor.fullName}</span>
            <motion.img
              src={doctor.doctorPhoto}
              alt="Doctor Avatar"
              className="w-10 h-10 rounded-full"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card
            title="Important Tasks"
            value="160"
            sub="42 tasks high priority"
          />
          <Card
            title="New Appointments"
            value={dashboardData.newAppointments}
            sub="Last 30 days"
          />
          <Card
            title="Total Appointments"
            value={dashboardData.totalAppointments}
            sub="All time"
          />
          <Card
            title="Cash Payments"
            value={`$${dashboardData.paymentSummary.totalCashAmount}`}
            sub={`${dashboardData.paymentSummary.totalCashPayments} payments`}
            subColor="text-green-500"
          />
        </div>

        {/* Activity Chart + Top Division */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="bg-white rounded-xl shadow-md p-4 md:col-span-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-semibold mb-4">Activity</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dashboardData.activity}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="thisYear"
                  stroke="#4F46E5"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="lastYear"
                  stroke="#9CA3AF"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-md p-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-semibold mb-4">Top Division</h2>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>General Physician</li>
              <li>Internal Medicine</li>
              <li>Skin Specialist</li>
              <li>Cardiologist</li>
              <li>Reproduction</li>
            </ul>
          </motion.div>
        </div>

        {/* Age + Gender Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <motion.div
            className="bg-white rounded-xl shadow-md p-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-semibold mb-4">Age</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dashboardData.ageGroups}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366F1" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-md p-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-semibold mb-4">Gender</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={dashboardData.genderCount}
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  dataKey="value"
                  label
                >
                  {Array.isArray(dashboardData.genderCount) &&
                    dashboardData.genderCount.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default DoctorDashboard;
