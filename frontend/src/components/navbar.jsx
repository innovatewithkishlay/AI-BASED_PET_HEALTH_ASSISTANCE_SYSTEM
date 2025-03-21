import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold tracking-wide">
          <span className="text-yellow-300">AI Pet </span>Health Assistant
        </span>
        <span className="text-3xl">🐾</span>
      </div>
      <div>
        <Link
          to="/chatbot"
          className="px-4 hover:text-yellow-300 transition"
          aria-label="Navigate to Chatbot"
        >
          Chatbot
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
