import { Navigate, Route, Router, Routes } from "react-router-dom";
import { Login } from "./Pages/login";
import Deshboard from "./Pages/Deshboard";
import ProtectedRoute from "./routes/productedrouts";
import AdminLayout from "./routes/AdminLayout";
import ContactsPage from "./Pages/Contacts";
import CompaniesPage from "./Pages/Companys";
import CompaniesDetails from "./Pages/CompanieDeatil";
import Deals from "./Pages/Deals";
import AddDealFrom from "./components/AddDealFrom";
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
        <Route path="/admin/companys" element={<CompaniesPage />} />
        <Route path="/admin/companies/details/:id" element={<CompaniesDetails />} />
        <Route path="/admin/deals" element={<Deals />} />
        <Route path="/admin/deals/add+new+deal" element={<AddDealFrom />} />
        <Route path="/admin/setting" element={<AddDealFrom />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
