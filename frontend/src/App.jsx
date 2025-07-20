import React from 'react';
import ReactDOM from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './publicAcces/Home';
import Navbar from './publicAcces/Navbar';
import DoctorRegistration from './DoctorFlow/DoctorRegistration';
import Login from './publicAcces/Login';



const App = ()=>{

return(
  <BrowserRouter>
    <Home />
    <DoctorRegistration/>
    <Login/>
  </BrowserRouter>
);
}

export default App;