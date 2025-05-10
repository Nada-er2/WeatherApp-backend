const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const cityRoutes = require("./routes/cities");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS مفعل فقط لموقع Vercel ديالك
app.use(cors({
  origin: "https://weather-app-frontend-dun.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/cities", cityRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Weather API is running!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
