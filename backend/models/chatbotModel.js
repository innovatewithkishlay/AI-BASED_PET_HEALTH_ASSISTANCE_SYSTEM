const axios = require("axios");
require("dotenv").config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const getChatbotResponse = async (userMessage) => {
  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: userMessage }],
        temperature: 0.7,
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);
    return "Sorry, I couldn't fetch a response.";
  }
};

module.exports = { getChatbotResponse };
