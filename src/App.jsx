import { Navigate, Route, Router, Routes } from "react-router-dom";
import { Login } from "./Pages/login";
import React from "react";
import Deshboard from "./Pages/Deshboard";
import ProtectedRoute from "./routes/productedrouts";
import AdminLayout from "./routes/AdminLayout";
import ContactsPage from "./Pages/Contacts";
import CompanysPage from "./Pages/Companys";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<Deshboard />} />
        <Route path="/admin/contact" element={<ContactsPage />} />
        <Route path="/admin/companys" element={<CompanysPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
