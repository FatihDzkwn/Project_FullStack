/**
 * ============================================================================
 * USER MODEL (src/models/User.js)
 * ============================================================================
 * 
 * Database operations untuk tabel USERS
 * 
 * ============================================================================
 */

const pool = require('../config/database');
const { hashPassword } = require('../utils/bcrypt');

class User {
  /**
   * Get user by ID
   */
  static async getById(userId) {
    const [rows] = await pool.query(
      'SELECT user_id, name, email, phone, nik, birth_date, gender, address, city, country, postal_code, nationality, role, created_at FROM users WHERE user_id = ?',
      [userId]
    );
    return rows[0];
  }

  /**
   * Get user by email
   */
  static async getByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  /**
   * Create new user
   */
  static async create(userData) {
    const { name, email, phone, password, nik, birth_date, gender, nationality } = userData;
    const hashedPassword = await hashPassword(password);

    const [result] = await pool.query(
      `INSERT INTO users (name, email, phone, password_hash, nik, birth_date, gender, nationality)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, hashedPassword, nik, birth_date, gender, nationality]
    );

    return {
      user_id: result.insertId,
      name,
      email,
      phone,
      nik,
      birth_date,
      gender,
      nationality,
      created_at: new Date(),
    };
  }

  /**
   * Update user profile
   */
  static async update(userId, userData) {
    const { name, phone, address, city, country, postal_code } = userData;

    await pool.query(
      `UPDATE users 
       SET name = ?, phone = ?, address = ?, city = ?, country = ?, postal_code = ?, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ?`,
      [name, phone, address, city, country, postal_code, userId]
    );

    const [rows] = await pool.query(
      'SELECT user_id, name, email, phone, nik, address, city, country, postal_code, nationality, role FROM users WHERE user_id = ?',
      [userId]
    );

    return rows[0];
  }

  /**
   * Update last login
   */
  static async updateLastLogin(userId) {
    await pool.query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?',
      [userId]
    );
  }

  /**
   * Get all users (for admin)
   */
  static async getAll(limit = 20, offset = 0) {
    const [rows] = await pool.query(
      `SELECT user_id, name, email, phone, nik, gender, role, created_at 
       FROM users 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [countRows] = await pool.query('SELECT COUNT(*) as total FROM users');
    const total = countRows[0].total;

    return {
      data: rows,
      total,
    };
  }
}

module.exports = User;
