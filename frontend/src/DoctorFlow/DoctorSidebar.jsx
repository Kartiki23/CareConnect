import { CalendarIcon, FileText, LayoutDashboard, LogOut, MessageSquare, Pill, Settings, Sidebar, Users, Wallet } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const DoctorSidebar = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white shadow-md fixed h-190 p-6">
        <h2 className="text-2xl font-bold text-indigo-600 mb-10">CareConnect</h2>
        <nav className="space-y-4 font-semibold">
          <Link to ="/doctorDashboard"><div className="hover:text-indigo-600 cursor-pointer flex"><LayoutDashboard  className='mr-2'/>Dashboard</div></Link>
          <Link to ="/doctorAppointment"><div className="hover:text-indigo-600 cursor-pointer mt-2 flex "><CalendarIcon className="mr-2" />Appointments</div></Link>
          <Link to ="/patientDetails"><div className="hover:text-indigo-600 cursor-pointer mt-2 flex"> <Users className="mr-2" />Patients</div></Link>
          <Link to ="/doctormsg"><div className="hover:text-indigo-600 cursor-pointer flex mt-2"><MessageSquare className="mr-2" />Messages</div></Link>
          <Link to ='/doctorProfile'><div className="hover:text-indigo-600 cursor-pointer flex mt-2"><Pill className="mr-2" />Your Profile</div></Link>
          <div className="hover:text-indigo-600 cursor-pointer flex mt-2"><FileText className="mr-2" />Documents</div>
          <div className="hover:text-indigo-600 cursor-pointer flex mt-2"><Wallet className="mr-2" />Finances</div>
          <div className="hover:text-indigo-600 cursor-pointer flex mt-2"><Settings className="mr-2" />Settings</div>
        </nav>
        <Link to = "/login"><div className="absolute bottom-6">
          <button className="bg-indigo-600 text-white mb-20 w-30 h-9 rounded-md hover:bg-indigo-700 flex">
            <LogOut className='mr-1 mt-1'/><h1 className='mt-1 font-bold text-lg'>Logout</h1>
          </button>
        </div></Link>
      </aside>
      {/* Main Content */}
      <main className="ml-64 flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DoctorSidebar;

