const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const cityRoutes = require('./routes/cities');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3001', // Pour les tests locaux
  'https://weather-app-frontend-dun.vercel.app', // Ton URL Vercel
  'https://weather-app-frontend-19zb6fxa2-nada-er2s-projects.vercel.app' // Autre URL Vercel si besoin
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Routes
app.use('/auth', authRoutes);
app.use('/cities', cityRoutes);

module.exports = app;
