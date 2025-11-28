import React, { createContext, useCallback, useEffect, useState } from "react";
import axiosInstance from "../utils/AxiosInstance";

export const Context = createContext();

const extractUser = (payload) => {
  if (!payload) return null;
  if (payload.user) return payload.user;
  if (payload.data?.user) return payload.data.user;
  if (payload.data && Object.keys(payload.data).length) return payload.data;
  return payload;
};

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("currentUser");
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Unable to parse stored user", error);
    return null;
  }
};

export const AppContext = ({ children }) => {
  const storedUser = getStoredUser();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(storedUser?.username || "");
  const [fullName, setFullName] = useState(storedUser?.fullName || "");
  const [email, setEmail] = useState(storedUser?.email || "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(
    storedUser?.avatar?.url || storedUser?.avatar || ""
  );
  const [coverImage, setCoverImage] = useState(storedUser?.coverImage || "");
  const [profilePicture, setProfilePicture] = useState(null);
  const [watchHistory, setWatchHistory] = useState([]);
  const [currentUser, setCurrentUser] = useState(storedUser);

  const persistUser = (user) => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  };

  const hasUserShape = (user) =>
    Boolean(user && (user.username || user.email || user.fullName));

  const syncUserState = useCallback((user) => {
    if (!hasUserShape(user)) return;
    persistUser(user);
    setCurrentUser(user);
    setUsername(user.username || "");
    setFullName(user.fullName || "");
    setEmail(user.email || "");
    setAvatar(user.avatar?.url || user.avatar || "");
    setCoverImage(user.coverImage || "");
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/users/current-user");
      const user =
        extractUser(response.data?.data) || extractUser(response.data);
      if (hasUserShape(user)) {
        syncUserState(user);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    } finally {
      setLoading(false);
    }
  }, [syncUserState]);

  const fetchWatchHistory = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/users/history");
      setWatchHistory(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post("/users/logout");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      persistUser(null);
      setCurrentUser(null);
      setUsername("");
      setFullName("");
      setEmail("");
      setAvatar("");
      setCoverImage("");
      setWatchHistory([]);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
    fetchWatchHistory();
  }, [fetchCurrentUser, fetchWatchHistory]);

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
        password,
        setPassword,
        avatar,
        setAvatar,
        coverImage,
        setCoverImage,
        profilePicture,
        setProfilePicture,
        watchHistory,
        fetchWatchHistory,
        currentUser,
        syncUserState,
        fetchCurrentUser,
        logout,
      }}
    >
      {children}
    </Context.Provider>
  );
};
