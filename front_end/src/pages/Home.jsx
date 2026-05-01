/**
 * ============================================================================
 * HALAMAN HOME (Home.jsx)
 * ============================================================================
 * 
 * FUNGSI:
 * Halaman utama website yang pertama kali dilihat pengunjung.
 * Menampilkan hero section dengan gambar pesawat dan form pencarian.
 * 
 * STRUKTUR HALAMAN:
 * 1. Hero Section - Gambar pesawat (kiri) + Form pencarian (kanan)
 * 2. Keunggulan - 4 keunggulan SkyBooking
 * 3. Maskapai Partner - Logo-logo maskapai
 * 
 * ROUTE: / (halaman utama)
 * 
 * ============================================================================
 */

// ============================================================================
// IMPORT DEPENDENCIES
// ============================================================================

import { useState } from 'react';

// SearchForm: Komponen form pencarian penerbangan
import SearchForm from '../components/SearchForm';

// Import gambar pesawat dari assets
import pesawatImg from '../assets/pesawat.svg';

// ============================================================================
// DATA DESTINASI POPULER
// ============================================================================
const destinasiData = [
  {
    id: 'bali',
    nama: 'Bali',
    kode: 'DPS',
    tagline: 'Pulau Dewata',
    harga: 'Rp 650.000',
    gambar: '/destinasi/bali.png',
    deskripsi: 'Bali adalah surga tropis yang menawarkan kombinasi sempurna antara pantai eksotis, budaya yang kaya, dan keramahan penduduk lokal. Nikmati keindahan Tanah Lot, eksplorasi sawah terasering Tegallalang, atau bersantai di pantai Kuta.',
    highlights: ['Pantai Kuta & Seminyak', 'Pura Tanah Lot', 'Ubud & Tegallalang', 'Nusa Penida'],
    waktuTerbaik: 'April - Oktober',
    durasi: '1h 45m dari Jakarta'
  },
  {
    id: 'yogyakarta',
    nama: 'Yogyakarta',
    kode: 'JOG',
    tagline: 'Kota Budaya',
    harga: 'Rp 450.000',
    gambar: '/destinasi/yogyakarta.png',
    deskripsi: 'Yogyakarta adalah jantung kebudayaan Jawa yang memadukan sejarah, seni, dan kuliner dalam satu kota. Kunjungi Candi Borobudur yang megah, jelajahi Keraton Yogyakarta, atau nikmati gudeg legendaris.',
    highlights: ['Candi Borobudur', 'Candi Prambanan', 'Malioboro', 'Keraton Yogyakarta'],
    waktuTerbaik: 'Mei - September',
    durasi: '1h 10m dari Jakarta'
  },
  {
    id: 'lombok',
    nama: 'Lombok',
    kode: 'LOP',
    tagline: 'Pesona Gili',
    harga: 'Rp 720.000',
    gambar: '/destinasi/lombok.png',
    deskripsi: 'Lombok menawarkan keindahan alam yang masih alami dengan pantai berpasir putih, air laut jernih, dan Gunung Rinjani yang menantang. Tiga Gili (Trawangan, Air, Meno) adalah surga snorkeling dan diving.',
    highlights: ['Gili Trawangan', 'Gunung Rinjani', 'Pantai Pink', 'Desa Sade'],
    waktuTerbaik: 'Mei - September',
    durasi: '2h dari Jakarta'
  },
  {
    id: 'surabaya',
    nama: 'Surabaya',
    kode: 'SUB',
    tagline: 'Kota Pahlawan',
    harga: 'Rp 380.000',
    gambar: '/destinasi/surabaya.png',
    deskripsi: 'Surabaya adalah kota metropolitan terbesar kedua di Indonesia dengan sejarah perjuangan yang heroik. Jelajahi Tugu Pahlawan, nikmati kuliner rawon dan rujak cingur, atau kunjungi Kebun Binatang Surabaya.',
    highlights: ['Tugu Pahlawan', 'House of Sampoerna', 'Masjid Al-Akbar', 'Jembatan Suramadu'],
    waktuTerbaik: 'Sepanjang Tahun',
    durasi: '1h 30m dari Jakarta'
  },
  {
    id: 'makassar',
    nama: 'Makassar',
    kode: 'UPG',
    tagline: 'Pintu Sulawesi',
    harga: 'Rp 850.000',
    gambar: '/destinasi/makassar.png',
    deskripsi: 'Makassar adalah gerbang menuju keajaiban Sulawesi Selatan. Nikmati sunset spektakuler di Pantai Losari, cicipi coto Makassar yang legendaris, atau berlayar ke Kepulauan Spermonde.',
    highlights: ['Pantai Losari', 'Fort Rotterdam', 'Pulau Samalona', 'Trans Studio'],
    waktuTerbaik: 'Mei - Oktober',
    durasi: '2h 20m dari Jakarta'
  },
  {
    id: 'Raja Ampat',
    nama: 'Raja Ampat',
    kode: 'AHI',
    tagline: 'Pintu Nusa Tenggara',
    harga: 'Rp 900.000',
    gambar: '/destinasi/Raja Ampat.jpg',
    deskripsi: 'Raja Ampat adalah surga bawah air yang terletak di kepulauan Papua. Dikenal dengan keanekaragaman hayati lautnya yang luar biasa, termasuk terumbu karang dan ikan tropis yang langka.',
    highlights: ['Snorkeling & Diving', 'Pantai Pasir Putih', 'Kepulauan Geger', 'Resort Laut'],
    waktuTerbaik: 'Oktober - April',
    durasi: '5- 7hari dari Jakarta'
  },
  {
    id: 'malang & batu',
    nama: 'Malang & Batu',
    kode: 'MLG',
    tagline: 'Kota Pahlawan',
    harga: 'Rp 420.000',
    gambar: '/destinasi/malang batu.jpg',
    deskripsi: 'Wilayah ini dikenal karena udaranya yang dingin dan cocok untuk wisata keluarga. Kota Batu penuh dengan taman hiburan modern seperti Jatim Park dan Museum Angkut. Dari sini, Anda juga bisa menuju Gunung Bromo untuk melihat matahari terbit dan kawahnya yang fenomenal.',
    highlights: ['Sunrise di Penanjakan Bromo', 'Kebun Apel', 'Museum Angkut (Koleksi Mobil Antik)', 'Jatim Park'],
    waktuTerbaik: 'Juli - September',
    durasi: '3h 20m dari Jakarta'
  },
  {
    id: 'Labuan Bajo',
    nama: 'Labuan Bajo',
    kode: 'LBJ',
    tagline: 'Pintu Nusa Tenggara',
    harga: 'Rp 567.000',
    gambar: '/destinasi/laboan bajo.jpg',
    deskripsi: 'ini adalah destinasi impian bagi pecinta petualangan bahari. Aktivitas utamanya adalah LOB (Live on Board) atau menginap di kapal sambil mengunjungi Pulau Padar untuk melihat pemandangan tiga teluk, Pantai Pink, dan melihat Komodo di habitat aslinya.',
    highlights: ['Island Hopping', 'Trekking Pulau Padar', 'Pink Beach', 'Snorkeling bersama Manta Ray'],
    waktuTerbaik: 'Juni - September',
    durasi: '3- 4hari dari Jakarta'
  },
  { 
    id: 'medan',
    nama: 'Medan',
    kode: 'KNO',
    tagline: 'Tanah Batak',
    harga: 'Rp 780.000',
    gambar: '/destinasi/medan.png',
    deskripsi: 'Medan adalah pintu gerbang ke keindahan Danau Toba dan budaya Batak yang kental. Eksplorasi Istana Maimun, nikmati durian Medan yang terkenal, atau lanjutkan perjalanan ke Pulau Samosir.',
    highlights: ['Danau Toba', 'Istana Maimun', 'Masjid Raya Medan', 'Bukit Lawang'],
    waktuTerbaik: 'Mei - September',
    durasi: '2h 15m dari Jakarta'
  },
  {
    id: 'Gunung Bromo',
    nama: 'Gunung Bromo',
    kode: 'BMO',
    tagline: 'Tanah Pasir dan Api.',
    harga: 'Rp 450.000',
    gambar: '/destinasi/Gunung Bromo.jpg  ',
    deskripsi: 'Bagian dari Taman Nasional Bromo Tengger Semeru yang menawarkan lanskap kawah aktif di tengah lautan pasir yang luas.',
    highlights: ['Matahari terbit dari Penanjakan 1, mendaki kawah Bromo, dan berkuda di Pasir Berbisik.'],
    waktuTerbaik: 'Juli - Agustus',
    durasi: '2 - 3 Hari.dari Jakarta'
  },
  {
    id: 'Danau Toba',
    nama: 'Danau Toba',
    kode: 'TBA',
    tagline: 'Danau Terbesar di Indonesia',
    harga: 'Rp 650.000',
    gambar: '/destinasi/danau toba.jpg',
    deskripsi: ': Danau vulkanik purba terbesar di dunia dengan Pulau Samosir di tengahnya, pusat kebudayaan Batak yang kaya.',
    highlights: ['Desa Tomok, Bukit Holbung untuk melihat lanskap danau, dan Air Terjun Sipiso-piso.'],
    waktuTerbaik: 'Mei - Oktober',
    durasi: '3-4 Hari. dari Jakarta'
  },
  {
    id: 'Likupang',
    nama: 'Likupang',
    kode: 'LKP',
    tagline: 'Kota Pesisir yang Indah',
    harga: 'Rp 400.000',
    gambar: '/destinasi/Likupang.jpg',
    deskripsi: 'Destinasi super prioritas terbaru dengan pantai pasir putih yang masih sangat tenang dan jernih.',
    highlights: ['Pantai Pulisan, Bukit Larata, dan snorkeling di Pulau Lihaga.'],
    waktuTerbaik: 'April - September',
    durasi: '3 Hari.dari Jakarta'
  },
  {
    id: 'Kepulauan Bangka Belitung',
    nama: 'Kepulauan Bangka Belitung',
    kode: 'TJQ',
    tagline: 'Tanah Para Raja Surgawi.',
    harga: 'Rp 780.000',
    gambar: '/destinasi/Bangka Belitung.jpg',
    deskripsi: 'Terkenal dengan formasi batu granit raksasa di pinggir pantai yang memberikan pemandangan artistik alami.',
    highlights: ['Pantai Tanjung Tinggi, Pulau Lengkuas dengan mercusuar tua, dan Danau Kaolin.'],
    waktuTerbaik: 'Maret - September',
    durasi: '3 Hari.dari Jakarta'
  },
  {
    id: 'Tana Toraja',
    nama: 'Tana Toraja',
    kode: 'TLK',
    tagline: 'Tanah Para Raja Surgawi.',
    harga: 'Rp 780.000',
    gambar: '/destinasi/tana toraja.jpg',
    deskripsi: 'Wilayah dataran tinggi dengan arsitektur rumah Tongkonan yang unik dan tradisi penghormatan leluhur yang mendalam.',
    highlights: ['Lemo (makam di dinding tebing), Londa (gua makam), dan upacara adat Rambu Solo.'],
    waktuTerbaik: 'Juni - September',
    durasi: '3 - 4 Hari.dari Jakarta'
  },
  {
    id: 'Kepulauan Derawan',
    nama: 'Kepulauan Derawan',
    kode: 'TKQ',
    tagline: 'Tanah Para Raja Surgawi.',
    harga: 'Rp 780.000',
    gambar: '/destinasi/Derawan.jpg',
    deskripsi: 'Surga tropis di Kalimantan yang menjadi rumah bagi penyu hijau dan ubur-ubur tanpa sengat.',
    highlights: ['Berenang bersama ubur-ubur di Danau Kakaban, diving di Pulau Maratua, dan melihat penyu di Pulau Sangalaki.'],
    waktuTerbaik: 'Maret - Oktober',
    durasi: '4 - 5 Hari.dari Jakarta'
  },
];

