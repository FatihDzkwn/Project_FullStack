/**
 * ============================================================================
 * AUTH MIDDLEWARE (src/middleware/auth.js)
 * ============================================================================
 * 
 * Middleware untuk autentikasi JWT token
 * 
 * ============================================================================
 */

const { verifyToken } = require('../utils/jwt');
const { sendError } = require('../utils/response');

/**
 * Middleware untuk verify JWT token
 * Token harus dikirim di Authorization header: "Bearer <token>"
 */
function authenticate(req, res, next) {
  try {
    // Ambil token dari Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return sendError(res, 401, 'Authorization token is required');
    }

    // Format: "Bearer <token>"
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return sendError(res, 401, 'Invalid authorization format');
    }

    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return sendError(res, 401, 'Invalid or expired token');
    }

    // Simpan user info di request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    sendError(res, 500, 'Internal server error');
  }
}

/**
 * Middleware untuk check authorization level
 * @param {Array<string>} roles - Array of allowed roles
 */
function authorize(roles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 401, 'User not authenticated');
    }

    if (!roles.includes(req.user.role)) {
      return sendError(res, 403, 'You do not have permission to access this resource');
    }

    next();
  };
}

module.exports = {
  authenticate,
  authorize,
};
