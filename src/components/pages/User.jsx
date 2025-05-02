import React, { useState, useEffect,useContext } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa"; // Icons for better UI
import {Context} from "../../context/contextApi"

const User = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {avatar, setAvatar} = useContext(Context);
   const {username, setUsername,email,setEmail} = useContext(Context);

  // Fetch current user details
  const fetchCurrentUser = async () => {
    try {
      const response = await axiosInstance.get("/users/current-user", {
        withCredentials: true,
      });
      setAvatar(response.data.user_id.avatar)
      setUser(response.data);
      setUsername(response.data.user_id.username
      )
      setEmail(response.data.user_id.email
      )
    } catch (error) {
      console.error("Error fetching current user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/users/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="text-red-600 text-2xl font-bold"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-gray-700 text-lg mb-4">You are not logged in.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome, {username}
      </h1>
      <div className="flex items-center space-x-6">
        <motion.img
          src={avatar || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-red-600"
          whileHover={{ scale: 1.1 }}
        />
        <div>
          <p className="text-lg text-gray-700">
            <strong>Email:</strong> {email}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Username:</strong> {username}
          </p>
        </div>
      </div>
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
        <motion.div
          className="flex items-center space-x-4"
          whileHover={{ scale: 1.05 }}
        >
          <FaUserCircle className="text-gray-400 text-6xl" />
          <p className="text-gray-600 text-lg">
            Manage your account settings and preferences.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default User;