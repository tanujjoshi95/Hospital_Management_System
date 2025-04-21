import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user, token]);

  const updateUser = (data) => {
    setUser({
      id: data.user.id,
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      role: data.user.role,
    });
    setToken(data.token);
  };

  const logout = () => {
    setUser(null);
    setToken("");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        updateUser,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.any,
};

export const useUserContext = () => useContext(UserContext);
