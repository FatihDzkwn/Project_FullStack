const mysql = require('mysql2');
require('dotenv').config();

// Parse database connection string
let dbConfig = {};

// Priority: MYSQL_URL > DATABASE_URL > individual env vars
const connectionUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

if (connectionUrl) {
    try {
        // Parse MySQL URL: mysql://user:password@host:port/database
        const url = new URL(connectionUrl);
        dbConfig = {
            host: url.hostname,
            user: url.username,
            password: url.password,
            database: url.pathname.slice(1), // Remove leading '/'
            port: parseInt(url.port) || 3306,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelayMs: 0
        };
        console.log(`✅ MySQL Config: host=${url.hostname}, port=${url.port}, db=${url.pathname.slice(1)}`);
    } catch (err) {
        console.error('❌ Failed to parse connection URL:', err.message);
        process.exit(1);
    }
} else {
    // Fallback untuk development
    dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'skybooking',
        port: parseInt(process.env.DB_PORT) || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };
    console.log('✅ Using local environment variables');
}

// Membuat kolam koneksi (pool)
const db = mysql.createPool(dbConfig);

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