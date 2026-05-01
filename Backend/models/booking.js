const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

/**
 * Model Booking
 * Menyesuaikan dengan data yang dikirim dari Booking.jsx (Frontend)
 */
const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Relasi ke Flight (ID penerbangan yang dipilih)
  flightId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Informasi Kontak (contactInfo state)
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true }
  },
  contactPhone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Detail Penumpang (Disimpan sebagai JSON agar fleksibel untuk banyak orang)
  // Berisi: title, firstName, lastName, birthDate, nationality
  passengersData: {
    type: DataTypes.JSON,
    allowNull: false
  },
  // Informasi Pembayaran & Promo
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false // bank_transfer, credit_card, ewallet, virtual_account
  },
  promoCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Rincian Harga
  basePrice: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  discountAmount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Status Transaksi
  status: {
    type: DataTypes.ENUM('Pending', 'Paid', 'Cancelled'),
    defaultValue: 'Pending'
  }
}, {
  timestamps: true,
  tableName: 'bookings'
});

module.exports = Booking;