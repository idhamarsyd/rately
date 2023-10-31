import React from "react";
import { useToken } from "../hooks/useToken";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const AuthRequired = () => {
  const { token } = useToken();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

export default AuthRequired;
