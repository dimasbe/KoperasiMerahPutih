import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import AdminRoutes from "./routes/AdminRoutes";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
