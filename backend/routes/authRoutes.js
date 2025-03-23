const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { generateToken } = require("../utils/jwtUtils");
const sendEmail = require("../utils/emailService");
const crypto = require("crypto");

const otpStore = new Map();

// Sign-Up Route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const otp = crypto.randomInt(100000, 999999);
    otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    try {
      await sendEmail(email, "Verify Your Email", `Your OTP is: ${otp}`);
      res
        .status(200)
        .json({ message: "OTP sent to your email for verification" });
    } catch (emailError) {
      otpStore.delete(email);
      return res.status(400).json({
        error: "Failed to send OTP. Please check your email address.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/verify-signup-otp", async (req, res) => {
  const { username, email, password, otp } = req.body;

  if (!username || !email || !password || !otp) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const storedOtp = otpStore.get(email);

    if (!storedOtp || storedOtp.expiresAt < Date.now()) {
      return res.status(400).json({ error: "OTP has expired or is invalid" });
    }

    if (storedOtp.otp !== parseInt(otp, 10)) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    otpStore.delete(email);

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  try {
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
