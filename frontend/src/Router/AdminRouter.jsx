import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data from localStorage
  const token = localStorage.getItem("token");

  // Check if user is authenticated and has 'admin' role
  if (user && token && user.role === "admin") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
