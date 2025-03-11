import "react";
import { useEffect, useState } from "react";
import {
  FaClinicMedical,
  FaChartBar,
  FaShoppingCart,
  FaUserMd,
  FaUsers,
  FaWallet,
  FaBox,
  FaHeadset,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdDashboard, MdOutlinePayments } from "react-icons/md";
import { BsCalendarCheck, BsFillFileEarmarkMedicalFill } from "react-icons/bs";
import PropTypes from "prop-types";
// import WebSite_Logo from "../assets/medical-logo-vector.jpg";

const Sidebar = ({ pagevalue, setPageValue }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    console.log("Page = ", pagevalue);
  }, [pagevalue]);

  return (
    <div
      className={`bg-white shadow-lg h-screen transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } p-4`}
    >
      {/* Logo & Toggle Button */}
      <div className="flex items-center justify-between h-10">
        {/* <div className="flex items-center">
          <img src={WebSite_Logo} alt="Logo" className="w-10 h-10 mr-2" />
          {isOpen && (
            <span className="text-xl font-bold">Terminal Hospital</span>
          )}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500">
          {isOpen ? "◀" : "▶"}
        </button> */}
      </div>

      {/* Clinic Info */}
      {isOpen && (
        <div className="bg-gray-100 p-3 mt-4 rounded-md flex items-center">
          <FaClinicMedical className="text-blue-500" />
          <div className="ml-2">
            <p className="text-sm font-semibold">Avicena Clinic</p>
            <p className="text-xs text-gray-500">845 Euclid Avenue, CA</p>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="mt-6">
        <p className="text-gray-400 text-sm mb-2">CLINIC</p>
        <NavItem
          Icon={MdDashboard}
          text="Dashboard"
          setPageValue={setPageValue}
          isOpen={isOpen}
        />
        <NavItem
          Icon={BsCalendarCheck}
          text="Reservations"
          setPageValue={setPageValue}
          isOpen={isOpen}
        />
        <NavItem
          Icon={FaUsers}
          text="Patients"
          setPageValue={setPageValue}
          isOpen={isOpen}
        />
        <NavItem
          setPageValue={setPageValue}
          Icon={BsFillFileEarmarkMedicalFill}
          text="Treatments"
          isOpen={isOpen}
        />
        <NavItem
          setPageValue={setPageValue}
          Icon={FaUserMd}
          text="Staff List"
          isOpen={isOpen}
        />

        <p className="text-gray-400 text-sm mt-4 mb-2">FINANCE</p>
        <NavItem
          setPageValue={setPageValue}
          Icon={FaWallet}
          text="Accounts"
          isOpen={isOpen}
        />
        <NavItem
          setPageValue={setPageValue}
          Icon={FaChartBar}
          text="Sales"
          isOpen={isOpen}
        />
        <NavItem
          setPageValue={setPageValue}
          Icon={FaShoppingCart}
          text="Purchases"
          isOpen={isOpen}
        />
        <NavItem
          setPageValue={setPageValue}
          Icon={MdOutlinePayments}
          text="Payment Method"
          isOpen={isOpen}
        />

        <p className="text-gray-400 text-sm mt-4 mb-2">PHYSICAL ASSET</p>
        <NavItem
          setPageValue={setPageValue}
          Icon={FaBox}
          text="Stocks"
          isOpen={isOpen}
        />
        <NavItem
          setPageValue={setPageValue}
          Icon={IoMdSettings}
          text="Peripherals"
          isOpen={isOpen}
        />

        {/* <p className="text-gray-400 text-sm mt-4 mb-2">SUPPORT</p>
        <NavItem
          setPageValue={setPageValue}
          Icon={FaHeadset}
          text="Customer Support"
          isOpen={isOpen}
        /> */}
      </nav>
    </div>
  );
};

const NavItem = ({ Icon, text, isOpen, setPageValue }) => (
  <div
    className="flex items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer"
    onClick={() => {
      setPageValue(text);
    }}
  >
    <Icon className="text-blue-500 text-lg" />
    {isOpen && <span className="ml-3 text-sm font-medium">{text}</span>}
  </div>
);

NavItem.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setPageValue: PropTypes.func.isRequired,
};

export default Sidebar;
Sidebar.propTypes = {
  pagevalue: PropTypes.string,
  setPageValue: PropTypes.func,
};
