import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { Context } from "../../../context/contextApi";
import axiosInstance from "../../../utils/AxiosInstance";

const Login = () => {
  const { loading, setLoading, syncUserState, fetchWatchHistory } =
    useContext(Context);

  const [identifier, setIdentifier] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const nextErrors = {};
    if (!identifier.trim()) {
      nextErrors.identifier = "Username or email is required.";
    }
    if (!passwordValue.trim()) {
      nextErrors.password = "Password is required.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});
    try {
      const payload = {
        password: passwordValue.trim(),
      };
      if (identifier.includes("@")) {
        payload.email = identifier.trim();
      } else {
        payload.username = identifier.trim();
      }

      const response = await axiosInstance.post("/users/login", payload);
      const data = response.data?.data || {};
      syncUserState(data.user || data);
      await fetchWatchHistory();
      setPasswordValue("");
      navigate("/user");
    } catch (error) {
      setErrors({
        api:
          error.response?.data?.message ||
          "Invalid credentials. Please try again.",
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
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Log in to your account to continue sharing and exploring videos!
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Username or Email
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                className={`w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 ${
                  errors.identifier ? "border-red-500" : ""
                }`}
                placeholder="Enter your username or email"
              />
              {errors.identifier && (
                <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={passwordValue}
                onChange={(event) => setPasswordValue(event.target.value)}
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
              <p className="text-red-500 text-sm text-center mb-4">
                {errors.api}
              </p>
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
