# ✈️ SkyBooking - Website Booking Tiket Pesawat

SkyBooking adalah platform booking tiket pesawat yang dikembangkan dengan teknologi modern menggunakan **React** untuk antarmuka pengguna dan **Bulma CSS Framework** untuk desain yang responsif dan menarik.

---

## 📖 Tentang Project

Website ini menyediakan pengalaman pemesanan tiket pesawat yang intuitif dengan fitur-fitur berikut:

1. **Pencarian Pesawat** - Cari penerbangan berdasarkan rute, tanggal, dan jumlah penumpang
2. **Perbandingan Penerbangan** - Pilih dari berbagai opsi penerbangan dengan harga yang kompetitif
3. **Pemesanan** - Isi data penumpang dan selesaikan pemesanan
4. **Konfirmasi Booking** - Dapatkan kode booking untuk referensi

---

## 🗂️ Struktur Folder

```
front_end/
│
├── src/                      Direktori utama aplikasi
│   │
│   ├── components/           Komponen reusable
│   │   ├── Navbar.jsx        Menu navigasi utama
│   │   ├── SearchForm.jsx    Form pencarian penerbangan
│   │   ├── FlightCard.jsx    Komponen tampil info pesawat
│   │   └── Footer.jsx        Footer halaman
│   │
│   ├── pages/                Halaman-halaman utama
│   │   ├── Home.jsx          Halaman beranda
│   │   ├── SearchResults.jsx Halaman hasil pencarian
│   │   ├── FlightDetail.jsx  Detail penerbangan
│   │   ├── Booking.jsx       Halaman pemesanan
│   │   ├── Confirmation.jsx  Konfirmasi booking
│   │   ├── Login.jsx         Halaman login
│   │   ├── Register.jsx      Halaman registrasi
│   │   ├── MyBookings.jsx    Daftar pemesanan user
│   │   ├── Profile.jsx       Profil pengguna
│   │   ├── KebijakanPrivasi.jsx  Kebijakan privasi
│   │   ├── SyaratKetentuan.jsx   Syarat dan ketentuan
│   │   └── TentangKami.jsx   Tentang kami
│   │
│   ├── context/              State management
│   │   └── AuthContext.jsx   Context untuk autentikasi
│   │
│   ├── services/             API integration
│   │   └── api.js            Konfigurasi API calls
│   │
│   ├── config/               Pengaturan aplikasi
│   │   └── index.js          Konfigurasi global
│   │
│   ├── utils/                Fungsi utilitas
│   │   └── security.js       Fungsi keamanan
│   │
│   ├── data/                 Data dummy (untuk development)
│   │   └── flights.js        Contoh data penerbangan
│   │
│   ├── assets/               Asset statis
│   │
│   └── App.jsx               Root component
│
├── package.json              Dependensi dan scripts
├── vite.config.js            Konfigurasi Vite
└── README.md                 File dokumentasi ini
```

---

## 🎯 Alur Pengguna

