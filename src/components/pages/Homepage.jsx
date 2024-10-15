import React from 'react';
import Sidebar from './Sidebar'; // Update the path as per your project structure
import { Link } from 'react-router-dom'; // For navigation
import logo from "C:/Users/mmaya/Downloads/youtube-logo-png-2067.png"; // Ensure this path is correct

const Homepage = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-white shadow-md min-h-screen w-60">
        {/* Header Above Sidebar */}
        <div className="flex flex-col items-center py-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="YouTube Logo" className="h-12 mr-2" />
            <h1 className="text-2xl font-bold text-red-600">My YouTube</h1>
          </Link>
        </div>
        {/* Sidebar Links */}
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 min-h-screen">
        {/* Search and Sign In Section */}
        <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search videos..."
              className="w-full py-2 pl-10 pr-4 border rounded-full border-gray-300 focus:outline-none focus:ring focus:ring-red-300"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width="20"
              height="20"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.42-1.42l4.13 4.12a1 1 0 01-1.42 1.42l-4.13-4.12zm-6.4-5.42a6 6 0 100 12 6 6 0 000-12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">Sign In</button>
        </header>

        <main className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Trending Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Consistent video thumbnail size */}
                <img
                  src={`https://via.placeholder.com/300x200.png?text=Video+${index + 1}`}
                  alt={`Video ${index + 1}`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">Video Title {index + 1}</h3>
                  <p className="text-sm text-gray-600">Channel Name</p>
                  <p className="text-sm text-gray-600">1M views • 1 day ago</p>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white text-center py-6 mt-8">
          <p>© 2024 MyTube. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
