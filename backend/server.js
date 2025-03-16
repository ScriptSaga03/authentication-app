require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/connection");
const cors = require("cors");
const path = require("path");

const app = express();
app.set("trust proxy", 1);
// const __dirname = path.resolve(); 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["https://authentication-app-9ywt.onrender.com"],
  credentials: true
}));

// Database Connection
connectDB();

// Routes
// app.get("/", (req, res) => {
//   res.send("🤖 Welcome to the Home page!");
// });

const userAuth = require("./routes/userAuthRoute");
app.use("/auth/users", userAuth);

// Serve Frontend (Production)
app.use(express.static(path.join(__dirname, "../frontend/dist"))); // ✅ 

// SPA Wildcard Route
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "❌ Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));