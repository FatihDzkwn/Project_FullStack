/**
 * ============================================================================
 * RESPONSE UTILITIES (src/utils/response.js)
 * ============================================================================
 * 
 * Helper functions untuk standardisasi API response format
 * 
 * ============================================================================
 */

/**
 * Success Response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {*} data - Data untuk di-return
 */
function sendSuccess(res, statusCode, message, data = null) {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

/**
 * Error Response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {Array} errors - Array of detailed errors (optional)
 */
function sendError(res, statusCode, message, errors = null) {
  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}

/**
 * Paginated Response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Message
 * @param {Array} data - Array of data
 * @param {Object} pagination - Pagination info { page, limit, total, totalPages }
 */
function sendPaginated(res, statusCode, message, data, pagination) {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination,
  });
}

module.exports = {
  sendSuccess,
  sendError,
  sendPaginated,
};
