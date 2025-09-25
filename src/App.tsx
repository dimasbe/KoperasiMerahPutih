import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import Login from "./pages/Auth/Login";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Login global */}
        <Route path="/login" element={<Login />} />

        {/* Semua route admin */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Guest routes harus paling bawah */}
        <Route path="/*" element={<GuestRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
