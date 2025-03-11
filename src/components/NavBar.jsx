// import { a } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

import WebSite_Logo from "../assets/medical-logo-vector.jpg";

const Navbar = ({ pagevalue }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav className="fixed h-[64px] top-0 left-0 w-full bg-white shadow-md z-50 flex items-center justify-between p-4">
      {/* Left Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={WebSite_Logo} alt="Logo" className="w-10 h-10 mr-2" />
          {isOpen && (
            <span className="text-xl font-bold">Terminal Hospital</span>
          )}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500">
          {isOpen ? "◀" : "▶"}
        </button>
      </div>

      {/* Middle Section */}
      <span className="ml-4 text-gray-500">{pagevalue}</span>
      <div className="flex-grow mx-8">
        <input
          type="text"
          placeholder="Search for anything here..."
          className="w-full p-2 border rounded-md bg-gray-100 focus:outline-none"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="bg-blue-500 text-white p-2 rounded-full">+</button>
        <span>⚙️</span>
        <span>🔔</span>
        <span>📌 1/4</span>
        <div className="flex items-center">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="h-8 w-8 rounded-full mr-2"
          />
          <span>Darrell Steward</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
Navbar.propTypes = {
  pagevalue: PropTypes.string,
};
