const express = require('express');
const { getFoyers, createFoyer, getAvailablePlaces } = require('../controllers/foyerController');
const router = express.Router();

router.get('/', getFoyers);
router.post('/', createFoyer);
router.get('/available', getAvailablePlaces);

module.exports = router;
