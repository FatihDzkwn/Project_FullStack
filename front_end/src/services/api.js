/**
 * ============================================================================
 * API SERVICE LAYER (api.js)
 * ============================================================================
 * 
 * FUNGSI:
 * File ini berisi semua fungsi untuk berkomunikasi dengan backend.
 * Saat ini menggunakan data simulasi, tapi sudah siap untuk integrasi API.
 * 
 * CARA INTEGRASI BACKEND:
 * 1. Ganti URL di config/index.js
 * 2. Uncomment kode fetch() dan hapus simulasi
 * 3. Sesuaikan response format dengan API backend
 * 
 * ENDPOINT YANG DIPERLUKAN:
 * POST   /api/auth/login        - Login user
 * POST   /api/auth/register     - Register user
 * GET    /api/auth/me           - Get current user
 * POST   /api/auth/logout       - Logout
 * 
 * GET    /api/flights           - List flights dengan filter
 * GET    /api/flights/:id       - Detail satu flight
 * 
 * POST   /api/bookings          - Buat booking baru
 * GET    /api/bookings          - List booking user
 * GET    /api/bookings/:id      - Detail booking
 * DELETE /api/bookings/:id      - Cancel booking
 * 
 * GET    /api/airports          - List airports
 * GET    /api/airlines          - List airlines
 * 
 * ============================================================================
 */

import { getAuthToken, setAuthToken, removeAuthToken } from '../utils/security';
import config from '../config';

// ============================================================================
// BASE API FUNCTION
// ============================================================================

/**
 * apiRequest
 * Fungsi dasar untuk melakukan HTTP request ke backend
 * Menangani token, error, dan response format secara otomatis
 * 
 * @param {string} endpoint - Endpoint API (tanpa base URL)
 * @param {Object} options - Opsi request { method, body, headers }
 * @returns {Promise<Object>} - Response data
 * @throws {Error} - Jika request gagal
 * 
 * CONTOH:
 * const data = await apiRequest('/api/flights', { method: 'GET' });
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${config.API_BASE_URL}${endpoint}`;
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Tambahkan token jika ada
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // ========================================
  // SIMULASI - Hapus ini saat integrasi backend
  // ========================================
  if (config.USE_MOCK_DATA) {
    console.log(`[API SIMULASI] ${options.method || 'GET'} ${endpoint}`);
    // Return mock data atau throw error tergantung endpoint
    return handleMockRequest(endpoint, options);
  }
  // ========================================
  
  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    
    // Parse response
    const data = await response.json();
    
    // Handle error responses
    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error(`[API ERROR] ${endpoint}:`, error);
    throw error;
  }
}

// ============================================================================
// AUTHENTICATION API
// ============================================================================

/**
 * authAPI
 * Kumpulan fungsi untuk autentikasi
 * 
 * ENDPOINT BACKEND YANG DIPERLUKAN:
 * 
 * POST /api/auth/login
 * Request: { email: string, password: string }
 * Response: { success: boolean, user: object, token: string }
 * 
 * POST /api/auth/register  
 * Request: { name: string, email: string, password: string, phone?: string }
 * Response: { success: boolean, user: object, token: string }
 * 
 * GET /api/auth/me
 * Headers: Authorization: Bearer <token>
 * Response: { success: boolean, user: object }
 * 
 * POST /api/auth/logout
 * Headers: Authorization: Bearer <token>
 * Response: { success: boolean }
 */
export const authAPI = {
  /**
   * Login user
   * @param {string} email - Email user
   * @param {string} password - Password (plain text, akan di-hash di backend)
   * @returns {Promise<Object>} - { user, token }
   */
  async login(email, password) {
    const response = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },
  
  /**
   * Register user baru
   * @param {Object} userData - { name, email, password, phone }
   * @returns {Promise<Object>} - { user, token }
   */
  async register(userData) {
    const response = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: userData
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },
  
  /**
   * Get current logged in user
   * @returns {Promise<Object>} - { user }
   */
  async getCurrentUser() {
    return await apiRequest('/api/auth/me');
  },
  
  /**
   * Logout
   */
  async logout() {
    try {
      await apiRequest('/api/auth/logout', { method: 'POST' });
    } finally {
      removeAuthToken();
    }
  }
};