// ============================================================================
// DATA MASKAPAI PARTNER
// ============================================================================
const maskapaiData = [
  {
    id: 'garuda',
    nama: 'Garuda Indonesia',
    kode: 'GA',
    jenis: 'Full Service',
    logo: '/logos/garuda.svg',
    logoClass: '',
    deskripsi: 'Garuda Indonesia adalah maskapai penerbangan nasional Indonesia dan anggota aliansi global SkyTeam. Dikenal dengan pelayanan kelas dunia "Garuda Indonesia Experience" yang menggabungkan keramahan Indonesia dengan standar internasional.',
    didirikan: '1949',
    hub: 'Jakarta (CGK)',
    armada: '142 pesawat',
    destinasi: '90+ rute domestik & internasional',
    fitur: ['In-flight Entertainment', 'WiFi On Board', 'Lounge Access', 'Miles Program', 'Premium Economy'],
    website: 'https://www.garuda-indonesia.com',
    rating: '5 Star Airline'
  },
  {
    id: 'lionair',
    nama: 'Lion Air',
    kode: 'JT',
    jenis: 'Low Cost',
    logo: '/logos/lionair.svg',
    logoClass: 'partner-logo-wide',
    deskripsi: 'Lion Air adalah maskapai penerbangan swasta terbesar di Indonesia. Dengan jaringan rute yang luas, Lion Air menghubungkan berbagai kota di Indonesia dan destinasi internasional dengan harga terjangkau.',
    didirikan: '1999',
    hub: 'Jakarta (CGK)',
    armada: '115+ pesawat',
    destinasi: '50+ rute domestik & internasional',
    fitur: ['Bagasi Kabin 7kg', 'Pilihan Kursi', 'Lion Passport', 'Frequent Flyer'],
    website: 'https://www.lionair.co.id',
    rating: 'Best Low Cost Carrier'
  },
  {
    id: 'citilink',
    nama: 'Citilink',
    kode: 'QG',
    jenis: 'Low Cost',
    logo: '/logos/citilink.svg',
    logoClass: 'partner-logo-wide',
    deskripsi: 'Citilink adalah maskapai penerbangan berbiaya rendah milik Garuda Indonesia Group. Menawarkan layanan penerbangan berkualitas dengan harga kompetitif untuk penumpang yang mengutamakan nilai terbaik.',
    didirikan: '2001',
    hub: 'Jakarta (CGK), Surabaya (SUB)',
    armada: '60+ pesawat',
    destinasi: '40+ rute domestik',
    fitur: ['Quick Check-in', 'Green Seat', 'SuperGreen', 'Inflight Meals'],
    website: 'https://www.citilink.co.id',
    rating: 'Best LCC Indonesia'
  },
  {
    id: 'batikair',
    nama: 'Batik Air',
    kode: 'ID',
    jenis: 'Full Service',
    logo: '/logos/batikair.svg',
    logoClass: 'partner-logo-wide',
    deskripsi: 'Batik Air adalah maskapai full-service premium dari Lion Group. Menawarkan pengalaman terbang mewah dengan layanan kelas bisnis dan ekonomi premium, makanan berkualitas, dan kenyamanan terbaik.',
    didirikan: '2013',
    hub: 'Jakarta (CGK)',
    armada: '80+ pesawat',
    destinasi: '40+ rute domestik & internasional',
    fitur: ['Business Class', 'Premium Economy', 'In-seat Power', 'Priority Boarding', 'Lounge'],
    website: 'https://www.batikair.com',
    rating: '4 Star Airline'
  },
  {
    id: 'airasia',
    nama: 'AirAsia',
    kode: 'QZ',
    jenis: 'Low Cost',
    logo: '/logos/airasia.svg',
    logoClass: 'partner-logo-small',
    deskripsi: 'AirAsia Indonesia adalah bagian dari AirAsia Group, salah satu maskapai berbiaya rendah terbaik di dunia. Menawarkan penerbangan murah dengan opsi tambahan sesuai kebutuhan penumpang.',
    didirikan: '2004',
    hub: 'Jakarta (CGK), Bali (DPS)',
    armada: '30+ pesawat',
    destinasi: '25+ rute domestik & internasional',
    fitur: ['SNAP', 'AirAsia Super App', 'Big Points', 'Hot Seat', 'Premium Flex'],
    website: 'https://www.airasia.com',
    rating: 'World Best LCC'
  },
  {
    id: 'sriwijaya',
    nama: 'Sriwijaya Air',
    kode: 'SJ',
    jenis: 'Medium Service',
    logo: '/logos/sriwijayaair.svg',
    logoClass: '',
    deskripsi: 'Sriwijaya Air adalah maskapai penerbangan Indonesia yang fokus pada layanan premium dengan harga menengah. Menawarkan pengalaman terbang nyaman dengan gratis bagasi dan makanan.',
    didirikan: '2003',
    hub: 'Jakarta (CGK)',
    armada: '25+ pesawat',
    destinasi: '30+ rute domestik',
    fitur: ['Free Baggage 20kg', 'Free Meals', 'Comfortable Seat', 'Sriwijaya Miles'],
    website: 'https://www.sriwijayaair.co.id',
    rating: 'Best Value Airline'
  },
  {
    id: 'superairjet',
    nama: 'Super Air Jet',
    kode: 'IU',
    jenis: 'Low Cost',
    logo: '/logos/superairjet.svg',
    logoClass: 'partner-logo-wide',
    deskripsi: 'Super Air Jet adalah maskapai baru yang menawarkan penerbangan super murah dengan konsep "everyone can fly". Pilihan tepat untuk traveler budget dengan rute-rute populer domestik.',
    didirikan: '2021',
    hub: 'Jakarta (CGK), Palembang (PLM)',
    armada: '15+ pesawat',
    destinasi: '20+ rute domestik',
    fitur: ['Super Murah', 'Easy Booking', 'Flexible Reschedule', 'Add-on Services'],
    website: 'https://www.superairjet.com',
    rating: 'Fastest Growing LCC'
  },
  {
    id: 'wingsair',
    nama: 'Wings Air',
    kode: 'IW',
    jenis: 'Regional',
    logo: '/logos/wingsair.svg',
    logoClass: 'partner-logo-small',
    deskripsi: 'Wings Air adalah maskapai regional dari Lion Group yang melayani rute-rute pendek dan daerah terpencil di Indonesia. Menghubungkan kota-kota kecil yang tidak terjangkau maskapai besar.',
    didirikan: '2003',
    hub: 'Jakarta (HLP)',
    armada: '20+ pesawat',
    destinasi: '60+ rute regional',
    fitur: ['ATR Aircraft', 'Regional Routes', 'Remote Area Access', 'Quick Turnaround'],
    website: 'https://www.lionair.co.id',
    rating: 'Best Regional Airline'
  }
];

