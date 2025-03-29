import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import SignUp from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />

        {/* Chatbot Route */}
        <Route
          path="/chatbot"
          element={
            <>
              <Chatbot />
            </>
          }
        />

        {/* Sign-Up Route */}
        <Route
          path="/signup"
          element={
            <>
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
