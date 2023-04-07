import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ allowedRoles, children, ...rest }) => {
  const { auth, user } = useAuth();
  const location = useLocation();
  return auth?.groups?.find((role) => allowedRoles?.includes(role)) ? (
    children
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
