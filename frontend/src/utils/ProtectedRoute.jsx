// src/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const getAuth = () => {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const ProtectedRoute = ({ expectedRole, children }) => {
  const auth = getAuth();
  if (!auth?.token || !auth?.role) return <Navigate to="/login" replace />;

  if (expectedRole && auth.role !== expectedRole) {
    // role mismatch → send to their own dashboard if logged in
    return <Navigate to={auth.role === "doctor" ? "/doctorDashboard" : "/patientDashboard"} replace />;
  }

  return children;
};

export default ProtectedRoute;