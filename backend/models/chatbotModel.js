const axios = require("axios");

const queryHuggingFaceModel = async (message) => {
  const API_URL =
    "https://api-inference.huggingface.co/models/Junjun21/pet-care-chat-bot";
  const headers = {
    Authorization: `Bearer ${process.env.HF_API_KEY}`, //Api key mera toh env mei hai bhai toh apna api key generate krr lo hahahaa
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(
      API_URL,
      { inputs: message },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error querying Hugging Face API:",
      error.response ? error.response.data : error.message
    );
    return { error: "Failed to fetch response from AI model" };
  }
};

module.exports = queryHuggingFaceModel;
