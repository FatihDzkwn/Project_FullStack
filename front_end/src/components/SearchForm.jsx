/**
 * ============================================================================
 * KOMPONEN SEARCH FORM (SearchForm.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Form pencarian penerbangan di halaman utama.
 * User mengisi kota asal, tujuan, tanggal, dan jumlah penumpang.
 * 
 * ALUR KERJA:
 * 1. User memilih kota asal (dari dropdown)
 * 2. User memilih kota tujuan (dari dropdown)
 * 3. User memilih tanggal keberangkatan
 * 4. User memilih jumlah penumpang
 * 5. Klik "Cari Penerbangan"
 * 6. Redirect ke halaman SearchResults dengan data di URL
 * 
 * DIGUNAKAN DI: Home.jsx
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORT DEPENDENCIES
// ============================================================================

// useState: Hook untuk menyimpan nilai input form
import { useState } from 'react';

// useNavigate: Hook untuk navigasi ke halaman lain
import { useNavigate } from 'react-router-dom';

// airports: Data daftar bandara dari file data
import { airports } from '../data/flights';

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================

function SearchForm() {
  // --------------------------------------------------------------------------
  // HOOKS
  // --------------------------------------------------------------------------
  
  // Hook untuk navigasi programatis
  const navigate = useNavigate();
  
  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------
  
  /**
   * State untuk menyimpan nilai input form
   * 
   * from: Kode bandara asal (contoh: "CGK")
   * to: Kode bandara tujuan (contoh: "DPS")
   * date: Tanggal keberangkatan (format: "2024-01-15")
   * passengers: Jumlah penumpang (1-5)
   */
  const [from, setFrom] = useState('');          // Kota asal
  const [to, setTo] = useState('');              // Kota tujuan
  const [date, setDate] = useState('');          // Tanggal
  const [passengers, setPassengers] = useState(1); // Jumlah penumpang

  // --------------------------------------------------------------------------
  // HANDLER FUNCTIONS
  // --------------------------------------------------------------------------
  
  /**
   * handleSearch - Dipanggil ketika form di-submit
   * 
   * LANGKAH-LANGKAH:
   * 1. Mencegah halaman refresh (default form behavior)
   * 2. Validasi: semua field harus diisi
   * 3. Validasi: kota asal dan tujuan tidak boleh sama
   * 4. Navigasi ke halaman hasil dengan query parameters
   * 
   * @param {Event} e - Event object dari form submit
   */
  const handleSearch = (e) => {
    // Langkah 1: Mencegah halaman refresh
    e.preventDefault();
    
    // Langkah 2: Validasi kelengkapan data
    if (!from || !to || !date) {
      alert('Mohon lengkapi semua field!');
      return; // Berhenti, tidak lanjut
    }

    // Langkah 3: Validasi kota tidak boleh sama
    if (from === to) {
      alert('Kota asal dan tujuan tidak boleh sama!');
      return; // Berhenti, tidak lanjut
    }

    // Langkah 4: Navigasi ke halaman hasil pencarian
    // Data dikirim melalui URL query parameters
    // Contoh: /search?from=CGK&to=DPS&date=2024-01-15&passengers=2
    navigate(`/search?from=${from}&to=${to}&date=${date}&passengers=${passengers}`);
  };

  // --------------------------------------------------------------------------
  // COMPUTED VALUES
  // --------------------------------------------------------------------------
  
  /**
   * Mendapatkan tanggal hari ini
   * 
   * KENAPA? Supaya user tidak bisa memilih tanggal yang sudah lewat
   * 
   * CARA KERJA:
   * - new Date() = tanggal dan waktu sekarang
   * - .toISOString() = ubah ke format "2024-01-15T12:30:00.000Z"
   * - .split('T')[0] = ambil bagian tanggal saja "2024-01-15"
   */
  const today = new Date().toISOString().split('T')[0];

  // --------------------------------------------------------------------------
  // RENDER KOMPONEN
  // --------------------------------------------------------------------------

  return (
    // Form dengan class "search-box" untuk styling
    // onSubmit akan memanggil handleSearch
    <form onSubmit={handleSearch} className="search-box">
      {/* 
        Columns: Sistem grid dari Bulma
        is-multiline: Bisa wrap ke baris baru
      */}
      <div className="columns is-multiline">
        
        {/* ================================================================ */}
        {/* DROPDOWN KOTA ASAL */}
        {/* ================================================================ */}
        <div className="column is-6">
          <div className="field">
            <label className="label">Dari</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select 
                  value={from} 
                  onChange={(e) => setFrom(e.target.value)}
                  required
                >
                  {/* Option default (nilai kosong) */}
                  <option value="">Pilih kota asal</option>
                  
                  {/* 
                    Looping semua bandara untuk dijadikan option
                    key: harus unik untuk setiap item
                    value: nilai yang akan disimpan ke state
                  */}
                  {airports.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      {airport.city} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* DROPDOWN KOTA TUJUAN */}
        {/* ================================================================ */}
        <div className="column is-6">
          <div className="field">
            <label className="label">Ke</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select 
                  value={to} 
                  onChange={(e) => setTo(e.target.value)}
                  required
                >
                  <option value="">Pilih kota tujuan</option>
                  {airports.map((airport) => (
                    <option key={airport.code} value={airport.code}>
                      {airport.city} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* INPUT TANGGAL */}
        {/* ================================================================ */}
        <div className="column is-6">
          <div className="field">
            <label className="label">Tanggal Berangkat</label>
            <div className="control">
              {/* 
                Input type="date" akan menampilkan date picker
                min={today} = tidak bisa pilih tanggal sebelum hari ini
              */}
              <input
                className="input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today}
                required
              />
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* DROPDOWN JUMLAH PENUMPANG */}
        {/* ================================================================ */}
        <div className="column is-6">
          <div className="field">
            <label className="label">Jumlah Penumpang</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select 
                  value={passengers} 
                  onChange={(e) => setPassengers(e.target.value)}
                >
                  {/* Pilihan 1 sampai 5 penumpang */}
                  <option value="1">1 Penumpang</option>
                  <option value="2">2 Penumpang</option>
                  <option value="3">3 Penumpang</option>
                  <option value="4">4 Penumpang</option>
                  <option value="5">5 Penumpang</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* TOMBOL SUBMIT */}
        {/* ================================================================ */}
        <div className="column is-12">
          {/* 
            type="submit" = akan trigger onSubmit di form
            is-link = warna biru
            is-fullwidth = lebar penuh
            is-medium = ukuran medium
          */}
          <button type="submit" className="button is-link is-fullwidth is-medium">
            🔍 Cari Penerbangan
          </button>
        </div>
      </div>
    </form>
  );
}

// ============================================================================
// EXPORT KOMPONEN
// ============================================================================
export default SearchForm;
