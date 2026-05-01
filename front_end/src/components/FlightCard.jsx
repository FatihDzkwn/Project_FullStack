/**
 * ============================================================================
 * KOMPONEN FLIGHT CARD (FlightCard.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Menampilkan informasi satu penerbangan dalam bentuk kartu.
 * Digunakan di halaman hasil pencarian (SearchResults.jsx).
 * 
 * PROPS (Data yang diterima dari parent):
 * - flight: Object berisi data penerbangan (dari flights.js)
 * - passengers: Jumlah penumpang yang dipilih user
 * 
 * CONTOH PENGGUNAAN:
 * <FlightCard flight={dataFlight} passengers={2} />
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORT DEPENDENCIES
// ============================================================================

// useNavigate: Hook untuk pindah halaman secara programatis
// Link: Komponen untuk membuat link ke halaman lain
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import fungsi format rupiah dari data helper
import { formatRupiah } from '../data/flights';

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================

/**
 * FlightCard
 * @param {Object} flight - Data penerbangan
 * @param {number} passengers - Jumlah penumpang
 */
function FlightCard({ flight, passengers }) {
  // Hook untuk navigasi ke halaman lain
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  // --------------------------------------------------------------------------
  // FUNGSI HANDLER
  // --------------------------------------------------------------------------
  
  /**
   * handleSelect
   * Dipanggil ketika user klik tombol "Pilih"
   * Mengirim data penerbangan ke halaman booking
   */
  const handleSelect = () => {
    if (!isLoggedIn) {
      // Redirect ke login, simpan intent untuk kembali ke booking setelah login
      navigate('/login', { state: { redirectTo: '/booking', restoreState: { flight, passengers } } });
      return;
    }
    navigate('/booking', { 
      state: { 
        flight: flight,
        passengers: passengers
      } 
    });
  };

  const handleDetailClick = (e) => {
    if (!isLoggedIn) {
      navigate('/login', { state: { redirectTo: `/flight/${flight.id}`, restoreState: { passengers } } });
      return;
    }
    navigate(`/flight/${flight.id}`, { state: { passengers } });
  };

  // --------------------------------------------------------------------------
  // RENDER KOMPONEN
  // --------------------------------------------------------------------------

  return (
    // Card container dengan class khusus untuk hover effect
    <div className="card flight-card mb-4">
      <div className="card-content">
        <div className="columns is-vcentered">
          
          {/* ============================================================== */}
          {/* KOLOM 1: Info Maskapai */}
          {/* ============================================================== */}
          <div className="column is-2 has-text-centered">
            {/* Logo maskapai */}
            <figure className="image is-48x48 mx-auto mb-2">
              <img src={flight.logo} alt={flight.airlineName} />
            </figure>
            {/* Nama maskapai */}
            <p className="is-size-7 has-text-grey">{flight.airlineName}</p>
            {/* Nomor penerbangan */}
            <p className="is-size-7 has-text-grey">{flight.flightNumber}</p>
          </div>

          {/* ============================================================== */}
          {/* KOLOM 2: Info Waktu & Rute */}
          {/* ============================================================== */}
          <div className="column is-5">
            <div className="columns is-mobile is-vcentered">
              
              {/* Keberangkatan */}
              <div className="column has-text-centered">
                <p className="is-size-4 has-text-weight-bold">{flight.departureTime}</p>
                <p className="is-size-6 has-text-grey">{flight.fromCity}</p>
                <p className="is-size-7 has-text-grey">({flight.from})</p>
              </div>

              {/* Durasi Terbang */}
              <div className="column has-text-centered">
                <p className="is-size-7 has-text-grey">{flight.duration}</p>
                <div className="is-flex is-align-items-center is-justify-content-center">
                  <span className="has-text-grey">✈️ →</span>
                </div>
                <p className="is-size-7 has-text-success">Langsung</p>
              </div>

              {/* Kedatangan */}
              <div className="column has-text-centered">
                <p className="is-size-4 has-text-weight-bold">{flight.arrivalTime}</p>
                <p className="is-size-6 has-text-grey">{flight.toCity}</p>
                <p className="is-size-7 has-text-grey">({flight.to})</p>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* KOLOM 3: Info Ketersediaan Kursi */}
          {/* ============================================================== */}
          <div className="column is-2 has-text-centered">
            <p className="is-size-7 has-text-grey">Tersedia</p>
            <p className="has-text-success has-text-weight-bold">
              {flight.seatsAvailable} kursi
            </p>
            {/* Tag untuk menunjukkan kelas penerbangan */}
            <span className="tag is-light">{flight.class}</span>
          </div>

          {/* ============================================================== */}
          {/* KOLOM 4: Harga & Tombol Aksi */}
          {/* ============================================================== */}
          <div className="column is-3 has-text-centered">
            {/* Label harga */}
            <p className="is-size-7 has-text-grey">Harga/orang</p>
            {/* Harga dengan format Rupiah */}
            <p className="price-tag">{formatRupiah(flight.price)}</p>
            
            {/* Tombol-tombol aksi */}
            <div className="buttons is-centered mt-2">
              {/* Link ke halaman detail */}
              <button
                type="button"
                className="button is-light is-small"
                onClick={handleDetailClick}
              >
                Detail
              </button>
              {/* Tombol langsung pilih */}
              <button 
                className="button is-link is-small"
                onClick={handleSelect}
              >
                Pilih
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightCard;
