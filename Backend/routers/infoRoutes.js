const express = require('express');
const router = express.Router();
const infoController = require('../controllers/infoController');

// Endpoint: GET /api/about
router.get('/about', infoController.getAboutData);

module.exports = router;