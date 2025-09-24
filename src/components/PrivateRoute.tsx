import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("token"); // contoh cek login
  const role = localStorage.getItem("role"); // contoh cek role

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // bisa tambahkan cek role kalau mau per route
  return <>{children}</>;
};

export default PrivateRoute;
