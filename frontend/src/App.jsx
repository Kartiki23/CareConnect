import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
        <Route path="/PatientAppointments" element={<PatientAppointments/>}/>
         <Route path='/PatientSidebar' element={<PatientSidebar/>}/>
        <Route path="/doctorRegistration" element={<DoctorRegistration />} />
        <Route path="/doctorDashboard" element={<DoctorDashboard />} />
        <Route path="/doctorAppointment" element={<DoctorAppointment />} />
        <Route path="/patientDetails" element={<PatientDetails />} />
        <Route path='/doctorsidebar' element={<DoctorSidebar/>}/>
        <Route path='/doctormsg' element={<DoctorMsg/>}/>
        <Route path='/patientmsg' element={<PatientMessages/>} />
        <Route path='/bookAppointment' element={<BookAppointment/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
