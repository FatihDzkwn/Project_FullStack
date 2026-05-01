/**
 * ============================================================================
 * HALAMAN TENTANG KAMI (TentangKami.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Menampilkan informasi tentang SkyBooking, visi misi, tim, dan kontak.
 * 
 * ROUTE: /tentang-kami
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORT DEPENDENCIES
// ============================================================================

import { Link } from 'react-router-dom';

// ============================================================================
// DATA TIM
// ============================================================================

const teamMembers = [
  {
    id: 1,
    nama: 'Fatih Dzakwan Susilo',
    jabatan: 'Frontend Developer',
    avatar: 'FD',
    color: '#0066cc',
    deskripsi: 'Mengembangkan antarmuka pengguna yang intuitif dan responsif untuk pengalaman booking yang menyenangkan.',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 2,
    nama: 'Muhammad Aqwam Kamil',
    jabatan: 'Backend Developer',
    avatar: 'MA',
    color: '#10b981',
    deskripsi: 'Membangun sistem backend yang handal dan scalable untuk memproses jutaan transaksi.',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 3,
    nama: 'Muhammad Fajrul Falah',
    jabatan: 'Backend Developer',
    avatar: 'MF',
    color: '#8b5cf6',
    deskripsi: 'Mengoptimalkan performa server dan database untuk kecepatan akses maksimal.',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 4,
    nama: 'Eka Purnamasari',
    jabatan: 'Backend Developer',
    avatar: 'EP',
    color: '#f59e0b',
    deskripsi: 'Mengintegrasikan sistem dengan berbagai maskapai partner untuk ketersediaan real-time.',
    linkedin: '#',
    twitter: '#'
  },
  {
    id: 5,
    nama: 'Salwa',
    jabatan: 'Frontend Developer',
    avatar: 'SW',
    color: '#f59e0b',
    deskripsi: 'Mendesain komponen UI modern dan memastikan konsistensi visual di seluruh platform.',
    linkedin: '#',
    twitter: '#'
  }
];

// ============================================================================
// DATA NILAI-NILAI
// ============================================================================

const valuesData = [
  { icon: '💎', title: 'Integritas', desc: 'Jujur dan transparan dalam setiap layanan yang kami berikan', color: '#0066cc' },
  { icon: '🎖️', title: 'Kualitas', desc: 'Selalu memberikan standar layanan tertinggi untuk pengguna', color: '#10b981' },
  { icon: '💡', title: 'Inovasi', desc: 'Terus berkembang dan berinovasi mengikuti kebutuhan zaman', color: '#f59e0b' },
  { icon: '❤️', title: 'Pelanggan', desc: 'Kepuasan pelanggan adalah prioritas utama kami', color: '#ef4444' }
];

// ============================================================================
// DATA MILESTONE
// ============================================================================

const milestonesData = [
  { year: '2026', title: 'Lahirnya SkyBooking', desc: 'SkyBooking didirikan oleh tim mahasiswa STT Terpadu Nurul Fikri dengan semangat inovasi, memadukan keahlian pengembangan web terkini dan desain antarmuka yang intuitif untuk menciptakan pengalaman pengguna yang mulus' }
];

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================

function TentangKami() {
  return (
    <div className="about-page">
      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <section className="about-hero-modern">
        <div className="about-hero-bg">
          <div className="about-hero-gradient"></div>
          <div className="about-hero-pattern"></div>
        </div>
        <div className="container">
          <div className="about-hero-content">
            <span className="about-hero-badge">✈️ Sejak 2020</span>
            <h1 className="about-hero-title">
              Tentang <span className="gradient-text">SkyBooking</span>
            </h1>
            <p className="about-hero-subtitle">
              Mitra perjalanan udara terpercaya untuk seluruh Indonesia. 
              Menghubungkan jutaan orang dengan impian perjalanan mereka.
            </p>
            <div className="about-hero-stats">
              <div className="hero-stat-item">
                <span className="hero-stat-number">1.2M+</span>
                <span className="hero-stat-label">Pengguna</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat-item">
                <span className="hero-stat-number">8</span>
                <span className="hero-stat-label">Partner Maskapai</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat-item">
                <span className="hero-stat-number">500+</span>
                <span className="hero-stat-label">Rute</span>
              </div>
            </div>
          </div>
        </div>
        <div className="about-hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ================================================================== */}
      {/* TENTANG KAMI / STORY */}
      {/* ================================================================== */}
      <section className="section about-story-section">
        <div className="container">
          <div className="columns is-vcentered is-variable is-8">
            <div className="column is-6">
              <div className="about-story-content">
                <span className="section-badge">🏢 Cerita Kami</span>
                <h2 className="title is-2 mb-4">
                  Siapa <span className="text-primary">SkyBooking</span>?
                </h2>
                <p className="about-story-text mb-4">
                  <strong>SkyBooking</strong> adalah platform pemesanan tiket pesawat online yang hadir untuk 
                  memberikan kemudahan bagi masyarakat Indonesia dalam merencanakan perjalanan udara mereka.
                </p>
                <p className="about-story-text mb-4">
                  Didirikan pada tahun 2020, kami telah melayani lebih dari <strong>1 juta pengguna</strong> dengan 
                  komitmen memberikan harga terbaik, proses pemesanan yang cepat, dan pelayanan pelanggan yang responsif.
                </p>
                <p className="about-story-text">
                  Bekerjasama dengan <strong>8 maskapai terkemuka</strong> di Indonesia, kami menyediakan lebih dari 
                  500 rute penerbangan ke seluruh penjuru nusantara dan destinasi internasional pilihan.
                </p>
                <div className="about-features-mini">
                  <div className="feature-mini-item">
                    <span className="feature-mini-icon">✓</span>
                    <span>Harga Terbaik</span>
                  </div>
                  <div className="feature-mini-item">
                    <span className="feature-mini-icon">✓</span>
                    <span>Proses Cepat</span>
                  </div>
                  <div className="feature-mini-item">
                    <span className="feature-mini-icon">✓</span>
                    <span>Aman & Terpercaya</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-6">
              <div className="about-stats-modern">
                <div className="about-stat-card-modern" style={{ '--card-delay': '0s' }}>
                  <div className="about-stat-icon-wrapper" style={{ '--stat-color': '#0066cc' }}>
                    <span>✈️</span>
                  </div>
                  <div className="about-stat-info">
                    <p className="about-stat-number-modern">500+</p>
                    <p className="about-stat-label-modern">Rute Penerbangan</p>
                  </div>
                </div>
                <div className="about-stat-card-modern" style={{ '--card-delay': '0.1s' }}>
                  <div className="about-stat-icon-wrapper" style={{ '--stat-color': '#10b981' }}>
                    <span>🤝</span>
                  </div>
                  <div className="about-stat-info">
                    <p className="about-stat-number-modern">8</p>
                    <p className="about-stat-label-modern">Maskapai Partner</p>
                  </div>
                </div>
                <div className="about-stat-card-modern" style={{ '--card-delay': '0.2s' }}>
                  <div className="about-stat-icon-wrapper" style={{ '--stat-color': '#f59e0b' }}>
                    <span>👥</span>
                  </div>
                  <div className="about-stat-info">
                    <p className="about-stat-number-modern">1M+</p>
                    <p className="about-stat-label-modern">Pengguna Aktif</p>
                  </div>
                </div>
                <div className="about-stat-card-modern" style={{ '--card-delay': '0.3s' }}>
                  <div className="about-stat-icon-wrapper" style={{ '--stat-color': '#ef4444' }}>
                    <span>⭐</span>
                  </div>
                  <div className="about-stat-info">
                    <p className="about-stat-number-modern">4.8</p>
                    <p className="about-stat-label-modern">Rating Pengguna</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* MILESTONE / TIMELINE */}
      {/* ================================================================== */}
      <section className="section about-milestone-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">📅 Perjalanan Kami</span>
            <h2 className="title is-2 has-text-centered mb-2">
              Milestone SkyBooking
            </h2>
            <p className="subtitle is-6 has-text-centered has-text-grey">
              Perjalanan kami dari awal hingga sekarang
            </p>
          </div>
          
          <div className="milestone-timeline">
            {milestonesData.map((item, index) => (
              <div 
                className="milestone-item" 
                key={index}
                style={{ '--milestone-delay': `${index * 0.1}s` }}
              >
                <div className="milestone-year">{item.year}</div>
                <div className="milestone-dot"></div>
                <div className="milestone-content">
                  <h4 className="milestone-title">{item.title}</h4>
                  <p className="milestone-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* VISI & MISI */}
      {/* ================================================================== */}
      <section className="section about-vision-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">🎯 Visi & Misi</span>
            <h2 className="title is-2 has-text-centered mb-2">
              Arah & Tujuan Kami
            </h2>
            <p className="subtitle is-6 has-text-centered has-text-grey">
              Komitmen kami untuk masa depan perjalanan Indonesia
            </p>
          </div>
          
          <div className="columns is-variable is-6">
            <div className="column is-6">
              <div className="vision-card-modern vision-card">
                <div className="vision-card-decoration"></div>
                <div className="vision-icon-modern">
                  <span>🎯</span>
                  <div className="vision-icon-ring"></div>
                </div>
                <h3 className="title is-4 mb-3">Visi Kami</h3>
                <p className="vision-text">
                  Menjadi platform pemesanan tiket pesawat <strong>#1 di Indonesia</strong> yang 
                  dikenal karena kemudahan, kecepatan, dan kepercayaan pelanggan. Kami berambisi 
                  menghubungkan seluruh masyarakat Indonesia dengan dunia melalui perjalanan udara 
                  yang terjangkau dan nyaman.
                </p>
              </div>
            </div>
            
            <div className="column is-6">
              <div className="vision-card-modern mission-card">
                <div className="vision-card-decoration"></div>
                <div className="vision-icon-modern">
                  <span>🚀</span>
                  <div className="vision-icon-ring"></div>
                </div>
                <h3 className="title is-4 mb-3">Misi Kami</h3>
                <ul className="mission-list-modern">
                  <li>
                    <span className="mission-check">✓</span>
                    Menyediakan harga tiket termurah dengan perbandingan real-time
                  </li>
                  <li>
                    <span className="mission-check">✓</span>
                    Memberikan pengalaman pemesanan yang cepat dan mudah
                  </li>
                  <li>
                    <span className="mission-check">✓</span>
                    Menjamin keamanan transaksi dengan teknologi terkini
                  </li>
                  <li>
                    <span className="mission-check">✓</span>
                    Memberikan layanan pelanggan 24/7 yang responsif
                  </li>
                  <li>
                    <span className="mission-check">✓</span>
                    Terus berinovasi untuk memenuhi kebutuhan pengguna
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* NILAI-NILAI */}
      {/* ================================================================== */}
      <section className="section about-values-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">💫 Core Values</span>
            <h2 className="title is-2 has-text-centered mb-2">
              Nilai-Nilai Kami
            </h2>
            <p className="subtitle is-6 has-text-centered has-text-grey">
              Prinsip yang kami pegang teguh dalam setiap langkah
            </p>
          </div>
          
          <div className="values-grid">
            {valuesData.map((value, index) => (
              <div 
                className="value-card-modern" 
                key={index}
                style={{ '--value-delay': `${index * 0.1}s`, '--value-color': value.color }}
              >
                <div className="value-icon-wrapper">
                  <span className="value-icon-modern">{value.icon}</span>
                  <div className="value-icon-bg"></div>
                </div>
                <h4 className="value-title-modern">{value.title}</h4>
                <p className="value-desc-modern">{value.desc}</p>
                <div className="value-card-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* TIM KAMI */}
      {/* ================================================================== */}
      <section className="section about-team-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">👥 Our Team</span>
            <h2 className="title is-2 has-text-centered mb-2">
              Tim Kami
            </h2>
            <p className="subtitle is-6 has-text-centered has-text-grey">
              Orang-orang hebat di balik kesuksesan SkyBooking
            </p>
          </div>
          
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div 
                className="team-card-modern" 
                key={member.id}
                style={{ '--team-delay': `${index * 0.1}s` }}
              >
                <div className="team-card-bg"></div>
                <div className="team-avatar-wrapper">
                  <div 
                    className="team-avatar-modern"
                    style={{ '--avatar-color': member.color }}
                  >
                    {member.avatar}
                  </div>
                  <div className="team-avatar-ring"></div>
                </div>
                <div className="team-info">
                  <h4 className="team-name-modern">{member.nama}</h4>
                  <p className="team-jabatan-modern">{member.jabatan}</p>
                  <p className="team-deskripsi-modern">{member.deskripsi}</p>
                </div>
                <div className="team-social">
                  <a href={member.linkedin} className="team-social-link" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href={member.twitter} className="team-social-link" aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* HUBUNGI KAMI */}
      {/* ================================================================== */}
      <section className="section about-contact-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">📞 Kontak</span>
            <h2 className="title is-2 has-text-centered mb-2">
              Hubungi Kami
            </h2>
            <p className="subtitle is-6 has-text-centered has-text-grey">
              Tim kami siap membantu Anda kapan saja
            </p>
          </div>
          
          <div className="contact-grid">
            <div className="contact-card-modern" style={{ '--contact-delay': '0s' }}>
              <div className="contact-icon-wrapper">
                <span className="contact-icon-modern">📍</span>
                <div className="contact-icon-ring"></div>
              </div>
              <h4 className="contact-title-modern">Alamat</h4>
              <p className="contact-text-modern">
                Jl. Margonda Raya No. 100<br />
                Depok, Jawa Barat 16424<br />
                Indonesia
              </p>
            </div>
            
            <div className="contact-card-modern" style={{ '--contact-delay': '0.1s' }}>
              <div className="contact-icon-wrapper">
                <span className="contact-icon-modern">📞</span>
                <div className="contact-icon-ring"></div>
              </div>
              <h4 className="contact-title-modern">Telepon</h4>
              <p className="contact-text-modern">
                Customer Service<br />
                <strong className="contact-highlight">021-1234-5678</strong><br />
                Tersedia 24 jam
              </p>
            </div>
            
            <div className="contact-card-modern" style={{ '--contact-delay': '0.2s' }}>
              <div className="contact-icon-wrapper">
                <span className="contact-icon-modern">✉️</span>
                <div className="contact-icon-ring"></div>
              </div>
              <h4 className="contact-title-modern">Email</h4>
              <p className="contact-text-modern">
                info@skybooking.id<br />
                help@skybooking.id<br />
                partner@skybooking.id
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="about-cta-section">
            <div className="about-cta-card">
              <div className="about-cta-content">
                <h3 className="about-cta-title">Siap Untuk Terbang?</h3>
                <p className="about-cta-text">Mulai perjalanan Anda bersama SkyBooking sekarang juga</p>
              </div>
              <Link to="/" className="button is-primary is-medium about-cta-btn">
                <span>Pesan Tiket Sekarang</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
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
export default TentangKami;
