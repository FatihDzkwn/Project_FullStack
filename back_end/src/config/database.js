/**
 * ============================================================================
 * DATABASE CONFIGURATION (src/config/database.js)
 * ============================================================================
 * 
 * Konfigurasi koneksi database untuk aplikasi SkyBooking
 * Menggunakan MySQL dengan connection pool untuk performa optimal
 * 
 * ============================================================================
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'sky_booking',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test koneksi
pool.getConnection().then(() => {
  console.log('✅ MySQL Database connected successfully');
}).catch((err) => {
  console.error('❌ Database connection error:', err);
  process.exit(-1);
});

module.exports = pool;