```
┌─────────────────────────────────────────────────────────────────┐
│  1. AKSES WEBSITE                                               │
│     ↓                                                           │
│  2. FORM PENCARIAN PENERBANGAN                                  │
│     - Asal: Jakarta                                             │
│     - Tujuan: Bali                                              │
│     - Tanggal: 15 Januari                                       │
│     - Penumpang: 2 orang                                        │
│     ↓                                                           │
│  3. HASIL PENCARIAN                                             │
│     - Garuda - Rp 1.500.000                                     │
│     - Lion Air - Rp 800.000                                     │
│     - Citilink - Rp 900.000                                     │
│     ↓                                                           │
│  4. PILIH PENERBANGAN                                           │
│     ↓                                                           │
│  5. LOGIN / REGISTRASI                                          │
│     ↓                                                           │
│  6. ISI DATA PENUMPANG                                          │
│     - Nama lengkap                                              │
│     - Nomor identitas                                           │
│     ↓                                                           │
│  7. KONFIRMASI BOOKING ✓                                        │
│     - Kode booking: ABC123                                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Deskripsi Komponen

### 1. Components (Komponen Reusable)

Komponen adalah bagian UI yang dapat digunakan kembali di berbagai halaman.

| File | Fungsi |
|------|--------|
| `Navbar.jsx` | Menu navigasi utama dengan link ke halaman-halaman |
| `SearchForm.jsx` | Form pencarian penerbangan (rute, tanggal, penumpang) |
| `FlightCard.jsx` | Kartu yang menampilkan informasi penerbangan |
| `Footer.jsx` | Footer dengan informasi perusahaan dan links |

### 2. Pages (Halaman-Halaman Utama)

Setiap page mewakili satu rute/URL di aplikasi.

| File | Deskripsi |
|------|-----------|
| `Home.jsx` | Halaman beranda dengan hero section dan form pencarian |
| `SearchResults.jsx` | Halaman menampilkan hasil pencarian penerbangan |
| `FlightDetail.jsx` | Detail lengkap dari satu penerbangan |
| `Booking.jsx` | Halaman form pengisian data penumpang |
| `Confirmation.jsx` | Halaman konfirmasi booking berhasil |
| `Login.jsx` | Halaman login pengguna |
| `Register.jsx` | Halaman registrasi akun baru |
| `MyBookings.jsx` | Halaman daftar pemesanan user yang sudah ada |
| `Profile.jsx` | Halaman profil pengguna |

### 3. Context (State Management)

`AuthContext.jsx` - Mengelola state autentikasi pengguna secara global, sehingga semua komponen dapat mengakses informasi login user.

### 4. Services (API Integration)

`api.js` - Berisi fungsi-fungsi untuk berkomunikasi dengan backend API, seperti:
- Fungsi login, register
- Fungsi pencarian penerbangan
- Fungsi pemesanan tiket
- Fungsi pengambilan data user

### 5. Config (Konfigurasi)

`config/index.js` - Menyimpan pengaturan global seperti base URL API backend.

### 6. Utils (Fungsi Utilitas)

`security.js` - Fungsi-fungsi helper untuk keamanan, validasi input, dan normalisasi data.

### 7. Data (Data Dummy)

`flights.js` - Data dummy untuk keperluan development sebelum backend siap.

---

## 🚀 Cara Menjalankan Aplikasi

### Prasyarat
- Node.js v16 atau lebih tinggi
- npm atau yarn

### Langkah-Langkah Setup

1. **Buka Terminal**
   - Tekan `Ctrl + Backtick` di VS Code atau buka terminal terpisah

2. **Masuk ke Folder Frontend**
   ```bash
   cd front_end
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```
   (Tunggu hingga selesai, sekitar 1-2 menit)

4. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

5. **Akses di Browser**
   Buka browser dan kunjungi:
   ```
   http://localhost:5173/
   ```

### Build untuk Production
```bash
npm run build
```

---

## 📝 Arsitektur dan Alur Aplikasi

### Routing (Navigasi Halaman)

Aplikasi menggunakan React Router untuk navigasi antar halaman. Pengguna dipandu ke halaman yang sesuai berdasarkan URL path:

- `/` → Home (Halaman Beranda)
- `/search` → Hasil Pencarian
- `/flight/:id` → Detail Penerbangan
- `/booking` → Form Pemesanan
- `/confirmation` → Konfirmasi Booking
- `/login` → Login
- `/register` → Registrasi
- `/my-bookings` → Daftar Pemesanan User
- `/profile` → Profil User

### State Management

**Autentikasi:**
1. User melakukan login dengan email dan password
2. Backend memvalidasi kredensial
3. Token disimpan di localStorage (browser storage)
4. AuthContext menyimpan data user saat ini secara global
5. Setiap halaman dapat mengakses informasi login via context

### Alur Pemesanan

1. User mencari penerbangan dengan kriteria (asal, tujuan, tanggal, penumpang)
2. Sistem menampilkan hasil pencarian dari backend
3. User memilih penerbangan yang diinginkan
4. User login (jika belum)
5. User mengisi form data penumpang
6. Form divalidasi di frontend
7. Request dikirim ke backend
8. Jika berhasil, tampilkan konfirmasi dengan kode booking

### Form Validation

Setiap form memiliki validasi client-side untuk memastikan data valid sebelum dikirim ke server, termasuk:
- Format email
- Kekuatan password
- Format nomor identitas
- Tanggal yang valid

---

## 🎨 Desain dan Styling

### Bulma CSS Framework

Aplikasi menggunakan **Bulma** untuk styling dan UI components. Bulma menyediakan:
- Grid system yang responsif
- Komponen UI siap pakai (buttons, forms, cards, dll)
- Konsistensi visual di semua browser
- Mobile-first design approach

### Responsive Design

Layout dirancang responsif dan dapat menyesuaikan dengan berbagai ukuran layar:
- Desktop (≥1024px)
- Tablet (768px - 1023px)
- Mobile (<768px)

---

## 🔐 Keamanan

Aplikasi menerapkan beberapa fitur keamanan dasar:

1. **Input Validation** - Semua input pengguna divalidasi untuk mencegah injeksi malicious code
2. **Secure Storage** - Token autentikasi disimpan dengan aman
3. **HTTPS Ready** - Siap untuk dijalankan di HTTPS
4. **CORS Protection** - Konfigurasi CORS untuk melindungi API

Untuk keamanan produksi yang lebih tinggi, lihat dokumentasi backend.

---

## 👥 Tim Pengembang

Aplikasi SkyBooking dikembangkan oleh tim yang berdedikasi:

### Frontend Team
- **Fatih Dzakwan Susilo** - Frontend Developer
- **Shofwatun Najwa** - Frontend Developer

### Backend Team
- **Muhammad Aqwam Kamil** - Backend Developer
- **Eka Purnamasari** - Backend Developer

### Database
- **Muhammad Fajrul Falah** - Database Designer & Administrator

---

## ❓ Pertanyaan yang Sering Diajukan (FAQ)

**Q: Bagaimana cara menambah halaman baru?**
A: 1. Buat file baru di `src/pages/`, 2. Buat component React, 3. Tambahkan route di `App.jsx`

**Q: Bagaimana cara mengubah warna atau styling?**
A: Bisa menggunakan Bulma classes atau buat CSS custom di file `.css` masing-masing

**Q: Data penerbangan saya hilang setelah refresh halaman?**
A: Data saat ini disimpan di memory. Setelah backend terintegrasi, data akan persisten di database.

**Q: Bagaimana cara berkontribusi pada project ini?**
A: Hubungi tim lead atau buat branch baru untuk development Anda

**Q: Di mana dokumentasi API backend?**
A: Lihat file BACKEND_INTEGRATION.md untuk informasi tentang integrasi backend

---

## 📚 Referensi dan Dokumentasi

- **React Documentation** - https://react.dev/
- **Bulma CSS Framework** - https://bulma.io/documentation/
- **JavaScript Guide** - https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **Vite Documentation** - https://vitejs.dev/
- **Backend Integration** - Lihat [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)
- **Database Schema** - Lihat [DATABASE_SCHEMA.md](../DATABASE_SCHEMA.md)

---

## 📄 Lisensi

Project ini merupakan hasil pengembangan oleh tim untuk tujuan pembelajaran dan akademik.

---

Untuk pertanyaan atau saran, hubungi anggota tim pengembang.
Selamat menggunakan SkyBooking! ✈️ 
Meskipun masih pakai data palsu, strukturnya sudah lengkap.

Kalau ada yang bingung, baca komentar di setiap file.
Semua file sudah ada penjelasannya dalam bahasa Indonesia! 😊

---

*Dibuat dengan ❤️ untuk tugas kuliah STT Terpadu Nurul Fikri*
