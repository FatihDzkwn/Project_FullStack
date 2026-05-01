const express = require('express');
const router = express.Router();
const { updateProfile, changePassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Middleware untuk cek token login

/**
 * ============================================================================
 * USER ROUTES (Profil & Security)
 * ============================================================================
 */

// Semua route di bawah ini membutuhkan login (protect)
router.use(protect); 

// Endpoint: PUT /api/users/profile
// Digunakan untuk update nama/data profil
router.put('/profile', updateProfile);

// Endpoint: PUT /api/users/change-password
// Digunakan untuk mengganti password
router.put('/change-password', changePassword);

module.exports = router;