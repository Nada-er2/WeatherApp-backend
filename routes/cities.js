const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCities, addCity, updateCity, deleteCity } = require('../controllers/cityController');

router.get('/', auth, getCities);
router.post('/', auth, addCity);
router.put('/:id', auth, updateCity);
router.delete('/:id', auth, deleteCity);

module.exports = router;
