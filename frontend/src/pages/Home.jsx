import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import dog1image from "../assets/dog1image.png";
import message1 from "../assets/message1.webp";
import message2 from "../assets/message2.webp";
import message3 from "../assets/message3.webp";
import "../styles/scrollbar.css";

const Home = () => {
  const [currentText, setCurrentText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [positions, setPositions] = useState([message1, message2, message3]);

  const lines = [
    "Your Trusted Pet Health Companion",
    "Caring for Your Furry Friends",
    "Expert Advice for Pet Wellness",
    "Our AI will help you solve your queries",
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

  useEffect(() => {
    const swapInterval = setInterval(() => {
      setPositions((prev) => [prev[1], prev[2], prev[0]]);
    }, 4000);
    return () => clearInterval(swapInterval);
  }, []);

  return (
    <div className="min-h-screen overflow-y-scroll custom-scrollbar">
      {/* First Section */}
      <div className="w-full h-[740px] bg-[#FDE663] flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-12 py-8">
        <motion.div
          className="text-gray-800 font-bold text-3xl md:text-5xl tracking-wide flex-1 text-center md:text-left mb-2 sm:mb-4 md:mb-0 mt-20 sm:mt-24 md:mt-0"
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
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-[50%] md:h-auto object-contain mt-2 sm:mt-4"
          />
        </motion.div>
      </div>

      {/* Second Section: About the Application */}
      <motion.div
        className="w-full bg-gray-100 py-24 px-8 md:px-16 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-5xl font-extrabold text-gray-800 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          How Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
            Pet Care
          </span>{" "}
          System Works
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 mb-12 max-w-3xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Our system is designed to provide you with valuable insights and
          guidance to ensure your pet's health and happiness.
        </motion.p>
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div
            className="flex-1 bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Personalized Care
            </h3>
            <p className="text-lg text-gray-600">
              Get tailored advice and recommendations to keep your pets healthy
              and active, based on their unique needs.
            </p>
          </motion.div>
          <motion.div
            className="flex-1 bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Health Monitoring
            </h3>
            <p className="text-lg text-gray-600">
              Stay informed about your pet's well-being with regular updates and
              actionable insights.
            </p>
          </motion.div>
          <motion.div
            className="flex-1 bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Expert Guidance
            </h3>
            <p className="text-lg text-gray-600">
              Access reliable information and tips to address common health
              concerns and improve your pet's quality of life.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Third Section: Images */}
      <div className="w-full h-[780px] bg-white py-16 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 flex justify-center items-center relative">
          <div className="bg-gray-200 rounded-lg shadow-lg w-[90%] md:w-[50%] h-[600px] flex items-center justify-center relative">
            <motion.img
              src={positions[0]}
              alt="Message 1"
              className="absolute w-70 h-70 sm:w-78 sm:h-78 object-contain"
              initial={{ x: 0, y: -150, opacity: 0 }}
              animate={{ x: 0, y: -120, opacity: 1 }}
              exit={{ x: 0, y: -150, opacity: 0 }}
              transition={{ duration: 1 }}
              key={positions[0]}
            />
            <motion.img
              src={positions[1]}
              alt="Message 2"
              className="absolute w-70 h-70 sm:w-78 sm:h-78 object-contain"
              initial={{ x: -120, y: 100, opacity: 0 }}
              animate={{ x: -100, y: 80, opacity: 1 }}
              exit={{ x: -120, y: 100, opacity: 0 }}
              transition={{ duration: 1 }}
              key={positions[1]}
            />
            <motion.img
              src={positions[2]}
              alt="Message 3"
              className="absolute w-70 h-70 sm:w-78 sm:h-78 object-contain"
              initial={{ x: 120, y: 100, opacity: 0 }}
              animate={{ x: 100, y: 80, opacity: 1 }}
              exit={{ x: 120, y: 100, opacity: 0 }}
              transition={{ duration: 1 }}
              key={positions[2]}
            />
          </div>
        </div>

        <motion.div
          className="flex-1 text-center md:text-left mt-8 md:mt-0"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Have Questions?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Get answers to your queries with our AI-powered chatbot.
          </p>
          <Link
            to="/chatbot"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Chat with Our AI
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
