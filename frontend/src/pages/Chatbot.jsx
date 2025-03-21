import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCopy } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(null);
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/chat", {
        message: input,
      });

      const botMessage = { text: response.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error: Unable to reach server", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
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

  return (
    <motion.div
      className="h-screen bg-gray-900 flex flex-col items-center justify-between p-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button
        className="absolute top-4 right-6 text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={() => navigate("/")}
      >
        Home
      </button>

      <div className="absolute top-4 left-6 text-white text-2xl font-bold tracking-wide flex items-center gap-2">
        <span className="text-yellow-300">AI Pet</span>Health Assistant{" "}
        <span className="text-3xl">🐾</span>
      </div>

      <motion.div
        className="w-full max-w-2xl text-white shadow-lg rounded-lg p-4 h-[75vh] overflow-y-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">
            Ask anything about your pet...
          </p>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`p-3 my-2 rounded-lg max-w-xs flex items-center relative ${
                msg.sender === "user"
                  ? "bg-gray-700 text-white self-end ml-auto"
                  : "bg-gray-600 text-white self-start"
              }`}
              initial={{ opacity: 0, x: msg.sender === "user" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span>{msg.text}</span>
              <FiCopy
                className="ml-2 cursor-pointer text-gray-400 hover:text-white absolute right-2"
                onClick={() => handleCopy(msg.text)}
              />
            </motion.div>
          ))
        )}

        {loading && (
          <motion.div
            className="text-gray-500 text-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Typing...
          </motion.div>
        )}
      </motion.div>

      <div className="flex w-full max-w-2xl mt-4">
        <input
          type="text"
          className="flex-grow p-3 border border-gray-600 bg-gray-700 text-white rounded-l-lg outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r-lg flex items-center justify-center"
          onClick={handleSendMessage}
        >
          <IoSend className="text-xl" />
        </button>
      </div>

      {copiedMessage && (
        <div className="absolute bottom-10 bg-gray-700 text-white px-3 py-1 rounded-lg">
          Copied!
        </div>
      )}
    </motion.div>
  );
};

export default Chatbot;
