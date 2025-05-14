// Import des modules nécessaires
const express = require('express');
const cors = require('cors');
const app = express();

// Configuration des origines autorisées (frontend URLs)
const allowedOrigins = [
  'https://weather-app-frontend-dun.vercel.app',
  'https://weather-app-frontend-19zb6fxa2-nada-er2s-projects.vercel.app'
];

// Middleware CORS
app.use(cors({
  origin: function (origin, callback) {
    // Autoriser les requêtes sans origin (comme Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Middleware pour lire le corps des requêtes
app.use(express.json());

// Exemple de route (tu peux adapter selon ton projet)
app.get('/', (req, res) => {
  res.send('Backend WeatherApp is running ✅');
});

// Exemple d'endpoint météo
app.get('/api/weather', (req, res) => {
  // Ici tu peux mettre la logique pour appeler l’API météo externe
  res.json({
    city: "Casablanca",
    temperature: 27,
    description: "Ensoleillé"
  });
});

// Port d'écoute
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
