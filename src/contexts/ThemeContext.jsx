import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  function handleSwitchTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // localStorage.setItem("theme", theme);
    console.log("theme is ", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, handleSwitchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
ThemeProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
// export default ThemeProvider;
export const useTheme = () => useContext(ThemeContext);
