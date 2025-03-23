const express = require("express");
const router = express.Router();
const { getChatbotResponse } = require("../models/chatbotModel");
const verifyToken = require("../middleware/authMiddleware");

router.post("/message", verifyToken, async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const reply = await getChatbotResponse(userMessage);
    res.json({ reply });
  } catch (error) {
    console.error("Error in chatbot route:", error.message || error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
