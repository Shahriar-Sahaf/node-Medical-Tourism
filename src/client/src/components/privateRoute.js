// components/PrivateRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  );
};

export default PrivateRoute;
