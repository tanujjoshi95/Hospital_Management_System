import "react";
import "../styles/navBar.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavBar";
import { useState } from "react";

const Home = () => {
  const [pagevalue, setPageValue] = useState("Dashboard");
  return (
    <div>
      <Navbar pagevalue={pagevalue} />
      <Sidebar pagevalue={pagevalue} setPageValue={setPageValue} />
    </div>
  );
};

export default Home;
