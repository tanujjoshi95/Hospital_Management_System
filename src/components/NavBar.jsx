import PropTypes from "prop-types";
import WebSite_Logo from "/medical-logo-vector.jpg";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { MdHelpOutline } from "react-icons/md";
import { useTheme } from "../contexts/ThemeContext";
import { TiFlag } from "react-icons/ti";
import { Link } from "react-router-dom";

const Navbar = ({ isOpen, setIsOpen, pagevalue }) => {
  const { theme, handleSwitchTheme } = useTheme();

  return (
    <nav
      className={`h-[64px]w-full dark:bg-gray-800 dark:text-white light:shadow-md dark:shadow-black flex items-center justify-between p-4`}
    >
      {/* Left Section */}
      <div className="flex items-center justify-between">
        <Link
          to={"/"}
          className={`flex items-center ${isOpen ? "w-fit" : "w-10"}`}
        >
          <img src={WebSite_Logo} alt="Logo" className="w-10 h-10 mr-2" />
          {isOpen && (
            <span className="text-xl font-bold">Terminal Hospital</span>
          )}
        </Link>
        <button
          onClick={() => setIsOpen((data) => !data)}
          className="text-gray-500 p-2"
        >
          {isOpen ? "◀" : "▶"}
        </button>
        <span className="ml-4 text-gray-500 dark:text-gray-200">
          {pagevalue}
        </span>
      </div>

      {/* Middle Section */}
      {/* <div className="flex-grow mx-8">
        <input
          type="text"
          placeholder="Search for anything here..."
          className="w-full p-2 border rounded-md bg-gray-100 focus:outline-none"
        />
      </div> */}

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* <button className="bg-blue-500 h-[1.5rem] text-white p-2 rounded-full">
          +
        </button> */}
        <span>
          <IoSettings className="text-[1.5rem]" color="gray" />
        </span>
        <span>
          <MdHelpOutline className="text-[1.5rem]" color="gray" />
        </span>
        <span onClick={handleSwitchTheme}>
          {theme === "light" ? (
            <IoSunny color="orange" fontSize={"1.5rem"} />
          ) : (
            <FaMoon color="white" />
          )}
        </span>
        <div className="flex items-center">
          <span>
            <TiFlag color="green" fontSize={"1.5rem"} />
          </span>{" "}
          <span>1/4</span>
        </div>
        <Link to={"profile"} className="flex items-center cursor-pointer">
          <img
            src="/images/doctor.png"
            alt="Profile"
            className="h-8 w-8 rounded-full mr-2"
          />
          <span>Dr. Gagan Sharma</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
Navbar.propTypes = {
  pagevalue: PropTypes.string,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  setPageValue: PropTypes.func,
};
