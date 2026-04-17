/**
 * ============================================================================
 * CONFIGURATION (src/config/index.js)
 * ============================================================================
 * Database: MySQL
 */

require('dotenv').config();

module.exports = {
  // Server
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  API_URL: process.env.API_URL || 'http://localhost:5000',

  // Frontend
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',

  // Database (MySQL)
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 3306,
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'password',
  DB_NAME: process.env.DB_NAME || 'sky_booking',

  // Email (opsional)
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,

  // API Response
  API_VERSION: 'v1',
  PAGINATION_LIMIT: 20,
};
