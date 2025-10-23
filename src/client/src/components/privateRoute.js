// components/PrivateRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  );
};

export default PrivateRoute;
