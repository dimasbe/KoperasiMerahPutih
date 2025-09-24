import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import AnggotaList from "./pages/admin/Anggota/AnggotaList";
import AnggotaForm from "./pages/admin/Anggota/AnggotaForm";
import PrivateRoute from "./components/PrivateRoute";
import SimpananList from "./pages/admin/Simpanan/SimpananList";
import SimpananForm from "./pages/admin/Simpanan/SimpananForm";
import PinjamanAjukan from "./pages/admin/Pinjaman/PinjamanAjukan";
import PinjamanList from "./pages/admin/Pinjaman/PinjamanList";
import Laporan from "./pages/admin/Laporan/Laporan";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/anggota"
          element={
            <PrivateRoute>
              <AnggotaList />
            </PrivateRoute>
          }
        />

        <Route
          path="/anggota-form"
          element={
            <PrivateRoute>
              <AnggotaForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/simpanan"
          element={
            <PrivateRoute>
              <SimpananList />
            </PrivateRoute>
          }
        />
        <Route
          path="/simpanan/form"
          element={
            <PrivateRoute>
              <SimpananForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/pinjaman"
          element={
            <PrivateRoute>
              <PinjamanList />
            </PrivateRoute>
          }
        />
        <Route
          path="/pinjaman/ajukan"
          element={
            <PrivateRoute>
              <PinjamanAjukan />
            </PrivateRoute>
          }
        />
        <Route
          path="/laporan"
          element={
            <PrivateRoute>
              <Laporan />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
