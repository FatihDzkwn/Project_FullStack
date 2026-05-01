/**
 * ============================================================================
 * HALAMAN KEBIJAKAN PRIVASI (KebijakanPrivasi.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Menampilkan kebijakan privasi penggunaan data pengguna SkyBooking
 * 
 * ============================================================================
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';

// ============================================================================
// DATA KEBIJAKAN PRIVASI
// ============================================================================

const privacyData = [
  {
    id: 1,
    title: 'Informasi yang Kami Kumpulkan',
    icon: '📊',
    content: [
      {
        subtitle: 'Data Pendaftaran Akun',
        items: [
          'Nama lengkap',
          'Alamat email',
          'Password (disimpan dalam bentuk hash)'
        ]
      },
      {
        subtitle: 'Data Pemesanan Tiket',
        items: [
          'Nama penumpang (depan dan belakang)',
          'Title (Tn./Ny./Nn.)',
          'Tanggal lahir',
          'Kewarganegaraan',
          'Email dan nomor telepon kontak'
        ]
      },
      {
        subtitle: 'Data Transaksi',
        items: [
          'Riwayat pemesanan tiket',
          'Pilihan metode pembayaran',
          'Kode booking'
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Penggunaan Informasi',
    icon: '🎯',
    content: [
      {
        subtitle: 'Layanan Utama',
        items: [
          'Menampilkan hasil pencarian penerbangan',
          'Memproses form pemesanan tiket',
          'Menampilkan e-ticket dan konfirmasi',
          'Menyimpan riwayat pesanan di "Pesanan Saya"'
        ]
      },
      {
        subtitle: 'Autentikasi',
        items: [
          'Verifikasi login pengguna',
          'Menjaga keamanan sesi pengguna',
          'Mengatur akses ke halaman terbatas'
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Penyimpanan Data',
    icon: '💾',
    content: [
      {
        subtitle: 'Metode Penyimpanan',
        items: [
          'Data disimpan menggunakan localStorage browser',
          'Tidak ada data yang dikirim ke server eksternal',
          'Data tersimpan hanya di perangkat pengguna'
        ]
      },
      {
        subtitle: 'Keamanan Password',
        items: [
          'Password di-hash sebelum disimpan',
          'Password asli tidak pernah disimpan dalam bentuk plain text',
          'Rate limiting untuk mencegah brute force attack'
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Berbagi Data',
    icon: '🤝',
    content: [
      {
        subtitle: 'Kebijakan Non-Sharing',
        items: [
          'Tidak ada data yang dibagikan ke pihak ketiga',
          'Tidak ada integrasi dengan layanan analytics eksternal',
          'Tidak ada tracking atau advertising pixels',
          'Data tetap berada di perangkat pengguna'
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'LocalStorage & Cookies',
    icon: '🍪',
    content: [
      {
        subtitle: 'Penggunaan LocalStorage',
        items: [
          'Menyimpan data akun pengguna yang login',
          'Menyimpan daftar user terdaftar',
          'Menyimpan riwayat pemesanan tiket'
        ]
      },
      {
        subtitle: 'Catatan Penting',
        items: [
          'Data localStorage dapat dihapus melalui pengaturan browser',
          'Menghapus data browser akan menghapus akun dan riwayat',
          'Tidak ada cookies pelacakan dari pihak ketiga'
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Hak Pengguna',
    icon: '✨',
    content: [
      {
        subtitle: 'Kontrol Data',
        items: [
          'Mengubah data profil melalui halaman Pengaturan Akun',
          'Menghapus semua data dengan clear browser storage',
          'Melihat riwayat pemesanan di menu Pesanan Saya'
        ]
      },
      {
        subtitle: 'Akses Penuh',
        items: [
          'Karena data disimpan lokal, pengguna memiliki kontrol penuh',
          'Tidak perlu mengajukan permintaan penghapusan data',
          'Data otomatis terhapus jika browser storage dibersihkan'
        ]
      }
    ]
  },
  {
    id: 7,
    title: 'Catatan Edukasi',
    icon: '📚',
    content: [
      {
        subtitle: 'Sifat Proyek',
        items: [
          'SkyBooking adalah proyek pembelajaran mahasiswa',
          'Dibuat untuk mata kuliah Pemrograman Full Stack',
          'STT Terpadu Nurul Fikri - Semester 4'
        ]
      },
      {
        subtitle: 'Batasan',
        items: [
          'Tidak ada pemrosesan pembayaran nyata',
          'Tidak ada integrasi dengan maskapai asli',
          'Logo dan nama maskapai digunakan untuk ilustrasi'
        ]
      }
    ]
  },
  {
    id: 8,
    title: 'Kontak Tim',
    icon: '👥',
    content: [
      {
        subtitle: 'Tim Pengembang',
        items: [
          'Fatih Dzakwan Susilo - Frontend Developer',
          'Muhammad Aqwam Kamil - Backend Developer',
          'Muhammad Fajrul Falah - Backend Developer',
          'Eka Purnamasari - Backend Developer',
          'Salwa - Frontend Developer'
        ]
      }
    ]
  }
];

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================

function KebijakanPrivasi() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div className="legal-page privacy-page">
      {/* ================================================================ */}
      {/* HERO SECTION */}
      {/* ================================================================ */}
      <section className="legal-hero privacy-hero">
        <div className="legal-hero-bg"></div>
        <div className="container">
          <div className="legal-hero-content">
            <div className="legal-breadcrumb">
              <Link to="/">Beranda</Link>
              <span className="separator">›</span>
              <span>Kebijakan Privasi</span>
            </div>
            <h1 className="legal-title">Kebijakan Privasi</h1>
            <p className="legal-subtitle">
              Pelajari bagaimana SkyBooking mengelola dan menyimpan data Anda dalam 
              proyek pembelajaran ini.
            </p>
            <div className="legal-meta">
              <span className="meta-item">
                <span className="meta-icon">📅</span>
                Terakhir diperbarui: 1 Maret 2026
              </span>
              <span className="meta-item">
                <span className="meta-icon">📖</span>
                Waktu baca: 5 menit
              </span>
            </div>
          </div>
        </div>
        <div className="legal-hero-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="#f8fafc"></path>
          </svg>
        </div>
      </section>

      {/* ================================================================ */}
      {/* PRIVACY HIGHLIGHTS */}
      {/* ================================================================ */}
      <section className="privacy-highlights">
        <div className="container">
          <div className="highlights-grid">
            <div className="highlight-card" style={{ '--delay': '0s' }}>
              <div className="highlight-icon">💾</div>
              <h3>Penyimpanan Lokal</h3>
              <p>Data disimpan di browser Anda menggunakan localStorage</p>
            </div>
            <div className="highlight-card" style={{ '--delay': '0.1s' }}>
              <div className="highlight-icon">🚫</div>
              <h3>Tidak Ada Server</h3>
              <p>Tidak ada data yang dikirim ke server eksternal</p>
            </div>
            <div className="highlight-card" style={{ '--delay': '0.2s' }}>
              <div className="highlight-icon">✅</div>
              <h3>Kontrol Penuh</h3>
              <p>Anda dapat menghapus semua data melalui browser</p>
            </div>
            <div className="highlight-card" style={{ '--delay': '0.3s' }}>
              <div className="highlight-icon">🎓</div>
              <h3>Proyek Edukasi</h3>
              <p>Dibuat untuk pembelajaran Pemrograman Full Stack</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CONTENT SECTION */}
      {/* ================================================================ */}
      <section className="legal-content">
        <div className="container">
          <div className="legal-layout">
            {/* Sidebar Navigation */}
            <aside className="legal-sidebar">
              <div className="sidebar-sticky">
                <h3 className="sidebar-title">Daftar Isi</h3>
                <nav className="sidebar-nav">
                  {privacyData.map((item, index) => (
                    <a 
                      key={item.id}
                      href={`#privacy-section-${item.id}`}
                      className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(`privacy-section-${item.id}`).scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <span className="link-number">{String(index + 1).padStart(2, '0')}</span>
                      <span className="link-text">{item.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="legal-main">
              <div className="legal-intro-card privacy-intro">
                <div className="intro-icon">�</div>
                <div className="intro-content">
                  <h3>Tentang Pengelolaan Data</h3>
                  <p>
                    SkyBooking adalah proyek pembelajaran yang menyimpan data secara lokal di browser Anda 
                    menggunakan localStorage. Tidak ada data yang dikirim ke server eksternal. 
                    Dokumen ini menjelaskan data apa saja yang dikumpulkan dan bagaimana pengelolaannya.
                  </p>
                </div>
              </div>

              {/* Privacy Sections */}
              <div className="legal-sections">
                {privacyData.map((section, index) => (
                  <div 
                    key={section.id} 
                    id={`privacy-section-${section.id}`}
                    className={`legal-section-card ${activeSection === section.id ? 'expanded' : ''}`}
                    style={{ '--delay': `${index * 0.1}s` }}
                  >
                    <button 
                      className="section-header"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="section-header-left">
                        <span className="section-icon">{section.icon}</span>
                        <div className="section-title-wrapper">
                          <span className="section-number">Bagian {section.id}</span>
                          <h3 className="section-title">{section.title}</h3>
                        </div>
                      </div>
                      <span className="section-toggle">
                        {activeSection === section.id ? '−' : '+'}
                      </span>
                    </button>
                    <div className="section-content">
                      {section.content.map((group, gIdx) => (
                        <div key={gIdx} className="privacy-group">
                          <h4 className="group-title">{group.subtitle}</h4>
                          <ul className="privacy-list">
                            {group.items.map((item, idx) => (
                              <li key={idx}>
                                <span className="list-check">✓</span>
                                <span className="list-text">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tentang Proyek */}
              <div className="legal-contact-card dpo-card">
                <div className="contact-icon">🎓</div>
                <div className="contact-content">
                  <h3>Tentang Proyek Ini</h3>
                  <p>
                    SkyBooking adalah proyek pembelajaran yang dikembangkan oleh mahasiswa 
                    STT Terpadu Nurul Fikri untuk mata kuliah Pemrograman Full Stack Semester 4.
                  </p>
                  <div className="contact-actions">
                    <Link to="/tentang-kami" className="contact-btn primary">
                      <span>👥</span> Lihat Tim Pengembang
                    </Link>
                  </div>
                </div>
              </div>

              {/* Related Links */}
              <div className="legal-related">
                <h3>Dokumen Terkait</h3>
                <div className="related-links">
                  <Link to="/syarat-ketentuan" className="related-link-card">
                    <span className="related-icon">📜</span>
                    <div className="related-info">
                      <h4>Syarat & Ketentuan</h4>
                      <p>Baca ketentuan penggunaan layanan SkyBooking</p>
                    </div>
                    <span className="related-arrow">→</span>
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// EXPORT
// ============================================================================
export default KebijakanPrivasi;
