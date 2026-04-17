/**
 * ============================================================================
 * AIRLINE MODEL (src/models/Airline.js)
 * ============================================================================
 */

const pool = require('../config/database');

class Airline {
  /**
   * Get all airlines
   */
  static async getAll() {
    const [rows] = await pool.query(
      'SELECT airline_id, airline_code, airline_name, logo_url, country FROM airlines ORDER BY airline_name ASC'
    );
    return rows;
  }

  /**
   * Get airline by ID
   */
  static async getById(airlineId) {
    const [rows] = await pool.query(
      'SELECT * FROM airlines WHERE airline_id = ?',
      [airlineId]
    );
    return rows[0];
  }

  /**
   * Get airline by code
   */
  static async getByCode(airlineCode) {
    const [rows] = await pool.query(
      'SELECT * FROM airlines WHERE airline_code = ?',
      [airlineCode]
    );
    return rows[0];
  }

  /**
   * Create new airline
   */
  static async create(airlineData) {
    const { airline_code, airline_name, logo_url, country, total_aircraft } = airlineData;
    const [result] = await pool.query(
      `INSERT INTO airlines (airline_code, airline_name, logo_url, country, total_aircraft)
       VALUES (?, ?, ?, ?, ?)`,
      [airline_code, airline_name, logo_url, country, total_aircraft]
    );
    return result;
  }
}

module.exports = Airline;
