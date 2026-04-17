/**
 * ============================================================================
 * CORS CONFIGURATION (src/middleware/cors.js)
 * ============================================================================
 */

const cors = require('cors');
const config = require('../config');

const corsOptions = {
  origin: config.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = cors(corsOptions);
