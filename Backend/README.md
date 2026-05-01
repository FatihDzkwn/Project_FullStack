# ✈️ SkyBooking - Website Booking Tiket Pesawat

Halo! Ini adalah website untuk memesan tiket pesawat. Website ini dibuat pakai **React** (untuk tampilan) dan **Bulma** (untuk mempercantik tampilan).

---

## 📖 Apa Itu Website Ini?

Bayangkan kamu mau pergi liburan naik pesawat. Kamu perlu beli tiket dulu kan? 
Nah, website ini membantu kamu:

1. **Cari pesawat** - Mau pergi dari mana ke mana? Kapan?
2. **Pilih pesawat** - Ada banyak pilihan, mau yang murah atau yang cepat?
3. **Isi data** - Siapa yang mau naik pesawat?
4. **Selesai!** - Dapat kode booking deh!

---

## 🗂️ Isi Folder Ini

Folder ini isinya banyak file. Ini penjelasannya pakai bahasa gampang:

```
front_end/
│
├── src/                      👈 Semua kode website ada di sini
│   │
│   ├── components/           👈 "Bagian-bagian kecil" yang bisa dipakai ulang
│   │   ├── Navbar.jsx        → Menu di atas (Home, Pesanan, Login)
│   │   ├── SearchForm.jsx    → Kotak untuk cari pesawat
│   │   ├── FlightCard.jsx    → Kartu yang menampilkan info pesawat
│   │   └── Footer.jsx        → Bagian paling bawah website
│   │
│   ├── pages/                👈 "Halaman-halaman" website
│   │   ├── Home.jsx          → Halaman depan (yang pertama dilihat)
│   │   ├── SearchResults.jsx → Halaman hasil pencarian pesawat
│   │   ├── FlightDetail.jsx  → Halaman detail satu pesawat
│   │   ├── Booking.jsx       → Halaman isi data penumpang
│   │   ├── Confirmation.jsx  → Halaman "Yeay, berhasil!"
│   │   ├── Login.jsx         → Halaman masuk akun
│   │   ├── Register.jsx      → Halaman bikin akun baru
│   │   └── MyBookings.jsx    → Halaman lihat pesanan kamu
│   │
│   ├── context/              👈 "Ingatan" untuk data login
│   │   └── AuthContext.jsx   → Ingat siapa yang lagi login
│   │
│   ├── services/             👈 "Penghubung" ke server (backend)
│   │   └── api.js            → Semua permintaan data ke server
│   │
│   ├── config/               👈 "Pengaturan" website
│   │   └── index.js          → Alamat server, dll
│   │
│   ├── utils/                👈 "Alat bantu"
│   │   └── security.js       → Keamanan (cek password, dll)
│   │
│   ├── data/                 👈 "Data contoh" (nanti diganti server asli)
│   │   └── flights.js        → Data pesawat palsu untuk latihan
│   │
│   └── App.jsx               👈 "Pengatur jalan" (ke halaman mana?)
│
├── package.json              👈 Daftar "bahan-bahan" yang dipakai
└── README.md                 👈 File yang sedang kamu baca ini!
```

---

## 🎯 Cara Kerja Website (Alur Pengguna)

