/**
 * ============================================================================
 * HALAMAN BOOKING (Booking.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Form untuk mengisi data penumpang dan informasi kontak.
 * Data penerbangan diambil dari state navigasi sebelumnya.
 * 
 * ALUR KERJA:
 * 1. User memilih penerbangan → klik "Pesan" → masuk halaman ini
 * 2. Isi data setiap penumpang (nama, tanggal lahir, dsb)
 * 3. Isi informasi kontak (email, telepon)
 * 4. Klik "Lanjut ke Pembayaran"
 * 5. Redirect ke halaman Confirmation dengan semua data
 * 
 * ROUTE: /booking
 * DATA DARI: FlightCard (via navigate dengan state)
 * 
 * CATATAN:
 * - Jumlah form penumpang sesuai dengan passengers dari pencarian
 * - Data dikirim ke Confirmation.jsx via navigate state
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORT DEPENDENCIES
// ============================================================================

// useState: Hook untuk state form
import { useState } from 'react';

// useLocation: Untuk mengambil state dari halaman sebelumnya
// useNavigate: Untuk navigasi ke halaman konfirmasi
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

// formatRupiah: Fungsi untuk format harga
import { formatRupiah } from '../data/flights';

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================

function Booking() {
  // --------------------------------------------------------------------------
  // HOOKS
  // --------------------------------------------------------------------------
  
  /**
   * useLocation: Mengambil data yang dikirim dari halaman sebelumnya
   * 
   * Saat FlightCard navigate ke /booking, dia mengirim:
   * navigate('/booking', { state: { flight, passengers } })
   * 
   * Data tersebut bisa diakses di location.state
   */
  const location = useLocation();
  const navigate = useNavigate();
  
  // --------------------------------------------------------------------------
  // MENGAMBIL DATA DARI STATE
  // --------------------------------------------------------------------------
  
  /**
   * Destructuring data dari location.state
   * 
   * flight: Object data penerbangan yang dipilih
   * passengers: Jumlah penumpang
   * 
   * || {} = fallback jika tidak ada data (undefined safety)
   */
  const { flight, passengers } = location.state || {};

  const { isLoggedIn } = useAuth();

  // Jika user belum login, redirect ke halaman login dan simpan intent
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { state: { redirectTo: '/booking', restoreState: { flight, passengers } } });
    }
  }, [isLoggedIn]);

  // --------------------------------------------------------------------------
  // VALIDASI DATA
  // --------------------------------------------------------------------------
  
  /**
   * Jika tidak ada data flight (misalnya user langsung ketik URL /booking),
   * tampilkan pesan error dan tombol kembali
   */
  if (!flight) {
    return (
      <div className="section">
        <div className="container has-text-centered">
          <h2 className="title">Data tidak ditemukan</h2>
          <p>Silakan pilih penerbangan terlebih dahulu.</p>
          <a href="/" className="button is-link mt-4">Kembali ke Beranda</a>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // STATE UNTUK FORM
  // --------------------------------------------------------------------------
  
  /**
   * State untuk form penumpang (array of objects)
   * 
   * Array.from({ length: N }, (_, i) => ...):
   * Membuat array dengan N elemen
   * 
   * CONTOH untuk 2 penumpang:
   * [
   *   { id: 1, title: 'Mr', firstName: '', lastName: '', birthDate: '', nationality: 'Indonesia' },
   *   { id: 2, title: 'Mr', firstName: '', lastName: '', birthDate: '', nationality: 'Indonesia' }
   * ]
   */
  const [passengerForms, setPassengerForms] = useState(
    Array.from({ length: parseInt(passengers) }, (_, i) => ({
      id: i + 1,                    // ID penumpang (1, 2, 3, ...)
      title: 'Tn.',                 // Gelar (Tn./Ny./Nn.)
      firstName: '',                // Nama depan
      lastName: '',                 // Nama belakang
      birthDate: '',                // Tanggal lahir
      nationality: 'Indonesia',     // Kewarganegaraan
    }))
  );

  /**
   * State untuk informasi kontak pemesan
   */
  const [contactInfo, setContactInfo] = useState({
    email: '',                      // Email untuk e-ticket
    phone: '',                      // Nomor telepon
  });

  /**
   * State untuk metode pembayaran
   */
  const [paymentMethod, setPaymentMethod] = useState('');

  /**
   * State untuk kode promo
   */
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isPromoLoading, setIsPromoLoading] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  /**
   * Daftar kode promo yang valid
   */
  const validPromoCodes = {
    'WEEKEND40': { discount: 40, type: 'percent', desc: 'Flash Sale Weekend' },
    'NEWUSER15': { discount: 15, type: 'percent', desc: 'Member Exclusive' },
    'EARLYBIRD25': { discount: 25, type: 'percent', desc: 'Early Bird' },
    'FAMILY20': { discount: 20, type: 'percent', desc: 'Family Package' },
    'STUDENT20': { discount: 20, type: 'percent', desc: 'Diskon Pelajar' },
    'HOLIDAY30': { discount: 30, type: 'percent', desc: 'Holiday Special' },
  };

  /**
   * Handler untuk apply promo code
   */
  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoError('Masukkan kode promo terlebih dahulu');
      setPromoSuccess('');
      return;
    }

    if (appliedDiscount) {
      setPromoError('Kode promo sudah digunakan');
      return;
    }
    
    setIsPromoLoading(true);
    setPromoError('');
    setPromoSuccess('');
    
    // Simulasi loading
    setTimeout(() => {
      setIsPromoLoading(false);
      const code = promoCode.trim().toUpperCase();
      
      if (validPromoCodes[code]) {
        const promo = validPromoCodes[code];
        setAppliedDiscount(promo);
        setPromoSuccess(`Promo "${promo.desc}" berhasil digunakan! Diskon ${promo.discount}%`);
        setPromoError('');
      } else {
        setPromoError('Kode promo tidak valid atau sudah kadaluarsa');
        setPromoSuccess('');
      }
    }, 1000);
  };

  /**
   * Handler untuk menghapus promo yang sudah di-apply
   */
  const handleRemovePromo = () => {
    setAppliedDiscount(null);
    setPromoCode('');
    setPromoSuccess('');
    setPromoError('');
  };

  // --------------------------------------------------------------------------
  // HANDLER FUNCTIONS
  // --------------------------------------------------------------------------
  
  /**
   * handlePassengerChange
   * Dipanggil setiap kali user mengubah input di form penumpang
   * 
   * @param {number} index - Index penumpang (0, 1, 2, ...)
   * @param {string} field - Nama field yang diubah ('firstName', 'lastName', dll)
   * @param {string} value - Nilai baru
   */
  const handlePassengerChange = (index, field, value) => {
    // Copy array state (React butuh reference baru untuk re-render)
    const updated = [...passengerForms];
    // Update field yang berubah
    updated[index][field] = value;
    // Set state baru
    setPassengerForms(updated);
  };

  /**
   * handleSubmit
   * Dipanggil ketika form di-submit
   * 
   * LANGKAH:
   * 1. Validasi semua data penumpang terisi
   * 2. Validasi data kontak terisi
   * 3. Navigate ke halaman konfirmasi dengan membawa semua data
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah halaman refresh
    
    // Validasi data penumpang
    for (let p of passengerForms) {
      if (!p.firstName || !p.lastName || !p.birthDate) {
        alert('Mohon lengkapi semua data penumpang!');
        return; // Berhenti jika ada yang kosong
      }
    }
    
    // Validasi data kontak
    if (!contactInfo.email || !contactInfo.phone) {
      alert('Mohon lengkapi data kontak!');
      return;
    }

    // Validasi metode pembayaran
    if (!paymentMethod) {
      alert('Mohon pilih metode pembayaran!');
      return;
    }

    // Navigate ke halaman konfirmasi dengan semua data
    navigate('/confirmation', {
      state: {
        flight,                                    // Data penerbangan
        passengers: passengerForms,                // Data semua penumpang
        contact: contactInfo,                      // Data kontak
        paymentMethod: paymentMethod,              // Metode pembayaran
        basePrice: flight.price * parseInt(passengerForms.length), // Harga sebelum diskon
        discountAmount: appliedDiscount ? Math.round(flight.price * parseInt(passengerForms.length) * (appliedDiscount.discount / 100)) : 0, // Jumlah diskon
        appliedPromo: appliedDiscount ? { code: promoCode, ...appliedDiscount } : null, // Info promo
        totalPrice: appliedDiscount 
          ? flight.price * parseInt(passengerForms.length) - Math.round(flight.price * parseInt(passengerForms.length) * (appliedDiscount.discount / 100))
          : flight.price * parseInt(passengerForms.length), // Total harga setelah diskon
      }
    });
  };

  // --------------------------------------------------------------------------
  // COMPUTED VALUES
  // --------------------------------------------------------------------------
  
  // Hitung total harga (harga per tiket × jumlah penumpang)
  const basePrice = flight.price * parseInt(passengers);

  // Hitung diskon jika ada promo yang di-apply
  const discountAmount = appliedDiscount 
    ? Math.round(basePrice * (appliedDiscount.discount / 100))
    : 0;

  // Total harga setelah diskon
  const totalPrice = basePrice - discountAmount;

  // --------------------------------------------------------------------------
  // RENDER KOMPONEN
  // --------------------------------------------------------------------------

  return (
    <div className="main-content">
      {/* ================================================================== */}
      {/* HEADER */}
      {/* ================================================================== */}
      <section className="hero is-link is-small">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-4">📝 Form Pemesanan</h1>
            <p className="subtitle is-6">
              {flight.fromCity} → {flight.toCity} • {flight.flightNumber}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Form wrapper - menangani submit */}
          <form onSubmit={handleSubmit}>
            <div className="columns">
              
              {/* ========================================================== */}
              {/* KOLOM KIRI - FORM INPUT */}
              {/* ========================================================== */}
              <div className="column is-8">
                
                {/* -------------------------------------------------------- */}
                {/* BOX: INFO PENERBANGAN */}
                {/* -------------------------------------------------------- */}
                <div className="box mb-5">
                  <h3 className="title is-5">✈️ Detail Penerbangan</h3>
                  <div className="columns is-vcentered">
                    <div className="column is-narrow">
                      {/* Logo maskapai */}
                      <figure className="image is-48x48">
                        <img src={flight.logo} alt={flight.airlineName} />
                      </figure>
                    </div>
                    <div className="column">
                      <p><strong>{flight.airlineName}</strong> - {flight.flightNumber}</p>
                      <p>{flight.fromCity} ({flight.from}) → {flight.toCity} ({flight.to})</p>
                      <p>{flight.departureTime} - {flight.arrivalTime} ({flight.duration})</p>
                    </div>
                  </div>
                </div>

                {/* -------------------------------------------------------- */}
                {/* BOX: FORM PENUMPANG (loop untuk setiap penumpang) */}
                {/* -------------------------------------------------------- */}
                {passengerForms.map((passenger, index) => (
                  <div className="box mb-4" key={passenger.id}>
                    <h3 className="title is-5">👤 Penumpang {index + 1}</h3>
                    
                    {/* Row 1: Title, Nama Depan, Nama Belakang */}
                    <div className="columns">
                      {/* Dropdown Title (Tn./Ny./Nn.) */}
                      <div className="column is-2">
                        <div className="field">
                          <label className="label">Title</label>
                          <div className="select is-fullwidth">
                            <select
                              value={passenger.title}
                              onChange={(e) => handlePassengerChange(index, 'title', e.target.value)}
                            >
                              <option value="Tn.">Tn.</option>
                              <option value="Ny.">Ny.</option>
                              <option value="Nn.">Nn.</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      {/* Input Nama Depan */}
                      <div className="column">
                        <div className="field">
                          <label className="label">Nama Depan</label>
                          <input
                            className="input"
                            type="text"
                            placeholder="Sesuai KTP/Paspor"
                            value={passenger.firstName}
                            onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Input Nama Belakang */}
                      <div className="column">
                        <div className="field">
                          <label className="label">Nama Belakang</label>
                          <input
                            className="input"
                            type="text"
                            placeholder="Sesuai KTP/Paspor"
                            value={passenger.lastName}
                            onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Tanggal Lahir, Kewarganegaraan */}
                    <div className="columns">
                      <div className="column is-6">
                        <div className="field">
                          <label className="label">Tanggal Lahir</label>
                          <input
                            className="input"
                            type="date"
                            value={passenger.birthDate}
                            onChange={(e) => handlePassengerChange(index, 'birthDate', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="column is-6">
                        <div className="field">
                          <label className="label">Kewarganegaraan</label>
                          <input
                            className="input"
                            type="text"
                            value={passenger.nationality}
                            onChange={(e) => handlePassengerChange(index, 'nationality', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* -------------------------------------------------------- */}
                {/* BOX: INFORMASI KONTAK */}
                {/* -------------------------------------------------------- */}
                <div className="box">
                  <h3 className="title is-5">📧 Informasi Kontak</h3>
                  <p className="has-text-grey mb-4">E-ticket akan dikirim ke email ini</p>
                  
                  <div className="columns">
                    {/* Input Email */}
                    <div className="column">
                      <div className="field">
                        <label className="label">Email</label>
                        <input
                          className="input"
                          type="email"
                          placeholder="contoh@email.com"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Input No. Telepon */}
                    <div className="column">
                      <div className="field">
                        <label className="label">No. Handphone</label>
                        <input
                          className="input"
                          type="tel"
                          placeholder="08xxxxxxxxxx"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* ======================================================== */}
                {/* BOX: METODE PEMBAYARAN */}
                {/* ======================================================== */}
                <div className="box">
                  <h3 className="title is-5">💳 Metode Pembayaran</h3>
                  <p className="has-text-grey mb-4">Pilih metode pembayaran yang diinginkan</p>
                  
                  <div className="columns is-multiline">
                    {/* Transfer Bank */}
                    <div className="column is-6">
                      <label className={`payment-option ${paymentMethod === 'bank_transfer' ? 'is-selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          value="bank_transfer"
                          checked={paymentMethod === 'bank_transfer'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <div className="payment-content">
                          <span className="payment-icon">🏦</span>
                          <div>
                            <strong>Transfer Bank</strong>
                            <p className="is-size-7 has-text-grey">BCA, BNI, BRI, Mandiri</p>
                          </div>
                        </div>
                      </label>
                    </div>
                    
                    {/* Kartu Kredit/Debit */}
                    <div className="column is-6">
                      <label className={`payment-option ${paymentMethod === 'credit_card' ? 'is-selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          value="credit_card"
                          checked={paymentMethod === 'credit_card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <div className="payment-content">
                          <span className="payment-icon">💳</span>
                          <div>
                            <strong>Kartu Kredit/Debit</strong>
                            <p className="is-size-7 has-text-grey">Visa, Mastercard</p>
                          </div>
                        </div>
                      </label>
                    </div>
                    
                    {/* E-Wallet */}
                    <div className="column is-6">
                      <label className={`payment-option ${paymentMethod === 'ewallet' ? 'is-selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          value="ewallet"
                          checked={paymentMethod === 'ewallet'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <div className="payment-content">
                          <span className="payment-icon">📱</span>
                          <div>
                            <strong>E-Wallet</strong>
                            <p className="is-size-7 has-text-grey">GoPay, OVO, DANA</p>
                          </div>
                        </div>
                      </label>
                    </div>
                    
                    {/* Virtual Account */}
                    <div className="column is-6">
                      <label className={`payment-option ${paymentMethod === 'virtual_account' ? 'is-selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="payment" 
                          value="virtual_account"
                          checked={paymentMethod === 'virtual_account'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <div className="payment-content">
                          <span className="payment-icon">🔢</span>
                          <div>
                            <strong>Virtual Account</strong>
                            <p className="is-size-7 has-text-grey">Semua Bank</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================================== */}
              {/* KOLOM KANAN - RINGKASAN HARGA */}
              {/* ========================================================== */}
              <div className="column is-4">
                {/* 
                  position: sticky = Kotak tetap terlihat saat scroll
                  top: 20px = Jarak dari atas saat sticky
                */}
                <div className="box" style={{ position: 'sticky', top: '20px' }}>
                  <h3 className="title is-5">💰 Ringkasan Harga</h3>
                  
                  {/* Input Kode Promo */}
                  <div className="promo-input-section mb-4">
                    <label className="label is-small">Punya kode promo?</label>
                    {appliedDiscount ? (
                      <div className="promo-applied-box">
                        <div className="promo-applied-content">
                          <span className="promo-applied-icon">✅</span>
                          <div className="promo-applied-info">
                            <strong>{promoCode}</strong>
                            <p className="is-size-7 has-text-grey">{appliedDiscount.desc}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="button is-small is-light is-danger"
                          onClick={handleRemovePromo}
                        >
                          Hapus
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="field has-addons">
                          <div className="control is-expanded">
                            <input
                              className={`input ${promoError ? 'is-danger' : promoSuccess ? 'is-success' : ''}`}
                              type="text"
                              placeholder="Masukkan kode promo"
                              value={promoCode}
                              onChange={(e) => {
                                setPromoCode(e.target.value.toUpperCase());
                                setPromoError('');
                              }}
                            />
                          </div>
                          <div className="control">
                            <button
                              type="button"
                              className={`button is-link ${isPromoLoading ? 'is-loading' : ''}`}
                              onClick={handleApplyPromo}
                              disabled={isPromoLoading}
                            >
                              Pakai
                            </button>
                          </div>
                        </div>
                        {promoError && (
                          <p className="help is-danger">
                            <span className="icon is-small"><i>❌</i></span>
                            {promoError}
                          </p>
                        )}
                        {promoSuccess && (
                          <p className="help is-success">
                            <span className="icon is-small"><i>✅</i></span>
                            {promoSuccess}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                  
                  {/* Tabel ringkasan harga */}
                  <table className="table is-fullwidth">
                    <tbody>
                      <tr>
                        <td>Harga tiket</td>
                        <td className="has-text-right">{formatRupiah(flight.price)}</td>
                      </tr>
                      <tr>
                        <td>Jumlah penumpang</td>
                        <td className="has-text-right">× {passengers}</td>
                      </tr>
                      <tr>
                        <td>Subtotal</td>
                        <td className="has-text-right">{formatRupiah(basePrice)}</td>
                      </tr>
                      {appliedDiscount && (
                        <tr className="has-text-success">
                          <td>
                            <span className="tag is-success is-light mr-2">-{appliedDiscount.discount}%</span>
                            Diskon Promo
                          </td>
                          <td className="has-text-right">- {formatRupiah(discountAmount)}</td>
                        </tr>
                      )}
                      <tr>
                        <th>Total</th>
                        <th className="has-text-right has-text-link is-size-5">
                          {formatRupiah(totalPrice)}
                          {appliedDiscount && (
                            <p className="is-size-7 has-text-grey has-text-weight-normal">
                              <s>{formatRupiah(basePrice)}</s>
                            </p>
                          )}
                        </th>
                      </tr>
                    </tbody>
                  </table>

                  {/* Tombol Submit */}
                  <button type="submit" className="button is-link is-fullwidth is-medium">
                    Lanjut ke Pembayaran
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// EXPORT KOMPONEN
// ============================================================================
export default Booking;
