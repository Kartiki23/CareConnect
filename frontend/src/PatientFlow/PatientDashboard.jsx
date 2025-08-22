import React, { useEffect, useState } from "react";
import { CalendarIcon, HeartPulse, ThermometerSun, Syringe, Droplet, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const data = [
  { name: "Jan", value: 10 },
  { name: "Feb", value: 15 },
  { name: "Mar", value: 5 },
  { name: "Apr", value: 20 },
  { name: "May", value: 8 },
  { name: "Jun", value: 25 },
  { name: "Jul", value: 18 },
];

export default function PatientDashboard() {
  const [patient, setPatient] = useState({ fullName: "" });
  const [greeting, setGreeting] = useState("Hello");

  const getPatientInfo = async () => {
    try {
      const storedpatientId = localStorage.getItem("patientId");
      const token = localStorage.getItem("token");
      if (!storedpatientId) return;

      const response = await axios.post(
        "https://careconnect-9y8d.onrender.com/api/v1/user/patientProfile",
        { patientId: storedpatientId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPatient({ fullName: response.data.fullName || "Patient" });
    } catch (error) {
      console.log("Error fetching patient info:", error);
    }
  };

  const updateGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  };

  useEffect(() => {
    getPatientInfo();
    updateGreeting();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#eef0ff]">
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Greeting Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6"
        >
          <h2 className="text-base sm:text-lg text-gray-700">
            {greeting},{" "}
            <span className="text-blue-600 font-semibold">{patient.fullName}</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">Let's care with your health</p>
          <Link to="/bookAppointment">
            <button className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition text-sm sm:text-base">
              Book Appointment
            </button>
          </Link>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {[
            { icon: <Droplet />, title: "Blood Pressure", value: "110/80", color: "text-red-500" },
            { icon: <HeartPulse />, title: "Heart Rate", value: "105 bpm", color: "text-pink-500" },
            { icon: <ThermometerSun />, title: "Temperature", value: "36 °C", color: "text-yellow-500" },
            { icon: <Syringe />, title: "Blood Count", value: "9,873/ml", color: "text-purple-500" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-3 sm:p-4 rounded-lg shadow flex flex-col items-start"
            >
              <div className={`${item.color} mb-2`}>{item.icon}</div>
              <div className="font-semibold text-xs sm:text-sm">{item.title}</div>
              <div className="text-base sm:text-lg font-bold text-blue-600">{item.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Health Graph */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6"
        >
          <h3 className="text-sm sm:text-md font-semibold text-gray-700 mb-4">
            Statistic Of Your Health
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Appointments and Medicine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-sm sm:text-md font-semibold mb-4">Upcoming Appointments</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-center text-gray-600">
                <Stethoscope className="mr-2 text-blue-500" /> Dentist - 21 Dec 2022 - 10:00 AM
              </li>
              <li className="flex items-center text-gray-600">
                <Stethoscope className="mr-2 text-blue-500" /> Radiologist - 22 Dec 2022 - 12:30 PM
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-sm sm:text-md font-semibold mb-4">Medicine</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
              <li>Paracetamol - 2 times per day, after eating</li>
              <li>Antihistamine - 2 times per day, after eating</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
