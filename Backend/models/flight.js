const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Model Flight
 * Menyesuaikan dengan kebutuhan FlightDetail.jsx di Frontend
 */
const Flight = sequelize.define('Flight', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  airlineName: {
    type: DataTypes.STRING,
    allowNull: false // Contoh: "Garuda Indonesia"
  },
  flightNumber: {
    type: DataTypes.STRING,
    allowNull: false // Contoh: "GA-123"
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true // URL gambar atau path logo maskapai
  },
  fromCity: {
    type: DataTypes.STRING,
    allowNull: false // Contoh: "Jakarta"
  },
  // Disamakan dengan flight.from di FlightDetail.jsx
  from: {
    type: DataTypes.STRING(10),
    allowNull: false // Contoh: "CGK"
  },
  toCity: {
    type: DataTypes.STRING,
    allowNull: false // Contoh: "Bali"
  },
  // Disamakan dengan flight.to di FlightDetail.jsx
  to: {
    type: DataTypes.STRING(10),
    allowNull: false // Contoh: "DPS"
  },
  departureTime: {
    type: DataTypes.STRING,
    allowNull: false // Contoh: "08:00"
  },
  arrivalTime: {
    type: DataTypes.STRING,
    allowNull: false // Contoh: "10:30"
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false // Contoh: "2j 30m"
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false // Contoh: 1200000
  },
  class: {
    type: DataTypes.STRING, // Menggunakan STRING agar lebih fleksibel dibanding ENUM
    defaultValue: 'Economy'
  },
  seatsAvailable: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true, // Membuat createdAt & updatedAt otomatis
  tableName: 'flights'
});

module.exports = Flight;