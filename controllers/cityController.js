const City = require('../models/City');
const getWeather = require('../utils/weather');

exports.getCities = async (req, res) => {
  const cities = await City.find({ userId: req.user._id });
  res.json(cities);
};

exports.addCity = async (req, res) => {
  const { name } = req.body;
  try {
    const weather = await getWeather(name);
    const city = await City.create({ name, userId: req.user._id, weather });
    res.json(city);
  } catch {
    res.status(400).json({ error: 'City already exists or invalid' });
  }
};

exports.updateCity = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  const weather = await getWeather(name);

  const city = await City.findByIdAndUpdate(
    req.params.id,
    { name, weather },
    { new: true }
  );

  if (!city) return res.status(404).json({ error: "City not found" });

  res.json(city);
};


exports.deleteCity = async (req, res) => {
  await City.findByIdAndDelete(req.params.id);
  res.json({ message: 'City deleted' });
};
