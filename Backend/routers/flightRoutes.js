const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController'); // Sesuaikan path

/**
 * ============================================================================
 * FLIGHT ROUTES
 * ============================================================================
 */

// 1. Ambil semua data penerbangan
// Endpoint: GET /api/flights
router.get('/', flightController.getAllFlights);

// 2. Pencarian penerbangan berdasarkan filter (from, to, date)
// Endpoint: GET /api/flights/search?from=Jakarta&to=Bali
router.get('/search', flightController.searchFlights);

// 3. Ambil detail satu penerbangan berdasarkan ID
// Endpoint: GET /api/flights/:id
// PENTING: Letakkan route dengan parameter :id di bawah agar tidak bentrok dengan /search
router.get('/:id', flightController.getFlightById);

module.exports = router;