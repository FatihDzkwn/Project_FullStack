/**
 * ============================================================================
 * HALAMAN REGISTER (Register.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Halaman untuk mendaftarkan akun baru.
 * Menggunakan AuthContext untuk proses registrasi.
 * 
 * ALUR KERJA:
 * 1. User mengisi nama, email, password, dan konfirmasi password
 * 2. Centang persetujuan syarat & ketentuan
 * 3. Klik tombol "Daftar"
 * 4. Validasi semua input
 * 5. Panggil fungsi register dari AuthContext
 * 6. Jika berhasil: redirect ke halaman utama
 * 7. Jika gagal: tampilkan pesan error
 * 
 * ROUTE: /register
 * 
 * FITUR SPESIAL:
 * - Password strength indicator (indikator kekuatan password)
 * - Validasi password match (password dan konfirmasi harus sama)
 * - Checkbox persetujuan syarat & ketentuan
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

// Link: Untuk navigasi ke halaman login
// useNavigate: Untuk redirect setelah register berhasil
import { Link, useNavigate } from 'react-router-dom';

// useAuth: Custom hook untuk akses fungsi register
import { useAuth } from '../context/AuthContext';

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================

function Register() {
  // --------------------------------------------------------------------------
  // HOOKS
  // --------------------------------------------------------------------------
  
  const navigate = useNavigate();
  
  // Mengambil fungsi register dari AuthContext
  const { register } = useAuth();

  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------
  
  const [name, setName] = useState('');              // Input nama lengkap
  const [email, setEmail] = useState('');            // Input email
  const [password, setPassword] = useState('');      // Input password
  const [confirmPassword, setConfirmPassword] = useState(''); // Konfirmasi password
  const [agreeTerms, setAgreeTerms] = useState(false);// Checkbox persetujuan
  const [error, setError] = useState('');            // Pesan error
  const [isLoading, setIsLoading] = useState(false); // Status loading

  // --------------------------------------------------------------------------
  // HANDLER FUNCTIONS
  // --------------------------------------------------------------------------
  
  /**
   * handleSubmit
   * Dipanggil ketika form di-submit
   * 
   * LANGKAH VALIDASI:
   * 1. Cek semua field terisi
   * 2. Cek password minimal 6 karakter
   * 3. Cek password dan konfirmasi sama
   * 4. Cek checkbox persetujuan dicentang
   * 5. Panggil fungsi register
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validasi 1: Semua field harus diisi
    if (!name || !email || !password || !confirmPassword) {
      setError('Mohon isi semua field!');
      setIsLoading(false);
      return;
    }

    // Validasi 2: Password minimal 6 karakter
    if (password.length < 6) {
      setError('Password minimal 6 karakter!');
      setIsLoading(false);
      return;
    }

    // Validasi 3: Password dan konfirmasi harus sama
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak sama!');
      setIsLoading(false);
      return;
    }

    // Validasi 4: Harus setuju syarat & ketentuan
    if (!agreeTerms) {
      setError('Kamu harus menyetujui syarat dan ketentuan!');
      setIsLoading(false);
      return;
    }

    // Panggil fungsi register dari AuthContext
    const result = register(name, email, password);

    if (result.success) {
      navigate('/'); // Redirect ke home
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

  // --------------------------------------------------------------------------
  // HELPER FUNCTIONS
  // --------------------------------------------------------------------------
  
  /**
   * getPasswordStrength
   * Menghitung kekuatan password
   * 
   * KRITERIA:
   * - Lemah: < 6 karakter
   * - Cukup: 6-7 karakter
   * - Baik: 8+ karakter
   * - Kuat: 8+ karakter dengan huruf besar DAN angka
   * 
   * @param {string} pwd - Password yang diinput
   * @returns {object} { level, text, color }
   */
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { level: 0, text: '', color: '' };
    if (pwd.length < 6) return { level: 1, text: 'Lemah', color: 'is-danger' };
    if (pwd.length < 8) return { level: 2, text: 'Cukup', color: 'is-warning' };
    // Cek ada huruf besar DAN angka
    if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/)) return { level: 4, text: 'Kuat', color: 'is-success' };
    return { level: 3, text: 'Baik', color: 'is-info' };
  };

  // Hitung kekuatan password saat ini
  const passwordStrength = getPasswordStrength(password);

  // --------------------------------------------------------------------------
  // RENDER KOMPONEN
  // --------------------------------------------------------------------------

  return (
    <div className="main-content">
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5">
              
              {/* ========================================================== */}
              {/* CARD REGISTER */}
              {/* ========================================================== */}
              <div className="box auth-box">
                
                {/* -------------------------------------------------------- */}
                {/* HEADER */}
                {/* -------------------------------------------------------- */}
                <div className="has-text-centered mb-5">
                  <span className="is-size-1">✈️</span>
                  <h1 className="title is-3 mt-3">Buat Akun Baru</h1>
                  <p className="has-text-grey">Daftar untuk mulai memesan tiket</p>
                </div>

                {/* -------------------------------------------------------- */}
                {/* ERROR MESSAGE */}
                {/* -------------------------------------------------------- */}
                {error && (
                  <div className="notification is-danger is-light">
                    <button className="delete" onClick={() => setError('')}></button>
                    {error}
                  </div>
                )}

                {/* -------------------------------------------------------- */}
                {/* FORM REGISTER */}
                {/* -------------------------------------------------------- */}
                <form onSubmit={handleSubmit}>
                  {/* Field Nama Lengkap */}
                  <div className="field">
                    <label className="label">Nama Lengkap</label>
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <span className="icon is-left">
                        <i>👤</i>
                      </span>
                    </div>
                  </div>

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
                      <span className="icon is-left">
                        <i>📧</i>
                      </span>
                    </div>
                  </div>

                  {/* Field Password dengan strength indicator */}
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="password"
                        placeholder="Minimal 6 karakter"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="icon is-left">
                        <i>🔒</i>
                      </span>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {password && (
                      <div className="mt-2">
                        {/* Progress bar menunjukkan kekuatan */}
                        <progress 
                          className={`progress is-small ${passwordStrength.color}`}
                          value={passwordStrength.level} 
                          max="4"
                        ></progress>
                        {/* Teks kekuatan */}
                        <p className={`is-size-7 ${passwordStrength.color.replace('is-', 'has-text-')}`}>
                          Kekuatan password: {passwordStrength.text}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Field Konfirmasi Password */}
                  <div className="field">
                    <label className="label">Konfirmasi Password</label>
                    <div className="control has-icons-left">
                      <input
                        className="input is-medium"
                        type="password"
                        placeholder="Ulangi password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <span className="icon is-left">
                        <i>🔒</i>
                      </span>
                    </div>
                    
                    {/* Feedback apakah password cocok */}
                    {confirmPassword && password !== confirmPassword && (
                      <p className="help is-danger">Password tidak sama!</p>
                    )}
                    {confirmPassword && password === confirmPassword && (
                      <p className="help is-success">Password cocok! ✓</p>
                    )}
                  </div>

                  {/* Checkbox Persetujuan */}
                  <div className="field">
                    <label className="checkbox">
                      <input 
                        type="checkbox" 
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />{' '}
                      Saya setuju dengan{' '}
                      <a href="#" className="has-text-link">Syarat & Ketentuan</a>
                    </label>
                  </div>

                  {/* Tombol Submit */}
                  <div className="field">
                    <button 
                      type="submit" 
                      className={`button is-link is-fullwidth is-medium ${isLoading ? 'is-loading' : ''}`}
                      disabled={isLoading}
                    >
                      Daftar
                    </button>
                  </div>
                </form>

                {/* -------------------------------------------------------- */}
                {/* DIVIDER */}
                {/* -------------------------------------------------------- */}
                <div className="has-text-centered my-5">
                  <span className="has-text-grey">atau daftar dengan</span>
                </div>

                {/* -------------------------------------------------------- */}
                {/* SOCIAL REGISTER BUTTONS (tampilan saja) */}
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
                {/* LINK KE HALAMAN LOGIN */}
                {/* -------------------------------------------------------- */}
                <div className="has-text-centered mt-5">
                  <p>
                    Sudah punya akun?{' '}
                    <Link to="/login" className="has-text-link has-text-weight-bold">
                      Masuk di sini
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
export default Register;
