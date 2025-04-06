import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import UserNavBar from "../components/userNavbar";

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <UserNavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
