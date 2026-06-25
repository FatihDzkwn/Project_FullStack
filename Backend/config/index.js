require('dotenv').config();
const mysql = require('mysql2'); // Pastikan sudah install mysql2

const config = {
  APP_NAME: process.env.APP_NAME || 'SkyBooking',
  PORT: process.env.PORT || 5000,
  
  // TAMBAHKAN BAGIAN INI
  DB: {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || '',
    NAME: process.env.DB_NAME || 'flight_booking_db',
  },

  AUTH: {
    SECRET: process.env.JWT_SECRET,
    EXPIRY: process.env.JWT_EXPIRY || '7d',
  },
  

};

const db = mysql.createPool({
  host: 'eseau.proxy.rlwy.net',
  user: 'root',
  password: 'AARCsfXzm0IwbjcVMohTUqEYttSYJD',
  database: 'railway',
  port: 41891,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Ekspor keduanya tanpa menggunakan .promise() agar cocok dengan callback db.query
module.exports = { config, db };