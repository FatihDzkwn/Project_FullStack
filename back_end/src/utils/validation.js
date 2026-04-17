/**
 * ============================================================================
 * VALIDATION UTILITIES (src/utils/validation.js)
 * ============================================================================
 * 
 * Helper functions untuk validasi input data
 * 
 * ============================================================================
 */

/**
 * Validasi email format
 * @param {string} email - Email address
 * @returns {boolean} True jika valid
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validasi password strength
 * Minimum 6 karakter, harus ada uppercase, lowercase, dan angka
 * @param {string} password - Password
 * @returns {boolean} True jika valid
 */
function isValidPassword(password) {
  if (password.length < 6) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  return true;
}

/**
 * Validasi nomor telepon Indonesia (62xxx)
 * @param {string} phone - Phone number
 * @returns {boolean} True jika valid
 */
function isValidPhone(phone) {
  const regex = /^(\+62|62|0)[0-9]{9,12}$/;
  return regex.test(phone.replace(/[-\s]/g, ''));
}

/**
 * Validasi NIK (16 digit)
 * @param {string} nik - NIK/KTP number
 * @returns {boolean} True jika valid
 */
function isValidNIK(nik) {
  return /^\d{16}$/.test(nik);
}

/**
 * Sanitize input string (hapus special characters)
 * @param {string} input - Input string
 * @returns {string} Sanitized string
 */
function sanitizeInput(input) {
  return input.trim().replace(/[<>\"']/g, '');
}

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidPhone,
  isValidNIK,
  sanitizeInput,
};
