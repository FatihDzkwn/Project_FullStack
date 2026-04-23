/**
 * ============================================================================
 * HALAMAN DETAIL PENERBANGAN (FlightDetail.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Menampilkan informasi lengkap tentang satu penerbangan sebelum user
 * memutuskan untuk memesan.
 * 
 * CARA KERJA:
 * 1. Mengambil ID penerbangan dari URL (contoh: /flight/1)
 * 2. Mencari data penerbangan berdasarkan ID tersebut
 * 3. Menampilkan semua detail: maskapai, waktu, harga, fasilitas, dll
 * 4. User bisa langsung klik "Pesan Sekarang" untuk ke halaman booking
 * 
 * DIGUNAKAN DI:
 * - Ketika user klik "Lihat Detail" di FlightCard
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORT DEPENDENCIES
// ============================================================================

// useParams: Mengambil parameter dari URL (contoh: id dari /flight/:id)
// useNavigate: Untuk pindah halaman secara programatis
// Link: Untuk membuat link ke halaman lain
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

// Import data penerbangan dan fungsi helper
import { flights, airports, formatRupiah } from '../data/flights';

// useState: Untuk menyimpan data yang bisa berubah (state)
import { useState } from 'react';

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================

function FlightDetail() {
  // --------------------------------------------------------------------------
  // HOOKS & STATE
  // --------------------------------------------------------------------------
  
  // Mengambil ID dari URL
  // Contoh: jika URL adalah /flight/3, maka id = "3"
  const { id } = useParams();
  
  // Untuk navigasi ke halaman lain
  const navigate = useNavigate();
  
  // Untuk mengambil data yang dikirim dari halaman sebelumnya
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  
  // State untuk jumlah penumpang (default 1, atau dari halaman sebelumnya)
  const [passengers, setPassengers] = useState(
    location.state?.passengers || 1
  );

  // --------------------------------------------------------------------------
  // MENCARI DATA PENERBANGAN
  // --------------------------------------------------------------------------
  
  // Cari penerbangan berdasarkan ID
  // parseInt() mengubah string "3" menjadi angka 3
  const flight = flights.find(f => f.id === parseInt(id));

  // Jika penerbangan tidak ditemukan, tampilkan pesan error
  if (!flight) {
    return (
      <div className="main-content">
        <section className="section">
          <div className="container has-text-centered">
            <span className="is-size-1">❌</span>
            <h2 className="title is-3 mt-4">Penerbangan Tidak Ditemukan</h2>
            <p className="has-text-grey mb-5">
              Maaf, penerbangan yang kamu cari tidak tersedia.
            </p>
            <Link to="/" className="button is-link">
              Kembali ke Beranda
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Redirect ke login jika user belum login
  useEffect(() => {
    if (!isLoggedIn) {
      // Simpan intent agar setelah login user kembali ke halaman ini
      window.history.replaceState({}, '');
      navigate('/login', { state: { redirectTo: location.pathname, restoreState: { passengers } } });
    }
  }, [isLoggedIn]);

  // --------------------------------------------------------------------------
  // DATA TAMBAHAN
  // --------------------------------------------------------------------------
  
  // Cari info bandara keberangkatan
  const fromAirport = airports.find(a => a.code === flight.from);
  
  // Cari info bandara tujuan
  const toAirport = airports.find(a => a.code === flight.to);

  // Data fasilitas pesawat (dummy data untuk tampilan)
  const facilities = [
    { icon: '💺', name: 'Kursi Standar', description: 'Jarak antar kursi 30 inch' },
    { icon: '🧳', name: 'Bagasi Kabin', description: '7 kg gratis' },
    { icon: '🎒', name: 'Bagasi Check-in', description: '20 kg gratis' },
    { icon: '🍽️', name: 'Makanan', description: 'Snack ringan tersedia' },
    { icon: '🎬', name: 'Hiburan', description: 'TV pribadi di kursi' },
    { icon: '🔌', name: 'Colokan Listrik', description: 'Tersedia di setiap kursi' },
  ];

  // Kebijakan penerbangan
  const policies = [
    { title: 'Pembatalan', description: 'Gratis pembatalan hingga 24 jam sebelum keberangkatan' },
    { title: 'Perubahan Jadwal', description: 'Biaya perubahan Rp 150.000 per penumpang' },
    { title: 'Check-in', description: 'Online check-in dibuka 24 jam sebelum keberangkatan' },
    { title: 'Refund', description: 'Refund diproses dalam 7-14 hari kerja' },
  ];

  // --------------------------------------------------------------------------
  // FUNGSI HANDLER
  // --------------------------------------------------------------------------
  
  /**
   * handleBooking
   * Fungsi yang dijalankan ketika user klik tombol "Pesan Sekarang"
   * Mengirim data penerbangan ke halaman booking
   */
  const handleBooking = () => {
    navigate('/booking', {
      state: {
        flight: flight,
        passengers: passengers
      }
    });
  };

  // --------------------------------------------------------------------------
  // RENDER KOMPONEN
  // --------------------------------------------------------------------------
  
  return (
    <div className="main-content">
      {/* ================================================================== */}
      {/* HEADER - Info Singkat Penerbangan */}
      {/* ================================================================== */}
      <section className="hero is-link">
        <div className="hero-body">
          <div className="container">
            {/* Breadcrumb - Navigasi */}
            <nav className="breadcrumb has-bullet-separator mb-4" aria-label="breadcrumbs">
              <ul>
                <li><Link to="/" className="has-text-white-ter">Beranda</Link></li>
                <li><Link to="/search" className="has-text-white-ter">Pencarian</Link></li>
                <li className="is-active"><a className="has-text-white">Detail Penerbangan</a></li>
              </ul>
            </nav>

            {/* Info Utama */}
            <div className="columns is-vcentered">
              <div className="column">
                <div className="is-flex is-align-items-center">
                  <figure className="image is-64x64 mr-4">
                    <img src={flight.logo} alt={flight.airlineName} style={{ background: 'white', borderRadius: '8px', padding: '4px' }} />
                  </figure>
                  <div>
                    <h1 className="title is-3 has-text-white mb-1">
                      {flight.fromCity} → {flight.toCity}
                    </h1>
                    <p className="subtitle is-5 has-text-white-ter">
                      {flight.airlineName} • {flight.flightNumber}
                    </p>
                  </div>
                </div>
              </div>
              <div className="column is-narrow has-text-right">
                <p className="is-size-7 has-text-white-ter">Harga mulai dari</p>
                <p className="is-size-3 has-text-white has-text-weight-bold">
                  {formatRupiah(flight.price)}
                </p>
                <p className="is-size-7 has-text-white-ter">per orang</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* KONTEN UTAMA */}
      {/* ================================================================== */}
      <section className="section">
        <div className="container">
          <div className="columns">
            {/* ============================================================ */}
            {/* KOLOM KIRI - Detail Penerbangan */}
            {/* ============================================================ */}
            <div className="column is-8">
              
              {/* -------------------------------------------------------------- */}
              {/* BOX 1: Detail Jadwal Penerbangan */}
              {/* -------------------------------------------------------------- */}
              <div className="box mb-5 fade-in">
                <h3 className="title is-5 mb-4">✈️ Detail Jadwal</h3>
                
                {/* Timeline Penerbangan */}
                <div className="columns is-vcentered">
                  {/* Keberangkatan */}
                  <div className="column is-4">
                    <div className="has-text-centered">
                      <p className="is-size-2 has-text-weight-bold has-text-link">
                        {flight.departureTime}
                      </p>
                      <p className="is-size-5 has-text-weight-semibold">
                        {flight.fromCity}
                      </p>
                      <p className="has-text-grey is-size-7">
                        {fromAirport?.name} ({flight.from})
                      </p>
                    </div>
                  </div>

                  {/* Durasi & Garis */}
                  <div className="column is-4">
                    <div className="has-text-centered">
                      <p className="has-text-grey is-size-7 mb-2">{flight.duration}</p>
                      <div className="is-flex is-align-items-center is-justify-content-center">
                        <div style={{ 
                          flex: 1, 
                          height: '2px', 
                          background: 'linear-gradient(to right, #3273dc, #48c774)' 
                        }}></div>
                        <span className="mx-2">✈️</span>
                        <div style={{ 
                          flex: 1, 
                          height: '2px', 
                          background: 'linear-gradient(to right, #48c774, #3273dc)' 
                        }}></div>
                      </div>
                      <p className="has-text-success is-size-7 mt-2">
                        <strong>Penerbangan Langsung</strong>
                      </p>
                    </div>
                  </div>

                  {/* Kedatangan */}
                  <div className="column is-4">
                    <div className="has-text-centered">
                      <p className="is-size-2 has-text-weight-bold has-text-success">
                        {flight.arrivalTime}
                      </p>
                      <p className="is-size-5 has-text-weight-semibold">
                        {flight.toCity}
                      </p>
                      <p className="has-text-grey is-size-7">
                        {toAirport?.name} ({flight.to})
                      </p>
                    </div>
                  </div>
                </div>

                <hr />

                {/* Info Tambahan */}
                <div className="columns is-multiline">
                  <div className="column is-3">
                    <p className="has-text-grey is-size-7">Kelas</p>
                    <p className="has-text-weight-semibold">{flight.class}</p>
                  </div>
                  <div className="column is-3">
                    <p className="has-text-grey is-size-7">Tipe Pesawat</p>
                    <p className="has-text-weight-semibold">Boeing 737-800</p>
                  </div>
                  <div className="column is-3">
                    <p className="has-text-grey is-size-7">Kursi Tersedia</p>
                    <p className="has-text-weight-semibold has-text-success">
                      {flight.seatsAvailable} kursi
                    </p>
                  </div>
                  <div className="column is-3">
                    <p className="has-text-grey is-size-7">Nomor Penerbangan</p>
                    <p className="has-text-weight-semibold">{flight.flightNumber}</p>
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------- */}
              {/* BOX 2: Fasilitas */}
              {/* -------------------------------------------------------------- */}
              <div className="box mb-5 fade-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="title is-5 mb-4">🎁 Fasilitas</h3>
                
                <div className="columns is-multiline">
                  {facilities.map((facility, index) => (
                    <div className="column is-4" key={index}>
                      <div className="is-flex is-align-items-start">
                        <span className="is-size-4 mr-3">{facility.icon}</span>
                        <div>
                          <p className="has-text-weight-semibold">{facility.name}</p>
                          <p className="is-size-7 has-text-grey">{facility.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* -------------------------------------------------------------- */}
              {/* BOX 3: Kebijakan */}
              {/* -------------------------------------------------------------- */}
              <div className="box fade-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="title is-5 mb-4">📋 Kebijakan Penerbangan</h3>
                
                <div className="columns is-multiline">
                  {policies.map((policy, index) => (
                    <div className="column is-6" key={index}>
                      <div className="notification is-light">
                        <p className="has-text-weight-semibold mb-1">{policy.title}</p>
                        <p className="is-size-7 has-text-grey">{policy.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* KOLOM KANAN - Ringkasan & Booking */}
            {/* ============================================================ */}
            <div className="column is-4">
              <div className="box fade-in" style={{ position: 'sticky', top: '20px' }}>
                <h3 className="title is-5 mb-4">📝 Ringkasan Pemesanan</h3>

                {/* Info Maskapai */}
                <div className="is-flex is-align-items-center mb-4">
                  <figure className="image is-48x48 mr-3" style={{ background: 'white', borderRadius: '8px', padding: '4px' }}>
                    <img src={flight.logo} alt={flight.airlineName} />
                  </figure>
                  <div>
                    <p className="has-text-weight-bold">{flight.airlineName}</p>
                    <p className="is-size-7 has-text-grey">{flight.flightNumber}</p>
                  </div>
                </div>

                <hr />

                {/* Rute */}
                <div className="mb-4">
                  <p className="has-text-grey is-size-7">Rute</p>
                  <p className="has-text-weight-semibold">
                    {flight.fromCity} → {flight.toCity}
                  </p>
                </div>

                {/* Waktu */}
                <div className="mb-4">
                  <p className="has-text-grey is-size-7">Waktu</p>
                  <p className="has-text-weight-semibold">
                    {flight.departureTime} - {flight.arrivalTime}
                  </p>
                </div>

                <hr />

                {/* Pilih Jumlah Penumpang */}
                <div className="field mb-4">
                  <label className="label">Jumlah Penumpang</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select 
                        value={passengers}
                        onChange={(e) => setPassengers(parseInt(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>
                            {num} Penumpang
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <hr />

                {/* Rincian Harga */}
                <div className="mb-4">
                  <div className="is-flex is-justify-content-space-between mb-2">
                    <span className="has-text-grey">Harga tiket</span>
                    <span>{formatRupiah(flight.price)}</span>
                  </div>
                  <div className="is-flex is-justify-content-space-between mb-2">
                    <span className="has-text-grey">Jumlah penumpang</span>
                    <span>× {passengers}</span>
                  </div>
                  <hr />
                  <div className="is-flex is-justify-content-space-between">
                    <span className="has-text-weight-bold">Total</span>
                    <span className="is-size-4 has-text-link has-text-weight-bold">
                      {formatRupiah(flight.price * passengers)}
                    </span>
                  </div>
                </div>

                {/* Tombol Pesan */}
                <button 
                  className="button is-link is-fullwidth is-medium"
                  onClick={handleBooking}
                >
                  Pesan Sekarang
                </button>

                {/* Info Tambahan */}
                <p className="is-size-7 has-text-grey has-text-centered mt-3">
                  ✓ Konfirmasi instan &nbsp; ✓ Pembayaran aman
                </p>
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
// Mengeksport komponen agar bisa digunakan di file lain (App.jsx)
export default FlightDetail;
