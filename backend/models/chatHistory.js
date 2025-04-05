const mongoose = require("mongoose");

const ChatHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversationId: {
      type: String,
      required: true,
      unique: true,
    },
    messages: [
      {
        role: { type: String, enum: ["user", "bot"], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ChatHistory = mongoose.model("ChatHistory", ChatHistorySchema);
module.exports = ChatHistory;
