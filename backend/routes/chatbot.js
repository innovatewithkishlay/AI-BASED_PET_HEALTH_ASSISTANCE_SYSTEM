const express = require("express");
const router = express.Router();
const queryHuggingFaceModel = require("../models/chatbotModel");
const axios = require("axios");

async function getAIResponse(message) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/YOUR_MODEL",
      { inputs: message },
      {
        headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
      }
    );
    return response.data.generated_text || "I'm not sure how to respond.";
  } catch (error) {
    console.error("AI API Error:", error);
    return "Sorry, I'm having trouble responding.";
  }
}

router.get("/status", (req, res) => {
  res.json({ status: "Chatbot API is running" });
});

router.post("/message", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const aiResponse = await getAIResponse(userMessage);
    res.json({ reply: aiResponse });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI model failed to respond" });
  }
});

module.exports = router;
