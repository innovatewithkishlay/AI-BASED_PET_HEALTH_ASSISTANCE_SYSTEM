import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import SignUpModal from "./SignUpModal";

const Navbar = () => {
  const location = useLocation();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 bg-[#FDE663] px-6 md:px-20 py-4 flex justify-between items-center"
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
          <button
            onClick={() => setIsSignUpOpen(true)} // Open the modal
            className={`${
              location.pathname === "/signup"
                ? "font-bold text-black"
                : "font-normal text-gray-600"
            } text-[14px] sm:text-[15px] md:text-[17px] leading-[27px] transition`}
          >
            Sign Up
          </button>
        </div>
      </motion.nav>

      {/* Sign-Up Modal */}
      {isSignUpOpen && (
        <SignUpModal onClose={() => setIsSignUpOpen(false)} /> // Pass a function to close the modal
      )}
    </>
  );
};

export default Navbar;
