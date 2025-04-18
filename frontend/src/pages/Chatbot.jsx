import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCopy, FiLogOut } from "react-icons/fi";
import { IoSend, IoArrowUpCircle, IoStopCircle } from "react-icons/io5";
import { AiOutlineSetting } from "react-icons/ai";
import axios from "axios";
import logo from "../assets/logo.png";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(null);
  const [showInitialText, setShowInitialText] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");
  const [dynamicText, setDynamicText] = useState("");
  const [typingInterval, setTypingInterval] = useState(null);
  const [responseStopped, setResponseStopped] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const navigate = useNavigate();

  const chatContainerRef = useRef(null);
  const settingsRef = useRef(null);
  const lastMessageRef = useRef(null);

  const initialTexts = [
    "How can I assist you with your pet's health today?",
    "What concerns do you have about your pet's health?",
    "Ask me anything about your pet's well-being!",
    "How can I help you take care of your furry friend?",
    "Tell me about your pet's health concerns, and I'll assist you!",
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      const chatContainer = chatContainerRef.current;

      const isAtBottom =
        Math.abs(
          chatContainer.scrollHeight -
            chatContainer.scrollTop -
            chatContainer.clientHeight
        ) < 5;

      if (isAtBottom) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    const handleScroll = () => {
      if (chatContainer) {
        const isAtBottom =
          chatContainer.scrollHeight - chatContainer.scrollTop ===
          chatContainer.clientHeight;

        if (!isAtBottom) {
          setResponseStopped(true);
        } else {
          setResponseStopped(false);
        }
      }
    };

    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (!responseStopped && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, responseStopped]);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
    } else {
      setLoadingDots("");
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentText = initialTexts[index];
      if (!isDeleting) {
        setDynamicText(currentText.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(typeEffect, 2000);
          return;
        }
      } else {
        setDynamicText(currentText.slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          index = (index + 1) % initialTexts.length;
        }
      }
      setTimeout(typeEffect, isDeleting ? 80 : 120);
    };

    const startTypingEffect = () => {
      setTimeout(typeEffect, 1500);
    };

    startTypingEffect();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target) &&
        !event.target.closest(".text-gray-800")
      ) {
        setShowSettings(false);
      }
      if (showAboutModal || showHelpModal) {
        setShowAboutModal(false);
        setShowHelpModal(false);
      }
    };

    if (showSettings) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSettings, showAboutModal, showHelpModal]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    setShowInitialText(false);
    setResponseStopped(false);
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setWaitingForResponse(true);

    try {
      const response = await axios.post(
        "https://ai-based-pet-health-assistance-system.onrender.com/api/chatbot/message",
        {
          message: input,
        }
      );

      const botMessage = response.data.reply;
      setWaitingForResponse(false);
      simulateTypingEffect(botMessage);
    } catch (error) {
      console.error("Error fetching response:", error.message || error);

      setMessages((prev) => [
        ...prev,
        { text: "Error: Unable to reach server", sender: "bot" },
      ]);
      setWaitingForResponse(false);
    }
  };

  const formatBotResponse = (response) => {
    let formattedResponse = response.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );

    formattedResponse = formattedResponse.replace(/\n/g, "<br>");

    formattedResponse = formattedResponse.replace(
      /(\d+)\.\s(.*?)(?=\n|$)/g,
      "<li>$2</li>"
    );

    if (formattedResponse.includes("<li>")) {
      formattedResponse = `<ul>${formattedResponse}</ul>`;
    }

    return formattedResponse;
  };

  const simulateTypingEffect = (fullMessage) => {
    const formattedMessage = formatBotResponse(fullMessage);
    const words = formattedMessage.split(" ");
    let currentMessage = "";
    let wordIndex = 0;

    setLoading(true);

    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        currentMessage += (wordIndex === 0 ? "" : " ") + words[wordIndex];
        setMessages((prev) => {
          const updatedMessages = [...prev];
          if (updatedMessages[updatedMessages.length - 1]?.sender === "bot") {
            updatedMessages[updatedMessages.length - 1].text = currentMessage;
          } else {
            updatedMessages.push({ text: currentMessage, sender: "bot" });
          }
          return updatedMessages;
        });
        wordIndex++;
      } else {
        clearInterval(interval);
        setTypingInterval(null);
        setLoading(false);
      }
    }, 100);

    setTypingInterval(interval);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedMessage(text);
    setTimeout(() => setCopiedMessage(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([]);
    setShowInitialText(true);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    const inputElement = e.target;
    inputElement.style.height = "auto";
    inputElement.style.height = `${inputElement.scrollHeight}px`;
  };

  const handleStopResponse = () => {
    if (typingInterval) {
      clearInterval(typingInterval);
      setTypingInterval(null);

      setMessages((prev) => {
        const updatedMessages = [...prev];
        if (updatedMessages[updatedMessages.length - 1]?.sender === "bot") {
          updatedMessages.push({
            text: "You stopped the response.",
            sender: "system",
          });
        }
        return updatedMessages;
      });

      setLoading(false);
      setResponseStopped(true);
    }
  };

  const handleImageIconClick = () => {
    setShowImagePopup(true); // Show the popup when the icon is clicked
  };

  const handleClosePopup = () => {
    setShowImagePopup(false); // Close the popup
  };

  return (
    <AnimatePresence>
      <motion.div
        className="h-screen bg-gradient-to-b from-[#FDE663] via-[#F9D423] to-[#F6A623] flex flex-col justify-between"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          overflowX: "hidden",
          backgroundSize: "400% 400%",
          animation: "gradientAnimation 12s ease infinite",
        }}
      >
        <div className="fixed top-0 left-0 w-full py-4 px-6 bg-gradient-to-r from-[#FDE663] via-[#F9D423] to-[#F6A623] z-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
            </div>
            <div className="flex items-center gap-6">
              <div
                className="text-gray-800 text-2xl cursor-pointer"
                onClick={() => navigate("/")}
              >
                <FiLogOut className="text-blue-600 hover:text-green-500 transition duration-300" />
              </div>
              <div
                className="text-gray-800 text-2xl cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSettings((prev) => !prev);
                }}
              >
                <AiOutlineSetting className="text-blue-600 hover:text-green-500 transition duration-300" />
              </div>
            </div>
          </div>
        </div>
        {showSettings && (
          <motion.div
            ref={settingsRef}
            className="absolute top-16 right-4 md:right-10 bg-white text-gray-800 shadow-lg rounded-lg p-4 w-56 md:w-64 z-[60]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <div
              className="flex items-center gap-3 cursor-pointer text-blue-600 hover:text-blue-800 transition duration-300 py-2"
              onClick={handleClearChat}
            >
              <IoArrowUpCircle className="text-xl" />
              <span>Clear Chat</span>
            </div>
            <div
              className="flex items-center gap-3 cursor-pointer text-green-600 hover:text-green-800 transition duration-300 py-2"
              onClick={() => setShowAboutModal(true)}
            >
              <AiOutlineSetting className="text-xl" />
              <span>About Chatbot</span>
            </div>
            <div
              className="flex items-center gap-3 cursor-pointer text-red-600 hover:text-red-800 transition duration-300 py-2"
              onClick={() => setShowHelpModal(true)}
            >
              <FiCopy className="text-xl" />
              <span>Help</span>
            </div>
          </motion.div>
        )}
        {showAboutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70]">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                About AI Pet Chatbot
              </h2>
              <p className="text-gray-600">
                This chatbot is designed to assist pet owners with their pet's
                health concerns. It provides helpful insights and guidance to
                ensure your furry friends stay happy and healthy.
              </p>
            </div>
          </div>
        )}
        {showHelpModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70]">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Help</h2>
              <p className="text-gray-600">
                To use this chatbot, simply type your pet-related questions in
                the input box below and press Enter. The chatbot will provide
                helpful responses to assist you.
              </p>
            </div>
          </div>
        )}
        <div
          className="flex-grow w-full overflow-y-auto pt-24 px-4 bg-gradient-to-b from-[#FDE663] via-[#F9D423] to-[#F6A623]"
          ref={chatContainerRef}
          style={{
            paddingBottom: "120px",
            overflowX: "hidden",
          }}
        >
          <div className="w-full max-w-lg md:max-w-3xl mx-auto px-4">
            {showInitialText && (
              <motion.p
                className="text-gray-800 text-center text-3xl md:text-5xl font-bold mt-20 md:mt-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {dynamicText}
                <span
                  style={{
                    display: "inline-block",
                    width: "2px",
                    height: "1em",
                    background:
                      "linear-gradient(to right, #00FF00, #00BFFF, #32CD32)",
                    animation: "blink 1s step-end infinite",
                  }}
                ></span>
              </motion.p>
            )}
            {messages.length === 0
              ? null
              : messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 my-5 rounded-lg flex flex-col relative group ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-green-500 text-white self-end ml-auto max-w-sm shadow-lg"
                        : msg.sender === "system"
                        ? "text-gray-500 italic self-start"
                        : "bg-gray-100 text-gray-800 self-start max-w-4xl shadow-md"
                    }`}
                    style={{
                      wordBreak: "break-word",
                    }}
                    initial={{
                      opacity: 0,
                      x: msg.sender === "user" ? 50 : -50,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    ref={index === messages.length - 1 ? lastMessageRef : null}
                  >
                    <span
                      className={`break-words pr-10 ${
                        msg.sender !== "user" ? "leading-relaxed" : ""
                      }`}
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    ></span>
                  </motion.div>
                ))}
            {waitingForResponse && (
              <motion.div
                className="my-3 text-gray-700 self-start text-sm font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Just a second{loadingDots}
              </motion.div>
            )}
            <div className="h-24"></div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full py-4 px-6 bg-transparent shadow-none">
          <div className="flex w-full max-w-lg md:max-w-3xl mx-auto items-center bg-gray-100 rounded-lg border border-gray-300 relative">
            <textarea
              className="flex-grow p-3 md:p-4 bg-gray-200 text-gray-800 rounded-lg outline-none resize-none overflow-hidden"
              placeholder="Write your concern over here..."
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              rows={1}
              style={{
                minHeight: "80px",
                maxHeight: "150px",
              }}
            />
            {/* Image Upload Icon */}
            <button
              className="absolute bottom-2 right-14 bg-gray-200 hover:bg-gray-300 text-gray-600 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300"
              onClick={handleImageIconClick}
            >
              <i className="fas fa-image text-xl md:text-2xl"></i>{" "}
              {/* Font Awesome Image Icon */}
            </button>
            <button
              className={`absolute bottom-2 right-2 ${
                loading
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              } text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300`}
              onClick={loading ? handleStopResponse : handleSendMessage}
            >
              {loading ? (
                <IoStopCircle className="text-xl md:text-2xl" />
              ) : (
                <IoArrowUpCircle className="text-xl md:text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Popup for Image Upload */}
        {showImagePopup && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70]"
            onClick={handleClosePopup} // Close popup when clicking outside
          >
            <div
              className="bg-white rounded-lg shadow-lg p-6 w-96 relative"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={handleClosePopup} // Close button
              >
                ✕
              </button>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Coming Soon!
              </h2>
              <p className="text-gray-600">
                Currently training our AI model for this feature. Stay tuned!
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Chatbot;
