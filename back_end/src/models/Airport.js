/**
 * ============================================================================
 * AIRPORT MODEL (src/models/Airport.js)
 * ============================================================================
 */

const pool = require('../config/database');

class Airport {
  /**
   * Get all airports
   */
  static async getAll() {
    const [rows] = await pool.query(
      'SELECT airport_id, airport_code, airport_name, city, country, timezone FROM airports ORDER BY airport_name ASC'
    );
    return rows;
  }

  /**
   * Get airport by ID
   */
  static async getById(airportId) {
    const [rows] = await pool.query(
      'SELECT * FROM airports WHERE airport_id = ?',
      [airportId]
    );
    return rows[0];
  }

  /**
   * Get airport by code (IATA)
   */
  static async getByCode(airportCode) {
    const [rows] = await pool.query(
      'SELECT * FROM airports WHERE airport_code = ?',
      [airportCode]
    );
    return rows[0];
  }

  /**
   * Create new airport
   */
  static async create(airportData) {
    const { airport_code, airport_name, city, country, timezone } = airportData;
    const [result] = await pool.query(
      `INSERT INTO airports (airport_code, airport_name, city, country, timezone)
       VALUES (?, ?, ?, ?, ?)`,
      [airport_code, airport_name, city, country, timezone]
    );
    return result;
  }
}

module.exports = Airport;
