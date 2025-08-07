
import { CalendarIcon, HeartPulse, MessageSquare, Sidebar } from 'lucide-react';
import React from 'react';
import { FaUserMd } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PatientSidebar = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */} 
      <aside className="w-64 bg-white shadow-md p-6">
         <div className="text-xl font-bold text-blue-600 mb-8">CareConnect</div> 
         <nav className="space-y-4"> 
            <Link to ="/PatientDashboard"><div className="flex items-center text-blue-600 font-semibold">
             <HeartPulse className="mr-2" /> Dashboard  
             </div></Link>
            
              <Link to ="/PatientAppointments"><div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer"> 
                <CalendarIcon className="mr-2" /> 
                Appointments 
                </div> 
                </Link>

                <Link to ="/patientmsg"><div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer"> 
                <MessageSquare className="mr-2" /> 
                Message
                </div> 
                </Link>

                <Link to ="/patientProfile"><div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer"> 
                <FaUserMd className="mr-2" /> 
                Your Profile
                </div> 
                </Link>
            </nav> 
        </aside>

      {/* Main Content */}
      <main className=" flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default PatientSidebar;
