import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCopy } from "react-icons/fi";
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
      setTimeout(typeEffect, isDeleting ? 50 : 100);
    };

    typeEffect();
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
    };

    if (showSettings) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSettings]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    setShowInitialText(false);
    setResponseStopped(false);
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/chatbot/message",
        {
          message: input,
        }
      );

      const botMessage = response.data.reply;
      simulateTypingEffect(botMessage);
    } catch (error) {
      console.error("Error fetching response:", error.message || error);

      setMessages((prev) => [
        ...prev,
        { text: "Error: Unable to reach server", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
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
    }, 200);

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
      setLoading(false);
      setResponseStopped(true);
    }
  };

  return (
    <motion.div
      className="h-screen bg-[#FDE663] flex flex-col justify-between"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ overflowX: "hidden" }}
    >
      <div className="fixed top-0 left-0 w-full py-4 px-4 bg-[#FDE663] z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
          </div>
          <div
            className="text-gray-800 text-2xl cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowSettings((prev) => !prev);
            }}
          >
            <AiOutlineSetting className="text-blue-600" />
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
            className="flex items-center gap-2 cursor-pointer text-blue-600"
            onClick={() => navigate("/")}
          >
            <span>Home</span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer text-red-600 mt-4"
            onClick={handleClearChat}
          >
            <span>Clear Chat</span>
          </div>
        </motion.div>
      )}

      <div
        className="flex-grow w-full overflow-y-auto pt-20 px-4"
        ref={chatContainerRef}
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
                  backgroundColor: "blue",
                  animation: "blink 0.8s steps(2, start) infinite",
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
                      ? "bg-gray-300 text-black self-end ml-auto max-w-sm"
                      : "text-black self-start max-w-4xl"
                  }`}
                  style={{
                    wordBreak: "break-word",
                  }}
                  initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                >
                  {msg.sender === "bot" ? (
                    <span
                      className={`break-words pr-10 ${
                        msg.sender !== "user" ? "leading-relaxed" : ""
                      }`}
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    ></span>
                  ) : (
                    <span
                      className={`break-words pr-10 ${
                        msg.sender !== "user" ? "leading-relaxed" : ""
                      }`}
                    >
                      {msg.text}
                    </span>
                  )}
                  {msg.sender !== "user" && (
                    <FiCopy
                      className="cursor-pointer text-blue-400 hover:text-green-500 absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={() => handleCopy(msg.text)}
                    />
                  )}
                </motion.div>
              ))}
          {loading && (
            <motion.div
              className="my-3 text-gray-700 self-start text-sm font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Just a second{loadingDots}
            </motion.div>
          )}
          {responseStopped && (
            <motion.div
              className="my-3 text-gray-500 self-start text-lg italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              You stopped the response.
            </motion.div>
          )}
          <div className="h-24"></div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full py-4 px-4 bg-[#FDE663]">
        <div className="flex w-full max-w-lg md:max-w-3xl mx-auto items-center bg-gray-100 rounded-lg border border-gray-400 relative">
          <textarea
            className="flex-grow p-3 md:p-4 bg-gray-100 text-black rounded-lg outline-none resize-none overflow-hidden"
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
          <button
            className="absolute bottom-2 right-2 bg-blue-500 text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
            onClick={loading ? handleStopResponse : handleSendMessage}
          >
            {loading ? (
              <IoStopCircle className="text-xl md:text-2xl animate-spin" />
            ) : (
              <IoArrowUpCircle className="text-xl md:text-2xl" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Chatbot;
