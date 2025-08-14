import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './publicAcces/Navbar';
import Home from './publicAcces/Home';
import Login from './publicAcces/Login';
import Contact from './publicAcces/Contact';
import PatientRegistration from './PatientFlow/PatientRegistration';
import PatientDashboard from './PatientFlow/PatientDashboard';
import DoctorRegistration from './DoctorFlow/DoctorRegistration';
import DoctorDashboard from './DoctorFlow/DoctorDashboard';
import DoctorAppointment from './DoctorFlow/DoctorAppointment';
import PatientDetails from './DoctorFlow/PatientsDetails';
import DoctorSidebar from './DoctorFlow/DoctorSidebar';
import DoctorMsg from './DoctorFlow/DoctorMsg';
import PatientAppointments from './PatientFlow/PatientAppointments';
import PatientSidebar from './PatientFlow/PatientSidebar';
import BookAppointment from './PatientFlow/BookAppointment';
import PatientMessages from './PatientFlow/PatientMessages';
import DoctorProfile from './DoctorFlow/DoctorProfile';
import PatientProfile from './PatientFlow/PatientProfile';
import PatientAppointmentHistory from './PatientFlow/PatientAppointmentHistory';

// ===== Layouts =====
const PatientLayout = () => (
  <div className="flex m-0 p-0">
    <PatientSidebar className="w-64" />
    <div className="flex-1 m-0 p-0">
      <Outlet />
    </div>
  </div>
);

const DoctorLayout = () => (
  <div className="flex m-0 p-0">
    <DoctorSidebar className="w-64" />
    <div className="flex-1 m-0 p-0">
      <Outlet />
    </div>
  </div>
);

// ===== App Component =====
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/patientRegistration" element={<PatientRegistration />} />
        <Route path="/doctorRegistration" element={<DoctorRegistration />} />

        {/* Patient Protected Routes */}
          <Route element={<PatientLayout />}>
            <Route path="/patientDashboard" element={<PatientDashboard />} />
            <Route path="/patientAppointments" element={<PatientAppointments />} />
            <Route path="/bookAppointment" element={<BookAppointment />} />
            {/* <Route path="/patientMessages" element={<PatientMessages />} /> */}
            <Route path="/patientProfile" element={<PatientProfile />} />
            <Route path="/appointmentHistory" element={<PatientAppointmentHistory />} />
          </Route>
      

        {/* Doctor Protected Routes */}
       
          <Route element={<DoctorLayout />}>
            <Route path="/doctorDashboard" element={<DoctorDashboard />} />
            <Route path="/doctorAppointment" element={<DoctorAppointment />} />
            <Route path="/patientDetails" element={<PatientDetails />} />
            <Route path="/doctormsg" element={<DoctorMsg />} />
            <Route path="/doctorProfile" element={<DoctorProfile />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;