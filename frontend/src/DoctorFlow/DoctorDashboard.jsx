// src/components/MedicalDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
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

// Sample data
const activityData = [
  { name: "Jan", thisYear: 100, lastYear: 80 },
  { name: "Feb", thisYear: 120, lastYear: 90 },
  { name: "Mar", thisYear: 150, lastYear: 130 },
  { name: "Apr", thisYear: 170, lastYear: 140 },
  { name: "May", thisYear: 210, lastYear: 160 },
  { name: "Jun", thisYear: 180, lastYear: 150 },
  { name: "Jul", thisYear: 200, lastYear: 160 },
  { name: "Aug", thisYear: 210, lastYear: 170 },
  { name: "Sep", thisYear: 180, lastYear: 150 },
  { name: "Oct", thisYear: 170, lastYear: 140 },
  { name: "Nov", thisYear: 160, lastYear: 130 },
  { name: "Dec", thisYear: 190, lastYear: 160 },
];

const ageData = [
  { name: "0-20", patients: 800 },
  { name: "21-40", patients: 1280 },
  { name: "41-60", patients: 940 },
  { name: "61+", patients: 600 },
];

const genderData = [
  { name: "Men", value: 1724 },
  { name: "Women", value: 1516 },
];

const COLORS = ["#4F46E5", "#F59E0B"];

const Card = ({ title, value, sub, subColor = "text-gray-400" }) => (
  <div className="bg-white p-4 rounded-xl shadow-md">
    <h3 className="text-sm font-semibold">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
    <p className={`text-xs mt-1 ${subColor}`}>{sub}</p>
  </div>
);

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-pink-50 to-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md md:h-screen p-6">
        <h2 className="text-2xl font-bold text-indigo-600 mb-10">CareConnect</h2>
        <nav className="space-y-4 font-semibold">
          <div className="hover:text-indigo-600 cursor-pointer">Dashboard</div>
          <Link to ="/doctorAppointment"><div className="hover:text-indigo-600 cursor-pointer mt-2">Appointments</div></Link>
          <div className="hover:text-indigo-600 cursor-pointer mt-2">Patients</div>
          <div className="hover:text-indigo-600 cursor-pointer">Messages</div>
          <div className="hover:text-indigo-600 cursor-pointer">Medications</div>
          <div className="hover:text-indigo-600 cursor-pointer">Documents</div>
          <div className="hover:text-indigo-600 cursor-pointer">Finances</div>
          <div className="hover:text-indigo-600 cursor-pointer">Settings</div>
        </nav>
        <div className="absolute bottom-6">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Upgrade
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="font-semibold">Dr. Hamam Zai</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card title="Important Tasks" value="160" sub="42 tasks high priority" />
          <Card title="New Patients" value="240" sub="78 Patients waiting" />
          <Card title="Total Patients" value="3,240" sub="100 Increase" />
          <Card title="Total Payments" value="$64m" sub="24% Increase" subColor="text-green-500" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Activity */}
          <div className="bg-white rounded-xl shadow-md p-4 md:col-span-2">
            <h2 className=" font-semibold mb-4">Activity</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={activityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="thisYear" stroke="#4F46E5" strokeWidth={2} />
                <Line type="monotone" dataKey="lastYear" stroke="#9CA3AF" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Division */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className=" font-semibold mb-4">Top Division</h2>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>General Physician</li>
              <li>Internal Medicine</li>
              <li>Skin Specialist</li>
              <li>Cardiologist</li>
              <li>Reproduction</li>
            </ul>
          </div>
        </div>

        {/* Age and Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Age Chart */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className=" font-semibold mb-4">Age</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ageData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#6366F1" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gender Chart */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className=" font-semibold mb-4">Gender</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  dataKey="value"
                  label
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;