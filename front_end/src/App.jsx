/**
 * ============================================================================
 * APP.JSX - FILE UTAMA APLIKASI REACT
 * ============================================================================
 * 
 * FUNGSI:
 * File ini adalah "otak" dari aplikasi React. Di sinilah kita mengatur:
 * 1. Routing (URL mana menampilkan halaman apa)
 * 2. Layout global (Navbar & Footer yang muncul di semua halaman)
 * 3. Context Provider (untuk share data seperti user login ke semua halaman)
 * 
 * CARA KERJA ROUTING:
 * - User buka localhost:5173/         → tampilkan halaman Home
 * - User buka localhost:5173/login    → tampilkan halaman Login
 * - User buka localhost:5173/flight/3 → tampilkan detail penerbangan ID 3
 * - dst...
 * 
 * STRUKTUR:
 * <BrowserRouter>           ← Pembungkus untuk routing
 *   <AuthProvider>          ← Pembungkus untuk autentikasi
 *     <Navbar />            ← Selalu tampil di atas
 *     <Routes>              ← Area konten yang berubah sesuai URL
 *       <Route ... />
 *     </Routes>
 *     <Footer />            ← Selalu tampil di bawah
 *   </AuthProvider>
 * </BrowserRouter>
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORT DEPENDENCIES
// ============================================================================

// BrowserRouter: Mengaktifkan fitur routing di browser
// Routes: Container untuk semua Route
// Route: Mendefinisikan satu route (URL → Komponen)
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Auth Context - untuk manajemen login/logout
import { AuthProvider } from './context/AuthContext';

// ============================================================================
// IMPORT KOMPONEN LAYOUT
// ============================================================================

// Navbar: Menu navigasi di bagian atas halaman
import Navbar from './components/Navbar';

// Footer: Informasi di bagian bawah halaman
import Footer from './components/Footer';

// ============================================================================
// IMPORT HALAMAN-HALAMAN
// ============================================================================

// Setiap halaman adalah satu file .jsx di folder pages/

import Home from './pages/Home';                 // Halaman utama
import SearchResults from './pages/SearchResults'; // Hasil pencarian
import FlightDetail from './pages/FlightDetail';   // Detail penerbangan
import Booking from './pages/Booking';             // Form pemesanan
import Confirmation from './pages/Confirmation';   // Konfirmasi sukses
import Login from './pages/Login';                 // Halaman login
import Register from './pages/Register';           // Halaman registrasi
import MyBookings from './pages/MyBookings';       // Daftar pesanan user
import TentangKami from './pages/TentangKami';     // Halaman tentang kami
import Profile from './pages/Profile';             // Halaman pengaturan akun
import SyaratKetentuan from './pages/SyaratKetentuan'; // Halaman syarat & ketentuan
import KebijakanPrivasi from './pages/KebijakanPrivasi'; // Halaman kebijakan privasi

// ============================================================================
// KOMPONEN UTAMA APP
// ============================================================================

function App() {
  return (
    // BrowserRouter mengaktifkan sistem routing
    <BrowserRouter>
      {/* 
        AuthProvider membungkus seluruh aplikasi.
        Ini memungkinkan semua komponen di dalamnya mengakses:
        - user (data user yang login)
        - isLoggedIn (boolean apakah sudah login)
        - login(), logout(), register() functions
      */}
      <AuthProvider>
        {/* Navbar selalu tampil di semua halaman */}
        <Navbar />
        
        {/* Area konten utama - berubah sesuai URL */}
        <main className="main-content">
          <Routes>
            {/* 
              DAFTAR ROUTE
              Format: <Route path="URL" element={<Komponen />} />
              
              :id adalah parameter dinamis
              Contoh: /flight/5 → id = 5
            */}
            
            {/* Halaman Utama */}
            <Route path="/" element={<Home />} />
            
            {/* Pencarian & Detail */}
            <Route path="/search" element={<SearchResults />} />
            <Route path="/flight/:id" element={<FlightDetail />} />
            
            {/* Proses Booking */}
            <Route path="/booking" element={<Booking />} />
            <Route path="/confirmation" element={<Confirmation />} />
            
            {/* Autentikasi */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* User Area */}
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Informasi */}
            <Route path="/tentang-kami" element={<TentangKami />} />
            <Route path="/syarat-ketentuan" element={<SyaratKetentuan />} />
            <Route path="/kebijakan-privasi" element={<KebijakanPrivasi />} />
          </Routes>
        </main>
        
        {/* Footer selalu tampil di semua halaman */}
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

// ============================================================================
// EXPORT
// ============================================================================
// Export default agar bisa di-import di main.jsx
export default App;
