const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

app.get("/", (req, res) => {
  res.send("AI Pet Assistant Server is Running!");
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
