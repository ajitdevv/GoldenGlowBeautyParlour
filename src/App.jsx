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
import Setting from "./Pages/Setting";
import AdminInfo from "./Pages/AdminInfo";
import Reports from "./Pages/Reports";
import ReportFullView from "./Pages/ReportFullView";
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
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/report/:_id" element={<ReportFullView />} />
        <Route path="/admin/setting" element={<Setting />} />
        <Route path="/admin/admin+info" element={<AdminInfo />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
