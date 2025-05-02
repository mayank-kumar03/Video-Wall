import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";

// import { fetchDataFromApi } from "../utils/api";
export const Context = createContext();

export const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isSideBarVisible, setSidebarVisible] = useState(false);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  // const [avatarPreview, setAvatarPreview] = useState("");
  // const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const [loginUsername, loginSetUsername] = useState("");
  const [loginPassword, loginSetPassword] = useState("");

  const [videoCategory, setVideoCategory] = useState("");
  const [videoType, setVideoType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [thumbnail, setThumbnail] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [duration, setDuration] = useState();
  let avatarURL;
  let coverImageURL;

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
        searchResults,
        selectedCategory,
        setSelectedCategory,
        mobileMenu,
        setMobileMenu,
        isSideBarVisible,
        setSidebarVisible,
        toggleSideBar,
        username,
        setUsername,
        fullName,
        setFullName,
        email,
        setEmail,
        password,
        setPassword,
        avatar,
        setAvatar,
        profilePicture,
        setProfilePicture,
        // avatarPreview,
        // setAvatarPreview,
        // profilePicturePreview,
        // setProfilePicturePreview,
        loginUsername,
        loginSetUsername,
        loginPassword,
        loginSetPassword,
        videoCategory,
        setVideoCategory,
        videoType,
        setVideoType,
        title,
        setTitle,
        description,
        setDescription,
        thumbnail,
        setThumbnail,
        videoFile,
        setVideoFile,
        duration,
        setDuration,
        handleAddVideoToWatchHistory,
      }}
    >
      {children}
    </Context.Provider>
  );
};
