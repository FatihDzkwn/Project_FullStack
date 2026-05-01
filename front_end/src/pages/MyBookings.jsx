/**
 * ============================================================================
 * HALAMAN MY BOOKINGS (MyBookings.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Menampilkan daftar semua pesanan tiket user yang sudah login.
 * Data diambil dari localStorage berdasarkan user ID.
 * 
 * ALUR KERJA:
 * 1. Cek apakah user sudah login
 * 2. Jika belum login: tampilkan prompt untuk login
 * 3. Jika sudah login: ambil pesanan dari localStorage berdasarkan userId
 * 4. Tampilkan daftar pesanan dalam bentuk card
 * 
 * ROUTE: /my-bookings
 * 
 * CATATAN:
 * - Data pesanan disimpan di localStorage dengan key 'skyBookingOrders'
 * - Hanya menampilkan pesanan milik user yang login (filter by userId)
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORT DEPENDENCIES
// ============================================================================

// Link: Untuk navigasi ke halaman lain
import { Link } from 'react-router-dom';

// useAuth: Custom hook untuk cek status login dan data user
import { useAuth } from '../context/AuthContext';

// formatRupiah: Fungsi untuk format harga
import { formatRupiah } from '../data/flights';

// useState: Untuk state daftar pesanan
// useEffect: Untuk load data saat komponen mount
import { useState, useEffect } from 'react';

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================

function MyBookings() {
  // --------------------------------------------------------------------------
  // HOOKS
  // --------------------------------------------------------------------------
  
  // Mengambil status login dan data user dari AuthContext
  const { isLoggedIn, user } = useAuth();
  
  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------
  
  // State untuk menyimpan daftar pesanan user
  const [bookings, setBookings] = useState([]);
  
  // State untuk modal refund
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  // State untuk modal reschedule
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [newDate, setNewDate] = useState('');
  
  // State untuk notifikasi
  const [notification, setNotification] = useState(null);
  
  // State untuk modal detail & cetak
  const [showDetailModal, setShowDetailModal] = useState(false);

  // --------------------------------------------------------------------------
  // EFFECTS
  // --------------------------------------------------------------------------
  
  /**
   * Effect: Load bookings dari localStorage
   * 
   * CARA KERJA:
   * 1. Ambil semua pesanan dari localStorage
   * 2. Filter hanya pesanan dengan userId yang sama dengan user yang login
   * 3. Set ke state bookings
   * 
   * Dijalankan saat:
   * - Komponen mount
   * - isLoggedIn berubah
   * - user berubah
   */
  useEffect(() => {
    if (isLoggedIn && user) {
      // Ambil semua pesanan dari localStorage
      const allBookings = JSON.parse(localStorage.getItem('skyBookingOrders') || '[]');
      
      // Filter hanya pesanan milik user yang login DAN yang belum dibatalkan
      const userBookings = allBookings.filter(b => 
        b.userId === user.id && b.status !== 'Dibatalkan'
      );
      
      // Set ke state
      setBookings(userBookings);
    }
  }, [isLoggedIn, user]); // Dependencies

  // --------------------------------------------------------------------------
  // HANDLER FUNCTIONS
  // --------------------------------------------------------------------------
  
  /**
   * Handler: Buka modal refund
   */
  const handleRefundClick = (booking) => {
    setSelectedBooking(booking);
    setShowRefundModal(true);
  };
  
  /**
   * Handler: Konfirmasi refund
   * Mengubah status pesanan menjadi "Dibatalkan" dan menghapus dari daftar
   */
  const handleConfirmRefund = () => {
    if (!selectedBooking) return;
    
    // Ambil semua pesanan dari localStorage
    const allBookings = JSON.parse(localStorage.getItem('skyBookingOrders') || '[]');
    
    // Update status pesanan yang direfund
    const updatedBookings = allBookings.map(b => {
      if (b.bookingCode === selectedBooking.bookingCode) {
        return { ...b, status: 'Dibatalkan' };
      }
      return b;
    });
    
    // Simpan kembali ke localStorage
    localStorage.setItem('skyBookingOrders', JSON.stringify(updatedBookings));
    
    // Update state (filter out yang dibatalkan untuk tampilan)
    const userBookings = updatedBookings.filter(b => b.userId === user.id && b.status !== 'Dibatalkan');
    setBookings(userBookings);
    
    // Tutup modal dan tampilkan notifikasi
    setShowRefundModal(false);
    setSelectedBooking(null);
    setNotification({
      type: 'success',
      message: `Refund berhasil diproses untuk booking ${selectedBooking.bookingCode}. Dana akan dikembalikan dalam 3-7 hari kerja.`
    });
    
    // Hilangkan notifikasi setelah 5 detik
    setTimeout(() => setNotification(null), 5000);
  };
  
  /**
   * Handler: Buka modal reschedule
   */
  const handleRescheduleClick = (booking) => {
    setSelectedBooking(booking);
    setNewDate('');
    setShowRescheduleModal(true);
  };
  
  /**
   * Handler: Konfirmasi reschedule
   * Mengubah tanggal penerbangan
   */
  const handleConfirmReschedule = () => {
    if (!selectedBooking || !newDate) return;
    
    // Ambil semua pesanan dari localStorage
    const allBookings = JSON.parse(localStorage.getItem('skyBookingOrders') || '[]');
    
    // Update tanggal pesanan yang direschedule
    const updatedBookings = allBookings.map(b => {
      if (b.bookingCode === selectedBooking.bookingCode) {
        return { 
          ...b, 
          flight: { ...b.flight, date: newDate },
          rescheduled: true,
          originalDate: b.flight?.date
        };
      }
      return b;
    });
    
    // Simpan kembali ke localStorage
    localStorage.setItem('skyBookingOrders', JSON.stringify(updatedBookings));
    
    // Update state
    const userBookings = updatedBookings.filter(b => b.userId === user.id && b.status !== 'Dibatalkan');
    setBookings(userBookings);
    
    // Tutup modal dan tampilkan notifikasi
    setShowRescheduleModal(false);
    setSelectedBooking(null);
    setNewDate('');
    setNotification({
      type: 'success',
      message: `Jadwal penerbangan berhasil diubah ke ${newDate}. E-Ticket baru akan dikirim ke email Anda.`
    });
    
    // Hilangkan notifikasi setelah 5 detik
    setTimeout(() => setNotification(null), 5000);
  };

  // Handler untuk melihat detail booking
  const handleViewDetail = (booking) => {
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  // Handler untuk print E-Ticket
  const handlePrintETicket = () => {
    window.print();
  };

  // --------------------------------------------------------------------------
  // RENDER: JIKA BELUM LOGIN
  // --------------------------------------------------------------------------
  
  if (!isLoggedIn) {
    return (
      <div className="main-content mybookings-page">
        <section className="mybookings-hero">
          <div className="container">
            <div className="mybookings-hero-content">
              <div className="mybookings-hero-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <div className="mybookings-hero-text">
                <h1>Pesanan Saya</h1>
                <p>Kelola dan pantau semua perjalanan Anda</p>
              </div>
            </div>
          </div>
        </section>
        <section className="section mybookings-content">
          <div className="container">
            <div className="empty-state">
              <div className="empty-state-content">
                <div className="empty-state-icon">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h2 className="empty-state-title">Silakan Masuk Terlebih Dahulu</h2>
                <p className="empty-state-desc">
                  Untuk melihat dan mengelola pesanan, Anda perlu masuk ke akun Anda.
                </p>
                <div className="is-flex is-justify-content-center" style={{ gap: '1rem' }}>
                  <Link to="/login" className="btn-primary-action">
                    Masuk
                  </Link>
                  <Link to="/register" className="btn-primary-action" style={{ background: 'transparent', border: '2px solid #0066cc', color: '#0066cc', boxShadow: 'none' }}>
                    Daftar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: JIKA SUDAH LOGIN
  // --------------------------------------------------------------------------

  return (
    <div className="main-content mybookings-page">
      {/* ================================================================== */}
      {/* HEADER */}
      {/* ================================================================== */}
      <section className="mybookings-hero">
        <div className="container">
          <div className="mybookings-hero-content">
            <div className="mybookings-hero-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div className="mybookings-hero-text">
              <h1>Pesanan Saya</h1>
              <p>Kelola dan pantau semua perjalanan Anda</p>
            </div>
            {bookings.length > 0 && (
              <div className="mybookings-hero-badge">
                <span className="badge-count">{bookings.length}</span>
                <span className="badge-label">Pesanan</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section mybookings-content">
        <div className="container">
          {bookings.length > 0 ? (
            // ==============================================================
            // JIKA ADA PESANAN: Tampilkan daftar card
            // ==============================================================
            <div className="booking-cards-grid">
              {/* Loop setiap pesanan */}
              {bookings.map((booking, index) => (
                <div className="booking-card fade-in" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                  
                  {/* Status Badge */}
                  <div className="booking-card-status">
                    <span className="status-badge confirmed">Terkonfirmasi</span>
                  </div>
                  
                  {/* ---------------------------------------------------- */}
                  {/* HEADER CARD */}
                  {/* ---------------------------------------------------- */}
                  <div className="booking-card-header">
                    <div className="airline-info">
                      <figure className="airline-logo">
                        <img src={booking.flight?.logo} alt={booking.flight?.airlineName} />
                      </figure>
                      <div className="airline-details">
                        <span className="airline-name">{booking.flight?.airlineName}</span>
                        <span className="flight-number">{booking.flight?.flightNumber}</span>
                      </div>
                    </div>
                    <div className="booking-code">
                      <span className="code-label">Kode Booking</span>
                      <span className="code-value">{booking.bookingCode}</span>
                    </div>
                  </div>

                  {/* ---------------------------------------------------- */}
                  {/* ROUTE INFO */}
                  {/* ---------------------------------------------------- */}
                  <div className="booking-card-route">
                    <div className="route-point departure">
                      <span className="city-code">{booking.flight?.from}</span>
                      <span className="city-name">{booking.flight?.fromCity}</span>
                      <span className="time">{booking.flight?.departureTime}</span>
                    </div>
                    <div className="route-line">
                      <div className="line-decoration">
                        <span className="dot"></span>
                        <span className="line"></span>
                        <span className="plane-icon">✈</span>
                        <span className="line"></span>
                        <span className="dot"></span>
                      </div>
                      <span className="duration">{booking.flight?.duration || 'Direct'}</span>
                    </div>
                    <div className="route-point arrival">
                      <span className="city-code">{booking.flight?.to}</span>
                      <span className="city-name">{booking.flight?.toCity}</span>
                      <span className="time">{booking.flight?.arrivalTime}</span>
                    </div>
                  </div>

                  {/* ---------------------------------------------------- */}
                  {/* DETAILS SECTION */}
                  {/* ---------------------------------------------------- */}
                  <div className="booking-card-details">
                    <div className="detail-item">
                      <span className="detail-icon">👤</span>
                      <div className="detail-content">
                        <span className="detail-label">Penumpang</span>
                        <span className="detail-value">{booking.passengers?.length || 0} orang</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <div className="detail-content">
                        <span className="detail-label">Tanggal</span>
                        <span className="detail-value">
                          {booking.flight?.date || 
                           (booking.createdAt ? new Date(booking.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ---------------------------------------------------- */}
                  {/* FOOTER: Price & Actions */}
                  {/* ---------------------------------------------------- */}
                  <div className="booking-card-footer">
                    <div className="booking-price">
                      <span className="price-label">Total Pembayaran</span>
                      <span className="price-value">{formatRupiah(booking.totalPrice)}</span>
                    </div>
                    <div className="booking-actions">
                      <button 
                        className="btn-action btn-detail"
                        onClick={() => handleViewDetail(booking)}
                        title="Lihat Detail"
                      >
                        <span className="btn-icon">📄</span>
                        <span className="btn-text">Detail</span>
                      </button>
                      <button 
                        className="btn-action btn-reschedule"
                        onClick={() => handleRescheduleClick(booking)}
                        title="Reschedule"
                      >
                        <span className="btn-icon">📅</span>
                        <span className="btn-text">Ubah</span>
                      </button>
                      <button 
                        className="btn-action btn-refund"
                        onClick={() => handleRefundClick(booking)}
                        title="Refund"
                      >
                        <span className="btn-icon">↩</span>
                        <span className="btn-text">Refund</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // ==============================================================
            // JIKA TIDAK ADA PESANAN: Tampilkan pesan kosong
            // ==============================================================
            <div className="empty-state">
              <div className="empty-state-content">
                <div className="empty-state-icon">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 16v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
                    <path d="M12 11V3"/>
                    <path d="M9 6l3-3 3 3"/>
                    <rect x="3" y="16" width="18" height="5" rx="1"/>
                  </svg>
                </div>
                <h2 className="empty-state-title">Belum Ada Pesanan</h2>
                <p className="empty-state-desc">
                  Anda belum memiliki pesanan. Mulai rencanakan perjalanan Anda sekarang.
                </p>
                <Link to="/" className="btn-primary-action">
                  Cari Penerbangan
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* ================================================================== */}
      {/* NOTIFIKASI */}
      {/* ================================================================== */}
      {notification && (
        <div className={`notification-toast ${notification.type === 'success' ? 'is-success' : 'is-danger'}`}>
          <button className="delete" onClick={() => setNotification(null)}></button>
          {notification.message}
        </div>
      )}
      
      {/* ================================================================== */}
      {/* MODAL REFUND */}
      {/* ================================================================== */}
      {showRefundModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setShowRefundModal(false)}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Konfirmasi Refund</p>
              <button className="delete" onClick={() => setShowRefundModal(false)}></button>
            </header>
            <section className="modal-card-body">
              <p className="mb-4">
                Apakah Anda yakin ingin membatalkan pesanan ini?
              </p>
              {selectedBooking && (
                <div className="box has-background-light">
                  <p><strong>Kode Booking:</strong> {selectedBooking.bookingCode}</p>
                  <p><strong>Rute:</strong> {selectedBooking.flight?.fromCity} → {selectedBooking.flight?.toCity}</p>
                  <p><strong>Maskapai:</strong> {selectedBooking.flight?.airlineName}</p>
                  <p><strong>Total:</strong> {formatRupiah(selectedBooking.totalPrice)}</p>
                </div>
              )}
              <div className="notification is-warning is-light mt-4">
                <p className="is-size-7">
                  <strong>Catatan:</strong> Kebijakan refund mengikuti ketentuan masing-masing maskapai. 
                  Dana akan dikembalikan dalam 3-7 hari kerja ke metode pembayaran awal.
                </p>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-danger" onClick={handleConfirmRefund}>
                Ya, Refund Pesanan
              </button>
              <button className="button" onClick={() => setShowRefundModal(false)}>
                Batal
              </button>
            </footer>
          </div>
        </div>
      )}
      
      {/* ================================================================== */}
      {/* MODAL RESCHEDULE */}
      {/* ================================================================== */}
      {showRescheduleModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setShowRescheduleModal(false)}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Ubah Jadwal Penerbangan</p>
              <button className="delete" onClick={() => setShowRescheduleModal(false)}></button>
            </header>
            <section className="modal-card-body">
              {selectedBooking && (
                <div className="box has-background-light mb-4">
                  <p><strong>Kode Booking:</strong> {selectedBooking.bookingCode}</p>
                  <p><strong>Rute:</strong> {selectedBooking.flight?.fromCity} → {selectedBooking.flight?.toCity}</p>
                  <p><strong>Jadwal Saat Ini:</strong> {selectedBooking.flight?.date || 
                    (selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-')}</p>
                </div>
              )}
              <div className="field">
                <label className="label">Pilih Tanggal Baru</label>
                <div className="control">
                  <input 
                    type="date" 
                    className="input"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="notification is-info is-light mt-4">
                <p className="is-size-7">
                  <strong>Catatan:</strong> Perubahan jadwal mengikuti ketersediaan dari maskapai. 
                  E-Ticket baru akan dikirim ke email Anda setelah reschedule berhasil.
                </p>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button 
                className="button is-warning" 
                onClick={handleConfirmReschedule}
                disabled={!newDate}
              >
                Konfirmasi Reschedule
              </button>
              <button className="button" onClick={() => setShowRescheduleModal(false)}>
                Batal
              </button>
            </footer>
          </div>
        </div>
      )}
      
      {/* ================================================================== */}
      {/* MODAL DETAIL E-TICKET */}
      {/* ================================================================== */}
      {showDetailModal && selectedBooking && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setShowDetailModal(false)}></div>
          <div className="modal-card" style={{ width: '95%', maxWidth: '800px' }}>
            <header className="modal-card-head">
              <p className="modal-card-title">Detail Tiket</p>
              <button className="delete" aria-label="close" onClick={() => setShowDetailModal(false)}></button>
            </header>
            <section className="modal-card-body">
              {/* E-TICKET PRINTABLE VIEW */}
              <div className="eticket-print" id="eticket-detail">
                {/* Header E-Ticket */}
                <div className="eticket-header">
                  <div className="eticket-logo">
                    <h1>SkyBooking</h1>
                    <p>Electronic Ticket / Itinerary Receipt</p>
                  </div>
                  <div className="eticket-code">
                    <span className="label">Booking Code</span>
                    <span className="code">{selectedBooking.bookingCode}</span>
                  </div>
                </div>
                
                {/* Flight Info */}
                <div className="eticket-section">
                  <h3>Flight Information</h3>
                  <table className="eticket-table">
                    <tbody>
                      <tr>
                        <td>Flight</td>
                        <td>{selectedBooking.flight?.airlineName} - {selectedBooking.flight?.flightNumber}</td>
                      </tr>
                      <tr>
                        <td>Route</td>
                        <td>{selectedBooking.flight?.fromCity} ({selectedBooking.flight?.from}) → {selectedBooking.flight?.toCity} ({selectedBooking.flight?.to})</td>
                      </tr>
                      <tr>
                        <td>Date</td>
                        <td>{selectedBooking.flight?.date || 
                            (selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-')}
                        </td>
                      </tr>
                      <tr>
                        <td>Departure</td>
                        <td>{selectedBooking.flight?.departureTime}</td>
                      </tr>
                      <tr>
                        <td>Arrival</td>
                        <td>{selectedBooking.flight?.arrivalTime}</td>
                      </tr>
                      <tr>
                        <td>Class</td>
                        <td>{selectedBooking.flight?.class || 'Economy'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Passengers */}
                <div className="eticket-section">
                  <h3>Passenger Details</h3>
                  <table className="eticket-table">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Passenger Name</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBooking.passengers?.map((passenger, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{passenger.title} {passenger.firstName} {passenger.lastName}</td>
                          <td>{passenger.type || 'Adult'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Contact Info */}
                <div className="eticket-section">
                  <h3>Contact Information</h3>
                  <table className="eticket-table">
                    <tbody>
                      <tr>
                        <td>Email</td>
                        <td>{selectedBooking.contact?.email || '-'}</td>
                      </tr>
                      <tr>
                        <td>Phone</td>
                        <td>{selectedBooking.contact?.phone || '-'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Payment Summary */}
                <div className="eticket-section">
                  <h3>Payment Summary</h3>
                  <table className="eticket-table">
                    <tbody>
                      <tr>
                        <td>Payment Method</td>
                        <td>{selectedBooking.paymentMethod || 'Transfer Bank'}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td><span className="tag is-success">PAID</span></td>
                      </tr>
                      <tr className="total-row">
                        <td><strong>Total Amount</strong></td>
                        <td><strong>{formatRupiah(selectedBooking.totalPrice)}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Footer */}
                <div className="eticket-footer">
                  <p>Printed on: {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p>This is a computer-generated document. No signature required.</p>
                  <p className="mt-2"><strong>Important:</strong> Please bring this e-ticket and valid ID to the airport.</p>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-link" onClick={handlePrintETicket}>
                Cetak E-Ticket
              </button>
              <button className="button" onClick={() => setShowDetailModal(false)}>
                Tutup
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// EXPORT KOMPONEN
// ============================================================================
export default MyBookings;
