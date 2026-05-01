/**
 * ============================================================================
 * FLIGHT CONTROLLER
 * ============================================================================
 * * FUNGSI:
 * Mengelola logika pengambilan data penerbangan dari database.
 * * HUBUNGAN DENGAN FRONTEND:
 * Menyediakan endpoint API yang dikonsumsi oleh FlightDetail.jsx
 * melalui fungsi fetch atau axios.
 * * ============================================================================
 */

const Flight = require('../models/flight');
const { Op } = require('sequelize');

const flightController = {
  /**
   * getAllFlights
   * Digunakan untuk halaman pencarian (FlightCard)
   */
  getAllFlights: async (req, res) => {
    try {
      const flights = await Flight.findAll();
      res.status(200).json({
        success: true,
        data: flights
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Gagal mengambil data penerbangan',
        error: error.message
      });
    }
  },

  /**
   * getFlightById
   * Fungsi ini adalah pasangan backend untuk FlightDetail.jsx
   * Mengambil detail satu penerbangan berdasarkan ID dari URL
   */
  getFlightById: async (req, res) => {
    try {
      // Mengambil ID dari parameter URL (misal: /api/flights/1)
      const { id } = req.params;

      const flight = await Flight.findByPk(id);

      // Jika data tidak ditemukan (Sesuai dengan logika if (!flight) di JSX)
      if (!flight) {
        return res.status(404).json({
          success: false,
          message: 'Penerbangan Tidak Ditemukan'
        });
      }

      res.status(200).json({
        success: true,
        data: flight
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message
      });
    }
  },

  /**
   * searchFlights
   * Untuk memproses filter pencarian dari Beranda
   */
  searchFlights: async (req, res) => {
    try {
      const { from, to, date } = req.query;
      
      const flights = await Flight.findAll({
        where: {
          from: from,
          to: to,
          // Tambahkan filter tanggal jika kolom tersedia di DB
        }
      });

      res.status(200).json({
        success: true,
        count: flights.length,
        data: flights
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

module.exports = flightController;