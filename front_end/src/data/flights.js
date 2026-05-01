/**
 * ============================================================================
 * DATA PENERBANGAN (flights.js)
 * ============================================================================
 * 
 * FUNGSI:
 * File ini berisi semua data dummy untuk aplikasi.
 * Di aplikasi nyata, data ini akan diambil dari backend/API.
 * 
 * ISI FILE:
 * 1. airports    - Daftar bandara di Indonesia
 * 2. airlines    - Daftar maskapai penerbangan
 * 3. flights     - Daftar penerbangan yang tersedia
 * 4. formatRupiah - Fungsi helper untuk format harga
 * 5. searchFlights - Fungsi untuk mencari penerbangan
 * 
 * CARA MENAMBAH DATA:
 * Tinggal tambahkan object baru ke dalam array yang sesuai.
 * Pastikan mengikuti struktur yang sama.
 * 
 * ============================================================================
 */

// ============================================================================
// DATA BANDARA
// ============================================================================

/**
 * airports - Daftar bandara di Indonesia
 * 
 * STRUKTUR:
 * - code: Kode IATA bandara (3 huruf)
 * - name: Nama resmi bandara
 * - city: Nama kota
 * 
 * CARA MENAMBAH BANDARA BARU:
 * { code: 'XXX', name: 'Nama Bandara', city: 'Nama Kota' }
 */
export const airports = [
  { code: 'CGK', name: 'Soekarno-Hatta', city: 'Jakarta' },
  { code: 'DPS', name: 'Ngurah Rai', city: 'Bali' },
  { code: 'SUB', name: 'Juanda', city: 'Surabaya' },
  { code: 'JOG', name: 'Adisucipto', city: 'Yogyakarta' },
  { code: 'UPG', name: 'Sultan Hasanuddin', city: 'Makassar' },
  { code: 'KNO', name: 'Kualanamu', city: 'Medan' },
  { code: 'BDO', name: 'Husein Sastranegara', city: 'Bandung' },
  { code: 'SRG', name: 'Ahmad Yani', city: 'Semarang' },
];

// ============================================================================
// DATA MASKAPAI
// ============================================================================

/**
 * airlines - Daftar maskapai penerbangan
 * 
 * STRUKTUR:
 * - code: Kode IATA maskapai (2 huruf)
 * - name: Nama maskapai
 * - logo: Path ke file logo SVG di folder public/logos/
 */
export const airlines = [
  { code: 'GA', name: 'Garuda Indonesia', logo: '/logos/garuda.svg' },
  { code: 'JT', name: 'Lion Air', logo: '/logos/lionair.svg' },
  { code: 'QG', name: 'Citilink', logo: '/logos/citilink.svg' },
  { code: 'ID', name: 'Batik Air', logo: '/logos/batikair.svg' },
  { code: 'QZ', name: 'AirAsia', logo: '/logos/airasia.svg' },
  { code: 'SJ', name: 'Sriwijaya Air', logo: '/logos/sriwijayaair.svg' },
  { code: 'IU', name: 'Super Air Jet', logo: '/logos/superairjet.svg' },
  { code: 'IW', name: 'Wings Air', logo: '/logos/wingsair.svg' },
];

// ============================================================================
// DATA PENERBANGAN
// ============================================================================

/**
 * flights - Daftar semua penerbangan yang tersedia
 * 
 * STRUKTUR SETIAP PENERBANGAN:
 * - id: ID unik penerbangan (number)
 * - airline: Kode maskapai (harus sesuai dengan airlines[].code)
 * - airlineName: Nama maskapai (untuk tampilan)
 * - logo: Path ke file logo SVG
 * - flightNumber: Nomor penerbangan
 * - from: Kode bandara asal
 * - fromCity: Nama kota asal
 * - to: Kode bandara tujuan
 * - toCity: Nama kota tujuan
 * - departureTime: Waktu berangkat (format HH:MM)
 * - arrivalTime: Waktu tiba (format HH:MM)
 * - duration: Durasi penerbangan
 * - price: Harga tiket dalam Rupiah (number)
 * - class: Kelas penerbangan (Economy/Business/First)
 * - seatsAvailable: Jumlah kursi tersedia
 * 
 * TIPS MENAMBAH PENERBANGAN:
 * 1. Pastikan id unik (tidak ada yang sama)
 * 2. Pastikan kode from/to ada di array airports
 * 3. Pastikan kode airline ada di array airlines
 */
