import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../context/contextApi";
import axiosInstance from "../../../utils/AxiosInstance";
import { FadeLoader } from "react-spinners";

const Login = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    setLoading,
  } = useContext(Context);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = "Username is required.";
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post("/users/login", {
        username,
        password,
      });
      console.log("Login successful:", res.data);

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setErrors({ api: "Invalid username or password. Please try again." });
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
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
          <p className="text-center text-gray-600 mb-6">
            Log in to your account to continue sharing and exploring videos!
          </p>
          <form onSubmit={handleLogin}>
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
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            {errors.api && (
              <p className="text-red-500 text-sm text-center mb-4">{errors.api}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 mb-4 text-lg font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-500"
            >
              Login
            </button>
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
