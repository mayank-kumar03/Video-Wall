import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaVideo, FaUser, FaCog } from "react-icons/fa"; // Example icons

const Sidebar = ({ isOpen }) => {
  const links = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/videos", label: "Videos", icon: <FaVideo /> },
    { to: "/user", label: "User Settings", icon: <FaUser /> },
  
  ];

  return (
    <ul className="space-y-4 mt-6">
      {links.map((link, index) => (
        <li key={index} className="flex items-center justify-center">
          <Link
            to={link.to}
            className={`flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-all duration-300 ${
              isOpen ? "justify-start px-4" : "justify-center"
            }`}
          >
            <span className="text-2xl">{link.icon}</span>
            {isOpen && <span className="text-sm font-medium">{link.label}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
