/**
 * ============================================================================
 * AUTH CONTEXT (AuthContext.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Mengelola state autentikasi (login/logout/register) untuk seluruh aplikasi.
 * Context memungkinkan data user diakses dari komponen manapun tanpa prop drilling.
 * 
 * APA ITU CONTEXT?
 * Bayangkan kamu punya data (misal: user yang login) yang perlu diakses di banyak
 * komponen (Navbar, Booking, MyBookings, dll). Tanpa Context, kamu harus kirim
 * data lewat props dari parent ke child ke grandchild... (ribet!).
 * Dengan Context, data bisa diakses langsung dari komponen manapun.
 * 
 * CARA PAKAI:
 * 1. Bungkus App dengan <AuthProvider> (sudah dilakukan di App.jsx)
 * 2. Di komponen manapun, panggil: const { user, login, logout } = useAuth();
 * 
 * CATATAN PENTING:
 * - Data user disimpan di localStorage (simulasi database)
 * - Di production, gunakan API call ke backend dan password harus di-hash
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORT DEPENDENCIES
// ============================================================================

// createContext: Membuat context baru
// useContext: Hook untuk menggunakan context
// useState: Hook untuk state management
// useEffect: Hook untuk side effects (seperti cek localStorage saat load)
import { createContext, useContext, useState, useEffect } from 'react';

// Import security utilities untuk hashing password dan validasi
import { 
  hashPassword, 
  verifyPassword, 
  validateEmail, 
  validatePassword,
  sanitizeInput,
  loginRateLimiter 
} from '../utils/security';

// Import config
import config from '../config';

// ============================================================================
// MEMBUAT CONTEXT
// ============================================================================

// Buat Context kosong dulu
// Context ini akan diisi dengan value di Provider nanti
const AuthContext = createContext();

// ============================================================================
// AUTH PROVIDER COMPONENT
// ============================================================================

/**
 * AuthProvider
 * Komponen pembungkus yang menyediakan data auth ke semua child component.
 * 
 * @param {ReactNode} children - Komponen-komponen yang dibungkus
 */
