/**
 * ============================================================================
 * AUTH CONTROLLER (src/controllers/authController.js)
 * ============================================================================
 * 
 * Handler untuk authentication: register, login, logout, profile
 * 
 * ============================================================================
 */

const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { hashPassword, verifyPassword } = require('../utils/bcrypt');
const { sendSuccess, sendError } = require('../utils/response');
const { isValidEmail, isValidPassword, sanitizeInput } = require('../utils/validation');

/**
 * POST /api/auth/register
 * Register user baru
 */
async function register(req, res) {
  try {
    const { name, email, phone, password, password_confirm, nik, birth_date, gender, nationality } = req.body;

    // Validasi input
    if (!name || !email || !phone || !password || !password_confirm) {
      return sendError(res, 400, 'All fields are required');
    }

    if (!isValidEmail(email)) {
      return sendError(res, 400, 'Invalid email format');
    }

    if (!isValidPassword(password)) {
      return sendError(res, 400, 'Password must be at least 6 characters with uppercase, lowercase, and numbers');
    }

    if (password !== password_confirm) {
      return sendError(res, 400, 'Passwords do not match');
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await User.getByEmail(email);
    if (existingUser) {
      return sendError(res, 409, 'Email already registered');
    }

    // Create user
    const user = await User.create({
      name: sanitizeInput(name),
      email: email.toLowerCase(),
      phone,
      password,
      nik,
      birth_date,
      gender,
      nationality,
    });

    // Generate token
    const token = generateToken({
      user_id: user.user_id,
      email: user.email,
      role: 'user',
    });

    sendSuccess(res, 201, 'Registration successful', {
      user,
      token,
    });
  } catch (error) {
    console.error('Register error:', error);
    sendError(res, 500, 'Internal server error');
  }
}

/**
 * POST /api/auth/login
 * Login user
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return sendError(res, 400, 'Email and password are required');
    }

    // Cari user
    const user = await User.getByEmail(email);
    if (!user) {
      return sendError(res, 401, 'Invalid email or password');
    }

    // Verify password
    const isValidPassword_ = await verifyPassword(password, user.password_hash);
    if (!isValidPassword_) {
      return sendError(res, 401, 'Invalid email or password');
    }

    // Update last login
    await User.updateLastLogin(user.user_id);

    // Generate token
    const token = generateToken({
      user_id: user.user_id,
      email: user.email,
      role: user.role,
    });

    sendSuccess(res, 200, 'Login successful', {
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    sendError(res, 500, 'Internal server error');
  }
}

/**
 * GET /api/auth/me
 * Get current user profile
 */
async function getCurrentUser(req, res) {
  try {
    const userId = req.user.user_id;

    const user = await User.getById(userId);
    if (!user) {
      return sendError(res, 404, 'User not found');
    }

    sendSuccess(res, 200, 'User profile retrieved', user);
  } catch (error) {
    console.error('Get current user error:', error);
    sendError(res, 500, 'Internal server error');
  }
}

/**
 * PUT /api/auth/profile
 * Update user profile
 */
async function updateProfile(req, res) {
  try {
    const userId = req.user.user_id;
    const { name, phone, address, city, country, postal_code } = req.body;

    const user = await User.update(userId, {
      name: sanitizeInput(name),
      phone,
      address,
      city,
      country,
      postal_code,
    });

    sendSuccess(res, 200, 'Profile updated successfully', user);
  } catch (error) {
    console.error('Update profile error:', error);
    sendError(res, 500, 'Internal server error');
  }
}

/**
 * POST /api/auth/logout
 * Logout user
 */
async function logout(req, res) {
  try {
    // Di client-side, hapus token dari localStorage
    sendSuccess(res, 200, 'Logout successful');
  } catch (error) {
    console.error('Logout error:', error);
    sendError(res, 500, 'Internal server error');
  }
}

module.exports = {
  register,
  login,
  getCurrentUser,
  updateProfile,
  logout,
};
