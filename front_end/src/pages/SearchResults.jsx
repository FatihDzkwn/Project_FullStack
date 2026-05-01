/**
 * ============================================================================
 * HALAMAN SEARCH RESULTS (SearchResults.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Menampilkan hasil pencarian penerbangan dengan fitur filter dan sorting.
 * Data pencarian diambil dari URL query parameters.
 * 
 * ALUR KERJA:
 * 1. Ambil parameter pencarian dari URL (from, to, date, passengers)
 * 2. Cari penerbangan yang sesuai dari data
 * 3. Terapkan filter maskapai jika dipilih
 * 4. Terapkan sorting (harga, waktu, durasi)
 * 5. Tampilkan hasil dalam bentuk FlightCard
 * 
 * ROUTE: /search?from=CGK&to=DPS&date=2024-01-15&passengers=2
 * 
 * FITUR:
 * - Filter berdasarkan maskapai
 * - Sorting: harga termurah/termahal, berangkat paling awal, durasi tercepat
 * - Tombol reset filter
 * - Animasi fade-in untuk setiap kartu
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORT DEPENDENCIES
// ============================================================================

// useState: Hook untuk state lokal (filter, sorting)
import { useState } from 'react';

// useSearchParams: Hook untuk membaca URL query parameters
import { useSearchParams } from 'react-router-dom';

// searchFlights: Fungsi untuk mencari penerbangan
// airports: Data bandara untuk mendapatkan nama kota
import { searchFlights, airports } from '../data/flights';

// FlightCard: Komponen untuk menampilkan 1 kartu penerbangan
import FlightCard from '../components/FlightCard';

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================

function SearchResults() {
  // --------------------------------------------------------------------------
  // MENGAMBIL PARAMETER DARI URL
  // --------------------------------------------------------------------------
  
  /**
   * useSearchParams: Hook dari react-router-dom
   * 
   * CONTOH URL: /search?from=CGK&to=DPS&date=2024-01-15&passengers=2
   * 
   * searchParams.get('from') = "CGK"
   * searchParams.get('to') = "DPS"
   * dst...
   */
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');           // Kode bandara asal
  const to = searchParams.get('to');               // Kode bandara tujuan
  const date = searchParams.get('date');           // Tanggal keberangkatan
  const passengers = searchParams.get('passengers') || 1; // Jumlah penumpang (default: 1)

  // --------------------------------------------------------------------------
  // STATE UNTUK FILTER DAN SORTING
  // --------------------------------------------------------------------------
  
  /**
   * sortBy: Cara mengurutkan hasil
   * - 'price-low': Harga termurah dulu
   * - 'price-high': Harga termahal dulu
   * - 'departure': Berangkat paling awal dulu
   * - 'duration': Durasi tercepat dulu
   */
  const [sortBy, setSortBy] = useState('price-low');
  
  /**
   * filterAirline: Filter berdasarkan maskapai
   * - 'all': Tampilkan semua maskapai
   * - 'GA': Hanya Garuda Indonesia
   * - 'JT': Hanya Lion Air
   * - dst...
   */
  const [filterAirline, setFilterAirline] = useState('all');

  // --------------------------------------------------------------------------
  // MENCARI DAN MEMFILTER PENERBANGAN
  // --------------------------------------------------------------------------
  
  // Langkah 1: Cari penerbangan berdasarkan asal, tujuan, tanggal
  let results = searchFlights(from, to, date);

  // Langkah 2: Filter berdasarkan maskapai (jika dipilih)
  if (filterAirline !== 'all') {
    // filter() = ambil hanya yang airline-nya sesuai
    results = results.filter(f => f.airline === filterAirline);
  }

  // --------------------------------------------------------------------------
  // SORTING (MENGURUTKAN)
  // --------------------------------------------------------------------------
  
  /**
   * Mengurutkan array results berdasarkan sortBy
   * 
   * [...results] = copy array (agar tidak mengubah aslinya)
   * .sort() = mengurutkan array
   * 
   * Return value sort:
   * - Negatif (-1): a sebelum b
   * - Positif (1): b sebelum a
   * - Nol (0): urutan tetap
   */
  results = [...results].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        // Harga termurah dulu (a.price - b.price)
        // Jika a lebih murah, hasilnya negatif, jadi a di depan
        return a.price - b.price;
        
      case 'price-high':
        // Harga termahal dulu (b.price - a.price)
        // Jika b lebih mahal, hasilnya positif, jadi b di depan
        return b.price - a.price;
        
      case 'departure':
        // Berangkat paling awal dulu
        // localeCompare() untuk membandingkan string waktu
        return a.departureTime.localeCompare(b.departureTime);
        
      case 'duration':
        // Durasi tercepat dulu
        // Perlu parse string "2j 45m" ke menit
        const parseDuration = (d) => {
          // Regex: (\d+)j\s*(\d+)m = "2j 45m"
          const match = d.match(/(\d+)j\s*(\d+)m/);
          // Konversi ke total menit: jam * 60 + menit
          return match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 0;
        };
        return parseDuration(a.duration) - parseDuration(b.duration);
        
      default:
        return 0;
    }
  });

  // --------------------------------------------------------------------------
  // COMPUTED VALUES (NILAI YANG DIHITUNG)
  // --------------------------------------------------------------------------
  
  /**
   * Ambil daftar maskapai unik dari hasil pencarian
   * 
   * Set: Collection yang hanya menyimpan nilai unik
   * Jadi tidak ada duplikat
   */
  const uniqueAirlines = [...new Set(searchFlights(from, to, date).map(f => f.airline))];

  // Cari nama kota dari kode bandara
  // find() = cari 1 item yang sesuai
  // ?. = optional chaining (jika tidak ketemu, return undefined)
  // || from = jika tidak ketemu nama kota, pakai kode bandara
  const fromCity = airports.find(a => a.code === from)?.city || from;
  const toCity = airports.find(a => a.code === to)?.city || to;

  /**
   * formatDate: Mengubah format tanggal ke bahasa Indonesia
   * 
   * Input: "2024-01-15"
   * Output: "Senin, 15 Januari 2024"
   */
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // --------------------------------------------------------------------------
  // RENDER KOMPONEN
  // --------------------------------------------------------------------------

  return (
    <div className="main-content">
      {/* ================================================================== */}
      {/* HEADER PENCARIAN */}
      {/* Menampilkan info rute dan tanggal */}
      {/* ================================================================== */}
      <section className="hero is-link is-small">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column">
                {/* Info rute penerbangan */}
                <h1 className="title is-4">
                  ✈️ {fromCity} → {toCity}
                </h1>
                {/* Info tanggal dan jumlah penumpang */}
                <p className="subtitle is-6">
                  {formatDate(date)} • {passengers} Penumpang
                </p>
              </div>
              <div className="column is-narrow">
                {/* Tombol untuk mengubah pencarian */}
                <a href="/" className="button is-light">
                  Ubah Pencarian
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* AREA HASIL PENCARIAN */}
      {/* ================================================================== */}
      <section className="section">
        <div className="container">
          <div className="columns">
            
            {/* ============================================================ */}
            {/* SIDEBAR FILTER (Kolom Kiri) */}
            {/* ============================================================ */}
            <div className="column is-3">
              <div className="box filter-box">
                <h4 className="title is-5">🔧 Filter</h4>
                
                {/* -------------------------------------------------------- */}
                {/* FILTER MASKAPAI */}
                {/* -------------------------------------------------------- */}
                <div className="field">
                  <label className="label">Maskapai</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select 
                        value={filterAirline} 
                        onChange={(e) => setFilterAirline(e.target.value)}
                      >
                        {/* Option default: semua maskapai */}
                        <option value="all">Semua Maskapai</option>
                        
                        {/* Loop maskapai unik untuk dijadikan pilihan */}
                        {uniqueAirlines.map(code => {
                          // Cari data flight untuk mendapatkan nama dan logo
                          const flight = searchFlights(from, to, date).find(f => f.airline === code);
                          return (
                            <option key={code} value={code}>
                              {flight?.logo} {flight?.airlineName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <hr />

                {/* -------------------------------------------------------- */}
                {/* SORTING OPTIONS */}
                {/* Radio buttons untuk mengurutkan */}
                {/* -------------------------------------------------------- */}
                <div className="field">
                  <label className="label">Urutkan</label>
                  
                  {/* Option 1: Harga Termurah */}
                  <div className="control">
                    <label className="radio-container">
                      <input 
                        type="radio" 
                        name="sort" 
                        checked={sortBy === 'price-low'}
                        onChange={() => setSortBy('price-low')}
                      />
                      <span className="ml-2">💰 Harga Termurah</span>
                    </label>
                  </div>
                  
                  {/* Option 2: Harga Termahal */}
                  <div className="control">
                    <label className="radio-container">
                      <input 
                        type="radio" 
                        name="sort" 
                        checked={sortBy === 'price-high'}
                        onChange={() => setSortBy('price-high')}
                      />
                      <span className="ml-2">💎 Harga Termahal</span>
                    </label>
                  </div>
                  
                  {/* Option 3: Berangkat Paling Awal */}
                  <div className="control">
                    <label className="radio-container">
                      <input 
                        type="radio" 
                        name="sort" 
                        checked={sortBy === 'departure'}
                        onChange={() => setSortBy('departure')}
                      />
                      <span className="ml-2">🌅 Berangkat Paling Awal</span>
                    </label>
                  </div>
                  
                  {/* Option 4: Durasi Tercepat */}
                  <div className="control">
                    <label className="radio-container">
                      <input 
                        type="radio" 
                        name="sort" 
                        checked={sortBy === 'duration'}
                        onChange={() => setSortBy('duration')}
                      />
                      <span className="ml-2">⚡ Durasi Tercepat</span>
                    </label>
                  </div>
                </div>

                {/* -------------------------------------------------------- */}
                {/* TOMBOL RESET */}
                {/* Mengembalikan filter ke default */}
                {/* -------------------------------------------------------- */}
                <button 
                  className="button is-light is-fullwidth mt-4"
                  onClick={() => {
                    setSortBy('price-low');     // Reset sorting ke termurah
                    setFilterAirline('all');   // Reset filter ke semua maskapai
                  }}
                >
                  🔄 Reset Filter
                </button>
              </div>
            </div>

            {/* ============================================================ */}
            {/* DAFTAR PENERBANGAN (Kolom Kanan) */}
            {/* ============================================================ */}
            <div className="column is-9">
              {/* Info jumlah hasil dan sorting yang aktif */}
              <div className="mb-4 is-flex is-justify-content-space-between is-align-items-center">
                <p className="has-text-grey">
                  Ditemukan <strong>{results.length}</strong> penerbangan
                </p>
                {/* Tag menunjukkan sorting yang aktif */}
                <span className="tag is-info is-light">
                  {sortBy === 'price-low' && '💰 Termurah'}
                  {sortBy === 'price-high' && '💎 Termahal'}
                  {sortBy === 'departure' && '🌅 Paling Awal'}
                  {sortBy === 'duration' && '⚡ Tercepat'}
                </span>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* DAFTAR KARTU PENERBANGAN */}
              {/* ---------------------------------------------------------- */}
              {results.length > 0 ? (
                // Jika ada hasil: Loop dan tampilkan FlightCard
                results.map((flight, index) => (
                  <div 
                    key={flight.id} 
                    className="fade-in" 
                    // animationDelay: Setiap kartu muncul bergiliran
                    // Kartu ke-0: 0s, kartu ke-1: 0.1s, kartu ke-2: 0.2s, dst
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <FlightCard 
                      flight={flight}         // Data penerbangan
                      passengers={passengers} // Jumlah penumpang
                    />
                  </div>
                ))
              ) : (
                // Jika tidak ada hasil: Tampilkan pesan
                <div className="notification is-warning has-text-centered">
                  <span className="is-size-1">😕</span>
                  <h3 className="title is-4 mt-3">Tidak Ada Penerbangan</h3>
                  <p>
                    Maaf, tidak ditemukan penerbangan dari {fromCity} ke {toCity} 
                    pada tanggal yang dipilih.
                  </p>
                  <a href="/" className="button is-link mt-4">
                    Coba Tanggal Lain
                  </a>
                </div>
              )}
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
export default SearchResults;
