import "react";
import {
  // FaChartBar,
  // FaShoppingCart,
  // FaWallet,
  // FaBox,
  // FaHeadset,
  FaClinicMedical,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";
// import { IoMdSettings } from "react-icons/io";
// import { MdOutlinePayments } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { BsCalendarCheck, BsFillFileEarmarkMedicalFill } from "react-icons/bs";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } shadow-lg flex flex-col transition-all duration-150  h-full p-4 
      dark:bg-gray-800 dark:text-white `}
    >
      {/* Clinic Info */}
      {isOpen && (
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md flex items-center">
          <FaClinicMedical className="text-blue-500" />
          <div className="ml-2">
            <p className="text-sm font-semibold">Neurology Ward</p>
            <p className="text-xs text-gray-500">Ramnagar Road, Kashipur</p>
          </div>
        </div>
      )}

      <div className="overflow-auto">
        {/* Navigation Links */}
        <nav className="mt-6">
          <p className="text-gray-400 text-sm mb-2">
            {isOpen ? "CLINIC" : ""}&nbsp;
          </p>
          <NavItem
            Icon={MdDashboard}
            text="Dashboard"
            link={"dashboard"}
            isOpen={isOpen}
          />
          <NavItem
            Icon={BsCalendarCheck}
            text="Appointments"
            link={"appointments-list"}
            isOpen={isOpen}
          />
          <NavItem
            Icon={FaUsers}
            text="Patients"
            link={"patient-list"}
            isOpen={isOpen}
          />
          <NavItem
            Icon={BsFillFileEarmarkMedicalFill}
            text="Treatments"
            link={"medical-records"}
            isOpen={isOpen}
          />
          <NavItem
            Icon={FaUserMd}
            text="Staff List"
            link={"staff-list"}
            isOpen={isOpen}
          />
        </nav>
      </div>
      <Link to={"/user/home"}>Logout</Link>
    </div>
  );
};

const NavItem = ({ Icon, text, isOpen, link }) => {
  return (
    <Link
      to={link}
      className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer"
    >
      <Icon className="text-blue-500 text-lg" />
      {isOpen && <span className="ml-3 text-sm font-medium">{text}</span>}
    </Link>
  );
};

NavItem.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
};

export default Sidebar;
Sidebar.propTypes = {
  setPageValue: PropTypes.func,
  isOpen: PropTypes.bool,
};
