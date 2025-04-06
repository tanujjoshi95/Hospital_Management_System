import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userId, setUserID] = useState("");
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    console.log("User Context working.");
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserID, userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
UserContextProvider.propTypes = {
  children: PropTypes.any,
};

export const useUserContext = () => useContext(UserContext);
