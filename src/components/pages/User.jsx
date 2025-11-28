import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSignOutAlt, FaUpload } from "react-icons/fa";
import { Context } from "../../context/contextApi";
import Sidebar from "./Sidebar";
import logo from "../../assets/youtube-logo-png-2067.png";

const Section = ({ title, children }) => (
  <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);

const User = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    username,
    fullName,
    email,
    avatar,
    coverImage,
    loading,
    fetchCurrentUser,
    logout,
    watchHistory,
    fetchWatchHistory,
    setAvatar,
    setCoverImage,
    syncUserState,
  } = useContext(Context);

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [status, setStatus] = useState({});
  const [updating, setUpdating] = useState({
    profile: false,
    password: false,
    avatar: false,
    cover: false,
  });
  const [profileForm, setProfileForm] = useState({
    fullName: fullName || "",
    email: email || "",
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

<<<<<<< HEAD
  useEffect(() => {
    setProfileForm({
      fullName: fullName || "",
      email: email || "",
    });
  }, [fullName, email]);
=======
  // Fetch current user details
  const fetchCurrentUser = async () => {
    try {
      const response = await axiosInstance.get("/users/current-user");
      setAvatar(response.data.user_id.avatar);
      setUser(response.data);
      setUsername(response.data.user_id.username);
      setEmail(response.data.user_id.email);
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
<<<<<<< HEAD
=======
      setAvatar(null);
     
      setUsername(null);
      setEmail(null);
>>>>>>> 5287a350f81315ed7c789d8d748ec5eee3c3feb9
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
>>>>>>> 2aa8218b2dc56ccc4d099276e3dbe9331c974043

  useEffect(() => {
    fetchCurrentUser();
    fetchWatchHistory();
  }, [fetchCurrentUser, fetchWatchHistory]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    setUpdating((prev) => ({ ...prev, profile: true }));
    try {
      const response = await axiosInstance.patch("/users/update_account", {
        fullName: profileForm.fullName.trim(),
        email: profileForm.email.trim(),
      });
      const updatedUser = response.data?.data;
      if (updatedUser) {
        syncUserState(updatedUser);
      } else {
        await fetchCurrentUser();
      }
      setStatus((prev) => ({
        ...prev,
        profile: { type: "success", message: "Profile updated successfully." },
      }));
    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        
        profile: {
          type: "error",
          message: error.response?.data?.message || "Failed to update profile.",
        },
      }));
    } finally {
      setUpdating((prev) => ({ ...prev, profile: false }));
    }
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setStatus((prev) => ({
        ...prev,
        password: { type: "error", message: "Passwords do not match." },
      }));
      return;
    }
    setUpdating((prev) => ({ ...prev, password: true }));
    try {
      await axiosInstance.post("/users/change-password", {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setStatus((prev) => ({
        ...prev,
        password: { type: "success", message: "Password updated." },
      }));
    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        password: {
          type: "error",
          message: error.response?.data?.message || "Failed to update password.",
        },
      }));
    } finally {
      setUpdating((prev) => ({ ...prev, password: false }));
    }
  };

  const uploadMedia = async (endpoint, file, key) => {
    if (!file) {
      setStatus((prev) => ({
        ...prev,
        [key]: { type: "error", message: "Please select a file first." },
      }));
      return;
    }
    setUpdating((prev) => ({ ...prev, [key]: true }));
    const formData = new FormData();
    formData.append(key === "avatar" ? "avatar" : "coverImage", file);
    try {
      const response = await axiosInstance.patch(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updatedUser = response.data?.data;
      if (updatedUser) {
        setAvatar(updatedUser.avatar);
        setCoverImage(updatedUser.coverImage);
        syncUserState(updatedUser);
      } else {
        await fetchCurrentUser();
      }
      setStatus((prev) => ({
        ...prev,
        [key]: { type: "success", message: "Updated successfully." },
      }));
    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        [key]: {
          type: "error",
          message: error.response?.data?.message || "Update failed.",
        },
      }));
    } finally {
      setUpdating((prev) => ({ ...prev, [key]: false }));
      if (key === "avatar") setAvatarFile(null);
      if (key === "cover") setCoverFile(null);
    }
  };

  const avatarPreview = useMemo(
    () => (avatarFile ? URL.createObjectURL(avatarFile) : avatar),
    [avatarFile, avatar]
  );

  const coverPreview = useMemo(
    () => (coverFile ? URL.createObjectURL(coverFile) : coverImage),
    [coverFile, coverImage]
  );

  if (loading && !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="text-red-600 text-2xl font-bold"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="text-gray-700 text-lg">You are not logged in.</p>
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-grow">
        <div
          className={`bg-white shadow-md min-h-screen ${
            isSidebarOpen ? "w-60" : "w-20"
          } transition-all duration-300`}
        >
          <div className="flex flex-col items-center py-4">
            <div className="flex items-center mb-6">
              <img src={logo} alt="Logo" className="h-12 mr-2" />
              {isSidebarOpen && (
                <h1 className="text-2xl font-bold text-red-600">Video Wall</h1>
              )}
            </div>
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
            <Sidebar isOpen={isSidebarOpen} />
          </div>
        </div>

        <div className="flex-grow p-6 space-y-6 max-w-5xl mx-auto">
          <Section title="Account overview">
            <div className="flex flex-wrap items-center gap-6">
              <motion.img
                src={avatarPreview || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="w-32 h-32 rounded-full border-4 border-red-600 object-cover"
                whileHover={{ scale: 1.05 }}
              />
              <div>
                <p className="text-lg text-gray-700">
                  <strong>Name:</strong> {fullName || username}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Email:</strong> {email}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Username:</strong> {username}
                </p>
              </div>
              <button
                onClick={() => logout().then(() => navigate("/"))}
                className="ml-auto flex items-center bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          </Section>

          <Section title="Profile details">
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full name
                </label>
                <input
                  type="text"
                  value={profileForm.fullName}
                  onChange={(event) =>
                    setProfileForm((prev) => ({
                      ...prev,
                      fullName: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring focus:ring-red-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(event) =>
                    setProfileForm((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-2xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring focus:ring-red-200"
                />
              </div>
              {status.profile && (
                <p
                  className={`text-sm ${
                    status.profile.type === "error"
                      ? "text-red-500"
                      : "text-emerald-500"
                  }`}
                >
                  {status.profile.message}
                </p>
              )}
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-all"
                disabled={updating.profile}
              >
                {updating.profile ? "Saving..." : "Save changes"}
              </button>
            </form>
          </Section>

          <Section title="Password">
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <input
                type="password"
                placeholder="Current password"
                value={passwordForm.oldPassword}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    oldPassword: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-gray-200 px-4 py-2"
              />
              <input
                type="password"
                placeholder="New password"
                value={passwordForm.newPassword}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    newPassword: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-gray-200 px-4 py-2"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={passwordForm.confirmPassword}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    confirmPassword: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-gray-200 px-4 py-2"
              />
              {status.password && (
                <p
                  className={`text-sm ${
                    status.password.type === "error"
                      ? "text-red-500"
                      : "text-emerald-500"
                  }`}
                >
                  {status.password.message}
                </p>
              )}
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all"
                disabled={updating.password}
              >
                {updating.password ? "Updating..." : "Update password"}
              </button>
            </form>
          </Section>

          <Section title="Media">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Avatar
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={avatarPreview || "https://via.placeholder.com/120"}
                    alt="avatar preview"
                    className="w-24 h-24 rounded-full object-cover border"
                  />
                  <label className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <FaUpload />
                    Choose file
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) =>
                        setAvatarFile(event.target.files?.[0] || null)
                      }
                    />
                  </label>
                </div>
                <button
                  onClick={() => uploadMedia("/users/avatar", avatarFile, "avatar")}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition-all"
                  disabled={updating.avatar}
                >
                  {updating.avatar ? "Updating..." : "Update avatar"}
                </button>
                {status.avatar && (
                  <p
                    className={`mt-2 text-sm ${
                      status.avatar.type === "error"
                        ? "text-red-500"
                        : "text-emerald-500"
                    }`}
                  >
                    {status.avatar.message}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Cover image
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      coverPreview ||
                      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80"
                    }
                    alt="cover preview"
                    className="h-24 w-40 rounded-2xl object-cover border"
                  />
                  <label className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <FaUpload />
                    Choose file
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) =>
                        setCoverFile(event.target.files?.[0] || null)
                      }
                    />
                  </label>
                </div>
                <button
                  onClick={() =>
                    uploadMedia("/users/cover-image", coverFile, "cover")
                  }
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition-all"
                  disabled={updating.cover}
                >
                  {updating.cover ? "Updating..." : "Update cover"}
                </button>
                {status.cover && (
                  <p
                    className={`mt-2 text-sm ${
                      status.cover.type === "error"
                        ? "text-red-500"
                        : "text-emerald-500"
                    }`}
                  >
                    {status.cover.message}
                  </p>
                )}
              </div>
            </div>
          </Section>

          <Section title="Watch history">
            {watchHistory.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Start watching videos to build your history.
              </p>
            ) : (
              <ul className="space-y-3 max-h-64 overflow-y-auto">
                {watchHistory.map((item) => (
                  <li
                    key={item._id ?? item.id}
                    className="rounded-2xl border border-gray-200 p-3"
                  >
                    <p className="font-semibold text-gray-800">
                      {item.title ?? "Untitled video"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.owner?.fullName ?? "Unknown creator"} •{" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </div>
      </div>

      <footer className="bg-gray-900 text-white text-center py-6 mt-4">
        <p>© {new Date().getFullYear()} Video Wall. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default User;