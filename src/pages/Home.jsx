import { useState } from "react";
import "../styles/navBar.css";
import PatientsSection from "../sections/PatientsSection";
import Sidebar from "../components/sideBar";
import Navbar from "../components/NavBar";
import { ThemeProvider } from "../contexts/ThemeContext";

const Home = () => {
  const [pagevalue, setPageValue] = useState("Patients");
  const [isOpen, setIsOpen] = useState(true);
  return (
    <ThemeProvider>
      <div className=" h-screen flex flex-col">
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} pagevalue={pagevalue} />

        <div className="flex flex-row grow overflow-auto">
          <Sidebar isOpen={isOpen} setPageValue={setPageValue} />
          {pagevalue === "Patients" && <PatientsSection />}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
