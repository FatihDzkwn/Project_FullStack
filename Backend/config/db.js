const mysql = require('mysql2');

const dbConfig = {
  host: process.env.MYSQLHOST || 'mysql.railway.internal',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || 'AARCsfXzm0IwbjcVMohTUqEYttSYJD',
  database: process.env.MYSQLDATABASE || 'railway',
  port: parseInt(process.env.MYSQLPORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

module.exports = pool.promise();
