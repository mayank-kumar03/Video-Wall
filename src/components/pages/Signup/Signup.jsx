import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../context/contextApi";
import axiosInstance from "../../../utils/AxiosInstance";
import { FadeLoader } from "react-spinners";

const Signup = () => {
  const {
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
    loading,
    setLoading,
  } = useContext(Context);

  const [avatarPreview, setAvatarPreview] = useState("");
  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username || /\s/.test(username)) {
      newErrors.username = "Username must not contain spaces.";
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is not valid.";
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!fullName) {
      newErrors.fullName = "Full name is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!validateForm()) {
      setLoading(false);
      return;
    }
  
    if (!avatar) {
      setErrors({ avatar: "Avatar is required." });
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("fullName", fullName);
    formData.append("avatar", avatar);
    if (profilePicture) {
      formData.append("coverImage", profilePicture);
    }
  
    try {
      const res = await axiosInstance.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = res.data;
      console.log("User registered:", data);
  
      setAvatar(data.data.avatar);
      if (data.data.coverImage) setProfilePicture(data.data.coverImage);
  
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      setErrors({
        api: err.response?.data?.message || "Failed to register. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file); // Set the avatar file
      setAvatarPreview(URL.createObjectURL(file)); // Preview the avatar
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file); // Set the profile picture file
      setProfilePicturePreview(URL.createObjectURL(file)); // Preview the profile picture
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <FadeLoader color="#ffffff" loading={loading} />
        </div>
      ) : (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
          <p className="text-center text-gray-600 mb-6">
            Join our platform to upload and share your videos with the world!
          </p>
          <form onSubmit={handleSignup}>
            <div className="mb-6 flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="flex flex-col items-center">
                <label className="block mb-2 text-sm font-medium text-gray-700">Avatar</label>
                <div className="w-24 h-24 relative">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover rounded-full border border-gray-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full border border-gray-300">
                      <span className="text-gray-500">No Avatar</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <label className="block mb-2 text-sm font-medium text-gray-700">Profile Picture</label>
                <div className="w-24 h-24 relative">
                  {profilePicturePreview ? (
                    <img
                      src={profilePicturePreview}
                      alt="Profile Picture Preview"
                      className="w-full h-full object-cover rounded-full border border-gray-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full border border-gray-300">
                      <span className="text-gray-500">No Picture</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 ${
                  errors.username ? "border-red-500" : ""
                }`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 mb-4 text-lg font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
            >
              Sign Up
            </button>
            {errors.api && (
              <p className="text-red-500 text-sm text-center">{errors.api}</p>
            )}
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;