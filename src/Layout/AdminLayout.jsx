import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import { ThemeProvider } from "../contexts/ThemeContext";

const AdminLayout = () => {
  return (
    <ThemeProvider>
      <div className=" h-screen flex flex-col">
        <Navbar isOpen={true} />

        <div className="flex flex-row grow overflow-auto">
          <Sidebar isOpen={true} />
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
