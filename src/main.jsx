import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
