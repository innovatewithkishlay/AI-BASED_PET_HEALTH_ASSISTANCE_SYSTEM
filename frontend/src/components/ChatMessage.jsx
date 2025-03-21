import { motion } from "framer-motion";

const ChatMessage = ({ message, isUser }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}
    >
      <div
        className={`px-4 py-2 max-w-xs text-white rounded-lg shadow-lg ${
          isUser ? "bg-blue-500" : "bg-gray-700"
        }`}
      >
        {message || "No message available"}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
