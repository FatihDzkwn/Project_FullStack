const mysql = require('mysql2');
require('dotenv').config();

console.log('=== DATABASE CONFIG DEBUG ===');
console.log('MYSQL_URL env:', process.env.MYSQL_URL ? 'SET' : 'NOT SET');
console.log('DATABASE_URL env:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('DB_HOST env:', process.env.DB_HOST || 'NOT SET');
console.log('================================');

let dbConfig = {};
const connectionUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

if (connectionUrl) {
    try {
        console.log('📝 Parsing connection URL...');
        const url = new URL(connectionUrl);
        dbConfig = {
            host: url.hostname,
            user: url.username,
            password: url.password,
            database: url.pathname.substring(1), // Remove leading '/'
            port: parseInt(url.port) || 3306,
            waitForConnections: true,
            connectionLimit: 5,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelayMs: 0
        };
        console.log(`✅ MySQL Config parsed successfully`);
        console.log(`   Host: ${dbConfig.host}:${dbConfig.port}`);
        console.log(`   User: ${dbConfig.user}`);
        console.log(`   Database: ${dbConfig.database}`);
    } catch (err) {
        console.error('❌ Failed to parse connection URL:', err.message);
        console.log('Falling back to env variables...');
        dbConfig = {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'skybooking',
            port: parseInt(process.env.DB_PORT) || 3306,
            waitForConnections: true,
            connectionLimit: 5,
            queueLimit: 0
        };
    }
} else {
    console.log('⚠️  No MYSQL_URL/DATABASE_URL found, using individual env variables');
    dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'skybooking',
        port: parseInt(process.env.DB_PORT) || 3306,
        waitForConnections: true,
        connectionLimit: 5,
        queueLimit: 0
    };
}

// Membuat kolam koneksi (pool)
const db = mysql.createPool(dbConfig);

// Tes koneksi
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database gagal terhubung:', err.message);
    } else {
        console.log('✅ Berhasil terhubung ke database!');
        connection.release();
    }
});

module.exports = db.promise();