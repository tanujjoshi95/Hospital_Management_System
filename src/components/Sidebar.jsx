import "react";
import {
  // FaClinicMedical,
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

const Sidebar = ({ isOpen, setPageValue }) => {
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } shadow-lg flex flex-col transition-all duration-150  h-full p-4 
      dark:bg-gray-800 dark:text-white `}
    >
      {/* Clinic Info */}
      {/* {isOpen && (
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md flex items-center">
          <FaClinicMedical className="text-blue-500" />
          <div className="ml-2">
            <p className="text-sm font-semibold">Neurology Ward</p>
            <p className="text-xs text-gray-500">Ramnagar Road, Kashipur</p>
          </div>
        </div>
      )} */}

      <div className="overflow-auto">
        {/* Navigation Links */}
        <nav className="mt-6">
          <p className="text-gray-400 text-sm mb-2">
            {isOpen ? "CLINIC" : ""}&nbsp;
          </p>
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
          <p className="text-gray-400 text-sm mt-4 mb-2">
            {isOpen ? "FINANCE" : ""}&nbsp;{" "}
          </p>
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
          <p className="text-gray-400 text-sm mt-4 mb-2">
            {isOpen ? "PHYSICAL ASSET" : ""}&nbsp;
          </p>{" "}
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
          <p className="text-gray-400 text-sm mt-4 mb-2">
            {isOpen ? "SUPPORT" : ""}&nbsp;
          </p>
          <NavItem
            setPageValue={setPageValue}
            Icon={FaHeadset}
            text="Customer Support"
            isOpen={isOpen}
          />
        </nav>
      </div>
    </div>
  );
};

const NavItem = ({ Icon, text, isOpen, setPageValue }) => {
  return (
    <div
      className="flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md cursor-pointer"
      onClick={() => {
        setPageValue(text);
      }}
    >
      <Icon className="text-blue-500 text-lg" />
      {isOpen && <span className="ml-3 text-sm font-medium">{text}</span>}
    </div>
  );
};

NavItem.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setPageValue: PropTypes.func.isRequired,
};

export default Sidebar;
Sidebar.propTypes = {
  setPageValue: PropTypes.func,
  isOpen: PropTypes.bool,
};
