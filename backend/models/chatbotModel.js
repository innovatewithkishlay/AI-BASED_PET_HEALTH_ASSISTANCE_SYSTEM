const axios = require("axios");

const queryHuggingFaceModel = async (message) => {
  const API_URL =
    "https://api-inference.huggingface.co/models/Junjun21/pet-care-chat-bot";
  const headers = {
    Authorization: `Bearer ${process.env.HF_API_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    console.log("Sending request to Hugging Face API...");
    console.log("User Message:", message);

    const response = await axios.post(
      API_URL,
      { inputs: message },
      { headers }
    );

    console.log("Raw API Response:", response.data);

    if (!response.data || response.data.length === 0) {
      throw new Error("Empty response from AI model");
    }

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
