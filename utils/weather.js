const axios = require('axios');
module.exports = async function(cityName) {
  const apiKey = process.env.WEATHER_API_KEY;
  const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
  return res.data;
};
