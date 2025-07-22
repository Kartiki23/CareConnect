import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './publicAcces/Home';
import Navbar from './publicAcces/Navbar';
import Login from './publicAcces/Login';
import Contact from './publicAcces/Contact';
import PatientRegistration from './PatientFlow/PatientRegistration';
import PatientDashboard from './PatientFlow/PatientDashboard';
import DoctorRegistration from './DoctorFlow/DoctorRegistration';

const App = () => {
  return (
    <BrowserRouter>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/patientRegistration" element={<PatientRegistration />} />
        <Route path="/patientDashboard" element={<PatientDashboard />} />
        <Route path="/doctorRegistration" element={<DoctorRegistration />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
