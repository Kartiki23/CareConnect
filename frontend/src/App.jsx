import React from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './publicAcces/Home';
import Navbar from './publicAcces/Navbar';
import PatientRegistration from './PatientFlow/PatientRegistration';
import DoctorRegistration from './DoctorFlow/DoctorRegistration';
import Login from './publicAcces/Login';

const App = ()=>{

return(
  <BrowserRouter>
  {/* <Navbar/> */}
    <Home />
    <Login/>
    <Routes>
      
     <Route path="/patientRegistration" element={<PatientRegistration />} />
        <Route path="/doctorRegistration" element={<DoctorRegistration />} />
</Routes>
  </BrowserRouter>
);
}

export default App;