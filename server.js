// const app = require('./app');
// require('dotenv').config();
// const mongoose = require('mongoose');

// const PORT = process.env.PORT || 3000;

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch(err => console.log(err));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const cityRoutes = require("./routes/cityRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS مفعّل لكل origins (ممكن تخصيصو)
app.use(cors());

// ✅ JSON parsing
app.use(express.json());

// ✅ API routes
app.use("/auth", authRoutes);
app.use("/cities", cityRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("✅ Weather API is running!");
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
