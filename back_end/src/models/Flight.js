/**
 * ============================================================================
 * FLIGHT MODEL (src/models/Flight.js)
 * ============================================================================
 */

const pool = require('../config/database');

class Flight {
  /**
   * Get all flights dengan filter
   */
  static async getAll(filters = {}, limit = 20, offset = 0) {
    let query = `
      SELECT f.flight_id, f.flight_number, f.departure_time, f.arrival_time, 
             f.duration_minutes, f.aircraft_type, f.available_seats, f.total_seats,
             f.economy_price, f.business_price, f.first_class_price, f.status,
             al.airline_id, al.airline_code, al.airline_name, al.logo_url,
             dep.airport_code as departure_code, dep.airport_name as departure_name,
             arr.airport_code as arrival_code, arr.airport_name as arrival_name
      FROM flights f
      JOIN airlines al ON f.airline_id = al.airline_id
      JOIN airports dep ON f.departure_airport = dep.airport_id
      JOIN airports arr ON f.arrival_airport = arr.airport_id
      WHERE 1=1
    `;

    const params = [];

    if (filters.departure_airport) {
      query += ` AND f.departure_airport = ?`;
      params.push(filters.departure_airport);
    }

    if (filters.arrival_airport) {
      query += ` AND f.arrival_airport = ?`;
      params.push(filters.arrival_airport);
    }

    if (filters.flight_date) {
      query += ` AND DATE(f.departure_time) = ?`;
      params.push(filters.flight_date);
    }

    if (filters.status) {
      query += ` AND f.status = ?`;
      params.push(filters.status);
    }

    query += ` ORDER BY f.departure_time ASC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [rows] = await pool.query(query, params);
    return rows;
  }

  /**
   * Get flight by ID
   */
  static async getById(flightId) {
    const [rows] = await pool.query(
      `SELECT f.*, 
              al.airline_code, al.airline_name, al.logo_url,
              dep.airport_code as departure_code, dep.airport_name as departure_name, dep.city as departure_city,
              arr.airport_code as arrival_code, arr.airport_name as arrival_name, arr.city as arrival_city
       FROM flights f
       JOIN airlines al ON f.airline_id = al.airline_id
       JOIN airports dep ON f.departure_airport = dep.airport_id
       JOIN airports arr ON f.arrival_airport = arr.airport_id
       WHERE f.flight_id = ?`,
      [flightId]
    );
    return rows[0];
  }

  /**
   * Create new flight
   */
  static async create(flightData) {
    const {
      flight_number,
      airline_id,
      departure_airport,
      arrival_airport,
      departure_time,
      arrival_time,
      duration_minutes,
      aircraft_type,
      total_seats,
      economy_price,
      business_price,
      first_class_price,
      flight_date,
    } = flightData;

    const [result] = await pool.query(
      `INSERT INTO flights (flight_number, airline_id, departure_airport, arrival_airport, 
                            departure_time, arrival_time, duration_minutes, aircraft_type, 
                            total_seats, available_seats, economy_price, business_price, 
                            first_class_price, flight_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        flight_number,
        airline_id,
        departure_airport,
        arrival_airport,
        departure_time,
        arrival_time,
        duration_minutes,
        aircraft_type,
        total_seats,
        total_seats,
        economy_price,
        business_price,
        first_class_price,
        flight_date,
      ]
    );

    return result;
  }

  /**
   * Update available seats
   */
  static async updateAvailableSeats(flightId, quantity) {
    const [result] = await pool.query(
      `UPDATE flights 
       SET available_seats = available_seats - ?, updated_at = CURRENT_TIMESTAMP
       WHERE flight_id = ?`,
      [quantity, flightId]
    );
    return result;
  }

  /**
   * Update flight status
   */
  static async updateStatus(flightId, status) {
    const [result] = await pool.query(
      `UPDATE flights 
       SET status = ?, updated_at = CURRENT_TIMESTAMP
       WHERE flight_id = ?`,
      [status, flightId]
    );
    return result;
  }
}

module.exports = Flight;
