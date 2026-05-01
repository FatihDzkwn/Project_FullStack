const db = require("../config/db");

/**
 * ============================================================================
 * AUTH CONTROLLER (authController.js)
 * ============================================================================
 * 
 * FUNGSI: Menangani alur masuk/keluar user (Login & Register).
 * PASANGAN FRONTEND: Login.jsx, Register.jsx, useAuth().
 */

const authController = {
  // --------------------------------------------------------------------------
  // REGISTER HANDLER (Menerima data dari Register.jsx)
  // --------------------------------------------------------------------------
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // 1. Validasi di sisi server (Security Layer)
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Field tidak boleh kosong!" });
      }

      // 2. Simulasi simpan ke database (MySQL/PostgreSQL)
      // Di sini kamu biasanya melakukan hashing password (bcrypt)
      console.log(`User Baru Terdaftar: ${name} (${email})`);

      // 3. Berikan respon sukses
      res.status(201).json({
        success: true,
        message: "Registrasi berhasil!",
        user: { name, email } // Jangan kirim password kembali!
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Terjadi kesalahan server." });
    }
  },

  // --------------------------------------------------------------------------
  // LOGIN HANDLER (Menerima data dari Login.jsx)
  // --------------------------------------------------------------------------
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // 1. Cek kredensial (Simulasi pencarian di DB)
      // Jika menggunakan JWT, buat token di sini
      if (email === "test@email.com" && password === "123456") {
        return res.status(200).json({
          success: true,
          message: "Login Berhasil!",
          token: "dummy-jwt-token",
          user: { name: "John Doe", email: email }
        });
      }

      // 2. Jika gagal
      res.status(401).json({ success: false, message: "Email atau Password salah!" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Terjadi kesalahan server." });
    }
  },

  // --------------------------------------------------------------------------
  // LOGOUT HANDLER
  // --------------------------------------------------------------------------
  logout: (req, res) => {
    // Hapus session atau token
    res.status(200).json({ success: true, message: "Berhasil keluar." });
  }
};

module.exports = authController;