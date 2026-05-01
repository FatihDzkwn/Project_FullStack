const express = require('express');
const router = express.Router();

// 1. IMPORT CONTROLLER (Pastikan file ini ada di folder controllers)
const BookingController = require('../controllers/BookingController');

// 2. TENTUKAN ENDPOINT
// Jika di app.js nanti pake app.use('/api/bookings', bookingRoutes)
// Maka URL lengkapnya jadi: http://localhost:5000/api/bookings/confirm
router.post('/confirm', BookingController.createBooking);

module.exports = router;