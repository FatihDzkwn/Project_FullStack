const mysql = require('mysql2');
require('dotenv').config();

// Parse DATABASE_URL atau gunakan individual env variables
let dbConfig = {};

if (process.env.DATABASE_URL) {
    try {
        // Parse MySQL URL: mysql://user:password@host:port/database
        const url = new URL(process.env.DATABASE_URL);
        dbConfig = {
            host: url.hostname,
            user: url.username,
            password: url.password,
            database: url.pathname.slice(1), // Remove leading '/'
            port: url.port || 3306,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        };
        console.log(`📦 Using DATABASE_URL: ${url.hostname}:${url.port}/${url.pathname.slice(1)}`);
    } catch (err) {
        console.error('❌ Failed to parse DATABASE_URL:', err.message);
        process.exit(1);
    }
} else {
    // Fallback untuk development
    dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'skybooking',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };
    console.log('📦 Using local environment variables');
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