import React, { useState, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/youtube-logo-png-2067.png";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { videos } from "../../assets/video/videos.jsx";
import VideoBox from "../pages/VideoBox.jsx";
import { Context } from "../../context/contextApi.jsx";
import { fetchTrendingVideos, searchVideos } from "../../utils/youtubeService";

const Homepage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // ✅ consume context values (already fetched in AppContext)
  const { avatar, username, loading } = useContext(Context);

  useEffect(() => {
    const loadVideos = async () => {
      setLoadingVideos(true);
      try {
        const trending = await fetchTrendingVideos(20);
        if (trending.length > 0) {
          setYoutubeVideos(trending);
        } else {
          // Fallback to static videos if YouTube API fails
          setYoutubeVideos(videos);
        }
      } catch (error) {
        console.error("Error loading videos:", error);
        // Fallback to static videos
        setYoutubeVideos(videos);
      } finally {
        setLoadingVideos(false);
      }
    };

    loadVideos();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      // If search is empty, reload trending videos
      setLoadingVideos(true);
      try {
        const trending = await fetchTrendingVideos(20);
        if (trending.length > 0) {
          setYoutubeVideos(trending);
        } else {
          setYoutubeVideos(videos);
        }
      } catch (error) {
        console.error("Error loading videos:", error);
        setYoutubeVideos(videos);
      } finally {
        setLoadingVideos(false);
      }
      return;
    }

    setLoadingVideos(true);
    try {
      const results = await searchVideos(searchQuery.trim(), 20);
      if (results.length > 0) {
        setYoutubeVideos(results);
      } else {
        setYoutubeVideos(videos);
      }
    } catch (error) {
      console.error("Error searching videos:", error);
      setYoutubeVideos(videos);
    } finally {
      setLoadingVideos(false);
    }
  };

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
          <form onSubmit={handleSearch} className="flex relative w-full md:w-2/3 mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full py-2 pl-10 pr-4 border rounded-l-full border-gray-300 focus:outline-none focus:ring focus:ring-red-300"
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
            <button type="submit" className="px-4 py-2 border bg-gray-100 rounded-r-full hover:bg-gray-200 transition-colors">
              <CiSearch className="text-xl" />
            </button>
            <IoMdMic
              size={"40px"}
              className="ml-3 border rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200"
            />
          </form>

          {/* Right Corner - User Avatar or Sign In */}
          <div className="ml-4">
            {loading ? (
              <span className="text-gray-500">Loading...</span>
            ) : username ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 hidden md:inline">{username}</span>
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-red-600"
                />
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
              >
                Sign In
              </button>
            )}
          </div>
        </header>

        {/* Main Section */}
        <main className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            {searchQuery.trim() ? `Search Results for "${searchQuery}"` : "Trending Videos"}
          </h2>
          {loadingVideos ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-600">Loading videos...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {youtubeVideos.map((video) => (
                <VideoBox
                  key={video.id || video.videoId}
                  name={video.name}
                  link={video.link}
                  title={video.title}
                  thumbnailUrl={video.thumbnailUrl}
                  channelName={video.channelName}
                  viewCount={video.viewCount}
                  publishedAt={video.publishedAt}
                  videoId={video.videoId || video.id}
                />
              ))}
            </div>
          )}
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
