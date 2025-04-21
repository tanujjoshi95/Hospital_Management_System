import { Navigate, Outlet } from "react-router-dom";
// import { jwt_decode } from "jwt-decode";

import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect } from "react";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useUserContext();
  const { id, role } = user;

  useEffect(() => {
    console.log("User ProtectedRoute working.");
  }, []);

  if (!id) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    // Redirect to appropriate dashboard if user has access but not to this route
    if (role === "patient") {
      return <Navigate to="/user/dashboard" />;
    }
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
