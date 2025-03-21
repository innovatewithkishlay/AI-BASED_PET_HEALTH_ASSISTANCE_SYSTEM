import { useState } from "react";
import axios from "axios";

const ChatInput = ({ addMessageToChat }) => {
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() !== "") {
      addMessageToChat(input, "user");
      setInput("");

      try {
        const response = await axios.post(
          "http://localhost:5001/api/chatbot/message",
          {
            message: input,
          }
        );

        addMessageToChat(response.data.reply, "bot");
      } catch (error) {
        console.error("Error fetching response:", error);
        addMessageToChat(
          "Sorry, I couldn't connect to the server. Please try again later.",
          "bot"
        );
      }
    }
  };

  return (
    <div className="p-4 flex items-center border-t border-gray-300 bg-gray-100">
      <input
        type="text"
        className="flex-1 p-2 border border-gray-400 rounded-lg outline-none"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
