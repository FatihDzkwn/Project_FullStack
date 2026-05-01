/**
 * ============================================================================
 * HALAMAN PROFILE / PENGATURAN AKUN (Profile.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Halaman untuk mengatur profil user:
 * - Melihat informasi akun
 * - Mengubah nama
 * - Mengubah password
 * 
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const navigate = useNavigate();
  const { user, isLoggedIn, updateProfile, changePassword, logout } = useAuth();

  // State untuk form profil
  const [name, setName] = useState('');
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // State untuk form password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Redirect jika belum login
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Set nama awal dari user
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  // Handler untuk update profil
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    setProfileMessage({ type: '', text: '' });

    // Simulasi delay untuk UX
    setTimeout(() => {
      const result = updateProfile(name);
      
      if (result.success) {
        setProfileMessage({ type: 'success', text: result.message });
      } else {
        setProfileMessage({ type: 'error', text: result.message });
      }
      setIsUpdatingProfile(false);
    }, 500);
  };

  // Handler untuk ubah password
  const handleChangePassword = (e) => {
    e.preventDefault();
    setIsChangingPassword(true);
    setPasswordMessage({ type: '', text: '' });

    // Validasi konfirmasi password
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Konfirmasi password tidak cocok!' });
      setIsChangingPassword(false);
      return;
    }

    // Simulasi delay untuk UX
    setTimeout(() => {
      const result = changePassword(currentPassword, newPassword);
      
      if (result.success) {
        setPasswordMessage({ type: 'success', text: result.message });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordMessage({ type: 'error', text: result.message });
      }
      setIsChangingPassword(false);
    }, 500);
  };

  // Handler logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero is-link is-small profile-hero">
        <div className="hero-body">
          <div className="container">
            <div className="profile-hero-content">
              <div className="profile-avatar-large">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="title is-3 has-text-white mb-1">
                  {user.name}
                </h1>
                <p className="has-text-white-ter">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8">
              
              {/* Card: Informasi Profil */}
              <div className="box profile-card mb-5">
                <h2 className="title is-5 mb-4">
                  <span className="icon-text">
                    <span className="icon has-text-link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </span>
                    <span>Informasi Profil</span>
                  </span>
                </h2>

                <form onSubmit={handleUpdateProfile}>
                  {/* Nama */}
                  <div className="field">
                    <label className="label">Nama Lengkap</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>
                  </div>

                  {/* Email (read-only) */}
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        value={user.email}
                        disabled
                        readOnly
                      />
                    </div>
                    <p className="help">Email tidak dapat diubah</p>
                  </div>

                  {/* Message */}
                  {profileMessage.text && (
                    <div className={`notification ${profileMessage.type === 'success' ? 'is-success' : 'is-danger'} is-light`}>
                      {profileMessage.text}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="field">
                    <div className="control">
                      <button 
                        type="submit" 
                        className={`button is-link ${isUpdatingProfile ? 'is-loading' : ''}`}
                        disabled={isUpdatingProfile || name === user.name}
                      >
                        Simpan Perubahan
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Card: Ubah Password */}
              <div className="box profile-card mb-5">
                <h2 className="title is-5 mb-4">
                  <span className="icon-text">
                    <span className="icon has-text-warning">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </span>
                    <span>Ubah Password</span>
                  </span>
                </h2>

                <form onSubmit={handleChangePassword}>
                  {/* Password Saat Ini */}
                  <div className="field">
                    <label className="label">Password Saat Ini</label>
                    <div className="control has-icons-right">
                      <input
                        className="input"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Masukkan password saat ini"
                        required
                      />
                      <span 
                        className="icon is-right is-clickable"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        style={{ pointerEvents: 'auto' }}
                      >
                        {showCurrentPassword ? '👁️' : '👁️‍🗨️'}
                      </span>
                    </div>
                  </div>

                  {/* Password Baru */}
                  <div className="field">
                    <label className="label">Password Baru</label>
                    <div className="control has-icons-right">
                      <input
                        className="input"
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Masukkan password baru"
                        required
                      />
                      <span 
                        className="icon is-right is-clickable"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        style={{ pointerEvents: 'auto' }}
                      >
                        {showNewPassword ? '👁️' : '👁️‍🗨️'}
                      </span>
                    </div>
                    <p className="help">Minimal 8 karakter dengan kombinasi huruf dan angka</p>
                  </div>

                  {/* Konfirmasi Password */}
                  <div className="field">
                    <label className="label">Konfirmasi Password Baru</label>
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Ketik ulang password baru"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  {passwordMessage.text && (
                    <div className={`notification ${passwordMessage.type === 'success' ? 'is-success' : 'is-danger'} is-light`}>
                      {passwordMessage.text}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="field">
                    <div className="control">
                      <button 
                        type="submit" 
                        className={`button is-warning ${isChangingPassword ? 'is-loading' : ''}`}
                        disabled={isChangingPassword || !currentPassword || !newPassword || !confirmPassword}
                      >
                        Ubah Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Card: Keluar Akun */}
              <div className="box profile-card">
                <h2 className="title is-5 mb-4">
                  <span className="icon-text">
                    <span className="icon has-text-danger">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                    </span>
                    <span>Keluar Akun</span>
                  </span>
                </h2>

                <p className="mb-4 has-text-grey">
                  Keluar dari akun Anda di perangkat ini. Anda perlu login kembali untuk mengakses pesanan dan fitur lainnya.
                </p>

                <button 
                  className="button is-danger is-outlined"
                  onClick={handleLogout}
                >
                  <span className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </span>
                  <span>Keluar dari Akun</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
