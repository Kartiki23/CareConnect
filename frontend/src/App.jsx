// src/App.jsx
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useParams,
} from "react-router-dom";

import Navbar from "./publicAcces/Navbar";
import Home from "./publicAcces/Home";
import Login from "./publicAcces/Login";
import Contact from "./publicAcces/Contact";

import PatientRegistration from "./PatientFlow/PatientRegistration";
import PatientDashboard from "./PatientFlow/PatientDashboard";
import PatientAppointments from "./PatientFlow/PatientAppointments";
import PatientSidebar from "./PatientFlow/PatientSidebar";
import BookAppointment from "./PatientFlow/BookAppointment";
import PatientMessages from "./PatientFlow/PatientMessages";
import PatientProfile from "./PatientFlow/PatientProfile";
import PatientAppointmentHistory from "./PatientFlow/PatientAppointmentHistory";

import DoctorRegistration from "./DoctorFlow/DoctorRegistration";
import DoctorDashboard from "./DoctorFlow/DoctorDashboard";
import DoctorAppointment from "./DoctorFlow/DoctorAppointment";
import PatientDetails from "./DoctorFlow/PatientsDetails";
import DoctorSidebar from "./DoctorFlow/DoctorSidebar";
import DoctorMsg from "./DoctorFlow/DoctorMsg";
import DoctorProfile from "./DoctorFlow/DoctorProfile";

import ChatBox from "./Components/ChatBox"; // ✅ shared ChatBox
import About from "./publicAcces/About";
import Footer from "./publicAcces/Footer";
import Specialties from "./publicAcces/Specialties";
import ProtectedRoute from "./utils/ProtectedRoute";

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

// ===== Protect Chat Route (Only if Appointment Accepted) =====
const ChatGuard = ({ children }) => {
  const isAccepted = localStorage.getItem("appointmentAccepted"); // set this when doctor accepts appointment
  if (!isAccepted) {
    return <Navigate to="/patientAppointments" replace />;
  }
  return children;
};

// ===== Wrapper for ChatBox =====
const ChatWrapper = () => {
  const { appointmentId } = useParams();
  const senderId = localStorage.getItem("userId"); // patientId or doctorId
  const role = localStorage.getItem("role"); // "doctor" or "patient"

  // ✅ Match backend enums in your model
  const senderModel = role === "doctor" ? "docregmodels" : "patients";

  return (
    <ChatBox
      appointmentId={appointmentId}
      senderId={senderId}
      senderModel={senderModel}
    />
  );
};

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
        <Route path="/about" element={<About/>} />
        <Route path="/specialties" element={<Specialties/>}/>
        <Route path="/patientRegistration" element={<PatientRegistration />} />
        <Route path="/doctorRegistration" element={<DoctorRegistration />} />


        {/* Patient Protected Routes */}
<Route element={
  <ProtectedRoute expectedRole="patient">
    <PatientLayout />
  </ProtectedRoute>
}>
  <Route path="/patientDashboard" element={<PatientDashboard />} />
  <Route path="/patientAppointments" element={<PatientAppointments />} />
  <Route path="/bookAppointment" element={<BookAppointment />} />
  <Route path="/patientMessages/:appointmentId" element={<ChatWrapper />} />
  <Route path="/patientProfile" element={<PatientProfile />} />
  <Route path="/appointmentHistory" element={<PatientAppointmentHistory />} />
</Route>

{/* Doctor Protected Routes */}
<Route element={
  <ProtectedRoute expectedRole="doctor">
    <DoctorLayout />
  </ProtectedRoute>
}>
  <Route path="/doctorDashboard" element={<DoctorDashboard />} />
  <Route path="/doctorAppointment" element={<DoctorAppointment />} />
  <Route path="/patientDetails" element={<PatientDetails />} />
  <Route path="/doctormsg/:appointmentId" element={<ChatWrapper />} />
  <Route path="/doctorProfile" element={<DoctorProfile />} />
</Route>

        {/* ✅ Fallback Dynamic Chat Route */}
        <Route
          path="/chat/:appointmentId"
          element={
            <ChatGuard>
              <ChatWrapper />
            </ChatGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
