const mysql = require('mysql2');

// Konfigurasi langsung menggunakan kredensial database Railway Anda
const mysql = require('mysql2');

// Konfigurasi menggunakan endpoint PUBLIC TCP Database Railway Anda
const dbConfig = {
  host: 'eseau.proxy.rlwy.net', 
  user: 'root',
  password: 'AARCsfXzm0IwbjcVMohTUqEYttSYJD',
  database: 'railway',
  port: 41891, // Menggunakan port publik database Anda
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
};


const pool = mysql.createPool(dbConfig);

console.log('✅ MySQL Config FORCED successfully');

module.exports = pool.promise();
