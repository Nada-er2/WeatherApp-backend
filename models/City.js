const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, unique: true },
  userId: mongoose.Types.ObjectId,
  weather: Object
});

module.exports = mongoose.model('City', citySchema);