// ============================================================================
// KOMPONEN FAQ ITEM (Accordion)
// ============================================================================

function FaqItem({ question, answer, icon }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'is-active' : ''}`}>
      <button 
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="faq-icon">{icon}</span>
        <span className="faq-question-text">{question}</span>
        <span className="faq-toggle">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="faq-chevron"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div className="faq-answer-wrapper">
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================

function Home() {
  // State untuk modal destinasi
  const [selectedDestinasi, setSelectedDestinasi] = useState(null);

  // State untuk modal maskapai partner
  const [selectedPartner, setSelectedPartner] = useState(null);

  // State untuk feedback copy kode promo
  const [copiedCode, setCopiedCode] = useState(null);

  // Fungsi untuk copy kode promo ke clipboard
  const copyPromoCode = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      // Reset setelah 2 detik
      setTimeout(() => setCopiedCode(null), 2000);
    }).catch(err => {
      console.error('Gagal menyalin kode:', err);
    });
  };

  // Fungsi untuk membuka modal destinasi
  const openModal = (destinasi) => {
    setSelectedDestinasi(destinasi);
    document.body.style.overflow = 'hidden'; // Prevent scroll
  };

  // Fungsi untuk menutup modal destinasi
  const closeModal = () => {
    setSelectedDestinasi(null);
    document.body.style.overflow = 'auto'; // Enable scroll
  };

  // Fungsi untuk membuka modal partner
  const openPartnerModal = (partner) => {
    setSelectedPartner(partner);
    document.body.style.overflow = 'hidden';
  };

  // Fungsi untuk menutup modal partner
  const closePartnerModal = () => {
    setSelectedPartner(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div>
      {/* ================================================================== */}
      {/* SECTION 1: HERO - Gambar Pesawat + Search Form */}
      {/* Layout: Pesawat di kiri, Teks + Form di kanan */}
      {/* ================================================================== */}
      <section className="hero hero-flight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered">
              
              {/* KOLOM KIRI: Gambar Pesawat */}
              <div className="column is-6">
                <div className="plane-image-container fade-in">
                  <img 
                    src={pesawatImg} 
                    alt="Pesawat" 
                    className="plane-image"
                  />
                </div>
              </div>

              {/* KOLOM KANAN: Teks + Stats + Search Form */}
              <div className="column is-6">
                {/* Teks Hero */}
                <div className="hero-text-content fade-in mb-5">
                  <h1 className="title is-1 has-text-white mb-4">
                    Terbang Lebih Mudah
                    <br />
                    <span className="has-text-warning">Bersama SkyBooking</span>
                  </h1>
                  <p className="subtitle is-5 has-text-white-ter mb-4">
                    Temukan penerbangan terbaik dengan harga termurah. 
                    Pesan tiket pesawat ke seluruh Indonesia dalam hitungan menit!
                  </p>
                  
                  {/* Stats singkat */}
                  <div className="columns is-mobile mb-5">
                    <div className="column has-text-centered">
                      <p className="title is-3 has-text-warning mb-1">500+</p>
                      <p className="is-size-7 has-text-white-ter">Rute Penerbangan</p>
                    </div>
                    <div className="column has-text-centered">
                      <p className="title is-3 has-text-warning mb-1">8</p>
                      <p className="is-size-7 has-text-white-ter">Maskapai Partner</p>
                    </div>
                    <div className="column has-text-centered">
                      <p className="title is-3 has-text-warning mb-1">24/7</p>
                      <p className="is-size-7 has-text-white-ter">Dukungan Online</p>
                    </div>
                  </div>
                </div>
                
                {/* Search Form */}
                <div className="search-form-hero fade-in-up">
                  <SearchForm />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 3: KEUNGGULAN */}
      {/* 4 alasan memilih SkyBooking */}
      {/* ================================================================== */}
      <section className="section features-section">
        <div className="container">
          {/* Header */}
          <div className="features-header">
            <span className="features-badge">Keunggulan Kami</span>
            <h2 className="title is-3 has-text-centered mb-2">
              Kenapa Memilih SkyBooking?
            </h2>
            <p className="subtitle is-6 has-text-centered has-text-grey">
              Pengalaman memesan tiket pesawat yang mudah, aman, dan terpercaya
            </p>
          </div>
          
          {/* 4 kolom keunggulan */}
          <div className="features-grid">
            {/* Keunggulan 1: Harga Terbaik */}
            <div className="feature-item" style={{ '--feature-delay': '0s' }}>
              <div className="feature-card-modern">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-bg"></div>
                  <div className="feature-icon-content">💰</div>
                  <div className="feature-icon-ring"></div>
                </div>
                <h3 className="feature-title">Harga Terbaik</h3>
                <p className="feature-desc">
                  Bandingkan harga dari berbagai maskapai dan dapatkan penawaran terbaik untuk perjalanan Anda.
                </p>
              </div>
            </div>

            {/* Keunggulan 2: Pembayaran Aman */}
            <div className="feature-item" style={{ '--feature-delay': '0.1s' }}>
              <div className="feature-card-modern">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-bg"></div>
                  <div className="feature-icon-content">🔒</div>
                  <div className="feature-icon-ring"></div>
                </div>
                <h3 className="feature-title">Pembayaran Aman</h3>
                <p className="feature-desc">
                  Transaksi dijamin aman dengan enkripsi tingkat tinggi dan berbagai pilihan metode pembayaran.
                </p>
              </div>
            </div>

            {/* Keunggulan 3: E-Ticket Instan */}
            <div className="feature-item" style={{ '--feature-delay': '0.2s' }}>
              <div className="feature-card-modern">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-bg"></div>
                  <div className="feature-icon-content">📱</div>
                  <div className="feature-icon-ring"></div>
                </div>
                <h3 className="feature-title">E-Ticket Instan</h3>
                <p className="feature-desc">
                  Tiket elektronik langsung dikirim ke email Anda dalam hitungan menit setelah pembayaran.
                </p>
              </div>
            </div>

            {/* Keunggulan 4: Dukungan 24/7 */}
            <div className="feature-item" style={{ '--feature-delay': '0.3s' }}>
              <div className="feature-card-modern">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-bg"></div>
                  <div className="feature-icon-content">🎧</div>
                  <div className="feature-icon-ring"></div>
                </div>
                <h3 className="feature-title">Dukungan 24/7</h3>
                <p className="feature-desc">
                  Tim customer service kami siap membantu Anda kapan saja jika ada kendala.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 4: MASKAPAI PARTNER */}
      {/* Logo-logo maskapai yang bekerja sama */}
      {/* ================================================================== */}
      <section id="partner" className="section partners-section">
        <div className="container">
          <div className="partners-header">
            <span className="partners-badge">Terpercaya</span>
            <h2 className="title is-3 has-text-centered mb-2">
              Maskapai Partner Kami
            </h2>
            <p className="subtitle is-6 has-text-centered has-text-grey">
              Bekerja sama dengan maskapai terbaik di Indonesia
            </p>
          </div>
          
          <div className="partners-grid">
            {maskapaiData.map((partner, index) => (
              <div 
                className="partner-item" 
                key={partner.id}
                style={{ '--partner-delay': `${index * 0.05}s` }}
              >
                <div 
                  className="partner-card-modern"
                  onClick={() => openPartnerModal(partner)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openPartnerModal(partner)}
                >
                  <div className={`partner-logo-container ${partner.logoClass}`}>
                    <img src={partner.logo} alt={partner.nama} className="partner-logo-img" />
                    <div className="partner-shine"></div>
                  </div>
                  <p className="partner-name">{partner.nama}</p>
                  <span className="partner-tag">{partner.jenis}</span>
                  <div className="partner-view-hint">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    Lihat Detail
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 5: DESTINASI POPULER */}
      {/* Menampilkan destinasi favorit pengguna */}
      {/* ================================================================== */}
      <section className="section destinations-section">
        <div className="container">
          <div className="destinations-header">
            <span className="destinations-badge">✈️ Jelajahi Indonesia</span>
            <h2 className="title is-3 has-text-centered mb-2">
              Destinasi Populer
            </h2>
            <p className="subtitle is-6 has-text-centered has-text-grey">
              Temukan destinasi favorit wisatawan Indonesia
            </p>
          </div>
          
          <div className="destinations-grid">
            {destinasiData.map((destinasi, index) => (
              <div 
                className="destination-item" 
                key={destinasi.id}
                style={{ '--dest-delay': `${index * 0.1}s` }}
              >
                <div 
                  className="destination-card-modern" 
                  onClick={() => openModal(destinasi)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openModal(destinasi)}
                >
                  <div className="destination-image-wrapper">
                    <img 
                      src={destinasi.gambar} 
                      alt={destinasi.nama} 
                      className="destination-img"
                      loading="lazy"
                    />
                    <div className="destination-gradient"></div>
                    <div className="destination-price-tag">
                      Mulai {destinasi.harga}
                    </div>
                    <div className="destination-overlay">
                      <span className="destination-view-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        Lihat Detail
                      </span>
                    </div>
                  </div>
                  <div className="destination-content">
                    <div className="destination-location">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {destinasi.kode}
                    </div>
                    <h3 className="destination-title">{destinasi.nama}</h3>
                    <p className="destination-tagline">{destinasi.tagline}</p>
                    <div className="destination-meta">
                      <span className="destination-duration">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {destinasi.durasi}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 6: PROMO & PENAWARAN */}
      {/* Banner promo terkini */}
      {/* ================================================================== */}
      <section id="promo" className="promo-section">
        <div className="promo-bg-decoration">
          <div className="promo-circle promo-circle-1"></div>
          <div className="promo-circle promo-circle-2"></div>
          <div className="promo-circle promo-circle-3"></div>
        </div>
        <div className="container">
          {/* Header */}
          <div className="promo-header">
            <div className="promo-header-badge">
              <span className="badge-icon">🔥</span>
              <span className="badge-text">Promo Terbatas</span>
            </div>
            <h2 className="promo-title">
              Promo & Penawaran <span className="highlight">Spesial</span>
            </h2>
            <p className="promo-subtitle">
              Jangan lewatkan kesempatan hemat untuk perjalanan Anda
            </p>
          </div>

          {/* Main Featured Promos */}
          <div className="promo-featured-grid">
            <>
              {/* Promo 1 - Flash Sale */}
              <div className="promo-card-modern promo-card-featured" style={{ '--promo-delay': '0s' }}>
                <div className="promo-card-glow"></div>
                <div className="promo-card-inner promo-gradient-purple">
                  <div className="promo-ribbon">
                    <span>HOT DEAL</span>
                  </div>
                  <div className="promo-card-icon">⚡</div>
                  <div className="promo-card-content">
                    <div className="promo-discount-tag">
                      <span className="discount-value">40%</span>
                      <span className="discount-label">OFF</span>
                    </div>
                    <h3 className="promo-card-title">Flash Sale Weekend</h3>
                    <p className="promo-card-desc">Diskon spesial untuk penerbangan setiap Jumat - Minggu</p>
                    <div className="promo-code-box">
                      <span className="code-label">Kode Promo:</span>
                      <span className="code-value">WEEKEND40</span>
                      <button 
                        className={`code-copy ${copiedCode === 'WEEKEND40' ? 'is-copied' : ''}`}
                        title={copiedCode === 'WEEKEND40' ? 'Tersalin!' : 'Salin kode'}
                        onClick={() => copyPromoCode('WEEKEND40')}
                      >
                        {copiedCode === 'WEEKEND40' ? '✓' : '📋'}
                      </button>
                    </div>
                  </div>
                  <div className="promo-card-decoration">
                    <svg viewBox="0 0 200 200" className="promo-blob">
                      <path fill="rgba(255,255,255,0.1)" d="M47.5,-57.2C59.9,-45.7,67.3,-29.6,69.8,-12.7C72.3,4.3,69.9,22.1,61.1,35.9C52.3,49.7,37.1,59.5,20.5,65.1C3.9,70.7,-14.1,72.1,-29.5,66.5C-44.9,60.9,-57.8,48.3,-65.3,33.1C-72.8,17.9,-75,-0,-70.6,-15.7C-66.2,-31.4,-55.2,-44.9,-42,-56.5C-28.8,-68.1,-14.4,-77.8,1.5,-79.6C17.4,-81.4,34.9,-75.3,47.5,-57.2Z" transform="translate(100 100)"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Promo 2 - New User */}
              <div className="promo-card-modern promo-card-featured" style={{ '--promo-delay': '0.1s' }}>
                <div className="promo-card-glow"></div>
                <div className="promo-card-inner promo-gradient-coral">
                  <div className="promo-ribbon promo-ribbon-new">
                    <span>NEW USER</span>
                  </div>
                  <div className="promo-card-icon">🎁</div>
                  <div className="promo-card-content">
                    <div className="promo-discount-tag">
                      <span className="discount-value">15%</span>
                      <span className="discount-label">CASHBACK</span>
                    </div>
                    <h3 className="promo-card-title">Member Exclusive</h3>
                    <p className="promo-card-desc">Cashback spesial untuk pemesanan pertama pengguna baru</p>
                    <div className="promo-code-box">
                      <span className="code-label">Kode Promo:</span>
                      <span className="code-value">NEWUSER15</span>
                      <button 
                        className={`code-copy ${copiedCode === 'NEWUSER15' ? 'is-copied' : ''}`}
                        title={copiedCode === 'NEWUSER15' ? 'Tersalin!' : 'Salin kode'}
                        onClick={() => copyPromoCode('NEWUSER15')}
                      >
                        {copiedCode === 'NEWUSER15' ? '✓' : '📋'}
                      </button>
                    </div>
                  </div>
                  <div className="promo-card-decoration">
                    <svg viewBox="0 0 200 200" className="promo-blob">
                      <path fill="rgba(255,255,255,0.1)" d="M39.5,-49.6C52.9,-40.5,66.8,-30.6,71.5,-17C76.2,-3.4,71.7,13.9,63.4,28.5C55.1,43.1,43.1,55,28.6,62.4C14.1,69.8,-2.8,72.7,-18.9,69.2C-35,65.7,-50.2,55.8,-60.2,42C-70.2,28.2,-74.9,10.5,-72.1,-5.8C-69.3,-22.1,-59,-36.9,-45.8,-46.1C-32.6,-55.3,-16.3,-58.8,-1.1,-57.5C14.1,-56.2,28.2,-50.1,39.5,-49.6Z" transform="translate(100 100)"/>
                    </svg>
                  </div>
                </div>
              </div>
            </>
          </div>

          {/* Secondary Promos */}
          <div className="promo-secondary-grid">
            {/* Promo 3 - Early Bird */}
            <div className="promo-card-compact" style={{ '--promo-delay': '0.2s' }}>
              <div className="compact-icon-wrapper compact-icon-blue">
                <span className="compact-icon">✈️</span>
              </div>
              <div className="compact-content">
                <h4 className="compact-title">Early Bird</h4>
                <p className="compact-desc">Pesan 30 hari sebelumnya</p>
                <span className="compact-tag">Hemat 25%</span>
              </div>
            </div>

            {/* Promo 4 - Family */}
            <div className="promo-card-compact" style={{ '--promo-delay': '0.25s' }}>
              <div className="compact-icon-wrapper compact-icon-green">
                <span className="compact-icon">👨‍👩‍👧‍👦</span>
              </div>
              <div className="compact-content">
                <h4 className="compact-title">Family Package</h4>
                <p className="compact-desc">Beli 4 tiket keluarga</p>
                <span className="compact-tag">Gratis 1 Anak</span>
              </div>
            </div>

            {/* Promo 5 - Student */}
            <div className="promo-card-compact" style={{ '--promo-delay': '0.3s' }}>
              <div className="compact-icon-wrapper compact-icon-yellow">
                <span className="compact-icon">🎓</span>
              </div>
              <div className="compact-content">
                <h4 className="compact-title">Diskon Pelajar</h4>
                <p className="compact-desc">Khusus mahasiswa aktif</p>
                <span className="compact-tag">Diskon 20%</span>
              </div>
            </div>

            {/* Promo 6 - Holiday */}
            <div className="promo-card-compact" style={{ '--promo-delay': '0.35s' }}>
              <div className="compact-icon-wrapper compact-icon-pink">
                <span className="compact-icon">🏖️</span>
              </div>
              <div className="compact-content">
                <h4 className="compact-title">Holiday Special</h4>
                <p className="compact-desc">Liburan jadi lebih hemat</p>
                <span className="compact-tag">Up to 30%</span>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="promo-cta-banner">
            <div className="cta-content">
              <span className="cta-icon">🎉</span>
              <div className="cta-text">
                <h4>Daftar sekarang & dapatkan promo eksklusif!</h4>
                <p>Nikmati berbagai penawaran menarik hanya untuk member SkyBooking</p>
              </div>
            </div>
            <a href="/register" className="cta-button">
              Daftar Gratis
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 7: CARA PEMESANAN */}
      {/* Step-by-step booking process */}
      {/* ================================================================== */}
      <section className="section steps-section">
        <div className="container">
          <div className="steps-header">
            <span className="steps-badge">Mudah & Cepat</span>
            <h2 className="title is-3 has-text-centered mb-2">
              Cara Pesan Tiket
            </h2>
            <p className="subtitle is-6 has-text-centered has-text-grey">
              Hanya 4 langkah mudah untuk memesan tiket pesawat
            </p>
          </div>

          <div className="steps-container">
            {/* Progress Line */}
            <div className="steps-progress-line"></div>
            
            <div className="steps-grid">
              {/* Step 1 */}
              <div className="step-item" style={{ '--step-delay': '0s' }}>
                <div className="step-card-modern">
                  <div className="step-icon-wrapper">
                    <div className="step-icon-bg"></div>
                    <div className="step-icon-content">🔍</div>
                    <div className="step-number-badge">1</div>
                  </div>
                  <h4 className="step-title">Cari Penerbangan</h4>
                  <p className="step-desc">Masukkan kota asal, tujuan, tanggal, dan jumlah penumpang</p>
                </div>
                <div className="step-connector">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              {/* Step 2 */}
              <div className="step-item" style={{ '--step-delay': '0.1s' }}>
                <div className="step-card-modern">
                  <div className="step-icon-wrapper">
                    <div className="step-icon-bg"></div>
                    <div className="step-icon-content">✈️</div>
                    <div className="step-number-badge">2</div>
                  </div>
                  <h4 className="step-title">Pilih Penerbangan</h4>
                  <p className="step-desc">Bandingkan harga dan jadwal, lalu klik tombol Pesan</p>
                </div>
                <div className="step-connector">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              {/* Step 3 */}
              <div className="step-item" style={{ '--step-delay': '0.2s' }}>
                <div className="step-card-modern">
                  <div className="step-icon-wrapper">
                    <div className="step-icon-bg"></div>
                    <div className="step-icon-content">📝</div>
                    <div className="step-number-badge">3</div>
                  </div>
                  <h4 className="step-title">Isi Data & Bayar</h4>
                  <p className="step-desc">Lengkapi data penumpang, kontak, dan pilih metode pembayaran</p>
                </div>
                <div className="step-connector">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              {/* Step 4 */}
              <div className="step-item" style={{ '--step-delay': '0.3s' }}>
                <div className="step-card-modern">
                  <div className="step-icon-wrapper">
                    <div className="step-icon-bg"></div>
                    <div className="step-icon-content">✅</div>
                    <div className="step-number-badge">4</div>
                  </div>
                  <h4 className="step-title">Terima E-Ticket</h4>
                  <p className="step-desc">Dapatkan kode booking dan e-ticket langsung di email</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 8: TESTIMONI PELANGGAN */}
      {/* Review dari pelanggan dengan carousel */}
      {/* ================================================================== */}
      <section className="section has-background-light">
        <div className="container">
          <h2 className="title is-3 has-text-centered mb-2">
            Apa Kata Mereka?
          </h2>
          <p className="subtitle is-6 has-text-centered has-text-grey mb-6">
            Testimoni dari pelanggan setia SkyBooking
          </p>

          {/* Testimonial Carousel */}
          <div className="testimonial-carousel-wrapper">
            <div className="testimonial-carousel">
              <div className="testimonial-track">
                {/* Testimoni 1 */}
                <div className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                    <p className="testimonial-text">
                      "Sangat mudah digunakan! Dalam 5 menit saya sudah dapat tiket murah ke Bali. Recommended banget!"
                    </p>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">AR</div>
                      <div>
                        <p className="has-text-weight-bold">Andi Rahmad</p>
                        <p className="is-size-7 has-text-grey">Jakarta</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimoni 2 */}
                <div className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                    <p className="testimonial-text">
                      "Promo-promonya mantap! Family trip ke Jogja jadi lebih hemat. Customer service juga responsif."
                    </p>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">SW</div>
                      <div>
                        <p className="has-text-weight-bold">Siti Wulandari</p>
                        <p className="is-size-7 has-text-grey">Bandung</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimoni 3 */}
                <div className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                    <p className="testimonial-text">
                      "E-Ticket langsung masuk email, tidak perlu print. Sangat praktis untuk business trip saya."
                    </p>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">BK</div>
                      <div>
                        <p className="has-text-weight-bold">Budi Kurniawan</p>
                        <p className="is-size-7 has-text-grey">Surabaya</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimoni 4 */}
                <div className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                    <p className="testimonial-text">
                      "Refund dan reschedule mudah banget! Kemarin harus ubah jadwal mendadak, prosesnya cepat."
                    </p>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">DM</div>
                      <div>
                        <p className="has-text-weight-bold">Dewi Maharani</p>
                        <p className="is-size-7 has-text-grey">Medan</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimoni 5 */}
                <div className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                    <p className="testimonial-text">
                      "Harga transparan, tidak ada biaya tersembunyi. Cocok untuk budget traveler seperti saya!"
                    </p>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">RS</div>
                      <div>
                        <p className="has-text-weight-bold">Rizky Saputra</p>
                        <p className="is-size-7 has-text-grey">Semarang</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimoni 6 */}
                <div className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                    <p className="testimonial-text">
                      "Aplikasi paling user-friendly! Orang tua saya yang gaptek pun bisa pesan sendiri. Top!"
                    </p>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">NA</div>
                      <div>
                        <p className="has-text-weight-bold">Nina Anggraeni</p>
                        <p className="is-size-7 has-text-grey">Makassar</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimoni 7 */}
                <div className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                    <p className="testimonial-text">
                      "Sering dapat flash sale weekend! Liburan ke Lombok cuma bayar setengah harga biasanya."
                    </p>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">FH</div>
                      <div>
                        <p className="has-text-weight-bold">Fajar Hidayat</p>
                        <p className="is-size-7 has-text-grey">Yogyakarta</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimoni 8 */}
                <div className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                    <p className="testimonial-text">
                      "Pilihan maskapai lengkap, dari Garuda sampai budget airline. Bisa bandingkan harga dengan mudah."
                    </p>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">LP</div>
                      <div>
                        <p className="has-text-weight-bold">Linda Pratiwi</p>
                        <p className="is-size-7 has-text-grey">Palembang</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Duplicate slides for infinite scroll effect */}
                <div className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                    <p className="testimonial-text">
                      "Sangat mudah digunakan! Dalam 5 menit saya sudah dapat tiket murah ke Bali. Recommended banget!"
                    </p>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">AR</div>
                      <div>
                        <p className="has-text-weight-bold">Andi Rahmad</p>
                        <p className="is-size-7 has-text-grey">Jakarta</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                    <p className="testimonial-text">
                      "Promo-promonya mantap! Family trip ke Jogja jadi lebih hemat. Customer service juga responsif."
                    </p>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">SW</div>
                      <div>
                        <p className="has-text-weight-bold">Siti Wulandari</p>
                        <p className="is-size-7 has-text-grey">Bandung</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                    <p className="testimonial-text">
                      "E-Ticket langsung masuk email, tidak perlu print. Sangat praktis untuk business trip saya."
                    </p>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">BK</div>
                      <div>
                        <p className="has-text-weight-bold">Budi Kurniawan</p>
                        <p className="is-size-7 has-text-grey">Surabaya</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                    <p className="testimonial-text">
                      "Refund dan reschedule mudah banget! Kemarin harus ubah jadwal mendadak, prosesnya cepat."
                    </p>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">DM</div>
                      <div>
                        <p className="has-text-weight-bold">Dewi Maharani</p>
                        <p className="is-size-7 has-text-grey">Medan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Scroll hint */}
            <p className="has-text-centered has-text-grey is-size-7 mt-4">
              ← Geser untuk melihat lebih banyak →
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 9: FAQ */}
      {/* Pertanyaan yang sering diajukan */}
      {/* ================================================================== */}
      <section id="faq" className="section faq-section">
        <div className="container">
          <div className="faq-header">
            <span className="faq-badge">FAQ</span>
            <h2 className="title is-3 has-text-centered mb-2">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="subtitle is-6 has-text-centered has-text-grey">
              Temukan jawaban untuk pertanyaan umum seputar layanan kami
            </p>
          </div>

          <div className="columns is-centered">
            <div className="column is-8">
              <div className="faq-list">
                {/* FAQ 1 */}
                <FaqItem 
                  question="Bagaimana cara membatalkan atau mengubah jadwal penerbangan?"
                  answer="Anda dapat membatalkan atau mengubah jadwal melalui menu 'Pesanan Saya' di akun Anda. Pilih pesanan yang ingin diubah, kemudian klik tombol 'Reschedule' atau 'Refund'. Kebijakan refund dan reschedule mengikuti ketentuan masing-masing maskapai."
                  icon="📅"
                />

                {/* FAQ 2 */}
                <FaqItem 
                  question="Apakah harga sudah termasuk pajak dan biaya lainnya?"
                  answer="Ya, semua harga yang ditampilkan sudah termasuk pajak bandara, biaya admin, dan asuransi dasar. Tidak ada biaya tersembunyi — harga yang Anda lihat adalah harga final yang akan dibayar."
                  icon="💰"
                />

                {/* FAQ 3 */}
                <FaqItem 
                  question="Metode pembayaran apa saja yang tersedia?"
                  answer="Kami menerima berbagai metode pembayaran untuk kenyamanan Anda: Transfer Bank (BCA, Mandiri, BNI, BRI), Kartu Kredit/Debit (Visa, Mastercard), E-Wallet (GoPay, OVO, DANA, ShopeePay), dan Virtual Account."
                  icon="💳"
                />

                {/* FAQ 4 */}
                <FaqItem 
                  question="Berapa lama E-Ticket akan dikirim setelah pembayaran?"
                  answer="E-Ticket akan dikirim otomatis ke email Anda dalam waktu maksimal 15 menit setelah pembayaran berhasil dikonfirmasi. Pastikan email yang Anda masukkan sudah benar dan periksa juga folder spam."
                  icon="✉️"
                />

                {/* FAQ 5 */}
                <FaqItem 
                  question="Apakah bisa memesan tiket untuk orang lain?"
                  answer="Tentu bisa! Saat mengisi data penumpang, masukkan nama dan identitas penumpang sesuai dengan KTP/Paspor yang akan digunakan. Nama pemesan dan nama penumpang boleh berbeda."
                  icon="👥"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 10: CTA NEWSLETTER */}
      {/* Call to action untuk subscribe */}
      {/* ================================================================== */}
      <section className="section cta-section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-7">
              <h2 className="title is-3 has-text-white mb-2">
                Jangan Lewatkan Promo Menarik!
              </h2>
              <p className="has-text-white-ter">
                Daftar newsletter kami dan dapatkan info promo, flash sale, dan penawaran eksklusif langsung di inbox Anda.
              </p>
            </div>
            <div className="column is-5">
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input className="input is-medium newsletter-input" type="email" placeholder="Masukkan email Anda" />
                </div>
                <div className="control">
                  <button className="button is-warning is-medium newsletter-btn">
                    <strong>Subscribe</strong>
                  </button>
                </div>
              </div>
              <p className="is-size-7 has-text-white-ter mt-2">
                📧 Gratis! Bisa unsubscribe kapan saja.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTION 11: STATISTIK */}
      {/* Angka-angka pencapaian */}
      {/* ================================================================== */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-header">
            <span className="stats-badge">📊 Pencapaian Kami</span>
            <h2 className="title is-3 has-text-centered mb-2">
              Dipercaya Jutaan Pengguna
            </h2>
            <p className="subtitle is-6 has-text-centered has-text-grey">
              Angka-angka yang membuktikan kualitas layanan kami
            </p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item-modern" style={{ '--stat-delay': '0s' }}>
              <div className="stat-icon-wrapper">
                <span className="stat-icon">👥</span>
                <div className="stat-icon-ring"></div>
              </div>
              <div className="stat-content">
                <p className="stat-number-modern">1.2M+</p>
                <p className="stat-label-modern">Pengguna Terdaftar</p>
              </div>
              <div className="stat-decoration"></div>
            </div>
            
            <div className="stat-item-modern" style={{ '--stat-delay': '0.1s' }}>
              <div className="stat-icon-wrapper">
                <span className="stat-icon">🎫</span>
                <div className="stat-icon-ring"></div>
              </div>
              <div className="stat-content">
                <p className="stat-number-modern">500K+</p>
                <p className="stat-label-modern">Tiket Terjual</p>
              </div>
              <div className="stat-decoration"></div>
            </div>
            
            <div className="stat-item-modern" style={{ '--stat-delay': '0.2s' }}>
              <div className="stat-icon-wrapper">
                <span className="stat-icon">🌍</span>
                <div className="stat-icon-ring"></div>
              </div>
              <div className="stat-content">
                <p className="stat-number-modern">50+</p>
                <p className="stat-label-modern">Kota Tujuan</p>
              </div>
              <div className="stat-decoration"></div>
            </div>
            
            <div className="stat-item-modern" style={{ '--stat-delay': '0.3s' }}>
              <div className="stat-icon-wrapper">
                <span className="stat-icon">⭐</span>
                <div className="stat-icon-ring"></div>
              </div>
              <div className="stat-content">
                <p className="stat-number-modern">4.8/5</p>
                <p className="stat-label-modern">Rating Pengguna</p>
              </div>
              <div className="stat-decoration"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* MODAL DESTINASI */}
      {/* Pop-up preview untuk detail destinasi */}
      {/* ================================================================== */}
      {selectedDestinasi && (
        <div className="destination-modal-overlay" onClick={closeModal}>
          <div 
            className="destination-modal" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Close */}
            <button className="modal-close-btn" onClick={closeModal}>
              ✕
            </button>

            {/* Gambar Destinasi */}
            <div className="modal-image-section">
              <img 
                src={selectedDestinasi.gambar} 
                alt={selectedDestinasi.nama}
                className="modal-destination-img"
              />
              <div className="modal-image-overlay">
                <span className="modal-badge">{selectedDestinasi.kode}</span>
              </div>
            </div>

            {/* Konten Detail */}
            <div className="modal-content-section">
              <div className="modal-header">
                <h2 className="title is-3 mb-1">{selectedDestinasi.nama}</h2>
                <p className="subtitle is-6 has-text-grey">{selectedDestinasi.tagline}</p>
              </div>

              <p className="modal-description">
                {selectedDestinasi.deskripsi}
              </p>

              {/* Info Cards */}
              <div className="modal-info-grid">
                <div className="modal-info-card">
                  <span className="modal-info-icon">⏱️</span>
                  <div>
                    <p className="modal-info-label">Durasi Penerbangan</p>
                    <p className="modal-info-value">{selectedDestinasi.durasi}</p>
                  </div>
                </div>
                <div className="modal-info-card">
                  <span className="modal-info-icon">📅</span>
                  <div>
                    <p className="modal-info-label">Waktu Terbaik</p>
                    <p className="modal-info-value">{selectedDestinasi.waktuTerbaik}</p>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="modal-highlights">
                <h4 className="title is-6 mb-3">🎯 Tempat Wisata Populer</h4>
                <div className="highlight-tags">
                  {selectedDestinasi.highlights.map((item, index) => (
                    <span key={index} className="highlight-tag">{item}</span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="modal-cta">
                <div className="modal-price">
                  <span className="price-label">Mulai dari</span>
                  <span className="price-value">{selectedDestinasi.harga}</span>
                </div>
                <button className="button is-primary is-medium modal-book-btn">
                  Cari Penerbangan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* MODAL MASKAPAI PARTNER */}
      {/* Pop-up detail untuk informasi maskapai */}
      {/* ================================================================== */}
      {selectedPartner && (
        <div className="partner-modal-overlay" onClick={closePartnerModal}>
          <div 
            className="partner-modal" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Close */}
            <button className="modal-close-btn" onClick={closePartnerModal}>
              ✕
            </button>

            {/* Header dengan Logo */}
            <div className="partner-modal-header">
              <div className="partner-modal-logo-wrapper">
                <img 
                  src={selectedPartner.logo} 
                  alt={selectedPartner.nama}
                  className="partner-modal-logo"
                />
              </div>
              <div className="partner-modal-title-section">
                <div className="partner-modal-badges">
                  <span className="partner-modal-code">{selectedPartner.kode}</span>
                  <span className={`partner-modal-type partner-type-${selectedPartner.jenis.toLowerCase().replace(' ', '-')}`}>
                    {selectedPartner.jenis}
                  </span>
                </div>
                <h2 className="title is-3 mb-1">{selectedPartner.nama}</h2>
                <p className="partner-modal-rating">⭐ {selectedPartner.rating}</p>
              </div>
            </div>

            {/* Konten Detail */}
            <div className="partner-modal-content">
              <p className="partner-modal-description">
                {selectedPartner.deskripsi}
              </p>

              {/* Info Grid */}
              <div className="partner-modal-info-grid">
                <div className="partner-modal-info-item">
                  <span className="partner-info-icon">📅</span>
                  <div>
                    <p className="partner-info-label">Didirikan</p>
                    <p className="partner-info-value">{selectedPartner.didirikan}</p>
                  </div>
                </div>
                <div className="partner-modal-info-item">
                  <span className="partner-info-icon">🏠</span>
                  <div>
                    <p className="partner-info-label">Hub Utama</p>
                    <p className="partner-info-value">{selectedPartner.hub}</p>
                  </div>
                </div>
                <div className="partner-modal-info-item">
                  <span className="partner-info-icon">✈️</span>
                  <div>
                    <p className="partner-info-label">Armada</p>
                    <p className="partner-info-value">{selectedPartner.armada}</p>
                  </div>
                </div>
                <div className="partner-modal-info-item">
                  <span className="partner-info-icon">🌍</span>
                  <div>
                    <p className="partner-info-label">Destinasi</p>
                    <p className="partner-info-value">{selectedPartner.destinasi}</p>
                  </div>
                </div>
              </div>

              {/* Fitur */}
              <div className="partner-modal-features">
                <h4 className="title is-6 mb-3">✨ Fitur & Layanan</h4>
                <div className="partner-feature-tags">
                  {selectedPartner.fitur.map((item, index) => (
                    <span key={index} className="partner-feature-tag">{item}</span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="partner-modal-cta">
                <a 
                  href={selectedPartner.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="button is-primary is-medium partner-visit-btn"
                >
                  <span>Kunjungi Website</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
                <button 
                  className="button is-outlined is-primary is-medium"
                  onClick={closePartnerModal}
                >
                  Cari Tiket {selectedPartner.nama.split(' ')[0]}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// EXPORT KOMPONEN
// ============================================================================
export default Home;
