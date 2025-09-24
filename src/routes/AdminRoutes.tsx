import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import AnggotaList from "../pages/admin/Anggota/AnggotaList";
import AnggotaForm from "../pages/admin/Anggota/AnggotaForm";
import SimpananList from "../pages/admin/Simpanan/SimpananList";
import SimpananForm from "../pages/admin/Simpanan/SimpananForm";
import PinjamanList from "../pages/admin/Pinjaman/PinjamanList";
import PinjamanAjukan from "../pages/admin/Pinjaman/PinjamanAjukan";
import Laporan from "../pages/admin/Laporan/Laporan";
import PrivateRoute from "../components/PrivateRoute";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
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
  );
};

export default AdminRoutes;
