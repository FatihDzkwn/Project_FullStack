const mysql = require('mysql2');

// 1. Ambil konfigurasi dari Environment Variables Railway
const dbConfig = {
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'railway',
  port: parseInt(process.env.MYSQLPORT) || 3306,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
};

// 2. Buat koneksi pool menggunakan objek konfigurasi
const pool = mysql.createPool(dbConfig);

console.log('✅ MySQL Config parsed successfully');
console.log(`   Host: ${dbConfig.host}:${dbConfig.port}`);
console.log(`   User: ${dbConfig.user}`);
console.log(`   Database: ${dbConfig.database}`);

// 3. Export pool agar bisa digunakan oleh file backend lainnya
module.exports = pool.promise();
