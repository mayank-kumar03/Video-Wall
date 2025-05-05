import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/youtube-logo-png-2067.png";
import { videos } from "../../assets/video/videos.jsx";
import VideoBox from "../pages/VideoBox.jsx";
import { Context } from "../../context/contextApi.jsx";

const Homepage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { avatar, setAvatar } = useContext(Context);
  const { username, setUsername } = useContext(Context);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(
          "https://videos-wall.onrender.com/api/v1/users/current-user",
          {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log("Repone", response);
        console.log(localStorage.getItem("accessToken"));
        // console.log("Response:", response);

        if (response.ok) {
          const data = await response.json();
          setUser({
            avatar: data?.avatar?.url || "https://via.placeholder.com/40",
            name: data?.fullName || "User",
          });
          setAvatar(data.user_id.avatar);
          setUsername(data.user_id.username);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md min-h-screen ${
          isSidebarOpen ? "w-60" : "w-20"
        } transition-all duration-300 flex flex-col items-center`}
      >
        <div className="flex flex-col items-center py-4">
          <button onClick={toggleSidebar} className="mb-4">
            <svg
              className="w-6 h-6 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isSidebarOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
          <Link to="/" className="flex items-center">
            <img src={logo} alt="YouTube Logo" className="h-12 mr-2" />
            {isSidebarOpen && (
              <h1 className="text-2xl font-bold text-red-600">Video Wall</h1>
            )}
          </Link>
        </div>
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        {/* Navbar */}
        <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
          <div className="relative w-full md:w-2/3 mx-auto">
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

          {/* Right Corner - User Avatar or Sign In */}
          <div className="ml-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 hidden md:inline">
                  {username}
                </span>
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-red-600"
                />
              </div>
            ) : (
              <div>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Section */}
        <main className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Trending Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoBox key={video.id} name={video.name} link={video.link} />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white text-center py-6 mt-8">
          <p>© 2024 Video Wall. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
