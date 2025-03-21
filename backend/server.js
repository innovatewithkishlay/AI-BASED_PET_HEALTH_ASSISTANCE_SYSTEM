const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
console.log(
  "Loaded API Key:",
  process.env.GROQ_API_KEY ? "✅ Loaded" : "❌ Not Loaded"
);

const chatbotRoutes = require("./routes/chatbot");
app.use("/api/chatbot", chatbotRoutes);

app.get("/", (req, res) => {
  res.send("AI Pet Assistant Server is Running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
