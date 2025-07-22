import React from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './publicAcces/Home';
import Navbar from './publicAcces/Navbar';
import PatientRegistration from './PatientFlow/PatientRegistration';
import DoctorRegistration from './DoctorFlow/DoctorRegistration';
import Login from './publicAcces/Login';
import PatientDashboard from './PatientFlow/PatientDashboard';
import DoctorDashboard from './DoctorFlow/DoctorDashboard';
import DoctorAppointment from './DoctorFlow/DoctorAppointment';
import PatientDetails from './DoctorFlow/PatientsDetails';


const App = ()=>{

return(
  <BrowserRouter>
  {/* <Navbar/> */}
    <Home />
    <Login/>
    <PatientDashboard/>
    <DoctorDashboard/>
    <PatientDetails/>
    
    <Routes>
      
     <Route path="/patientRegistration" element={<PatientRegistration />} />
      <Route path="/doctorRegistration" element={<DoctorRegistration />} />
      <Route path='/doctorAppointment' element={<DoctorAppointment/>}/>
    </Routes>
  </BrowserRouter>
);
}

export default App;