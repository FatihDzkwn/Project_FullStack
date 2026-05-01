/**
 * ============================================================================
 * KOMPONEN NAVBAR (Navbar.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Menu navigasi utama yang tampil di bagian atas setiap halaman.
 * Menampilkan logo, menu, dan tombol login/info user.
 * 
 * FITUR:
 * 1. Logo & Brand - Link ke halaman utama
 * 2. Menu navigasi - Beranda, Pesanan Saya
 * 3. Burger menu - Untuk tampilan mobile
 * 4. User dropdown - Tampil jika sudah login
 * 5. Tombol Login/Daftar - Tampil jika belum login
 * 
 * DIGUNAKAN DI: App.jsx (tampil di semua halaman)
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORT DEPENDENCIES
// ============================================================================

// Link: Untuk navigasi tanpa refresh halaman
// useNavigate: Untuk navigasi programatis (setelah logout)
import { Link, useNavigate } from 'react-router-dom';

// useState: Untuk state lokal (menu aktif, dropdown)
// useRef: Untuk referensi DOM element (detect click outside)
// useEffect: Untuk side effect (event listener)
import { useState, useRef, useEffect } from 'react';

// useAuth: Custom hook untuk akses data autentikasi
import { useAuth } from '../context/AuthContext';

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================

function Navbar() {
  // --------------------------------------------------------------------------
  // HOOKS
  // --------------------------------------------------------------------------
  
  // Hook untuk navigasi ke halaman lain
  const navigate = useNavigate();
  
  // Mengambil data auth dari context
  // user: object user yang login (null jika belum login)
  // isLoggedIn: boolean apakah sudah login
  // logout: fungsi untuk logout
  const { user, isLoggedIn, logout } = useAuth();
  
  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------
  
  // State untuk burger menu di mobile (true = menu terbuka)
  const [isActive, setIsActive] = useState(false);
  
  // State untuk dropdown user (true = dropdown terbuka)
  const [showDropdown, setShowDropdown] = useState(false);
  
  // --------------------------------------------------------------------------
  // REFS
  // --------------------------------------------------------------------------
  
  // Ref untuk element dropdown (digunakan untuk detect click outside)
  const dropdownRef = useRef(null);

  // --------------------------------------------------------------------------
  // EFFECTS
  // --------------------------------------------------------------------------
  
  /**
   * Effect: Close dropdown when clicking outside
   * 
   * CARA KERJA:
   * 1. Tambahkan event listener untuk 'mousedown' (klik)
   * 2. Jika klik terjadi di LUAR dropdown, tutup dropdown
   * 3. Cleanup: hapus event listener saat komponen unmount
   */
  useEffect(() => {
    function handleClickOutside(event) {
      // Cek apakah klik terjadi di luar dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    
    // Tambahkan event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup function - dijalankan saat komponen unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []); // [] = effect hanya jalan sekali saat mount

  // --------------------------------------------------------------------------
  // HANDLER FUNCTIONS
  // --------------------------------------------------------------------------
  
  /**
   * handleLogout
   * Dipanggil ketika user klik tombol "Keluar"
   */
  const handleLogout = () => {
    logout();                    // Panggil fungsi logout dari context
    setShowDropdown(false);      // Tutup dropdown
    navigate('/');               // Redirect ke halaman utama
  };

  // --------------------------------------------------------------------------
  // RENDER KOMPONEN
  // --------------------------------------------------------------------------

  return (
    // Navbar dengan warna "is-link" (biru)
    <nav className="navbar is-link is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="container">
        
        {/* ================================================================ */}
        {/* BRAND & BURGER MENU */}
        {/* ================================================================ */}
        <div className="navbar-brand">
          {/* Logo - Link ke halaman utama dengan scroll ke atas */}
          <Link className="navbar-item brand-logo" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="brand-icon">✈️</span>
            <span>SkyBooking</span>
          </Link>

          {/* 
            Burger menu - Hanya tampil di mobile
            Klik untuk toggle menu
          */}
          <button
            className={`navbar-burger ${isActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setIsActive(!isActive)}
          >
            {/* Tiga garis horizontal yang menjadi burger icon */}
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        {/* ================================================================ */}
        {/* MENU ITEMS */}
        {/* ================================================================ */}
        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          
          {/* Menu Kiri */}
          <div className="navbar-start">
            <Link className="navbar-item" to="/">
              Beranda
            </Link>
            <Link className="navbar-item" to="/tentang-kami">
              Tentang Kami
            </Link>
            <Link className="navbar-item" to="/my-bookings">
              Pesanan Saya
            </Link>
          </div>

          {/* Menu Kanan */}
          <div className="navbar-end">
            {isLoggedIn ? (
              // ============================================================
              // JIKA SUDAH LOGIN: Tampilkan dropdown user
              // ============================================================
              <div className="navbar-item user-dropdown" ref={dropdownRef}>
                {/* Tombol dengan nama user */}
                <button 
                  className="button user-button"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="user-avatar">👤</span>
                  <span>{user.name}</span>
                  <span className="dropdown-arrow">▼</span>
                </button>

                {/* Dropdown Menu (tampil jika showDropdown = true) */}
                {showDropdown && (
                  <div className="user-dropdown-menu">
                    {/* Header dropdown - info user */}
                    <div className="px-4 py-3 has-border-bottom">
                      <p className="has-text-weight-bold">{user.name}</p>
                      <p className="is-size-7 has-text-grey">{user.email}</p>
                    </div>
                    
                    {/* Menu items dalam dropdown */}
                    <Link 
                      to="/my-bookings" 
                      className="user-dropdown-item"
                      onClick={() => setShowDropdown(false)}
                    >
                      📋 Pesanan Saya
                    </Link>
                    <Link 
                      to="/profile" 
                      className="user-dropdown-item"
                      onClick={() => setShowDropdown(false)}
                    >
                      ⚙️ Pengaturan Akun
                    </Link>
                    
                    <hr className="my-1" />
                    
                    {/* Tombol Logout */}
                    <button 
                      className="user-dropdown-item has-text-danger"
                      onClick={handleLogout}
                      style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      🚪 Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // ============================================================
              // JIKA BELUM LOGIN: Tampilkan tombol Masuk & Daftar
              // ============================================================
              <div className="navbar-item">
                <div className="buttons">
                  <Link className="button is-outlined" to="/login">
                    Masuk
                  </Link>
                  <Link className="button is-primary" to="/register">
                    Daftar
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
