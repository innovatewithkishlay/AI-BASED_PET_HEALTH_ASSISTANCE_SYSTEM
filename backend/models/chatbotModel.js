const axios = require("axios");
require("dotenv").config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

if (!GROQ_API_KEY) {
  console.error("Error: GROQ_API_KEY is not defined in the .env file.");
  process.exit(1);
}

const getChatbotResponse = async (userMessage) => {
  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return (
      response.data?.choices?.[0]?.message?.content ||
      "No response from the chatbot."
    );
  } catch (error) {
    if (
      error.code === "ECONNREFUSED" ||
      error.code === "ENOTFOUND" ||
      error.message.includes("Network Error")
    ) {
      console.error("Network Error: Please check your internet connection.");
      return "Sorry, I couldn't fetch a response. Please check your internet connection.";
    }

    console.error("Groq API Error:", error.response?.data || error.message);
    return "Sorry, I couldn't fetch a response.";
  }
};

module.exports = { getChatbotResponse };
