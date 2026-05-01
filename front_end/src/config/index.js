/**
 * ============================================================================
 * CONFIGURATION (config/index.js)
 * ============================================================================
 * 
 * FUNGSI:
 * File konfigurasi untuk setting aplikasi.
 * Nilai-nilai ini bisa diubah sesuai environment (development/production).
 * 
 * CARA PENGGUNAAN DI BACKEND:
 * 1. Ubah USE_MOCK_DATA ke false
 * 2. Ganti API_BASE_URL dengan URL backend
 * 3. Sesuaikan timeout dan setting lainnya
 * 
 * ENVIRONMENT VARIABLES (opsional):
 * Di Vite, gunakan prefix VITE_ untuk env variables
 * Contoh: VITE_API_URL=http://localhost:5000
 * 
 * ============================================================================
 */

const config = {
  // ========================================
  // API CONFIGURATION
  // ========================================
  
  /**
   * Base URL untuk API backend
   * 
   * DEVELOPMENT: http://localhost:5000
   * PRODUCTION: https://api.yourdomain.com
   * 
   * Cara ganti:
   * - Langsung edit nilai di bawah, ATAU
   * - Buat file .env dengan: VITE_API_URL=http://localhost:5000
   */
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  
  /**
   * Gunakan mock data (simulasi) atau API asli
   * 
   * true  = Gunakan data localStorage (untuk development frontend)
   * false = Gunakan API backend asli
   * 
   * ⚠️ PENTING: Set ke false saat integrasi backend!
   */
  USE_MOCK_DATA: true,
  
  /**
   * Timeout untuk API request (dalam milliseconds)
   * 30000 = 30 detik
   */
  API_TIMEOUT: 30000,
  
  // ========================================
  // AUTHENTICATION SETTINGS
  // ========================================
  
  /**
   * Nama key untuk menyimpan data di localStorage/cookies
   */
  STORAGE_KEYS: {
    TOKEN: 'skyBookingToken',
    USER: 'skyBookingUser',
    USERS: 'skyBookingUsers',    // Hanya untuk mock data
    ORDERS: 'skyBookingOrders',  // Hanya untuk mock data
  },
  
  /**
   * Token expiry time (untuk validasi di frontend)
   * Backend juga harus set expiry yang sama di JWT
   */
  TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 hari dalam milliseconds
  
  // ========================================
  // UI SETTINGS
  // ========================================
  
  /**
   * Jumlah item per halaman untuk pagination
   */
  ITEMS_PER_PAGE: 10,
  
  /**
   * Format tanggal yang digunakan (untuk display)
   */
  DATE_FORMAT: 'DD MMMM YYYY',
  TIME_FORMAT: 'HH:mm',
  
  /**
   * Currency settings
   */
  CURRENCY: {
    CODE: 'IDR',
    SYMBOL: 'Rp',
    LOCALE: 'id-ID',
  },
  
  // ========================================
  // VALIDATION RULES
  // ========================================
  
  VALIDATION: {
    PASSWORD_MIN_LENGTH: 6,
    PASSWORD_MAX_LENGTH: 100,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    PHONE_MIN_LENGTH: 10,
    PHONE_MAX_LENGTH: 15,
  },
  
  // ========================================
  // RATE LIMITING (FRONTEND)
  // ========================================
  
  RATE_LIMIT: {
    LOGIN_MAX_ATTEMPTS: 5,
    LOGIN_WINDOW_MS: 15 * 60 * 1000, // 15 menit
  },
  
  // ========================================
  // APP INFO
  // ========================================
  
  APP_NAME: 'SkyBooking',
  APP_VERSION: '1.0.0',
  
  /**
   * Contact info (untuk footer, dll)
   */
  CONTACT: {
    EMAIL: 'support@skybooking.com',
    PHONE: '+62-21-12345678',
    ADDRESS: 'Jakarta, Indonesia',
  },
  
  // ========================================
  // FEATURE FLAGS
  // ========================================
  
  FEATURES: {
    /**
     * Aktifkan/nonaktifkan fitur tertentu
     * Berguna untuk rollout bertahap
     */
    ENABLE_REGISTRATION: true,
    ENABLE_BOOKING: true,
    ENABLE_PAYMENT: false,         // Belum diimplementasi
    ENABLE_NOTIFICATION: false,    // Belum diimplementasi
    ENABLE_REVIEW: false,          // Belum diimplementasi
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Format harga ke format Rupiah
 * @param {number} amount - Jumlah uang
 * @returns {string} - Format: "Rp 1.000.000"
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat(config.CURRENCY.LOCALE, {
    style: 'currency',
    currency: config.CURRENCY.CODE,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format tanggal ke format Indonesia
 * @param {string|Date} date - Tanggal
 * @returns {string} - Format: "25 Desember 2024"
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

/**
 * Format waktu ke format Indonesia
 * @param {string} time - Waktu (format: "HH:MM")
 * @returns {string} - Format: "14:30"
 */
export function formatTime(time) {
  return time; // Sudah dalam format yang benar
}

// ============================================================================
// ENVIRONMENT CHECK
// ============================================================================

/**
 * Cek apakah sedang di development mode
 */
export const isDevelopment = import.meta.env.DEV;

/**
 * Cek apakah sedang di production mode
 */
export const isProduction = import.meta.env.PROD;

// Log config di development untuk debugging
if (isDevelopment) {
  console.log('[CONFIG] Environment:', import.meta.env.MODE);
  console.log('[CONFIG] API URL:', config.API_BASE_URL);
  console.log('[CONFIG] Mock Data:', config.USE_MOCK_DATA);
}

export default config;
