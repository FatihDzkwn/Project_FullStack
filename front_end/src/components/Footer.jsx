/**
 * ============================================================================
 * KOMPONEN FOOTER (Footer.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Footer (bagian bawah) yang tampil di semua halaman website.
 * Berisi informasi tentang website, link navigasi, dan kontak.
 * 
 * DIGUNAKAN DI: App.jsx (tampil di semua halaman)
 * 
 * ============================================================================
 */

import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-main">
      {/* ================================================================ */}
      {/* FOOTER TOP - Konten Utama */}
      {/* ================================================================ */}
      <div className="footer-top">
        <div className="container">
          <div className="columns is-multiline">
            
            {/* ========================================================== */}
            {/* KOLOM 1: BRAND & DESKRIPSI */}
            {/* ========================================================== */}
            <div className="column is-4-desktop is-6-tablet is-12-mobile">
              <div className="footer-brand">
                <Link to="/" className="footer-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <span className="footer-logo-icon">✈️</span>
                  <span className="footer-logo-text">SkyBooking</span>
                </Link>
                <p className="footer-description">
                  Platform pemesanan tiket pesawat terpercaya untuk seluruh Indonesia. 
                  Temukan harga terbaik dari berbagai maskapai dan nikmati perjalanan 
                  tanpa khawatir.
                </p>
                {/* Sosial Media */}
                <div className="footer-social">
                  <a href="#" className="social-link social-facebook" aria-label="Facebook">
                    <img src="/sosmed/facebook.png" alt="Facebook" />
                  </a>
                  <a href="#" className="social-link" aria-label="Instagram">
                    <img src="/sosmed/instagram.png" alt="Instagram" />
                  </a>
                  <a href="#" className="social-link" aria-label="X">
                    <img src="/sosmed/x.png" alt="X" />
                  </a>
                  <a href="#" className="social-link" aria-label="TikTok">
                    <img src="/sosmed/tiktok.png" alt="TikTok" />
                  </a>
                  <a href="#" className="social-link" aria-label="YouTube">
                    <img src="/sosmed/youtube.png" alt="YouTube" />
                  </a>
                </div>
              </div>
            </div>

            {/* ========================================================== */}
            {/* KOLOM 2: NAVIGASI */}
            {/* ========================================================== */}
            <div className="column is-2-desktop is-3-tablet is-6-mobile">
              <div className="footer-links">
                <h4 className="footer-title">Navigasi</h4>
                <ul>
                  <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Beranda</Link></li>
                  <li><Link to="/tentang-kami" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Tentang Kami</Link></li>
                  <li><Link to="/my-bookings" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Pesanan Saya</Link></li>
                  <li><Link to="/" onClick={() => {
                    setTimeout(() => {
                      const el = document.getElementById('promo');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}>Promo</Link></li>
                </ul>
              </div>
            </div>

            {/* ========================================================== */}
            {/* KOLOM 3: LAYANAN */}
            {/* ========================================================== */}
            <div className="column is-2-desktop is-3-tablet is-6-mobile">
              <div className="footer-links">
                <h4 className="footer-title">Layanan</h4>
                <ul>
                  <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Tiket Pesawat</Link></li>
                  <li><Link to="/my-bookings" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Refund & Reschedule</Link></li>
                  <li><Link to="/my-bookings" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>E-Ticket</Link></li>
                  <li><Link to="/" onClick={() => {
                    setTimeout(() => {
                      const el = document.getElementById('faq');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}>FAQ</Link></li>
                </ul>
              </div>
            </div>

            {/* ========================================================== */}
            {/* KOLOM 4: MASKAPAI PARTNER */}
            {/* ========================================================== */}
            <div className="column is-2-desktop is-6-tablet is-6-mobile">
              <div className="footer-links">
                <h4 className="footer-title">Partner</h4>
                <ul>
                  <li><Link to="/" onClick={() => {
                    setTimeout(() => {
                      const el = document.getElementById('partner');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}>Garuda Indonesia</Link></li>
                  <li><Link to="/" onClick={() => {
                    setTimeout(() => {
                      const el = document.getElementById('partner');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}>Lion Air</Link></li>
                  <li><Link to="/" onClick={() => {
                    setTimeout(() => {
                      const el = document.getElementById('partner');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}>Citilink</Link></li>
                  <li><Link to="/" onClick={() => {
                    setTimeout(() => {
                      const el = document.getElementById('partner');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}>Batik Air</Link></li>
                  <li><Link to="/" onClick={() => {
                    setTimeout(() => {
                      const el = document.getElementById('partner');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}>AirAsia</Link></li>
                  <li><Link to="/" onClick={() => {
                    setTimeout(() => {
                      const el = document.getElementById('partner');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}>Sriwijaya Air</Link></li>
                  <li><Link to="/" onClick={() => {
                    setTimeout(() => {
                      const el = document.getElementById('partner');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}>Super Air Jet</Link></li>
                  <li><Link to="/" onClick={() => {
                    setTimeout(() => {
                      const el = document.getElementById('partner');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}>Wings Air</Link></li>
                </ul>
              </div>
            </div>

            {/* ========================================================== */}
            {/* KOLOM 5: KONTAK */}
            {/* ========================================================== */}
            <div className="column is-2-desktop is-6-tablet is-12-mobile">
              <div className="footer-contact">
                <h4 className="footer-title">Hubungi Kami</h4>
                <ul>
                  <li>
                    <span className="contact-icon">📍</span>
                    <span>Jl. Margonda Raya No. 100, Depok</span>
                  </li>
                  <li>
                    <span className="contact-icon">📞</span>
                    <span>021-1234-5678</span>
                  </li>
                  <li>
                    <span className="contact-icon">✉️</span>
                    <span>info@skybooking.id</span>
                  </li>
                  <li>
                    <span className="contact-icon">🕐</span>
                    <span>24/7 Online Support</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* FOOTER BOTTOM - Copyright */}
      {/* ================================================================ */}
      <div className="footer-bottom">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-6">
              <p className="copyright">
                © 2026 SkyBooking. All rights reserved.
              </p>
            </div>
            <div className="column is-6">
              <div className="footer-bottom-links">
                <Link to="/syarat-ketentuan" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Syarat & Ketentuan</Link>
                <Link to="/kebijakan-privasi" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Kebijakan Privasi</Link>
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Sitemap</Link>
              </div>
            </div>
          </div>
          <p className="project-credit">
            Dibuat untuk Project Kuliah STT Terpadu Nurul Fikri - Pemrograman Full Stack
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// EXPORT KOMPONEN
// ============================================================================
export default Footer;