// ============================================================================
// FLIGHTS API
// ============================================================================

/**
 * flightAPI
 * Kumpulan fungsi untuk data penerbangan
 * 
 * ENDPOINT BACKEND YANG DIPERLUKAN:
 * 
 * GET /api/flights
 * Query: { from, to, date, passengers, class }
 * Response: { success: boolean, flights: array }
 * 
 * GET /api/flights/:id
 * Response: { success: boolean, flight: object }
 * 
 * GET /api/airports
 * Response: { success: boolean, airports: array }
 * 
 * GET /api/airlines
 * Response: { success: boolean, airlines: array }
 */
export const flightAPI = {
  /**
   * Cari penerbangan berdasarkan filter
   * @param {Object} filters - { from, to, date, passengers, class }
   * @returns {Promise<Array>} - Array of flights
   */
  async search(filters) {
    const params = new URLSearchParams(filters);
    const response = await apiRequest(`/api/flights?${params}`);
    return response.flights || [];
  },
  
  /**
   * Get detail satu penerbangan
   * @param {string} flightId - ID penerbangan
   * @returns {Promise<Object>} - Flight detail
   */
  async getById(flightId) {
    const response = await apiRequest(`/api/flights/${flightId}`);
    return response.flight;
  },
  
  /**
   * Get semua airports
   * @returns {Promise<Array>} - Array of airports
   */
  async getAirports() {
    const response = await apiRequest('/api/airports');
    return response.airports || [];
  },
  
  /**
   * Get semua airlines
   * @returns {Promise<Array>} - Array of airlines
   */
  async getAirlines() {
    const response = await apiRequest('/api/airlines');
    return response.airlines || [];
  }
};

// ============================================================================
// BOOKINGS API
// ============================================================================

/**
 * bookingAPI
 * Kumpulan fungsi untuk booking
 * 
 * ENDPOINT BACKEND YANG DIPERLUKAN:
 * 
 * POST /api/bookings
 * Headers: Authorization required
 * Request: { flightId, passengers: array, contactInfo: object }
 * Response: { success: boolean, booking: object }
 * 
 * GET /api/bookings
 * Headers: Authorization required
 * Response: { success: boolean, bookings: array }
 * 
 * GET /api/bookings/:id
 * Headers: Authorization required
 * Response: { success: boolean, booking: object }
 * 
 * DELETE /api/bookings/:id
 * Headers: Authorization required
 * Response: { success: boolean }
 */
export const bookingAPI = {
  /**
   * Buat booking baru
   * @param {Object} bookingData - { flightId, passengers, contactInfo }
   * @returns {Promise<Object>} - Booking yang dibuat
   */
  async create(bookingData) {
    const response = await apiRequest('/api/bookings', {
      method: 'POST',
      body: bookingData
    });
    return response.booking;
  },
  
  /**
   * Get semua booking user yang login
   * @returns {Promise<Array>} - Array of bookings
   */
  async getMyBookings() {
    const response = await apiRequest('/api/bookings');
    return response.bookings || [];
  },
  
  /**
   * Get detail satu booking
   * @param {string} bookingId - ID booking
   * @returns {Promise<Object>} - Booking detail
   */
  async getById(bookingId) {
    const response = await apiRequest(`/api/bookings/${bookingId}`);
    return response.booking;
  },
  
  /**
   * Cancel booking
   * @param {string} bookingId - ID booking
   * @returns {Promise<boolean>} - Success status
   */
  async cancel(bookingId) {
    await apiRequest(`/api/bookings/${bookingId}`, {
      method: 'DELETE'
    });
    return true;
  }
};

