import { useState } from "react";

const ChatInput = ({ sendMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      sendMessage(input);
      setInput("");
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
