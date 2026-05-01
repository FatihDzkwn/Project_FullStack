/**
 * ============================================================================
 * HALAMAN LOGIN (Login.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Halaman untuk user masuk ke akun yang sudah terdaftar.
 * Menggunakan AuthContext untuk proses autentikasi.
 * 
 * ALUR KERJA:
 * 1. User mengisi email dan password
 * 2. Klik tombol "Masuk"
 * 3. Validasi input
 * 4. Panggil fungsi login dari AuthContext
 * 5. Jika berhasil: redirect ke halaman utama
 * 6. Jika gagal: tampilkan pesan error
 * 
 * ROUTE: /login
 * 
 * CATATAN:
 * - Tombol Google dan Facebook hanya tampilan (belum fungsional)
 * - Data user disimpan di localStorage (simulasi backend)
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORT DEPENDENCIES
// ============================================================================

// useState: Hook untuk state form
import { useState } from 'react';

// Link: Untuk navigasi ke halaman register
// useNavigate: Untuk redirect setelah login berhasil
import { Link, useNavigate, useLocation } from 'react-router-dom';

// useAuth: Custom hook untuk akses fungsi login
import { useAuth } from '../context/AuthContext';

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================

function Login() {
  // --------------------------------------------------------------------------
  // HOOKS
  // --------------------------------------------------------------------------
  
  // Hook untuk navigasi programatis
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mengambil fungsi login dari AuthContext
  const { login } = useAuth();

  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------
  
  const [email, setEmail] = useState('');         // Input email
  const [password, setPassword] = useState('');   // Input password
  const [error, setError] = useState('');         // Pesan error (jika ada)
  const [isLoading, setIsLoading] = useState(false); // Status loading tombol

  // --------------------------------------------------------------------------
  // HANDLER FUNCTIONS
  // --------------------------------------------------------------------------
  
  /**
   * handleSubmit
   * Dipanggil ketika form di-submit
   * 
   * LANGKAH:
   * 1. Prevent default (mencegah refresh)
   * 2. Reset error message
   * 3. Set loading state
   * 4. Validasi input
   * 5. Panggil fungsi login
   * 6. Handle result (redirect atau tampilkan error)
   */
  const handleSubmit = async (e) => {
    e.preventDefault();     // Mencegah halaman refresh
    setError('');           // Reset error
    setIsLoading(true);     // Tampilkan loading

    // Validasi: semua field harus diisi
    if (!email || !password) {
      setError('Mohon isi semua field!');
      setIsLoading(false);
      return;
    }

    // Panggil fungsi login dari AuthContext
    // Return: { success: true/false, message: string }
    const result = login(email, password);

    if (result.success) {
      // Login berhasil: redirect ke tujuan jika ada
      const redirectTo = location.state?.redirectTo;
      const restoreState = location.state?.restoreState || {};
      if (redirectTo) {
        navigate(redirectTo, { state: restoreState });
      } else {
        navigate('/');
      }
    } else {
      // Login gagal: tampilkan pesan error
      setError(result.message);
    }

    setIsLoading(false); // Matikan loading
  };

  // --------------------------------------------------------------------------
  // RENDER KOMPONEN
  // --------------------------------------------------------------------------

  return (
    <div className="main-content">
      <section className="section">
        <div className="container">
          {/* Kolom centered dengan lebar 5/12 */}
          <div className="columns is-centered">
            <div className="column is-5">
              
              {/* ========================================================== */}
              {/* CARD LOGIN */}
              {/* ========================================================== */}
              <div className="box auth-box">
                
                {/* -------------------------------------------------------- */}
                {/* HEADER - Logo dan judul */}
                {/* -------------------------------------------------------- */}
                <div className="has-text-centered mb-5">
                  <span className="is-size-1">✈️</span>
                  <h1 className="title is-3 mt-3">Selamat Datang!</h1>
                  <p className="has-text-grey">Masuk ke akun SkyBooking kamu</p>
                </div>

                {/* -------------------------------------------------------- */}
                {/* ERROR MESSAGE */}
                {/* Tampil jika ada error */}
                {/* -------------------------------------------------------- */}
                {error && (
                  <div className="notification is-danger is-light">
                    {/* Tombol X untuk menutup notifikasi */}
                    <button className="delete" onClick={() => setError('')}></button>
                    {error}
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* FORM LOGIN */}
                {/* -------------------------------------------------------- */}
                <form onSubmit={handleSubmit}>
                  {/* Field Email */}
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="email"
                        placeholder="contoh@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {/* Icon di sebelah kiri input */}
                      <span className="icon is-left">
                        <i>📧</i>
                      </span>
                    </div>
                  </div>

                  {/* Field Password */}
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="icon is-left">
                        <i>🔒</i>
                      </span>
                    </div>
                  </div>

                  {/* Checkbox "Ingat saya" */}
                  <div className="field">
                    <label className="checkbox">
                      <input type="checkbox" /> Ingat saya
                    </label>
                  </div>

                  {/* Tombol Submit */}
                  <div className="field">
                    {/* 
                      is-loading: Tampilkan spinner saat loading
                      disabled: Mencegah klik ganda
                    */}
                    <button 
                      type="submit" 
                      className={`button is-link is-fullwidth is-medium ${isLoading ? 'is-loading' : ''}`}
                      disabled={isLoading}
                    >
                      Masuk
                    </button>
                  </div>
                </form>

                {/* -------------------------------------------------------- */}
                {/* DIVIDER */}
                {/* -------------------------------------------------------- */}
                <div className="has-text-centered my-5">
                  <span className="has-text-grey">atau masuk dengan</span>
                </div>

                {/* -------------------------------------------------------- */}
                {/* SOCIAL LOGIN BUTTONS (dummy/tampilan saja) */}
                {/* -------------------------------------------------------- */}
                <div className="buttons is-centered">
                  <button className="button">
                    <span className="icon">🔴</span>
                    <span>Google</span>
                  </button>
                  <button className="button">
                    <span className="icon">🔵</span>
                    <span>Facebook</span>
                  </button>
                </div>

                {/* -------------------------------------------------------- */}
                {/* LINK KE HALAMAN REGISTER */}
                {/* -------------------------------------------------------- */}
                <div className="has-text-centered mt-5">
                  <p>
                    Belum punya akun?{' '}
                    <Link to="/register" className="has-text-link has-text-weight-bold">
                      Daftar Sekarang
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// EXPORT KOMPONEN
// ============================================================================
export default Login;
