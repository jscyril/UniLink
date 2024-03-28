import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  // Check if user is authenticated
  const isAuthenticated = auth?.user;

  // Check if user is an admin
  const isAdmin = isAuthenticated && auth.user.role === "admin";

  // Check if user is allowed based on roles
  const isAllowed = isAdmin || allowedRoles.includes(auth.user.role);

  return isAuthenticated && isAllowed ? (
    <Outlet />
  ) : isAuthenticated ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
