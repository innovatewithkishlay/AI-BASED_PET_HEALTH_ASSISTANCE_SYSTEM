import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Navbar from "./components/Navbar";
import SignUp from "./pages/Signup"; // Import the Sign-Up page

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
    </Router>
  );
};

export default App;
