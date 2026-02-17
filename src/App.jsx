import { Navigate, Route, Router, Routes } from "react-router-dom";
import { Login } from "./Pages/login";
import React from "react";
import Deshboard from "./Pages/Deshboard";
import ProtectedRoute from "./components/productedrouts";
function App() {
  return (
    // <div className="w-full h-screen flex items-center justify-center bg-linear-to-r from-primary to-secondary">
    //   <Login />
    // </div>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Deshboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