export function AuthProvider({ children }) {
  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------
  
  // State untuk menyimpan data user yang login
  // null = belum login, { id, name, email } = sudah login
  const [user, setUser] = useState(null);
  
  // State untuk loading (saat mengecek localStorage)
  const [isLoading, setIsLoading] = useState(true);

  // --------------------------------------------------------------------------
  // EFFECT - Cek login saat pertama kali load
  // --------------------------------------------------------------------------
  
  useEffect(() => {
    // Cek apakah ada data user tersimpan di localStorage
    // localStorage adalah penyimpanan browser yang persisten (tidak hilang saat refresh)
    const savedUser = localStorage.getItem(config.STORAGE_KEYS.USER);
    
    if (savedUser) {
      // Jika ada, parse dari string JSON ke object
      // dan set sebagai user yang login
      setUser(JSON.parse(savedUser));
    }
    
    // Selesai loading
    setIsLoading(false);
  }, []); // [] = effect ini hanya jalan sekali saat komponen pertama kali mount

  // --------------------------------------------------------------------------
  // FUNGSI LOGIN
  // --------------------------------------------------------------------------
  
  /**
   * login
   * Memverifikasi email & password, jika cocok user akan login.
   * 
   * @param {string} email - Email user
   * @param {string} password - Password user
   * @returns {Object} - { success: boolean, message?: string }
   * 
   * CARA KERJA:
   * 1. Cek rate limiting (mencegah brute force)
   * 2. Validasi format input
   * 3. Ambil daftar user dari localStorage
   * 4. Cari user dengan email yang cocok
   * 5. Verifikasi password (support hash dan plain text lama)
   * 6. Jika cocok, simpan ke state dan localStorage
   * 
   * CATATAN BACKEND:
   * - Ganti localStorage dengan API call
   * - Password verification harus di backend dengan bcrypt
   */
  const login = (email, password) => {
    // Sanitasi input (mencegah XSS)
    const cleanEmail = sanitizeInput(email).toLowerCase().trim();
    
    // Cek rate limiting
    const rateCheck = loginRateLimiter.check(cleanEmail);
    if (!rateCheck.allowed) {
      return { 
        success: false, 
        message: `Terlalu banyak percobaan. Coba lagi dalam ${rateCheck.retryAfter} detik.` 
      };
    }
    
    // Validasi format email
    if (!validateEmail(cleanEmail)) {
      return { success: false, message: 'Format email tidak valid!' };
    }
    
    // Ambil array users dari localStorage
    const users = JSON.parse(localStorage.getItem(config.STORAGE_KEYS.USERS) || '[]');
    
    // Cari user berdasarkan email saja (password diverifikasi terpisah)
    const foundUser = users.find(u => u.email === cleanEmail);
    
    if (!foundUser) {
      // Catat percobaan gagal
      loginRateLimiter.record(cleanEmail);
      return { success: false, message: 'Email atau password salah!' };
    }
    
    // Verifikasi password
    // Support backward compatibility: cek apakah password sudah di-hash atau belum
    let isPasswordValid = false;
    
    if (foundUser.password.startsWith('simhash_')) {
      // Password sudah di-hash (user baru)
      isPasswordValid = verifyPassword(password, foundUser.password);
    } else {
      // Password plain text (user lama) - MIGRASI
      isPasswordValid = foundUser.password === password;
      
      // Upgrade ke hashed password untuk keamanan
      if (isPasswordValid) {
        const userIndex = users.findIndex(u => u.email === cleanEmail);
        users[userIndex].password = hashPassword(password);
        localStorage.setItem(config.STORAGE_KEYS.USERS, JSON.stringify(users));
        console.log('[AUTH] Password berhasil di-upgrade ke hash');
      }
    }
    
    if (!isPasswordValid) {
      // Catat percobaan gagal
      loginRateLimiter.record(cleanEmail);
      return { success: false, message: 'Email atau password salah!' };
    }
    
    // LOGIN BERHASIL
    // Reset rate limiter
    loginRateLimiter.reset(cleanEmail);
    
    // Buat object userData tanpa password (untuk keamanan)
    const userData = {
      id: foundUser.id,
      name: sanitizeInput(foundUser.name), // Sanitasi juga saat load
      email: foundUser.email,
    };
    
    // Simpan ke state
    setUser(userData);
    
    // Simpan ke localStorage
    localStorage.setItem(config.STORAGE_KEYS.USER, JSON.stringify(userData));
    
    return { success: true };
  };

  // --------------------------------------------------------------------------
  // FUNGSI REGISTER
  // --------------------------------------------------------------------------
  
  /**
   * register
   * Mendaftarkan user baru dengan validasi dan password hashing.
   * 
   * @param {string} name - Nama lengkap user
   * @param {string} email - Email user
   * @param {string} password - Password user
   * @returns {Object} - { success: boolean, message?: string }
   * 
   * CARA KERJA:
   * 1. Validasi semua input
   * 2. Sanitasi input (mencegah XSS)
   * 3. Cek apakah email sudah terdaftar
   * 4. Hash password sebelum disimpan
   * 5. Buat user baru dan simpan
   * 6. Auto login setelah register
   * 
   * CATATAN BACKEND:
   * - Password hashing HARUS dilakukan di backend dengan bcrypt
   * - Hash di frontend ini hanya untuk simulasi
   */
  const register = (name, email, password) => {
    // Sanitasi input
    const cleanName = sanitizeInput(name).trim();
    const cleanEmail = sanitizeInput(email).toLowerCase().trim();
    
    // Validasi nama
    if (!cleanName || cleanName.length < 2) {
      return { success: false, message: 'Nama minimal 2 karakter!' };
    }
    if (cleanName.length > 100) {
      return { success: false, message: 'Nama maksimal 100 karakter!' };
    }
    
    // Validasi email
    if (!validateEmail(cleanEmail)) {
      return { success: false, message: 'Format email tidak valid!' };
    }
    
    // Validasi password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return { success: false, message: passwordValidation.errors[0] };
    }
    
    // Ambil daftar user yang sudah ada
    const users = JSON.parse(localStorage.getItem(config.STORAGE_KEYS.USERS) || '[]');
    
    // Cek apakah email sudah dipakai
    const existingUser = users.find(u => u.email === cleanEmail);
    
    if (existingUser) {
      return { success: false, message: 'Email sudah terdaftar!' };
    }

    // BUAT USER BARU dengan password yang di-hash
    const newUser = {
      id: Date.now(),
      name: cleanName,
      email: cleanEmail,
      password: hashPassword(password),  // ✅ Password di-hash!
      createdAt: new Date().toISOString(),
    };

    // Simpan ke localStorage
    users.push(newUser);
    localStorage.setItem(config.STORAGE_KEYS.USERS, JSON.stringify(users));

    // AUTO LOGIN setelah register
    const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(userData);
    localStorage.setItem(config.STORAGE_KEYS.USER, JSON.stringify(userData));

    return { success: true };
  };

  // --------------------------------------------------------------------------
  // FUNGSI LOGOUT
  // --------------------------------------------------------------------------
  
  /**
   * logout
   * Menghapus data user dari state dan localStorage.
   */
  const logout = () => {
    // Hapus dari state
    setUser(null);
    
    // Hapus dari localStorage menggunakan config
    localStorage.removeItem(config.STORAGE_KEYS.USER);
  };

  // --------------------------------------------------------------------------
  // FUNGSI UPDATE PROFILE
  // --------------------------------------------------------------------------
  
  /**
   * updateProfile
   * Mengupdate nama user.
   * 
   * @param {string} newName - Nama baru user
   * @returns {Object} - { success: boolean, message?: string }
   */
  const updateProfile = (newName) => {
    if (!user) {
      return { success: false, message: 'Anda belum login!' };
    }

    // Sanitasi dan validasi input
    const cleanName = sanitizeInput(newName).trim();
    
    if (!cleanName || cleanName.length < 2) {
      return { success: false, message: 'Nama minimal 2 karakter!' };
    }
    if (cleanName.length > 100) {
      return { success: false, message: 'Nama maksimal 100 karakter!' };
    }

    // Update di daftar users
    const users = JSON.parse(localStorage.getItem(config.STORAGE_KEYS.USERS) || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex === -1) {
      return { success: false, message: 'User tidak ditemukan!' };
    }

    users[userIndex].name = cleanName;
    localStorage.setItem(config.STORAGE_KEYS.USERS, JSON.stringify(users));

    // Update state dan localStorage current user
    const updatedUser = { ...user, name: cleanName };
    setUser(updatedUser);
    localStorage.setItem(config.STORAGE_KEYS.USER, JSON.stringify(updatedUser));

    return { success: true, message: 'Profil berhasil diperbarui!' };
  };

  // --------------------------------------------------------------------------
  // FUNGSI CHANGE PASSWORD
  // --------------------------------------------------------------------------
  
  /**
   * changePassword
   * Mengubah password user.
   * 
   * @param {string} currentPassword - Password lama
   * @param {string} newPassword - Password baru
   * @returns {Object} - { success: boolean, message?: string }
   */
  const changePassword = (currentPassword, newPassword) => {
    if (!user) {
      return { success: false, message: 'Anda belum login!' };
    }

    // Ambil data user dari daftar users
    const users = JSON.parse(localStorage.getItem(config.STORAGE_KEYS.USERS) || '[]');
    const foundUser = users.find(u => u.id === user.id);
    
    if (!foundUser) {
      return { success: false, message: 'User tidak ditemukan!' };
    }

    // Verifikasi password lama
    let isPasswordValid = false;
    
    if (foundUser.password.startsWith('simhash_')) {
      isPasswordValid = verifyPassword(currentPassword, foundUser.password);
    } else {
      isPasswordValid = foundUser.password === currentPassword;
    }
    
    if (!isPasswordValid) {
      return { success: false, message: 'Password lama salah!' };
    }

    // Validasi password baru
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return { success: false, message: passwordValidation.errors[0] };
    }

    // Update password di daftar users
    const userIndex = users.findIndex(u => u.id === user.id);
    users[userIndex].password = hashPassword(newPassword);
    localStorage.setItem(config.STORAGE_KEYS.USERS, JSON.stringify(users));

    return { success: true, message: 'Password berhasil diubah!' };
  };

  // --------------------------------------------------------------------------
  // VALUE YANG AKAN DIBAGIKAN KE KOMPONEN LAIN
  // --------------------------------------------------------------------------
  
  const value = {
    user,                    // Object user yang login (atau null)
    isLoading,               // Boolean apakah masih loading
    isLoggedIn: !!user,      // Boolean apakah sudah login (!! mengubah ke boolean)
    login,                   // Fungsi untuk login
    register,                // Fungsi untuk register
    logout,                  // Fungsi untuk logout
    updateProfile,           // Fungsi untuk update nama
    changePassword,          // Fungsi untuk ubah password
  };

  // --------------------------------------------------------------------------
  // RENDER PROVIDER
  // --------------------------------------------------------------------------
  
  return (
    // AuthContext.Provider membagikan 'value' ke semua komponen di dalamnya
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================================================
// CUSTOM HOOK: useAuth
// ============================================================================

/**
 * useAuth
 * Custom hook untuk mengakses Auth Context dari komponen manapun.
 * 
 * CARA PAKAI:
 * ```javascript
 * import { useAuth } from '../context/AuthContext';
 * 
 * function MyComponent() {
 *   const { user, isLoggedIn, login, logout, register } = useAuth();
 *   
 *   if (isLoggedIn) {
 *     return <p>Halo, {user.name}!</p>;
 *   }
 *   return <p>Silakan login</p>;
 * }
 * ```
 * 
 * @returns {Object} - { user, isLoading, isLoggedIn, login, register, logout }
 */
export function useAuth() {
  // Mengambil value dari AuthContext
  const context = useContext(AuthContext);
  
  // Jika dipanggil di luar AuthProvider, tampilkan error
  if (!context) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  
  return context;
}
