import "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import Home from "./pages/Home";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [page, setPage] = useState("Login");
  const [userId, setUserID] = useState("");

  return (
    <UserContext.Provider value={{ setUserID, setPage, userId }}>
      {page === "Login" && <LoginPage setPage={setPage} />}
      {page === "Home" && <Home />}
    </UserContext.Provider>
  );
}

export default App;
