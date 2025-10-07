import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  // 🔹 Fetch current user when app loads
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/users/current-user", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
console.log("Current user response:", response.data);
        if (response.data) {
          setUsername(response.data?.user?.username || "");
          setFullName(response.data?.user?.fullName || "");
          setEmail(response.data?.user?.email || "");
          setAvatar(response.data?.user?.avatar?.url || "https://via.placeholder.com/40");
        }
      } catch (error) {
        console.error("❌ Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const toggleSideBar = () => {
    setSidebarVisible(!isSideBarVisible);
  };

  const handleAddVideoToWatchHistory = async (videoId) => {
    try {
      await axiosInstance.post(`/videos/addVideo/${videoId}`);
    } catch (error) {
      console.log("Error adding video to watch History");
    }
  };

  return (
    <Context.Provider
      value={{
    loading,
    setLoading,
    username,
    setUsername,
    fullName,
    setFullName,
    email,
    setEmail,
    avatar,
    setAvatar,
    // ❌ remove searchResults, setSearchResults
  }}
    >
      {children}
    </Context.Provider>
  );
};
