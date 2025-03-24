import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
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

        {/* Navbar Options */}
        <div className="flex gap-6">
          <Link
            to="/"
            className={`${
              location.pathname === "/"
                ? "font-bold text-black"
                : "font-normal text-gray-600"
            } text-[14px] sm:text-[15px] md:text-[17px] leading-[27px] transition`}
          >
            What is PetCare
          </Link>
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

          {/* Conditionally Render Buttons */}
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
      </motion.nav>

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
