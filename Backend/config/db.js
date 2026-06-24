const mysql = require('mysql2');

// Konfigurasi langsung menggunakan kredensial database Railway Anda
const mysql = require('mysql2');

// Konfigurasi menggunakan endpoint PUBLIC TCP Database Railway Anda
const dbConfig = {
  host: 'mysql.railway.internal', // Jika ini gagal, ganti dengan: 'dan.proxy.rlwy.net'
  user: 'root',
  password: 'AARCsfXzm0IwbjcVMohTUqEYttSYJD',
  database: 'railway',
  port: 3306, // Jika diubah ke domain proxy luar, sesuaikan portnya (contoh dari gambar pertama Anda: 41891)
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

console.log('✅ MySQL Config FORCED successfully');

module.exports = pool.promise();
