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
  
  // ... sisanya code kamu yang tadi ...
};

// Buat koneksi database menggunakan data dari config di atas
const db = mysql.createConnection({
  host: config.DB.HOST,
  user: config.DB.USER,
  password: config.DB.PASSWORD,
  database: config.DB.NAME
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to MySQL Database!');
  }
});

// Export keduanya: config (untuk pengaturan) dan db (untuk query)
module.exports = { config, db };