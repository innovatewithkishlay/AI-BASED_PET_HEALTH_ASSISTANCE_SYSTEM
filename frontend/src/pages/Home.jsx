import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SignUpModal from "../components/SignUpModal";
import LoginModal from "../components/LoginModal";
import CustomToast from "../components/CustomToast";
import dog1image from "../assets/dog1image.png";
import message1 from "../assets/message1.webp";
import message2 from "../assets/message2.webp";
import message3 from "../assets/message3.webp";
import humanImage from "../assets/human.webp";
import person1 from "../assets/person1.avif";
import person2 from "../assets/person2.jpg";
import person3 from "../assets/person3.jpg";
import "../styles/scrollbar.css";
import ContactUsPopup from "../components/ContactUsPopup";
import FAQPopup from "../components/FAQPopup";
import ComingSoonPopup from "../components/ComingSoonPopup";

const Home = () => {
  const [positions, setPositions] = useState([message1, message2, message3]);
  const [showPopup, setShowPopup] = useState(false);

  // Typewriter Effect State
  const [typewriterText, setTypewriterText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const typewriterPhrases = [
    "Your Trusted Pet Health Companion",
    "Caring for Your Pets, Anytime",
    "Expert Guidance for Pet Wellness",
  ];

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("authToken") // Check if the user is logged in
  );

  // Add these states at the top of your component
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Function to handle "Coming Soon" popup
  const handleComingSoon = () => {
    setShowComingSoon(true);
    setTimeout(() => {
      setShowComingSoon(false);
    }, 3000); // Hide after 3 seconds
  };

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase =
        typewriterPhrases[loopIndex % typewriterPhrases.length];
      if (!isDeleting) {
        setTypewriterText((prev) =>
          currentPhrase.substring(0, prev.length + 1)
        );
        if (typewriterText === currentPhrase) {
          setIsDeleting(true);
          setTypingSpeed(100);
        }
      } else {
        setTypewriterText((prev) =>
          currentPhrase.substring(0, prev.length - 1)
        );
        if (typewriterText === "") {
          setIsDeleting(false);
          setLoopIndex((prev) => prev + 1);
          setTypingSpeed(150);
        }
      }
    };

    const typingInterval = setInterval(handleTyping, typingSpeed);
    return () => clearInterval(typingInterval);
  }, [typewriterText, isDeleting, loopIndex, typingSpeed]);

  const handleButtonClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  useEffect(() => {
    const swapInterval = setInterval(() => {
      setPositions((prev) => [prev[1], prev[2], prev[0]]);
    }, 4000);
    return () => clearInterval(swapInterval);
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
    <div className="min-h-screen overflow-x-hidden overflow-y-scroll custom-scrollbar">
      {/* First Section */}
      <motion.div
        className="w-full h-[740px] bg-[#FDE663] flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-12 py-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }} // Ensures animation triggers every time it comes into view
      >
        {/* Dynamically Typed Text */}
        <motion.div
          className="text-gray-800 font-bold text-3xl md:text-5xl tracking-wide flex-1 text-center md:text-left mt-20 sm:mt-2 md:mt-0 mb-4 sm:mb-6 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <span>{typewriterText}</span>
          <span
            className="blinking-cursor"
            style={{
              display: "inline-block",
              width: "2px",
              height: "1.2em",
              background:
                "linear-gradient(to right, #00FF00, #00BFFF, #32CD32)", // Gradient color
              animation: "blink 1s step-end infinite",
            }}
          ></span>
        </motion.div>

        {/* Dog Image */}
        <motion.div
          className="flex-1 flex justify-center mt-4 sm:mt-6 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: false }}
        >
          <img
            src={dog1image}
            alt="Dog"
            className="w-58 h-66 sm:w-82 sm:h-72 md:w-[50%] md:h-auto object-contain"
          />
        </motion.div>
      </motion.div>

      {/* Second Section: About the Application */}
      <motion.div
        className="w-full bg-gray-100 py-24 px-8 md:px-16 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      >
        <motion.h2
          className="text-5xl font-extrabold text-gray-800 mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: false }}
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: false }}
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
            viewport={{ once: false }}
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
            viewport={{ once: false }}
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
            viewport={{ once: false }}
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

      {/* Third Section: Have Questions */}
      <motion.div
        className="w-full bg-gray-50 py-8 sm:py-16 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      >
        <div className="flex-1 flex justify-center items-center relative hidden sm:flex">
          <div className="bg-gray-200 rounded-lg shadow-lg w-[90%] md:w-[50%] h-[400px] sm:h-[500px] flex items-center justify-center relative">
            <motion.img
              src={positions[0]}
              alt="Message 1"
              className="absolute w-70 h-70 sm:w-78 sm:h-78 object-contain"
              initial={{ x: 0, y: -150, opacity: 0 }}
              whileInView={{ x: 0, y: -120, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: false }}
              key={positions[0]}
            />
            <motion.img
              src={positions[1]}
              alt="Message 2"
              className="absolute w-70 h-70 sm:w-78 sm:h-78 object-contain"
              initial={{ x: -120, y: 100, opacity: 0 }}
              whileInView={{ x: -100, y: 80, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: false }}
              key={positions[1]}
            />
            <motion.img
              src={positions[2]}
              alt="Message 3"
              className="absolute w-70 h-70 sm:w-78 sm:h-78 object-contain"
              initial={{ x: 120, y: 100, opacity: 0 }}
              whileInView={{ x: 100, y: 80, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: false }}
              key={positions[2]}
            />
          </div>
        </div>

        <motion.div
          id="questions-section"
          className="flex-1 text-center md:text-left mt-4 sm:mt-0 flex flex-col justify-center"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          <motion.h2
            className="text-4xl font-extrabold text-gray-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
          >
            Have Questions?
          </motion.h2>
          <motion.p
            className="text-xl font-medium text-gray-600 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: false }}
          >
            Get answers to your queries with our AI-powered chatbot.
          </motion.p>
          <button
            onClick={handleChatbotAccess}
            className="relative px-3 py-3 text-white text-lg font-bold rounded-xl shadow-lg overflow-hidden group transition-all duration-300 max-w-xs"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500"></span>
            <span className="absolute inset-0 w-full h-[2px] bg-white opacity-50 animate-line-move"></span>
            <span className="relative z-10">Chat with Our AI</span>
          </button>
        </motion.div>
      </motion.div>

      {/* video section */}
      <motion.div
        className="w-full bg-gray-100 py-16 px-6 md:px-12 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Learn About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
            Pet Care
          </span>
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-3xl mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Explore these videos to learn how to take better care of your pets and
          ensure their health and happiness.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Video 1 */}
          <motion.div
            className="relative group overflow-hidden rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              className="w-full h-64 md:h-80"
              src="https://www.youtube.com/embed/Zb3Wzs2FcFE?autoplay=1&mute=1&loop=1&playlist=Zb3Wzs2FcFE&controls=0&modestbranding=1&iv_load_policy=3&showinfo=0"
              title="Pet Care Video 1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <motion.div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 backdrop-blur-md transition-all duration-300"></motion.div>
            <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href="https://www.youtube.com/watch?v=Zb3Wzs2FcFE"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-6 py-3 text-white text-lg font-bold rounded-xl shadow-lg overflow-hidden group transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500"></span>
                <span className="absolute inset-0 w-full h-[2px] bg-white opacity-50 animate-line-move"></span>
                <span className="relative z-10">Watch Video</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Video 2 */}
          <motion.div
            className="relative group overflow-hidden rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              className="w-full h-64 md:h-80"
              src="https://www.youtube.com/embed/Sw4_THvzQgM?autoplay=1&mute=1&loop=1&playlist=Sw4_THvzQgM&controls=0&modestbranding=1&iv_load_policy=3&showinfo=0"
              title="Pet Care Video 2"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <motion.div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 backdrop-blur-md transition-all duration-300"></motion.div>
            <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href="https://www.youtube.com/watch?v=Sw4_THvzQgM"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-6 py-3 text-white text-lg font-bold rounded-xl shadow-lg overflow-hidden group transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500"></span>
                <span className="absolute inset-0 w-full h-[2px] bg-white opacity-50 animate-line-move"></span>
                <span className="relative z-10">Watch Video</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Video 3 */}
          <motion.div
            className="relative group overflow-hidden rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              className="w-full h-64 md:h-80"
              src="https://www.youtube.com/embed/Yzv0gXqoCkc?autoplay=1&mute=1&loop=1&playlist=Yzv0gXqoCkc&controls=0&modestbranding=1&iv_load_policy=3&showinfo=0"
              title="Pet Care Video 3"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <motion.div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 backdrop-blur-md transition-all duration-300"></motion.div>
            <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href="https://www.youtube.com/watch?v=Yzv0gXqoCkc"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-6 py-3 text-white text-lg font-bold rounded-xl shadow-lg overflow-hidden group transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500"></span>
                <span className="absolute inset-0 w-full h-[2px] bg-white opacity-50 animate-line-move"></span>
                <span className="relative z-10">Watch Video</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Playlist 1 */}
          <motion.div
            className="relative group overflow-hidden rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              className="w-full h-64 md:h-80"
              src="https://www.youtube.com/embed/videoseries?list=PLvz_RKESSRFYKYGVntz-384d-Nb6erQd2&autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&iv_load_policy=3&showinfo=0"
              title="Pet Care Playlist 1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <motion.div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 backdrop-blur-md transition-all duration-300"></motion.div>
            <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href="https://www.youtube.com/playlist?list=PLvz_RKESSRFYKYGVntz-384d-Nb6erQd2"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-6 py-3 text-white text-lg font-bold rounded-xl shadow-lg overflow-hidden group transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500"></span>
                <span className="absolute inset-0 w-full h-[2px] bg-white opacity-50 animate-line-move"></span>
                <span className="relative z-10">Watch Playlist</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Playlist 2 */}
          <motion.div
            className="relative group overflow-hidden rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              className="w-full h-64 md:h-80"
              src="https://www.youtube.com/embed/videoseries?list=PLP64ATikd4GqAkIVxmzvKKOxs_qroC6JY&autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&iv_load_policy=3&showinfo=0"
              title="Pet Care Playlist 2"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <motion.div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 backdrop-blur-md transition-all duration-300"></motion.div>
            <motion.div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href="https://www.youtube.com/playlist?list=PLP64ATikd4GqAkIVxmzvKKOxs_qroC6JY"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-6 py-3 text-white text-lg font-bold rounded-xl shadow-lg overflow-hidden group transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500"></span>
                <span className="absolute inset-0 w-full h-[2px] bg-white opacity-50 animate-line-move"></span>
                <span className="relative z-10">Watch Playlist</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Veterinarian Advice Coming Soon Section */}
      <motion.div
        className="w-full h-[700px] bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage: `url(${humanImage})`,
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }} // Ensures animation triggers every time it comes into view
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <motion.div
          className="relative z-10 text-center text-white px-6 md:px-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: false }}
          >
            Veterinarian Advice{" "}
            <span className="text-green-400">Coming Soon</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: false }}
          >
            Our web app will soon provide expert veterinarian advice to help you
            take the best care of your pets. Stay tuned for this exciting
            feature!
          </motion.p>

          {/* Button with Popup */}
          <div className="relative inline-block">
            <motion.button
              className="relative px-8 py-3 text-white text-lg font-bold rounded-lg shadow-lg overflow-hidden group transition-all duration-300 bg-gradient-to-r from-blue-500 to-green-500"
              initial={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              onClick={handleButtonClick} // Trigger popup on click
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500"></span>
              <span className="absolute inset-0 w-full h-[2px] bg-white opacity-50 animate-line-move"></span>
              <span className="relative z-10">Learn More</span>
            </motion.button>

            {/* Popup Message */}
            {showPopup && (
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                Coming Soon!
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Add spacing before the footer */}
      <div className="h-8"></div>

      {/* Footer Section */}
      <footer className="w-full bg-gradient-to-r from-blue-900 via-gray-800 to-gray-900 text-white py-16 px-6 md:px-12">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {/* Branding Section */}
          <motion.div
            className="branding"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-4">
              AI Pet Health Assistance
            </h3>
            <p className="text-gray-400">
              Your trusted companion for pet health and wellness. We provide
              expert guidance and tools to ensure your pet's happiness and
              health.
            </p>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div
            className="quick-links"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h4 className="text-2xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleComingSoon()} // Shows the "Coming Soon" popup
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactUsOpen(true)} // Opens the Contact Us popup
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsFAQOpen(true)} // Opens the FAQ popup
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Social Media Section */}
          <motion.div
            className="social-media"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h4 className="text-2xl font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com/in/kishlaykumar1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition duration-300"
              >
                <i className="fab fa-linkedin text-3xl"></i>
              </a>
              <a
                href="https://www.instagram.com/kishlay_012"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition duration-300"
              >
                <i className="fab fa-instagram text-3xl"></i>
              </a>
              <a
                href="https://www.twitter.com/@kishlay_012"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition duration-300"
              >
                <i className="fab fa-twitter text-3xl"></i>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition duration-300"
              >
                <i className="fab fa-facebook text-3xl"></i>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 border-t border-gray-700 pt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500">
            © {new Date().getFullYear()} AI Pet Health Assistance. All rights
            reserved.
          </p>
        </motion.div>
      </footer>

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

      {/* Contact Us Popup */}
      {isContactUsOpen && (
        <ContactUsPopup onClose={() => setIsContactUsOpen(false)} />
      )}

      {/* FAQ Popup */}
      {isFAQOpen && <FAQPopup onClose={() => setIsFAQOpen(false)} />}

      {/* Coming Soon Popup */}
      <ComingSoonPopup show={showComingSoon} />
    </div>
  );
};

export default Home;
