/**
 * ============================================================================
 * JWT UTILITIES (src/utils/jwt.js)
 * ============================================================================
 * 
 * Helper functions untuk generate dan verify JWT tokens
 * 
 * ============================================================================
 */

const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Generate JWT Token
 * @param {Object} payload - Data untuk di-encode ke token
 * @returns {string} JWT token
 */
function generateToken(payload) {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  });
}

/**
 * Verify JWT Token
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded payload atau null jika invalid
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
}

/**
 * Decode Token (tanpa verify)
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded payload
 */
function decodeToken(token) {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};
