/**
 * ============================================================================
 * ERROR HANDLER MIDDLEWARE (src/middleware/errorHandler.js)
 * ============================================================================
 * 
 * Global error handler untuk catch semua errors
 * 
 * ============================================================================
 */

const { sendError } = require('../utils/response');

/**
 * Global error handler middleware
 * Harus ditempatkan di paling akhir (setelah semua route handler)
 */
function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Default error
  let statusCode = 500;
  let message = 'Internal server error';

  // Validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
  }

  // Duplicate key error (unique constraint)
  if (err.code === '23505') {
    statusCode = 409;
    message = 'Resource already exists';
  }

  // Database errors
  if (err.code && err.code.startsWith('23')) {
    statusCode = 400;
    message = 'Database error: ' + err.detail;
  }

  sendError(res, statusCode, message);
}

module.exports = errorHandler;
