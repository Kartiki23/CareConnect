import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Choice from './components/Choice'
import DoctorRegister from './components/DoctorRegister'
import PatientRegister from './components/PatientRegister'
import PatientDashboard from './components/PatientDashboard'
import DoctorDashboard from './components/DoctorDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home/>
      <Login/>
      <Choice/>
      <DoctorRegister/>
      <PatientRegister/>
      <PatientDashboard/>
      <DoctorDashboard/>
    </>
  )
}

export default App
