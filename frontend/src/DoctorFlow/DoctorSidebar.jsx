import { Sidebar } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const DoctorSidebar = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-md fixed md:h-screen p-6">
        <h2 className="text-2xl font-bold text-indigo-600 mb-10">CareConnect</h2>
        <nav className="space-y-4 font-semibold">
          <Link to ="/doctorDashboard"><div className="hover:text-indigo-600 cursor-pointer">Dashboard</div></Link>
          <Link to ="/doctorAppointment"><div className="hover:text-indigo-600 cursor-pointer mt-2">Appointments</div></Link>
          <Link to ="/patientDetails"><div className="hover:text-indigo-600 cursor-pointer mt-2">Patients</div></Link>
          <Link to ="/doctormsg"><div className="hover:text-indigo-600 cursor-pointer">Messages</div></Link>
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
      <main className="ml-64 flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DoctorSidebar;

