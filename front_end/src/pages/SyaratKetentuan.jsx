/**
 * ============================================================================
 * HALAMAN SYARAT & KETENTUAN (SyaratKetentuan.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Menampilkan syarat dan ketentuan penggunaan layanan SkyBooking
 * 
 * ============================================================================
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';

// ============================================================================
// DATA SYARAT & KETENTUAN
// ============================================================================

const termsData = [
  {
    id: 1,
    title: 'Ketentuan Umum',
    icon: '📋',
    content: [
      'SkyBooking adalah platform simulasi pemesanan tiket pesawat yang dibuat sebagai proyek pembelajaran.',
      'Website ini dikembangkan oleh mahasiswa STT Terpadu Nurul Fikri untuk mata kuliah Pemrograman Full Stack.',
      'SkyBooking menampilkan 8 maskapai partner: Garuda Indonesia, Lion Air, Citilink, Batik Air, AirAsia, Sriwijaya Air, Super Air Jet, dan Wings Air.',
      'Seluruh transaksi dalam platform ini bersifat simulasi dan tidak melibatkan pembayaran nyata.'
    ]
  },
  {
    id: 2,
    title: 'Pendaftaran Akun',
    icon: '👤',
    content: [
      'Pendaftaran akun memerlukan data: nama lengkap, alamat email, dan password.',
      'Password minimal terdiri dari 6 karakter untuk keamanan akun.',
      'Satu alamat email hanya dapat digunakan untuk satu akun SkyBooking.',
      'Pengguna bertanggung jawab menjaga kerahasiaan password akun masing-masing.',
      'Data akun disimpan secara lokal di browser (localStorage) untuk keperluan demonstrasi.'
    ]
  },
  {
    id: 3,
    title: 'Pemesanan Tiket',
    icon: '🎫',
    content: [
      'Pengguna dapat mencari penerbangan berdasarkan kota asal, kota tujuan, tanggal, dan jumlah penumpang.',
      'Data penumpang yang diperlukan: title (Tn./Ny./Nn.), nama depan, nama belakang, tanggal lahir, dan kewarganegaraan.',
      'Informasi kontak (email dan nomor telepon) diperlukan untuk pengiriman e-ticket.',
      'Pengguna wajib memastikan kebenaran data penumpang sesuai KTP/Paspor.',
      'E-ticket akan ditampilkan di halaman konfirmasi setelah proses booking selesai.'
    ]
  },
  {
    id: 4,
    title: 'Metode Pembayaran',
    icon: '💳',
    content: [
      'Transfer Bank: BCA, BNI, BRI, Mandiri',
      'Kartu Kredit/Debit: Visa, Mastercard',
      'E-Wallet: GoPay, OVO, DANA',
      'Virtual Account tersedia untuk kemudahan pembayaran.',
      'Catatan: Semua metode pembayaran bersifat simulasi untuk keperluan demonstrasi.'
    ]
  },
  {
    id: 5,
    title: 'Riwayat Pesanan',
    icon: '📋',
    content: [
      'Pengguna dapat melihat riwayat pemesanan di menu "Pesanan Saya".',
      'Setiap pesanan memiliki kode booking unik untuk referensi.',
      'Detail penerbangan dan data penumpang dapat dilihat kembali.',
      'Riwayat pesanan tersimpan di browser selama data tidak dihapus.'
    ]
  },
  {
    id: 6,
    title: 'Fitur Website',
    icon: '✨',
    content: [
      'Pencarian penerbangan dengan filter lengkap (rute, tanggal, penumpang).',
      'Informasi detail maskapai partner termasuk armada dan layanan.',
      'Destinasi populer dengan panduan waktu terbaik berkunjung.',
      'FAQ (Frequently Asked Questions) untuk bantuan pengguna.',
      'Halaman Tentang Kami dengan informasi tim pengembang.'
    ]
  },
  {
    id: 7,
    title: 'Tanggung Jawab Pengguna',
    icon: '✅',
    content: [
      'Pengguna bertanggung jawab atas kebenaran seluruh informasi yang dimasukkan.',
      'Pengguna diharapkan menggunakan platform ini untuk tujuan pembelajaran.',
      'Tidak diperkenankan menyalahgunakan platform untuk tujuan ilegal.',
      'Pengguna memahami bahwa ini adalah proyek edukasi, bukan layanan komersial.'
    ]
  },
  {
    id: 8,
    title: 'Disclaimer',
    icon: '⚠️',
    content: [
      'SkyBooking adalah proyek edukasi dan tidak mewakili layanan pemesanan tiket sesungguhnya.',
      'Harga tiket yang ditampilkan bersifat ilustratif dan tidak mencerminkan harga aktual.',
      'Logo maskapai digunakan untuk keperluan pembelajaran dan tidak ada afiliasi resmi.',
      'Tim pengembang tidak bertanggung jawab atas penggunaan di luar konteks pembelajaran.'
    ]
  }
];

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================

function SyaratKetentuan() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div className="legal-page">
      {/* ================================================================ */}
      {/* HERO SECTION */}
      {/* ================================================================ */}
      <section className="legal-hero">
        <div className="legal-hero-bg"></div>
        <div className="container">
          <div className="legal-hero-content">
            <div className="legal-breadcrumb">
              <Link to="/">Beranda</Link>
              <span className="separator">›</span>
              <span>Syarat & Ketentuan</span>
            </div>
            <h1 className="legal-title">Syarat & Ketentuan</h1>
            <p className="legal-subtitle">
              Harap baca syarat dan ketentuan berikut dengan seksama sebelum menggunakan layanan SkyBooking
            </p>
            <div className="legal-meta">
              <span className="meta-item">
                <span className="meta-icon">📅</span>
                Terakhir diperbarui: 1 Maret 2026
              </span>
              <span className="meta-item">
                <span className="meta-icon">📖</span>
                Waktu baca: 10 menit
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
                  {termsData.map((item, index) => (
                    <a 
                      key={item.id}
                      href={`#section-${item.id}`}
                      className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(`section-${item.id}`).scrollIntoView({ behavior: 'smooth' });
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
              <div className="legal-intro-card">
                <div className="intro-icon">🎓</div>
                <div className="intro-content">
                  <h3>Proyek Pembelajaran</h3>
                  <p>
                    SkyBooking adalah simulasi platform pemesanan tiket pesawat yang dibuat untuk 
                    mata kuliah Pemrograman Full Stack di STT Terpadu Nurul Fikri. Dokumen ini 
                    menjelaskan fitur dan ketentuan penggunaan platform pembelajaran ini.
                  </p>
                </div>
              </div>

              {/* Accordion Sections */}
              <div className="legal-sections">
                {termsData.map((section, index) => (
                  <div 
                    key={section.id} 
                    id={`section-${section.id}`}
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
                          <span className="section-number">Pasal {section.id}</span>
                          <h3 className="section-title">{section.title}</h3>
                        </div>
                      </div>
                      <span className="section-toggle">
                        {activeSection === section.id ? '−' : '+'}
                      </span>
                    </button>
                    <div className="section-content">
                      <ul className="terms-list">
                        {section.content.map((item, idx) => (
                          <li key={idx}>
                            <span className="list-bullet">{idx + 1}</span>
                            <span className="list-text">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tentang Proyek */}
              <div className="legal-contact-card">
                <div className="contact-icon">🎓</div>
                <div className="contact-content">
                  <h3>Proyek Pembelajaran</h3>
                  <p>
                    Website ini adalah proyek pembelajaran untuk mata kuliah Pemrograman Full Stack 
                    di STT Terpadu Nurul Fikri.
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
                  <Link to="/kebijakan-privasi" className="related-link-card">
                    <span className="related-icon">🔒</span>
                    <div className="related-info">
                      <h4>Kebijakan Privasi</h4>
                      <p>Pelajari bagaimana kami melindungi data Anda</p>
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
export default SyaratKetentuan;
