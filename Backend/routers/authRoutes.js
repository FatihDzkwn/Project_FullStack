const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Pastikan path ke controller benar

/**
 * ============================================================================
 * AUTH ROUTES
 * ============================================================================
 * Menghubungkan endpoint URL dengan fungsi di authController.
 */

// Endpoint: POST /api/auth/register
router.post("/register", authController.register);

// Endpoint: POST /api/auth/login
router.post("/login", authController.login);

// Endpoint: POST /api/auth/logout
router.post("/logout", authController.logout);

module.exports = router;