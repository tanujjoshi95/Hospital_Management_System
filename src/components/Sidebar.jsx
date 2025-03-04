import "react";
import { useState } from "react";
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

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-white shadow-lg h-full transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } p-4`}
    >
      {/* Logo & Toggle Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Logo"
            className="w-10 h-10 mr-2"
          />
          {isOpen && <span className="text-xl font-bold">Zendenta</span>}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500">
          {isOpen ? "◀" : "▶"}
        </button>
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
      <nav className="mt-6 h-max overflow-y-auto">
        <p className="text-gray-400 text-sm mb-2">CLINIC</p>
        <NavItem Icon={MdDashboard} text="Dashboard" isOpen={isOpen} />
        <NavItem Icon={BsCalendarCheck} text="Reservations" isOpen={isOpen} />
        <NavItem Icon={FaUsers} text="Patients" isOpen={isOpen} />
        <NavItem
          Icon={BsFillFileEarmarkMedicalFill}
          text="Treatments"
          isOpen={isOpen}
        />
        <NavItem Icon={FaUserMd} text="Staff List" isOpen={isOpen} />

        <p className="text-gray-400 text-sm mt-4 mb-2">FINANCE</p>
        <NavItem Icon={FaWallet} text="Accounts" isOpen={isOpen} />
        <NavItem Icon={FaChartBar} text="Sales" isOpen={isOpen} />
        <NavItem Icon={FaShoppingCart} text="Purchases" isOpen={isOpen} />
        <NavItem
          Icon={MdOutlinePayments}
          text="Payment Method"
          isOpen={isOpen}
        />

        <p className="text-gray-400 text-sm mt-4 mb-2">PHYSICAL ASSET</p>
        <NavItem Icon={FaBox} text="Stocks" isOpen={isOpen} />
        <NavItem Icon={IoMdSettings} text="Peripherals" isOpen={isOpen} />

        <p className="text-gray-400 text-sm mt-4 mb-2">SUPPORT</p>
        <NavItem Icon={FaHeadset} text="Customer Support" isOpen={isOpen} />
      </nav>
    </div>
  );
};

const NavItem = ({ Icon, text, isOpen }) => (
  <div className="flex items-center p-2 hover:bg-gray-200 rounded-md cursor-pointer">
    <Icon className="text-blue-500 text-lg" />
    {isOpen && <span className="ml-3 text-sm font-medium">{text}</span>}
  </div>
);

NavItem.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
