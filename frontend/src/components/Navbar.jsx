import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import CustomToast from "./CustomToast";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken")
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    toast(
      <CustomToast
        type="success"
        message="You have been logged out successfully!"
      />
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChatbotAccess = () => {
    if (!isLoggedIn) {
      toast(
        <CustomToast
          type="error"
          message="You need to sign up or log in to access the AI chatbot!"
        />
      );
      setIsSignUpOpen(true); // Open the signup modal
    } else {
      navigate("/chatbot"); // Redirect to the chatbot page
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-20 py-4 flex justify-between items-center transition-colors duration-300 ${
          isScrolled ? "bg-white" : "bg-[#FDE663]"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
        </div>

        {/* "What is Pet Care" Option */}
        <div className="flex gap-6">
          <Link
            to="/"
            className={`${
              location.pathname === "/"
                ? "font-bold text-gray-800"
                : "font-normal text-gray-600"
            } text-[14px] sm:text-[15px] md:text-[17px] leading-[27px] transition`}
          >
            What is{" "}
            <span
              className={`${
                location.pathname === "/"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500"
                  : "text-gray-600"
              }`}
            >
              Pet Care
            </span>
          </Link>
        </div>

        {/* Options for Larger Screens */}
        <div className="hidden sm:flex gap-6">
          <button
            onClick={handleChatbotAccess}
            className={`${
              location.pathname === "/chatbot"
                ? "font-bold text-black"
                : "font-normal text-gray-600"
            } text-[14px] sm:text-[15px] md:text-[17px] leading-[27px] transition`}
          >
            Our AI
          </button>
          <button
            onClick={() => setIsAboutUsOpen(true)}
            className="text-[14px] sm:text-[15px] md:text-[17px] leading-[27px] font-normal text-gray-600 transition"
          >
            About Us
          </button>
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setIsSignUpOpen(true)}
                className="text-[14px] sm:text-[15px] md:text-[17px] leading-[27px] font-normal text-gray-600 transition"
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="text-[14px] sm:text-[15px] md:text-[17px] leading-[27px] font-normal text-gray-600 transition"
              >
                Login
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-[14px] sm:text-[15px] md:text-[17px] leading-[27px] font-normal text-gray-600 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden flex items-center">
          {isMenuOpen ? (
            <FaTimes
              className="text-gray-800 text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          ) : (
            <FaBars
              className="text-gray-800 text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
          )}
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Blur Background */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)} // Close menu when clicking outside
          ></motion.div>

          {/* Dropdown Menu */}
          <motion.div
            className="fixed top-0 right-0 w-3/4 h-full bg-gradient-to-b from-[#FDE663] to-[#FFD700] z-50 rounded-l-3xl flex flex-col items-center py-8"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <FaTimes
              className="text-gray-800 text-3xl cursor-pointer self-end mr-6 mb-4 hover:text-red-500 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Items */}
            <button
              onClick={() => {
                handleChatbotAccess();
                setIsMenuOpen(false);
              }}
              className="text-[16px] font-medium text-gray-800 mb-6 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-300"
            >
              Our AI
            </button>
            <button
              onClick={() => {
                setIsAboutUsOpen(true);
                setIsMenuOpen(false);
              }}
              className="text-[16px] font-medium text-gray-800 mb-6 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-300"
            >
              About Us
            </button>
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    setIsSignUpOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="text-[16px] font-medium text-gray-800 mb-6 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-300"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="text-[16px] font-medium text-gray-800 mb-6 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-300"
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-[16px] font-medium text-gray-800 mb-6 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-300"
              >
                Logout
              </button>
            )}
          </motion.div>
        </>
      )}

      {/* Sign-Up Modal */}
      {isSignUpOpen && (
        <SignUpModal
          onClose={() => setIsSignUpOpen(false)}
          onSwitchToLogin={() => {
            setIsSignUpOpen(false);
            setIsLoginOpen(true);
          }}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onSwitchToSignUp={() => {
            setIsLoginOpen(false);
            setIsSignUpOpen(true);
          }}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}

      {/* About Us Modal */}
      {isAboutUsOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAboutUsOpen(false)}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-4xl relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
              onClick={() => setIsAboutUsOpen(false)}
            >
              ✖
            </button>

            {/* Title */}
            <motion.h2
              className="text-3xl font-bold text-center mb-6 text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Meet Our Team
            </motion.h2>

            {/* Team Members */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Kishlay - Team Leader */}
              <motion.div
                className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-green-500 rounded-lg p-4 shadow-lg flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-blue-500 text-xl font-bold">
                  K
                </div>
                <h3 className="text-xl font-bold mt-3 text-white">Kishlay</h3>
                <p className="text-sm text-white text-center">
                  Team Leader & Full Stack Developer
                </p>
                <p className="text-sm text-white text-center mt-1">
                  Reg. No: <span className="font-semibold">12314194</span>
                </p>
              </motion.div>

              {/* Saurabh */}
              <motion.div
                className="flex flex-col items-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 shadow-lg flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-purple-500 text-xl font-bold">
                  S
                </div>
                <h3 className="text-xl font-bold mt-3 text-white">Saurabh</h3>
                <p className="text-sm text-white text-center">
                  Full Stack Developer
                </p>
                <p className="text-sm text-white text-center mt-1">
                  Reg. No: <span className="font-semibold">12315536</span>
                </p>
              </motion.div>

              {/* Koushik */}
              <motion.div
                className="flex flex-col items-center bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-4 shadow-lg flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-yellow-500 text-xl font-bold">
                  K
                </div>
                <h3 className="text-xl font-bold mt-3 text-white">Koushik</h3>
                <p className="text-sm text-white text-center">
                  Full Stack Developer
                </p>
                <p className="text-sm text-white text-center mt-1">
                  Reg. No: <span className="font-semibold">12314158</span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
