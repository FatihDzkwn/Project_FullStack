const mysql = require('mysql2');

// Konfigurasi langsung menggunakan kredensial database Railway Anda
const dbConfig = {
  host: 'mysql.railway.internal',
  user: 'root',
  password: 'AARCsfXzm0IwbjcVMohTUqEYttSYJD',
  database: 'railway',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

console.log('✅ MySQL Config FORCED successfully');
console.log(`   Host: ${dbConfig.host}:${dbConfig.port}`);
console.log(`   Database: ${dbConfig.database}`);

module.exports = pool.promise();
