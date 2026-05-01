const db = require('../config/db');

const createBooking = async (req, res) => {
    const { flight, passengers, contact, paymentMethod, totalPrice } = req.body;
    
    try {
        // Logika database kamu masuk di sini (INSERT INTO...)
        // ... (kode yang kita bahas sebelumnya) ...
        
        res.status(201).json({ success: true, message: "Booking Berhasil!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createBooking };