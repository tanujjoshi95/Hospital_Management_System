import "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("Login");

  return <>{page === "Login" && <LoginPage setPage={setPage} />}</>;
}

export default App;
