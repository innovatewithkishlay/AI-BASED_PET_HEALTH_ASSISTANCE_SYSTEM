import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-white" : "bg-[#FDE663]"
      } px-6 md:px-20 py-4 flex justify-between items-center`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
      </div>

      {/* Navbar Options */}
      <div className="flex gap-[40px] md:gap-[60px]">
        <Link
          to="/"
          className={`${
            location.pathname === "/"
              ? "font-[SFUIText] font-bold text-black"
              : "font-[SFUIText] font-normal text-[rgb(121,121,121)]"
          } text-[14px] sm:text-[15px] md:text-[17px] leading-[27px] transition`}
        >
          What is PetCare
        </Link>
        <Link
          to="/chatbot"
          className={`${
            location.pathname === "/our-ai"
              ? "font-[SFUIText] font-bold text-black"
              : "font-[SFUIText] font-normal text-[rgb(121,121,121)]"
          } text-[14px] sm:text-[15px] md:text-[17px] leading-[27px] transition`}
        >
          Our AI
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