export const flights = [
  {
    id: 1,
    airline: 'GA',
    airlineName: 'Garuda Indonesia',
    logo: '/logos/garuda.svg',
    flightNumber: 'GA-123',
    from: 'CGK',
    fromCity: 'Jakarta',
    to: 'DPS',
    toCity: 'Bali',
    departureTime: '08:00',
    arrivalTime: '10:45',
    duration: '2j 45m',
    price: 1500000,
    class: 'Economy',
    seatsAvailable: 45,
  },
  {
    id: 2,
    airline: 'JT',
    airlineName: 'Lion Air',
    logo: '/logos/lionair.svg',
    flightNumber: 'JT-456',
    from: 'CGK',
    fromCity: 'Jakarta',
    to: 'DPS',
    toCity: 'Bali',
    departureTime: '09:30',
    arrivalTime: '12:15',
    duration: '2j 45m',
    price: 850000,
    class: 'Economy',
    seatsAvailable: 23,
  },
  {
    id: 3,
    airline: 'QG',
    airlineName: 'Citilink',
    logo: '/logos/citilink.svg',
    flightNumber: 'QG-789',
    from: 'CGK',
    fromCity: 'Jakarta',
    to: 'DPS',
    toCity: 'Bali',
    departureTime: '14:00',
    arrivalTime: '16:45',
    duration: '2j 45m',
    price: 750000,
    class: 'Economy',
    seatsAvailable: 67,
  },
  {
    id: 4,
    airline: 'GA',
    airlineName: 'Garuda Indonesia',
    logo: '/logos/garuda.svg',
    flightNumber: 'GA-456',
    from: 'CGK',
    fromCity: 'Jakarta',
    to: 'SUB',
    toCity: 'Surabaya',
    departureTime: '07:00',
    arrivalTime: '08:30',
    duration: '1j 30m',
    price: 980000,
    class: 'Economy',
    seatsAvailable: 32,
  },
  {
    id: 5,
    airline: 'ID',
    airlineName: 'Batik Air',
    logo: '/logos/batikair.svg',
    flightNumber: 'ID-321',
    from: 'CGK',
    fromCity: 'Jakarta',
    to: 'JOG',
    toCity: 'Yogyakarta',
    departureTime: '10:00',
    arrivalTime: '11:15',
    duration: '1j 15m',
    price: 720000,
    class: 'Economy',
    seatsAvailable: 50,
  },
  {
    id: 6,
    airline: 'QZ',
    airlineName: 'AirAsia',
    logo: '/logos/airasia.svg',
    flightNumber: 'QZ-555',
    from: 'DPS',
    fromCity: 'Bali',
    to: 'CGK',
    toCity: 'Jakarta',
    departureTime: '15:30',
    arrivalTime: '16:15',
    duration: '1j 45m',
    price: 650000,
    class: 'Economy',
    seatsAvailable: 80,
  },
  {
    id: 7,
    airline: 'SJ',
    airlineName: 'Sriwijaya Air',
    logo: '/logos/sriwijayaair.svg',
    flightNumber: 'SJ-234',
    from: 'CGK',
    fromCity: 'Jakarta',
    to: 'UPG',
    toCity: 'Makassar',
    departureTime: '06:30',
    arrivalTime: '09:15',
    duration: '2j 45m',
    price: 890000,
    class: 'Economy',
    seatsAvailable: 38,
  },
  {
    id: 8,
    airline: 'IU',
    airlineName: 'Super Air Jet',
    logo: '/logos/superairjet.svg',
    flightNumber: 'IU-678',
    from: 'CGK',
    fromCity: 'Jakarta',
    to: 'KNO',
    toCity: 'Medan',
    departureTime: '11:00',
    arrivalTime: '13:30',
    duration: '2j 30m',
    price: 580000,
    class: 'Economy',
    seatsAvailable: 55,
  },
  {
    id: 9,
    airline: 'IW',
    airlineName: 'Wings Air',
    logo: '/logos/wingsair.svg',
    flightNumber: 'IW-912',
    from: 'SUB',
    fromCity: 'Surabaya',
    to: 'JOG',
    toCity: 'Yogyakarta',
    departureTime: '08:15',
    arrivalTime: '09:00',
    duration: '45m',
    price: 450000,
    class: 'Economy',
    seatsAvailable: 28,
  },
  {
    id: 10,
    airline: 'SJ',
    airlineName: 'Sriwijaya Air',
    logo: '/logos/sriwijayaair.svg',
    flightNumber: 'SJ-567',
    from: 'CGK',
    fromCity: 'Jakarta',
    to: 'DPS',
    toCity: 'Bali',
    departureTime: '16:00',
    arrivalTime: '18:45',
    duration: '2j 45m',
    price: 780000,
    class: 'Economy',
    seatsAvailable: 42,
  },
];

// ============================================================================
// FUNGSI HELPER
// ============================================================================

/**
 * formatRupiah
 * Mengubah angka menjadi format mata uang Rupiah.
 * 
 * @param {number} number - Angka yang akan diformat
 * @returns {string} - String dengan format "Rp 1.500.000"
 * 
 * CONTOH:
 * formatRupiah(1500000) → "Rp 1.500.000"
 * formatRupiah(850000)  → "Rp 850.000"
 * 
 * CARA KERJA:
 * Menggunakan Intl.NumberFormat bawaan JavaScript
 * dengan locale Indonesia (id-ID) dan currency IDR
 */
export const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

/**
 * searchFlights
 * Mencari penerbangan berdasarkan kota asal dan tujuan.
 * 
 * @param {string} from - Kode bandara asal (contoh: 'CGK')
 * @param {string} to - Kode bandara tujuan (contoh: 'DPS')
 * @param {string} date - Tanggal keberangkatan (belum diimplementasi)
 * @returns {Array} - Array penerbangan yang cocok
 * 
 * CONTOH:
 * searchFlights('CGK', 'DPS', '2026-04-01')
 * → [{ id: 1, ... }, { id: 2, ... }, { id: 3, ... }]
 * 
 * CATATAN:
 * - Saat ini filter tanggal belum diimplementasi
 * - Di real app, ini akan menjadi API call ke backend
 * 
 * CARA KERJA:
 * 1. Menggunakan array.filter() untuk menyaring data
 * 2. Hanya mengembalikan penerbangan yang from DAN to cocok
 */
export const searchFlights = (from, to, date) => {
  // Filter penerbangan berdasarkan kota asal (from) dan tujuan (to)
  // Parameter date belum digunakan (untuk pengembangan selanjutnya)
  return flights.filter(
    (flight) => flight.from === from && flight.to === to
  );
};
