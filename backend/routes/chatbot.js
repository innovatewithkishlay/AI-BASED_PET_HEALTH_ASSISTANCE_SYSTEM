const express = require("express");
const router = express.Router();
const { getChatbotResponse } = require("../models/chatbotModel");

router.post("/message", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  const reply = await getChatbotResponse(userMessage);
  res.json({ reply });
});

module.exports = router;
