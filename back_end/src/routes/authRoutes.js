/**
 * ============================================================================
 * AUTH ROUTES (src/routes/authRoutes.js)
 * ============================================================================
 * 
 * Routes untuk authentication endpoints
 * 
 * ============================================================================
 */

const express = require('express');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes (requires authentication)
router.get('/me', authenticate, authController.getCurrentUser);
router.put('/profile', authenticate, authController.updateProfile);
router.post('/logout', authenticate, authController.logout);

module.exports = router;
