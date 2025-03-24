const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { generateToken } = require("../utils/jwtUtils");
const bcrypt = require("bcrypt");

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

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Sign-Up Error:", error.message);
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
    if (!user) {
      console.error("User not found with email:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error("Password comparison failed for user:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
