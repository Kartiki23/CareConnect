import React from 'react';
import ReactDOM from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './publicAcces/Home';
import Navbar from './publicAcces/Navbar';
import PatientRegistration from './PatientFlow/PatientRegistration';


const App = ()=>{

return(
  <BrowserRouter>
    <Home />
    <PatientRegistration/>
  </BrowserRouter>
);
}

export default App;