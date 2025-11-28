import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import axiosInstance from "../../../utils/AxiosInstance";
import { Context } from "../../../context/contextApi";

const Signup = () => {
  const { loading, setLoading } = useContext(Context);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const nextErrors = {};
    if (!formValues.username || /\s/.test(formValues.username)) {
      nextErrors.username = "Username must not contain spaces.";
    }
    if (!formValues.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }
    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      nextErrors.email = "Email is not valid.";
    }
    if (!formValues.password || formValues.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }
    if (!avatarFile) {
      nextErrors.avatar = "Avatar is required.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    if (!validateForm()) return;
    setLoading(true);
    const payload = new FormData();
    payload.append("username", formValues.username.trim());
    payload.append("fullName", formValues.fullName.trim());
    payload.append("email", formValues.email.trim());
    payload.append("password", formValues.password);
    payload.append("avatar", avatarFile);
    if (coverFile) {
      payload.append("coverImage", coverFile);
    }

    try {
      await axiosInstance.post("/users/register", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage("Account created! You can now log in.");
      setErrors({});
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setErrors({
        api:
          error.response?.data?.message ||
          "Failed to register. Please try again.",
      });
    } finally {
      setLoading(false);
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
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Avatar
                </label>
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
                {errors.avatar && (
                  <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
                )}
              </div>
              <div className="flex flex-col items-center">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Cover Image
                </label>
                <div className="w-24 h-24 relative">
                  {coverPreview ? (
                    <img
                      src={coverPreview}
                      alt="Cover Preview"
                      className="w-full h-full object-cover rounded-full border border-gray-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full border border-gray-300">
                      <span className="text-gray-500">Optional</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
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
                name="fullName"
                value={formValues.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
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
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
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
            {successMessage && (
              <p className="text-emerald-500 text-sm text-center mb-2">
                {successMessage}
              </p>
            )}
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