import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const Sidebar = () => {
  return (
    <aside className="bg-white w-60 p-4 shadow-md min-h-screen">
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="text-gray-800 hover:text-red-600">Dashboard</Link>
        </li>
        <li>
          <Link to="/videos" className="text-gray-800 hover:text-red-600">Videos</Link>
        </li>
        <li>
          <Link to="/playlists" className="text-gray-800 hover:text-red-600">Playlists</Link>
        </li>
        <li>
          <Link to="/subscriptions" className="text-gray-800 hover:text-red-600">Subscriptions</Link>
        </li>
        <li>
          <Link to="/comments" className="text-gray-800 hover:text-red-600">Comments</Link>
        </li>
        <li>
          <Link to="/likes" className="text-gray-800 hover:text-red-600">Likes</Link>
        </li>
        <li>
          <Link to="/tweets" className="text-gray-800 hover:text-red-600">Tweets</Link>
        </li>
        <li>
          <Link to="/healthcheck" className="text-gray-800 hover:text-red-600">Health Check</Link>
        </li>
        <li>
          <Link to="/user" className="text-gray-800 hover:text-red-600">User Settings</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
