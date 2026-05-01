const mysql = require('mysql2');
require('dotenv').config();

// Membuat kolam koneksi (pool)
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Tes koneksi sederhana
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database gagal terhubung:', err.message);
    } else {
        console.log('✅ Berhasil terhubung ke database skybooking!');
        connection.release();
    }
});

module.exports = db.promise();