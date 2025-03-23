import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Navbar from "./components/Navbar";
import SignUp from "./pages/Signup";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        {/* Chatbot Route */}
        <Route
          path="/chatbot"
          element={
            <>
              <Navbar />
              <Chatbot />
            </>
          }
        />

        {/* Sign-Up Route */}
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <SignUp />
            </>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
