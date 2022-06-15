import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const user = useSelector((store) => store.user.user);
  if (!user || (isAdmin && user?.role?.value !== "ADMIN")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
