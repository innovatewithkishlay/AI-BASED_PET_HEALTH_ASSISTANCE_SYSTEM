import React, { useState } from "react";
import { motion } from "framer-motion";
import { login } from "../utils/api";
import { toast } from "react-toastify";
import CustomToast from "./CustomToast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginModal = ({ onClose, onSwitchToSignUp, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(formData);
      if (response && response.data.token) {
        localStorage.setItem("authToken", response.data.token);

        setIsLoggedIn(true);

        toast(<CustomToast type="success" message="Login Successful!" />);
        onClose();
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      toast(
        <CustomToast type="error" message="Login Failed. Please try again." />
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <motion.div
        className="bg-[#FDE663] rounded-lg shadow-lg p-8 w-[90%] max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your password"
              required
            />
            <div
              className="absolute top-9 right-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => {
                onClose();
                onSwitchToSignUp();
              }}
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginModal;
