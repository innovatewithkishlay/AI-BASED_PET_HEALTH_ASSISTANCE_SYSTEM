import React, { useState } from "react";
import { motion } from "framer-motion";
import { signUp } from "../utils/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import CustomToast from "./CustomToast";
import PropTypes from "prop-types";

const SignUpModal = ({ onClose, onSwitchToLogin, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: "",
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
      const response = await signUp(formData);

      // Check if the response contains the token
      if (response.token) {
        console.log("Sign-Up Successful in Frontend:", response);

        localStorage.setItem("authToken", response.token);

        if (typeof setIsLoggedIn === "function") {
          setIsLoggedIn(true); // Ensure setIsLoggedIn is a function before calling it
        } else {
          console.error("setIsLoggedIn is not a function");
        }

        toast(<CustomToast type="success" message="Sign-Up Successful!" />);

        onClose();
      } else {
        // Handle unexpected response structure
        throw new Error(
          response.message || "Sign-Up Failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Sign-Up Error in Frontend:", error);

      const errorMessage =
        error.message || // Use error message from the thrown error
        "Sign-Up Failed. Please try again.";
      toast(<CustomToast type="error" message={errorMessage} />);
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
        className="bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 rounded-lg shadow-2xl p-8 w-[90%] max-w-md relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
          Join the <span className="text-yellow-300">PetCare</span> Family!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white text-gray-800"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white text-gray-800"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white text-gray-800"
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
              className={`relative px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg overflow-hidden group transition-all duration-300 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500"></span>
              <span className="absolute inset-0 w-full h-[2px] bg-white opacity-50 animate-line-move"></span>
              <span className="relative z-10">
                {loading ? "Signing Up..." : "Sign Up"}
              </span>
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-white">
            Already have an account?{" "}
            <button
              onClick={() => {
                onClose();
                onSwitchToLogin();
              }}
              className="text-yellow-300 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-green-500 rounded-full animate-pulse"></div>
      </motion.div>
    </div>
  );
};

SignUpModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSwitchToLogin: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default SignUpModal;
