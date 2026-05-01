const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt'); // Direkomendasikan untuk keamanan password

/**
 * Model User
 * Menjadi referensi utama untuk proses login di Login.jsx
 */
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Email tidak boleh ganda
    validate: {
      isEmail: true // Memastikan format email benar
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
    // Di controller, password ini harus di-hash menggunakan bcrypt
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('User', 'Admin'),
    defaultValue: 'User'
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'https://via.placeholder.com/150'
  }
}, {
  timestamps: true, // Mencatat waktu pendaftaran (createdAt)
  tableName: 'users',
  hooks: {
    // Hook otomatis untuk mengenkripsi password sebelum disimpan ke database
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Method untuk mengecek kecocokan password saat login
User.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;