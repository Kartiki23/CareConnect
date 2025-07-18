import React from 'react';
import ReactDOM from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './publicAcces/Home';
import Navbar from './publicAcces/Navbar';


const App = ()=>{

return(
  <BrowserRouter>
    <Home />
  </BrowserRouter>
);
}

export default App;