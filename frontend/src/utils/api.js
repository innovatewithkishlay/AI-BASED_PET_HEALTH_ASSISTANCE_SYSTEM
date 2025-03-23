import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:5001/api/auth";

export const signUp = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, data);
    toast.success(response.data.message); // Show success toast
    return response;
  } catch (error) {
    toast.error(error.response?.data?.error || "Sign-Up Failed"); // Show error toast
    throw error;
  }
};

export const verifyOTP = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/verify-signup-otp`,
      data
    );
    toast.success(response.data.message); // Show success toast
    return response;
  } catch (error) {
    toast.error(error.response?.data?.error || "OTP Verification Failed"); // Show error toast
    throw error;
  }
};

// Function to handle Login
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    toast.success("Login successful!"); // Show success toast
    return response;
  } catch (error) {
    toast.error(error.response?.data?.error || "Login Failed"); // Show error toast
    throw error;
  }
};

// Function to handle Logout
export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`);
    toast.success("Logged out successfully!"); // Show success toast
    return response;
  } catch (error) {
    toast.error("Logout Failed"); // Show error toast
    throw error;
  }
};
