/**
 * ============================================================================
 * BCRYPT UTILITIES (src/utils/bcrypt.js)
 * ============================================================================
 * 
 * Helper functions untuk password hashing & verification
 * 
 * ============================================================================
 */

const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

/**
 * Hash password dengan bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify password dengan hashed password
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password dari database
 * @returns {Promise<boolean>} True jika match
 */
async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = {
  hashPassword,
  verifyPassword,
};
