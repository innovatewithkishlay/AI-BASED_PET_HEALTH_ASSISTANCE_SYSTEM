import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:5001/api/auth";

// Function to handle Sign-Up
export const signUp = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, data);

    console.log("Sign-Up Response from Backend:", response.data);

    return response.data; // Return the successful response data
  } catch (error) {
    console.error(
      "Sign-Up Error in API:",
      error.response?.data?.error || error.message
    );

    throw {
      message: error.response?.data?.error || "Sign-Up Failed",
    };
  }
};

export const verifyOTP = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/verify-signup-otp`,
      data
    );
    toast.success(response.data.message);
    return response;
  } catch (error) {
    toast.error(error.response?.data?.error || "OTP Verification Failed");
    throw error;
  }
};

// Function to handle Login
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    toast.success("Login successful!");
    return response;
  } catch (error) {
    toast.error(error.response?.data?.error || "Login Failed");
    throw error;
  }
};

// Function to handle Logout
export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`);
    toast.success("Logged out successfully!");
    return response;
  } catch (error) {
    toast.error("Logout Failed");
    throw error;
  }
};
