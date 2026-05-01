/**
 * ============================================================================
 * HALAMAN CONFIRMATION (Confirmation.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Halaman konfirmasi setelah pemesanan berhasil.
 * Menampilkan kode booking, detail penerbangan, data penumpang, dan total biaya.
 * 
 * ALUR KERJA:
 * 1. Terima data dari halaman Booking (via navigate state)
 * 2. Generate kode booking unik (contoh: SKYA1B2C3)
 * 3. Simpan pesanan ke localStorage
 * 4. Tampilkan semua detail pemesanan
 * 
 * ROUTE: /confirmation
 * DATA DARI: Booking.jsx (via navigate dengan state)
 * 
 * FITUR:
 * - Generate kode booking random
 * - Simpan pesanan ke localStorage (untuk halaman My Bookings)
 * - Tombol cetak e-ticket
 * - Link ke user yang login (jika ada)
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORT DEPENDENCIES
// ============================================================================

// useLocation: Mengambil data dari halaman sebelumnya
// Link: Untuk navigasi tanpa refresh
import { useLocation, Link } from 'react-router-dom';

// useEffect: Untuk side effect (generate code, save to localStorage)
// useState: Untuk state kode booking
import { useEffect, useState } from 'react';

// formatRupiah: Fungsi format harga
import { formatRupiah } from '../data/flights';

// useAuth: Untuk mendapatkan user yang login (jika ada)
import { useAuth } from '../context/AuthContext';

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================

function Confirmation() {
  // --------------------------------------------------------------------------
  // HOOKS
  // --------------------------------------------------------------------------
  
  const location = useLocation();
  
  // Mengambil data auth (user dan status login)
  const { user, isLoggedIn } = useAuth();
  
  // --------------------------------------------------------------------------
  // MENGAMBIL DATA DARI STATE
  // --------------------------------------------------------------------------
  
  /**
   * Destructuring data dari Booking.jsx
   * 
   * flight: Object penerbangan
   * passengers: Array data penumpang
   * contact: Object informasi kontak
   * paymentMethod: Metode pembayaran yang dipilih
   * totalPrice: Total harga yang dibayar
   */
  const { flight, passengers, contact, paymentMethod, totalPrice } = location.state || {};
  
  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------
  
  // State untuk menyimpan kode booking yang digenerate
  const [bookingCode, setBookingCode] = useState('');
  
  // State untuk notifikasi email terkirim
  const [emailSent, setEmailSent] = useState(false);

  // --------------------------------------------------------------------------
  // EFFECTS
  // --------------------------------------------------------------------------
  
  /**
   * Effect: Generate booking code dan simpan ke localStorage
   * 
   * Dijalankan sekali saat komponen mount DAN ada data flight
   * 
   * CARA KERJA GENERATE CODE:
   * 1. 'SKY' = prefix
   * 2. Math.random() = angka random 0-1 (contoh: 0.123456789)
   * 3. .toString(36) = konversi ke base-36 (0-9 dan a-z)
   * 4. .substring(2, 8) = ambil 6 karakter
   * 5. .toUpperCase() = jadikan huruf besar
   * 
   * HASIL: SKYA1B2C3 (contoh)
   */
  useEffect(() => {
    // Hanya jalankan jika ada flight dan belum ada bookingCode
    if (flight && !bookingCode) {
      // Generate kode booking random
      const code = 'SKY' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setBookingCode(code);

      // Buat object booking untuk disimpan
      const booking = {
        bookingCode: code,              // Kode booking
        flight,                         // Data penerbangan
        passengers,                     // Data penumpang
        contact,                        // Data kontak
        paymentMethod,                  // Metode pembayaran
        totalPrice,                     // Total harga
        userId: isLoggedIn ? user.id : null,  // ID user (null jika guest)
        createdAt: new Date().toISOString(),  // Waktu pemesanan
        status: 'Berhasil',             // Status pesanan
      };

      // Ambil booking yang sudah ada di localStorage
      const existingBookings = JSON.parse(localStorage.getItem('skyBookingOrders') || '[]');
      
      // Tambahkan booking baru
      existingBookings.push(booking);
      
      // Simpan kembali ke localStorage
      localStorage.setItem('skyBookingOrders', JSON.stringify(existingBookings));
      
      // Simulasi pengiriman email (delay 2 detik)
      setTimeout(() => {
        setEmailSent(true);
      }, 2000);
    }
  }, [flight]); // Dependency: flight (jalan saat flight berubah)

  // --------------------------------------------------------------------------
  // VALIDASI DATA
  // --------------------------------------------------------------------------
  
  // Jika tidak ada data flight, tampilkan pesan error
  if (!flight) {
    return (
      <div className="section">
        <div className="container has-text-centered">
          <h2 className="title">Data tidak ditemukan</h2>
          <p>Silakan lakukan pemesanan terlebih dahulu.</p>
          <Link to="/" className="button is-link mt-4">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER KOMPONEN
  // --------------------------------------------------------------------------

  return (
    <div className="main-content">
      {/* ================================================================== */}
      {/* HEADER SUKSES */}
      {/* Banner hijau menandakan pemesanan berhasil */}
      {/* ================================================================== */}
      <section className="hero is-success is-medium">
        <div className="hero-body has-text-centered">
          {/* Icon sukses */}
          <span className="is-size-1">✅</span>
          <h1 className="title is-2 mt-3">Pemesanan Berhasil!</h1>
          
          {/* Tampilkan kode booking */}
          <p className="subtitle">
            Kode Booking: <strong className="is-size-4">{bookingCode}</strong>
          </p>
          
          {/* Info email dengan status */}
          <div className="notification is-light is-inline-block mt-3" style={{ background: 'rgba(255,255,255,0.2)' }}>
            {emailSent ? (
              <p className="has-text-white">
                ✅ E-ticket telah dikirim ke <strong>{contact.email}</strong>
              </p>
            ) : (
              <p className="has-text-white">
                ⏳ Mengirim E-ticket ke <strong>{contact.email}</strong>...
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* DETAIL BOOKING */}
      {/* ================================================================== */}
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-8">
              
              {/* ---------------------------------------------------------- */}
              {/* BOX: DETAIL PENERBANGAN */}
              {/* ---------------------------------------------------------- */}
              <div className="box">
                <h3 className="title is-5">✈️ Detail Penerbangan</h3>
                <hr />
                
                <div className="columns is-vcentered">
                  {/* Logo maskapai */}
                  <div className="column is-narrow has-text-centered">
                    <figure className="image is-64x64 mx-auto mb-2">
                      <img src={flight.logo} alt={flight.airlineName} />
                    </figure>
                    <p className="has-text-grey">{flight.airlineName}</p>
                  </div>
                  
                  {/* Tabel info penerbangan */}
                  <div className="column">
                    <table className="table is-fullwidth">
                      <tbody>
                        <tr>
                          <td>Nomor Penerbangan</td>
                          <td><strong>{flight.flightNumber}</strong></td>
                        </tr>
                        <tr>
                          <td>Rute</td>
                          <td>
                            <strong>{flight.fromCity} ({flight.from})</strong>
                            {' → '}
                            <strong>{flight.toCity} ({flight.to})</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>Waktu</td>
                          <td>{flight.departureTime} - {flight.arrivalTime} ({flight.duration})</td>
                        </tr>
                        <tr>
                          <td>Kelas</td>
                          <td>{flight.class}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* BOX: DATA PENUMPANG */}
              {/* ---------------------------------------------------------- */}
              <div className="box">
                <h3 className="title is-5">👥 Data Penumpang</h3>
                <hr />
                
                {/* Loop untuk setiap penumpang */}
                {passengers.map((p, index) => (
                  <div key={p.id} className="mb-4">
                    {/* Nama lengkap penumpang */}
                    <p className="has-text-weight-bold">
                      Penumpang {index + 1}: {p.title} {p.firstName} {p.lastName}
                    </p>
                    {/* Info tambahan */}
                    <p className="has-text-grey is-size-7">
                      Tanggal Lahir: {new Date(p.birthDate).toLocaleDateString('id-ID')} • 
                      Kewarganegaraan: {p.nationality}
                    </p>
                  </div>
                ))}
              </div>

              {/* ---------------------------------------------------------- */}
              {/* BOX: INFORMASI KONTAK */}
              {/* ---------------------------------------------------------- */}
              <div className="box">
                <h3 className="title is-5">📧 Informasi Kontak</h3>
                <hr />
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>No. HP:</strong> {contact.phone}</p>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* BOX: RINGKASAN PEMBAYARAN */}
              {/* ---------------------------------------------------------- */}
              <div className="box">
                <h3 className="title is-5">💰 Ringkasan Pembayaran</h3>
                <hr />
                
                {/* Metode Pembayaran */}
                <div className="mb-4">
                  <p className="has-text-grey is-size-7 mb-1">Metode Pembayaran:</p>
                  <p className="has-text-weight-bold">
                    {paymentMethod === 'bank_transfer' && '🏦 Transfer Bank (BCA, BNI, BRI, Mandiri)'}
                    {paymentMethod === 'credit_card' && '💳 Kartu Kredit/Debit (Visa, Mastercard)'}
                    {paymentMethod === 'ewallet' && '📱 E-Wallet (GoPay, OVO, DANA)'}
                    {paymentMethod === 'virtual_account' && '🔢 Virtual Account'}
                    {!paymentMethod && 'Tidak tersedia'}
                  </p>
                </div>
                
                {/* Tabel rincian harga */}
                <table className="table is-fullwidth">
                  <tbody>
                    <tr>
                      <td>Harga tiket × {passengers.length} penumpang</td>
                      <td className="has-text-right">
                        {formatRupiah(flight.price)} × {passengers.length}
                      </td>
                    </tr>
                    <tr>
                      <th>Total Dibayar</th>
                      <th className="has-text-right has-text-success is-size-4">
                        {formatRupiah(totalPrice)}
                      </th>
                    </tr>
                  </tbody>
                </table>
                
                {/* Notifikasi status pembayaran */}
                <div className="notification is-success is-light">
                  <strong>Status: LUNAS</strong> - Pembayaran telah diterima
                </div>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* TOMBOL AKSI */}
              {/* ---------------------------------------------------------- */}
              <div className="buttons is-centered mt-5 no-print">
                {/* Tombol Cetak - menggunakan window.print() */}
                <button 
                  className="button is-link is-medium"
                  onClick={() => window.print()}
                >
                  🖨️ Cetak E-Ticket
                </button>
                
                {/* Link kembali ke beranda */}
                <Link to="/" className="button is-light is-medium">
                  🏠 Kembali ke Beranda
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ================================================================== */}
      {/* E-TICKET UNTUK DICETAK (Hanya muncul saat print) */}
      {/* ================================================================== */}
      <div className="eticket-print">
        <div className="eticket-container">
          {/* Header E-Ticket */}
          <div className="eticket-header">
            <div className="eticket-logo">
              <span className="eticket-logo-icon">✈</span>
              <span className="eticket-logo-text">SkyBooking</span>
            </div>
            <div className="eticket-title">
              <h1>E-TICKET</h1>
              <p>Electronic Ticket Receipt</p>
            </div>
          </div>
          
          {/* Booking Info */}
          <div className="eticket-booking-info">
            <div className="eticket-booking-code">
              <span className="label">Kode Booking</span>
              <span className="value">{bookingCode}</span>
            </div>
            <div className="eticket-booking-date">
              <span className="label">Tanggal Pemesanan</span>
              <span className="value">{new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="eticket-status">
              <span className="status-badge">CONFIRMED</span>
            </div>
          </div>
          
          {/* Flight Details */}
          <div className="eticket-section">
            <h2 className="eticket-section-title">Detail Penerbangan</h2>
            <div className="eticket-flight">
              <div className="eticket-flight-header">
                <div className="airline-info">
                  <img src={flight.logo} alt={flight.airlineName} className="airline-logo-print" />
                  <div>
                    <strong>{flight.airlineName}</strong>
                    <span>{flight.flightNumber}</span>
                  </div>
                </div>
                <div className="flight-class">{flight.class}</div>
              </div>
              
              <div className="eticket-route">
                <div className="route-point">
                  <span className="city-code">{flight.from}</span>
                  <span className="city-name">{flight.fromCity}</span>
                  <span className="time">{flight.departureTime}</span>
                </div>
                <div className="route-line">
                  <span className="duration">{flight.duration}</span>
                  <div className="line">
                    <span className="plane-icon">✈</span>
                  </div>
                </div>
                <div className="route-point">
                  <span className="city-code">{flight.to}</span>
                  <span className="city-name">{flight.toCity}</span>
                  <span className="time">{flight.arrivalTime}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Passengers */}
          <div className="eticket-section">
            <h2 className="eticket-section-title">Data Penumpang</h2>
            <table className="eticket-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Penumpang</th>
                  <th>Tanggal Lahir</th>
                  <th>Kewarganegaraan</th>
                </tr>
              </thead>
              <tbody>
                {passengers.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td>{p.title} {p.firstName} {p.lastName}</td>
                    <td>{new Date(p.birthDate).toLocaleDateString('id-ID')}</td>
                    <td>{p.nationality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Contact & Payment */}
          <div className="eticket-two-columns">
            <div className="eticket-section">
              <h2 className="eticket-section-title">Informasi Kontak</h2>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>No. HP:</strong> {contact.phone}</p>
            </div>
            <div className="eticket-section">
              <h2 className="eticket-section-title">Pembayaran</h2>
              <p><strong>Metode:</strong> {
                paymentMethod === 'bank_transfer' ? 'Transfer Bank' :
                paymentMethod === 'credit_card' ? 'Kartu Kredit/Debit' :
                paymentMethod === 'ewallet' ? 'E-Wallet' :
                paymentMethod === 'virtual_account' ? 'Virtual Account' : '-'
              }</p>
              <p><strong>Total:</strong> {formatRupiah(totalPrice)}</p>
              <p><strong>Status:</strong> <span className="paid-status">LUNAS</span></p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="eticket-footer">
            <div className="eticket-notes">
              <h3>Catatan Penting:</h3>
              <ul>
                <li>Harap tiba di bandara minimal 2 jam sebelum keberangkatan</li>
                <li>Bawa kartu identitas (KTP/Paspor) yang valid sesuai nama di tiket</li>
                <li>E-Ticket ini berlaku sebagai bukti pembelian yang sah</li>
                <li>Simpan kode booking untuk proses check-in</li>
              </ul>
            </div>
            <div className="eticket-barcode">
              <div className="barcode-placeholder">
                ||| ||| || ||| | || ||| || | ||| || ||| |
              </div>
              <span>{bookingCode}</span>
            </div>
          </div>
          
          <div className="eticket-copyright">
            <p>SkyBooking - Platform Pemesanan Tiket Pesawat Terpercaya</p>
            <p>www.skybooking.id | info@skybooking.id | 021-1234-5678</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// EXPORT KOMPONEN
// ============================================================================
export default Confirmation;
