import { Navigate, Outlet } from "react-router-dom";
// import { jwt_decode } from "jwt-decode";

import PropTypes from "prop-types";
import { useUserContext } from "./contexts/UserContext";
import { useEffect } from "react";

const ProtectedRoute = ({ allowedRoles }) => {
  const { userRole, userId } = useUserContext();
  //   const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("User ProtectedRoute working.");
  }, []);
  if (!userId) {
    return <Navigate to="/login" />;
  }
  //   if (!token) {
  //     return <Navigate to="/login" />;
  //   }
  try {
    // const decoded = jwt_decode(token);

    // if (!allowedRoles.includes(decoded.role)) {
    //   return <Navigate to="/unauthorized" />;
    // }
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
  } catch (err) {
    console.error(err);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
