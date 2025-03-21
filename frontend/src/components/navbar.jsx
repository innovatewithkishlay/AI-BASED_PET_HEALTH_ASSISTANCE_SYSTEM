import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">AI Pet Health</h1>
      <div>
        <Link to="/" className="px-4">
          Home
        </Link>
        <Link to="/chatbot" className="px-4">
          Chatbot
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
