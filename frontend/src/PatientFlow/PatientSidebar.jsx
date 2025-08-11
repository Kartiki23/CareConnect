
import { CalendarIcon, HeartPulse, LogOut, MessageSquare, Sidebar, StickyNote } from 'lucide-react';
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
            <Link to ="/PatientDashboard"><div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer mt-2">
             <HeartPulse className="mr-2 " /> Dashboard  
             </div></Link>
            
              <Link to ="/PatientAppointments"><div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer mt-2"> 
                <CalendarIcon className="mr-2" /> 
                Appointments 
                </div> 
                </Link>

                <Link to ="/appointmentHistory"><div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer mt-2"> 
                <StickyNote className="mr-2" /> 
                Appointment Deatils
                </div> 
                </Link>


                <Link to ="/patientMessages"><div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer mt-2"> 
                <MessageSquare className="mr-2" /> 
                Message
                </div> 
                </Link>

                <Link to ="/patientProfile"><div className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer mt-2"> 
                <FaUserMd className="mr-2" /> 
                Your Profile
                </div> 
                </Link>

                <Link to = "/login"><div>
                  <button className="bg-indigo-600 text-white w-30 h-9 rounded-md hover:bg-indigo-700 flex mt-2">
                  <LogOut className='mr-1 mt-1'/><h1 className='mt-1 font-bold text-lg'>Logout</h1>
                  </button>
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
