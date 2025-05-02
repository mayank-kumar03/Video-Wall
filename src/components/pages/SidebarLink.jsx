import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLink = ({ to, label }) => {
  return (
    <li>
      <Link to={to} className="text-gray-800 hover:text-red-600">
        {label}
      </Link>
    </li>
  );
};

export default SidebarLink;