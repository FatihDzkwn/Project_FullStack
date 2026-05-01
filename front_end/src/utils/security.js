/**
 * ============================================================================
 * SECURITY UTILITIES (security.js)
 * ============================================================================
 * 
 * FUNGSI:
 * Kumpulan fungsi untuk keamanan website seperti:
 * - Sanitasi input (mencegah XSS)
 * - Hash password (untuk simulasi, backend gunakan bcrypt)
 * - Validasi input
 * 
 * CATATAN UNTUK BACKEND:
 * - Fungsi hashPassword di sini HANYA untuk simulasi
 * - Di production, gunakan bcrypt di backend
 * - Password TIDAK boleh di-hash di frontend
 * 
 * ============================================================================
 */

// ============================================================================
// SANITASI INPUT - Mencegah XSS (Cross-Site Scripting)
// ============================================================================

/**
 * sanitizeInput
 * Membersihkan input dari karakter berbahaya yang bisa menyebabkan XSS
 * 
 * XSS adalah serangan dimana hacker menyisipkan kode JavaScript
 * ke dalam input form. Contoh:
 * - Input: <script>alert('hacked!')</script>
 * - Jika tidak disanitasi, kode tersebut bisa dijalankan di browser
 * 
 * @param {string} input - String yang akan dibersihkan
 * @returns {string} - String yang sudah aman
 * 
 * CONTOH:
 * sanitizeInput("<script>alert('xss')</script>")
 * // Output: "&lt;script&gt;alert('xss')&lt;/script&gt;"
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  
  // Map karakter berbahaya ke versi HTML entity yang aman
  const map = {
    '&': '&amp;',   // Ampersand
    '<': '&lt;',    // Less than (mencegah tag HTML)
    '>': '&gt;',    // Greater than (mencegah tag HTML)
    '"': '&quot;',  // Double quote
    "'": '&#x27;',  // Single quote
    '/': '&#x2F;',  // Forward slash
    '`': '&#x60;',  // Backtick
    '=': '&#x3D;',  // Equals
  };
  
  // Ganti setiap karakter berbahaya
  return input.replace(/[&<>"'`=/]/g, char => map[char]);
}

/**
 * sanitizeObject
 * Sanitasi semua nilai string dalam sebuah object
 * 
 * @param {Object} obj - Object yang akan disanitasi
 * @returns {Object} - Object dengan semua string tersanitasi
 */
export function sanitizeObject(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  const sanitized = {};
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      sanitized[key] = sanitizeInput(obj[key]);
    } else if (typeof obj[key] === 'object') {
      sanitized[key] = sanitizeObject(obj[key]);
    } else {
      sanitized[key] = obj[key];
    }
  }
  return sanitized;
}

// ============================================================================
// VALIDASI INPUT
// ============================================================================

/**
 * validateEmail
 * Memeriksa apakah format email valid
 * 
 * @param {string} email - Email yang akan divalidasi
 * @returns {boolean} - true jika valid, false jika tidak
 */
