/**
 * ============================================================================
 * MAIN SERVER FILE (server.js)
 * ============================================================================
 * 
 * Entry point aplikasi backend
 * Setup Express server, middleware, dan routes
 * 
 * ============================================================================
 */

require('dotenv').config();
const express = require('express');
const config = require('./src/config');
const corsMiddleware = require('./src/middleware/cors');
const errorHandler = require('./src/middleware/errorHandler');

// Import routes
const authRoutes = require('./src/routes/authRoutes');

// Initialize Express app
const app = express();

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(corsMiddleware);

// ============================================================================
// ROUTES
// ============================================================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API v1 routes
app.use('/api/auth', authRoutes);

// ============================================================================
// 404 HANDLER
// ============================================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// ============================================================================
// ERROR HANDLER (MUST BE LAST)
// ============================================================================

app.use(errorHandler);

// ============================================================================
// START SERVER
// ============================================================================

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     🚀 SkyBooking Backend Server 🚀    ║
╠════════════════════════════════════════╣
║ Environment: ${config.NODE_ENV.padEnd(24)}║
║ Port: ${PORT.toString().padEnd(30)}║
║ Database: ${config.DB_NAME.padEnd(27)}║
║ Frontend URL: ${config.FRONTEND_URL}  ║
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏹️  Server stopping...');
  process.exit(0);
});

module.exports = app;