// ============================================================================
// MOCK DATA HANDLER (SIMULASI)
// ============================================================================

/**
 * handleMockRequest
 * Handler untuk simulasi API saat belum ada backend
 * 
 * ⚠️ HAPUS FUNGSI INI SAAT INTEGRASI BACKEND
 * 
 * @param {string} endpoint - Endpoint yang dipanggil
 * @param {Object} options - Request options
 * @returns {Object} - Mock response
 */
function handleMockRequest(endpoint, options) {
  // Import data simulasi
  const users = JSON.parse(localStorage.getItem('skyBookingUsers') || '[]');
  const orders = JSON.parse(localStorage.getItem('skyBookingOrders') || '[]');
  const currentUser = JSON.parse(localStorage.getItem('skyBookingUser') || 'null');
  
  // Simulasi delay seperti network request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // AUTH ENDPOINTS
      if (endpoint === '/api/auth/login' && options.method === 'POST') {
        const { email, password } = options.body;
        const { hashPassword, verifyPassword } = require('../utils/security');
        
        const user = users.find(u => u.email === email);
        if (!user) {
          reject(new Error('Email tidak ditemukan'));
          return;
        }
        
        // Verifikasi password (untuk user lama mungkin masih plain text)
        const isValidOld = user.password === password;
        const isValidNew = user.password?.startsWith('simhash_') && 
          verifyPassword(password, user.password);
        
        if (!isValidOld && !isValidNew) {
          reject(new Error('Password salah'));
          return;
        }
        
        const { password: _, ...userWithoutPassword } = user;
        resolve({ 
          success: true, 
          user: userWithoutPassword,
          token: 'mock_token_' + Date.now()
        });
      }
      
      else if (endpoint === '/api/auth/register' && options.method === 'POST') {
        const { email, password, ...otherData } = options.body;
        const { hashPassword } = require('../utils/security');
        
        if (users.some(u => u.email === email)) {
          reject(new Error('Email sudah terdaftar'));
          return;
        }
        
        const newUser = {
          id: Date.now().toString(),
          email,
          password: hashPassword(password), // Hash password!
          ...otherData,
          createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('skyBookingUsers', JSON.stringify(users));
        
        const { password: _, ...userWithoutPassword } = newUser;
        resolve({
          success: true,
          user: userWithoutPassword,
          token: 'mock_token_' + Date.now()
        });
      }
      
      else if (endpoint === '/api/auth/me') {
        if (!currentUser) {
          reject(new Error('Unauthorized'));
          return;
        }
        resolve({ success: true, user: currentUser });
      }
      
      else if (endpoint === '/api/auth/logout') {
        resolve({ success: true });
      }
      
      // BOOKINGS ENDPOINTS
      else if (endpoint === '/api/bookings' && options.method === 'GET') {
        if (!currentUser) {
          reject(new Error('Unauthorized'));
          return;
        }
        const userBookings = orders.filter(o => o.userId === currentUser.id);
        resolve({ success: true, bookings: userBookings });
      }
      
      else if (endpoint === '/api/bookings' && options.method === 'POST') {
        if (!currentUser) {
          reject(new Error('Unauthorized'));
          return;
        }
        const booking = {
          id: 'BK' + Date.now(),
          userId: currentUser.id,
          ...options.body,
          status: 'confirmed',
          createdAt: new Date().toISOString()
        };
        orders.push(booking);
        localStorage.setItem('skyBookingOrders', JSON.stringify(orders));
        resolve({ success: true, booking });
      }
      
      // Default: endpoint tidak ditemukan
      else {
        console.warn(`[MOCK] Endpoint tidak ada: ${endpoint}`);
        resolve({ success: true, data: null });
      }
    }, 300); // Simulasi delay 300ms
  });
}

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export default {
  auth: authAPI,
  flights: flightAPI,
  bookings: bookingAPI
};