export function validateEmail(email) {
  // Regex untuk validasi email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * validatePassword
 * Memeriksa kekuatan password
 * 
 * @param {string} password - Password yang akan divalidasi
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
export function validatePassword(password) {
  const errors = [];
  
  if (!password || password.length < 6) {
    errors.push('Password minimal 6 karakter');
  }
  if (password.length > 100) {
    errors.push('Password maksimal 100 karakter');
  }
  // Opsional: tambahkan validasi kompleksitas
  // if (!/[A-Z]/.test(password)) {
  //   errors.push('Password harus mengandung huruf besar');
  // }
  // if (!/[0-9]/.test(password)) {
  //   errors.push('Password harus mengandung angka');
  // }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * validatePhone
 * Memeriksa apakah format nomor telepon valid (Indonesia)
 * 
 * @param {string} phone - Nomor telepon
 * @returns {boolean} - true jika valid
 */
export function validatePhone(phone) {
  // Format: 08xxxxxxxxxx atau +62xxxxxxxxxx
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{7,11}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

/**
 * validateName
 * Memeriksa apakah nama valid
 * 
 * @param {string} name - Nama yang akan divalidasi
 * @returns {Object} - { isValid: boolean, error?: string }
 */
export function validateName(name) {
  if (!name || name.trim().length < 2) {
    return { isValid: false, error: 'Nama minimal 2 karakter' };
  }
  if (name.length > 100) {
    return { isValid: false, error: 'Nama maksimal 100 karakter' };
  }
  // Hanya huruf, spasi, dan tanda baca umum
  if (!/^[a-zA-Z\s'.,-]+$/.test(name)) {
    return { isValid: false, error: 'Nama hanya boleh mengandung huruf' };
  }
  return { isValid: true };
}

// ============================================================================
// HASH PASSWORD (SIMULASI - UNTUK DEMO SAJA)
// ============================================================================

/**
 * hashPassword
 * SIMULASI hash password untuk frontend
 * 
 * ⚠️ PERINGATAN PENTING:
 * - Ini BUKAN hash yang aman untuk production!
 * - Di production, WAJIB gunakan bcrypt di BACKEND
 * - Password TIDAK boleh di-hash di frontend
 * - Ini hanya untuk simulasi agar tidak menyimpan plain text
 * 
 * @param {string} password - Password plain text
 * @returns {string} - Password yang sudah di-hash (simulasi)
 */
export function hashPassword(password) {
  // Simple hash untuk simulasi (TIDAK AMAN untuk production)
  // Menggunakan btoa (base64) + reverse + btoa lagi
  // Backend harus ganti dengan bcrypt.hash()
  let hash = btoa(password);
  hash = hash.split('').reverse().join('');
  hash = btoa(hash);
  return `simhash_${hash}`;
}

/**
 * verifyPassword
 * SIMULASI verifikasi password
 * 
 * ⚠️ UNTUK DEMO SAJA - Backend gunakan bcrypt.compare()
 * 
 * @param {string} password - Password plain text dari user
 * @param {string} hashedPassword - Password yang tersimpan (sudah di-hash)
 * @returns {boolean} - true jika cocok
 */
export function verifyPassword(password, hashedPassword) {
  return hashPassword(password) === hashedPassword;
}

// ============================================================================
// KEAMANAN TOKEN (UNTUK INTEGRASI BACKEND NANTI)
// ============================================================================

/**
 * setAuthToken
 * Menyimpan token JWT dengan aman
 * 
 * @param {string} token - JWT token dari backend
 */
export function setAuthToken(token) {
  // Simpan di localStorage (atau sessionStorage untuk lebih aman)
  // Di production, pertimbangkan httpOnly cookies
  localStorage.setItem('skyBookingToken', token);
}

/**
 * getAuthToken
 * Mengambil token JWT yang tersimpan
 * 
 * @returns {string|null} - Token atau null jika tidak ada
 */
export function getAuthToken() {
  return localStorage.getItem('skyBookingToken');
}

/**
 * removeAuthToken
 * Menghapus token saat logout
 */
export function removeAuthToken() {
  localStorage.removeItem('skyBookingToken');
}

/**
 * isTokenExpired
 * Memeriksa apakah JWT sudah expired
 * 
 * @param {string} token - JWT token
 * @returns {boolean} - true jika expired
 */
export function isTokenExpired(token) {
  if (!token) return true;
  
  try {
    // JWT format: header.payload.signature
    const payload = JSON.parse(atob(token.split('.')[1]));
    // exp adalah waktu expired dalam unix timestamp (detik)
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

// ============================================================================
// RATE LIMITING (MENCEGAH BRUTE FORCE)
// ============================================================================

/**
 * RateLimiter
 * Class untuk membatasi jumlah percobaan (misal: login)
 * 
 * CATATAN: Ini rate limiting di frontend, backend juga HARUS punya
 */
export class RateLimiter {
  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) {
    this.maxAttempts = maxAttempts;  // Max percobaan
    this.windowMs = windowMs;         // Waktu window (15 menit)
    this.attempts = new Map();        // Menyimpan percobaan
  }
  
  /**
   * Cek apakah masih boleh mencoba
   * @param {string} key - Identifier (misal: email)
   * @returns {Object} - { allowed: boolean, remainingAttempts: number, retryAfter?: number }
   */
  check(key) {
    const now = Date.now();
    const record = this.attempts.get(key);
    
    if (!record) {
      return { allowed: true, remainingAttempts: this.maxAttempts };
    }
    
    // Bersihkan percobaan yang sudah expired
    if (now - record.firstAttempt > this.windowMs) {
      this.attempts.delete(key);
      return { allowed: true, remainingAttempts: this.maxAttempts };
    }
    
    if (record.count >= this.maxAttempts) {
      const retryAfter = Math.ceil((record.firstAttempt + this.windowMs - now) / 1000);
      return { 
        allowed: false, 
        remainingAttempts: 0,
        retryAfter
      };
    }
    
    return { 
      allowed: true, 
      remainingAttempts: this.maxAttempts - record.count 
    };
  }
  
  /**
   * Catat percobaan
   * @param {string} key - Identifier
   */
  record(key) {
    const now = Date.now();
    const record = this.attempts.get(key);
    
    if (!record || now - record.firstAttempt > this.windowMs) {
      this.attempts.set(key, { firstAttempt: now, count: 1 });
    } else {
      record.count++;
    }
  }
  
  /**
   * Reset percobaan (setelah login berhasil)
   * @param {string} key - Identifier
   */
  reset(key) {
    this.attempts.delete(key);
  }
}

// Instance global untuk login rate limiting
export const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000);
