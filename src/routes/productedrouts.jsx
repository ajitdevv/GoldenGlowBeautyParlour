import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login to access the dashboard.");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
