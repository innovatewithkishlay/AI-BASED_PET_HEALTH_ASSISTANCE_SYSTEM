const express = require("express");
const router = express.Router();
const { getChatbotResponse } = require("../models/chatbotModel");
const ChatHistory = require("../models/chatHistory");
const verifyToken = require("../middleware/authMiddleware");
const { v4: uuidv4 } = require("uuid");

// Save a new message and response to chat history
router.post("/message", verifyToken, async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const reply = await getChatbotResponse(userMessage);

    // Save the conversation to the database
    const conversationId = req.body.conversationId || uuidv4();
    const chatHistory = await ChatHistory.findOneAndUpdate(
      { userId: req.user.id, conversationId },
      {
        $push: {
          messages: [
            { role: "user", content: userMessage },
            { role: "bot", content: reply },
          ],
        },
      },
      { new: true, upsert: true }
    );

    res.json({ reply, conversationId, chatHistory });
  } catch (error) {
    console.error("Error in chatbot route:", error.message || error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all chat histories for a user
router.get("/history", verifyToken, async (req, res) => {
  try {
    const chatHistories = await ChatHistory.find({
      userId: req.user.id,
    }).select("conversationId messages");
    res.json(chatHistories);
  } catch (error) {
    console.error("Error fetching chat history:", error.message || error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific conversation by ID
router.get("/history/:conversationId", verifyToken, async (req, res) => {
  try {
    const chatHistory = await ChatHistory.findOne({
      userId: req.user.id,
      conversationId: req.params.conversationId,
    });

    if (!chatHistory) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.json(chatHistory);
  } catch (error) {
    console.error("Error fetching conversation:", error.message || error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a specific conversation
router.delete("/history/:conversationId", verifyToken, async (req, res) => {
  try {
    const result = await ChatHistory.findOneAndDelete({
      userId: req.user.id,
      conversationId: req.params.conversationId,
    });

    if (!result) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.json({ message: "Conversation deleted successfully" });
  } catch (error) {
    console.error("Error deleting conversation:", error.message || error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
