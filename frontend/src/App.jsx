import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './publicAcces/Navbar';
import Home from './publicAcces/Home';
import Login from './publicAcces/Login';
import Contact from './publicAcces/Contact';
import PatientRegistration from './PatientFlow/PatientRegistration';
import PatientDashboard from './PatientFlow/PatientDashboard';
import DoctorRegistration from './DoctorFlow/DoctorRegistration';

// 👇 These should be created and imported if you're using them
// import DoctorDashboard from './DoctorFlow/DoctorDashboard';
// import DoctorAppointment from './DoctorFlow/DoctorAppointment';
// import PatientDetails from './PatientFlow/PatientDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/patientRegistration" element={<PatientRegistration />} />
        <Route path="/patientDashboard" element={<PatientDashboard />} />
        <Route path="/doctorRegistration" element={<DoctorRegistration />} />

        {/* Uncomment when you have created these components */}
        {/* <Route path="/doctorDashboard" element={<DoctorDashboard />} />
        <Route path="/doctorAppointment" element={<DoctorAppointment />} />
        <Route path="/patientDetails" element={<PatientDetails />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
