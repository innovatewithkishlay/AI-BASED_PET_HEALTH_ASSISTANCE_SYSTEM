import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import dog1image from "../assets/dog1image.png";
import message1 from "../assets/message1.webp";
import message2 from "../assets/message2.webp";
import message3 from "../assets/message3.webp";
import humanImage from "../assets/human.webp";
import person1 from "../assets/person1.avif";
import person2 from "../assets/person2.jpg";
import person3 from "../assets/person3.jpg";
import "../styles/scrollbar.css";

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
        <motion.div
          className="text-gray-800 font-bold text-3xl md:text-5xl tracking-wide flex-1 text-center md:text-left mb-2 sm:mb-4 md:mb-0 mt-20 sm:mt-24 md:mt-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <span>{typewriterText}</span>
          <span className="blinking-cursor">|</span>
        </motion.div>
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: false }}
        >
          <img
            src={dog1image}
            alt="Dog"
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-[50%] md:h-auto object-contain mt-2 sm:mt-4"
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
        className="w-full bg-gray-50 py-16 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
      >
        <div className="flex-1 flex justify-center items-center relative">
          <div className="bg-gray-200 rounded-lg shadow-lg w-[90%] md:w-[50%] h-[500px] flex items-center justify-center relative">
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
          className="flex-1 text-center md:text-left mt-8 md:mt-0"
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
          <Link
            to="/chatbot"
            className="relative px-6 py-3 text-white text-lg font-bold rounded-xl shadow-lg overflow-hidden group transition-all duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500"></span>
            <span className="absolute inset-0 w-full h-[2px] bg-white opacity-50 animate-line-move"></span>
            <span className="relative z-10">Chat with Our AI</span>
          </Link>
        </motion.div>
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
          viewport={{ once: false }} // Ensures animation triggers every time it comes into view
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

      {/* Enhanced Review Section */}
      <motion.div
        className="w-full relative py-16 px-6 md:px-12 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }} // Ensures animation triggers every time it comes into view
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 animate-gradient-move"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-50"></div>
        <div className="absolute inset-0">
          <svg
            className="w-full h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="url(#gradient)"
              fillOpacity="1"
              d="M0,96L48,122.7C96,149,192,203,288,213.3C384,224,480,192,576,160C672,128,768,96,864,112C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
            <defs>
              <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#00c6ff" />
                <stop offset="100%" stopColor="#ff0080" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: false }} // Ensures animation triggers every time it comes into view
        >
          What Our Users Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto relative z-10">
          {/* Review 1 */}
          <motion.div
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px] rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false }} // Ensures animation triggers every time it comes into view
          >
            <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg p-8 flex flex-col items-center text-center">
              <img
                src={person1}
                alt="User 1"
                className="w-24 h-24 rounded-full mb-6 border-4 border-blue-500 shadow-lg"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                John Doe
              </h3>
              <p className="text-gray-600 text-lg">
                "This app has completely changed the way I take care of my pets.
                The advice and insights are invaluable!"
              </p>
              {/* Sparkling Line */}
              <div className="w-full h-[2px] bg-gradient-to-r from-blue-500 to-pink-500 mt-4 animate-line-move"></div>
            </div>
          </motion.div>

          {/* Review 2 */}
          <motion.div
            className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 p-[2px] rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: false }} // Ensures animation triggers every time it comes into view
          >
            <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg p-8 flex flex-col items-center text-center">
              <img
                src={person2}
                alt="User 2"
                className="w-24 h-24 rounded-full mb-6 border-4 border-green-500 shadow-lg"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Jane Smith
              </h3>
              <p className="text-gray-600 text-lg">
                "I love how easy it is to monitor my pet's health. The expert
                guidance is a game-changer!"
              </p>
              {/* Sparkling Line */}
              <div className="w-full h-[2px] bg-gradient-to-r from-green-500 to-blue-500 mt-4 animate-line-move"></div>
            </div>
          </motion.div>

          {/* Review 3 */}
          <motion.div
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-[2px] rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: false }} // Ensures animation triggers every time it comes into view
          >
            <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-lg p-8 flex flex-col items-center text-center">
              <img
                src={person3}
                alt="User 3"
                className="w-24 h-24 rounded-full mb-6 border-4 border-purple-500 shadow-lg"
              />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Emily Johnson
              </h3>
              <p className="text-gray-600 text-lg">
                "The personalized care recommendations are spot on. My pets are
                happier and healthier than ever!"
              </p>
              {/* Sparkling Line */}
              <div className="w-full h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 mt-4 animate-line-move"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Add spacing before the footer */}
      <div className="h-1"></div>

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
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  FAQ
                </Link>
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
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition duration-300"
              >
                <i className="fab fa-linkedin text-3xl"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition duration-300"
              >
                <i className="fab fa-instagram text-3xl"></i>
              </a>
              <a
                href="https://www.twitter.com"
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
    </div>
  );
};

export default Home;
