import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger and close icons
import logo from "../assets/logo.png";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import CustomToast from "./CustomToast";

const Navbar = () => {
  const location = useLocation();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

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

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-20 py-4 flex justify-between items-center transition-colors duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-[#FDE663]"
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
          <Link
            to="/chatbot"
            className={`${
              location.pathname === "/chatbot"
                ? "font-bold text-black"
                : "font-normal text-gray-600"
            } text-[14px] sm:text-[15px] md:text-[17px] leading-[27px] transition`}
          >
            Our AI
          </Link>
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
            className="fixed top-0 right-0 w-3/4 h-full bg-gradient-to-b from-[#FDE663] to-[#FFD700] z-50 shadow-2xl rounded-l-3xl flex flex-col items-center py-8"
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
            <Link
              to="/chatbot"
              className="text-[16px] font-medium text-gray-800 mb-6 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Our AI
            </Link>
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
    </>
  );
};

export default Navbar;
