const mysql = require('mysql2');

// HANYA load .env untuk LOCAL DEVELOPMENT (bukan production)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

console.log('=== DATABASE CONFIG DEBUG ===');
console.log('NODE_ENV:', process.env.NODE_ENV || 'NOT SET (defaulting to dev)');
console.log('MYSQL_URL env:', process.env.MYSQL_URL ? `SET (${process.env.MYSQL_URL.substring(0, 50)}...)` : 'NOT SET');
console.log('DATABASE_URL env:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('================================');


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

// 3. Export pool agar bisa digunakan oleh file index.js atau models Anda
module.exports = pool.promise();
