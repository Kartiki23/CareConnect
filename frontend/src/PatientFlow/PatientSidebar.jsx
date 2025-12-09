import { CalendarIcon, HeartPulse, LogOut, StickyNote } from 'lucide-react';
import React, { useState } from 'react';
import { FaUserMd } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PatientSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // For mobile toggle

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-20 h-full bg-white shadow-md p-6
          transform top-0 left-0 transition-transform duration-300
          w-64
          md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="text-xl font-bold text-blue-600 mb-8">CareConnect</div>

        <nav className="space-y-4">
          <Link to="/PatientDashboard">
            <div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer mt-6 text-lg">
              <HeartPulse className="mr-2" /> Dashboard
            </div>
          </Link>

          <Link to="/PatientAppointments">
            <div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer mt-2 text-lg">
              <CalendarIcon className="mr-2" /> Appointments
            </div>
          </Link>

          <Link to="/appointmentHistory">
            <div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer mt-2 text-lg">
              <StickyNote className="mr-2" /> Appointment Details
            </div>
          </Link>

          <Link to="/bloodDonationPanel">
            <div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer mt-2 text-lg">
              <FaUserMd className="mr-2" /> Donation
            </div>
          </Link>

          <Link to="/patientProfile">
            <div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer mt-2 text-lg">
              <FaUserMd className="mr-2" /> Your Profile
            </div>
          </Link>

          <Link to="/login">
            <div>
              <button className="bg-indigo-600 text-white w-full h-10 rounded-md hover:bg-indigo-700 flex items-center justify-center mt-2">
                <LogOut className="mr-2" /> <span className="font-bold">Logout</span>
              </button>
            </div>
          </Link>
        </nav>
      </aside>

      {/* Mobile hamburger */}
      <div className="md:hidden fixed top-20 left-2 z-30">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64 overflow-auto transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default PatientSidebar;
