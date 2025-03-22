import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dog1image from "../assets/dog1image.png";

const Home = () => {
  const [currentText, setCurrentText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const lines = [
    "Your Trusted Pet Health Companion",
    "Caring for Your Furry Friends",
    "Expert Advice for Pet Wellness",
  ];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const delayBetweenLines = 1500;

    const handleTyping = () => {
      const currentLine = lines[lineIndex];

      if (!isDeleting) {
        setCurrentText((prev) => currentLine.slice(0, prev.length + 1));
        if (currentText === currentLine) {
          setTimeout(() => setIsDeleting(true), delayBetweenLines);
        }
      } else {
        setCurrentText((prev) => currentLine.slice(0, prev.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setLineIndex((prev) => (prev + 1) % lines.length);
        }
      }
    };

    const typingInterval = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingInterval);
  }, [currentText, isDeleting, lineIndex, lines]);

  useEffect(() => {
    const cursorBlinkInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorBlinkInterval);
  }, []);

  return (
    <>
      <div className="w-full h-[675px] bg-[#FDE663] flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-12 py-8">
        <motion.div
          className="text-gray-800 font-bold text-3xl md:text-5xl tracking-wide flex-1 text-center md:text-left mb-6 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {currentText}
          <span
            className={`${
              cursorVisible ? "opacity-100" : "opacity-0"
            } inline-block w-1 h-10 bg-blue-600 ml-1`}
          ></span>
        </motion.div>
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <img
            src={dog1image}
            alt="Dog"
            className="w-48 h-48 md:w-[50%] md:h-auto object-contain"
          />
        </motion.div>
      </div>
      <motion.div
        className="bg-white w-full h-[100px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      ></motion.div>
    </>
  );
};

export default Home;