```
┌─────────────────────────────────────────────────────────────────┐
│  1. BUKA WEBSITE                                                │
│     ↓                                                           │
│  2. ISI FORM PENCARIAN                                          │
│     - Dari mana? (Jakarta)                                      │
│     - Ke mana? (Bali)                                           │
│     - Tanggal? (15 Januari)                                     │
│     - Berapa orang? (2)                                         │
│     ↓                                                           │
│  3. LIHAT HASIL PENCARIAN                                       │
│     - Garuda Rp 1.500.000 ✈️                                    │
│     - Lion Air Rp 800.000 ✈️                                    │
│     - Citilink Rp 900.000 ✈️                                    │
│     ↓                                                           │
│  4. PILIH SATU PESAWAT                                          │
│     (Klik "Pilih")                                              │
│     ↓                                                           │
│  5. LOGIN DULU (kalau belum)                                    │
│     ↓                                                           │
│  6. ISI DATA PENUMPANG                                          │
│     - Nama: John Doe                                            │
│     - No. KTP: 1234567890                                       │
│     ↓                                                           │
│  7. SELESAI! 🎉                                                 │
│     Dapat kode booking: ABC123                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Penjelasan Tiap Bagian

### 1. Components (Bagian Kecil yang Dipakai Ulang)

**Apa itu Component?**
Bayangkan kamu main LEGO. Setiap balok LEGO adalah "component". 
Kamu bisa pakai balok yang sama berkali-kali di tempat berbeda.

| File | Fungsinya | Ibaratnya |
|------|-----------|-----------|
| `Navbar.jsx` | Menu di bagian atas | Seperti papan petunjuk di mall |
| `SearchForm.jsx` | Form cari pesawat | Seperti mesin pencari Google |
| `FlightCard.jsx` | Kartu info pesawat | Seperti kartu Yu-Gi-Oh tapi isinya pesawat |
| `Footer.jsx` | Bagian bawah | Seperti tanda tangan di akhir surat |

### 2. Pages (Halaman-Halaman)

**Apa itu Page?**
Kalau component itu bagian kecil, page itu halaman lengkap.
Seperti buku, setiap page adalah satu halaman penuh.

| File | Kapan Muncul? | Isinya Apa? |
|------|---------------|-------------|
| `Home.jsx` | Pertama kali buka website | Form cari + gambar bagus |
| `SearchResults.jsx` | Setelah klik "Cari" | Daftar pesawat |
| `FlightDetail.jsx` | Klik "Lihat Detail" | Info lengkap 1 pesawat |
| `Booking.jsx` | Klik "Pesan" | Form isi data penumpang |
| `Confirmation.jsx` | Setelah booking selesai | "Yeay berhasil!" + kode |
| `Login.jsx` | Klik "Masuk" | Form email + password |
| `Register.jsx` | Klik "Daftar" | Form bikin akun baru |
| `MyBookings.jsx` | Klik "Pesanan Saya" | Daftar tiket yang sudah dipesan |

### 3. Context (Ingatan Global)

**Apa itu Context?**
Bayangkan kamu punya papan tulis besar di rumah. 
Semua orang di rumah bisa lihat dan tulis di papan itu.

`AuthContext.jsx` = Papan tulis yang berisi "Siapa yang lagi login?"

Jadi semua halaman tahu siapa yang sedang memakai website.

### 4. Services (Penghubung ke Server)

**Apa itu Services?**
Seperti pelayan restoran. Kamu pesan makanan ke pelayan, 
pelayan pergi ke dapur, lalu bawa makanan ke kamu.

`api.js` = Pelayan yang menghubungkan website ke server (backend)

### 5. Config (Pengaturan)

**Apa itu Config?**
Seperti remote TV. Di situ ada tombol-tombol pengaturan.

`config/index.js` = Pengaturan seperti:
- Alamat server backend
- Pakai data sungguhan atau data palsu?

### 6. Utils (Alat Bantu)

**Apa itu Utils?**
Seperti kotak perkakas. Isinya obeng, palu, dll.

`security.js` = Alat-alat untuk keamanan:
- Cek apakah password kuat?
- Bersihkan input dari kode jahat
- Batasi percobaan login

---

## 🚀 Cara Menjalankan Website

### Langkah 1: Buka Terminal
Di VS Code, tekan `` Ctrl + ` `` (tombol di bawah Esc)

### Langkah 2: Masuk ke Folder
```bash
cd "E:\STT Terpadu Nurul Fikri\Semester 4\Project\Booking_Tiket_Pesawat\front_end"
```

### Langkah 3: Install "Bahan-Bahan"
```bash
npm install
```
(Tunggu sampai selesai, bisa 1-2 menit)

