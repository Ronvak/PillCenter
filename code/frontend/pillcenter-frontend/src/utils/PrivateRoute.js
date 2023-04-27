import { useLocation, Navigate } from "react-router-dom";
import PatientLayout from "../layouts/PatientLayout";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  return !auth ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : auth?.groups?.find((role) => allowedRoles?.includes(role)) ? (
    <PatientLayout />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