### Langkah 4: Jalankan Website
```bash
npm run dev
```

### Langkah 5: Buka di Browser
Akan muncul tulisan seperti:
```
Local: http://localhost:5173/
```
Klik link itu atau buka browser dan ketik alamat tersebut.

### Langkah 6: Selesai! 🎉
Website sudah jalan. Coba-coba deh!

---

## 📝 Cara Kerja Kode (Penjelasan Sederhana)

### Bagaimana Halaman Berpindah?

Di `App.jsx` ada pengatur jalan seperti ini:

```
Kalau alamat = "/"           → tampilkan Home
Kalau alamat = "/search"     → tampilkan SearchResults  
Kalau alamat = "/flight/123" → tampilkan FlightDetail
Kalau alamat = "/booking"    → tampilkan Booking
... dan seterusnya
```

Seperti lampu lalu lintas yang bilang "ke sini" atau "ke sana".

### Bagaimana Data Login Disimpan?

1. Kamu login dengan email + password
2. Website cek: "Apakah cocok?"
3. Kalau cocok, simpan data kamu di "ingatan browser" (localStorage)
4. Setiap halaman bisa cek: "Siapa yang lagi login?"

### Bagaimana Form Pencarian Bekerja?

1. Kamu isi: Dari Jakarta, Ke Bali, Tanggal 15 Jan
2. Klik "Cari"
3. Website cari di data: "Pesawat mana yang cocok?"
4. Tampilkan hasilnya sebagai kartu-kartu

---

## 🎨 Tentang Tampilan (CSS)

Website ini pakai **Bulma** untuk mempercantik tampilan.

**Apa itu Bulma?**
Seperti baju siap pakai. Kamu tinggal bilang "pakai baju merah" dan jadilah merah.

Contoh di kode:
```html
<button class="button is-primary">Cari</button>
```
- `button` = Ini tombol
- `is-primary` = Warnanya biru (warna utama)

Gampang kan? Tidak perlu bikin warna sendiri!

---

## 🔐 Tentang Keamanan

Website ini sudah punya keamanan dasar:

1. **Password di-hash** - Password tidak disimpan langsung, tapi "diacak" dulu
2. **Input dibersihkan** - Kalau ada yang coba masukkan kode jahat, akan dibersihkan
3. **Batasan login** - Kalau salah password 5x, harus tunggu 15 menit

---

## 🤝 Kerja Tim

Project ini dikerjakan berdua:
- **Frontend (kamu)** - Bikin tampilan website (file-file ini)
- **Backend (teman)** - Bikin server dan database

Nanti kalau backend sudah jadi, tinggal sambungkan!

---

## ❓ FAQ (Pertanyaan yang Sering Ditanya)

**Q: Kenapa data pesawat tidak asli?**
A: Karena belum ada backend. Saat ini pakai data palsu di `flights.js`.

**Q: Kenapa logout langsung hilang semua?**
A: Karena data disimpan di browser (localStorage). Logout = hapus data.

**Q: Mau tambah halaman baru bagaimana?**
A: 1. Bikin file baru di `pages/`, 2. Tambahkan route di `App.jsx`

**Q: Mau ganti warna bagaimana?**
A: Cari class Bulma yang sesuai di https://bulma.io/documentation/

---

## 📚 Mau Belajar Lebih?

1. **React** - https://react.dev/learn
2. **Bulma CSS** - https://bulma.io/documentation/
3. **JavaScript** - https://javascript.info/

---

## 🎉 Selamat!

Kamu sudah punya website booking pesawat! 
Meskipun masih pakai data palsu, strukturnya sudah lengkap.

Kalau ada yang bingung, baca komentar di setiap file.
Semua file sudah ada penjelasannya dalam bahasa Indonesia! 😊

---

*Dibuat dengan ❤️ untuk tugas kuliah STT Terpadu Nurul Fikri*
