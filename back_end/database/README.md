# Database - SkyBooking

Folder ini berisi file-file untuk setup dan manage database MySQL untuk aplikasi SkyBooking.

## File-File

### 📋 Migrations (Schema)
- **`migrations/dbtiketpesawat.sql`** - Schema database dengan 8 tabel (Production Version)

### 📦 Seeds (Sample Data)
- **`seeds/001_sample_data_mysql.sql`** - Data sample untuk testing (opsional)

### 💾 Full Backup
- **`sky_booking_full.sql`** - Complete database dump (structure + data) - diupdate secara berkala

## Setup Database

### Opsi 1: Menggunakan Full Backup
```bash
mysql -u root -p sky_booking < database/sky_booking_full.sql
```

### Opsi 2: Setup dari Awal
```bash
# 1. Buat database
mysql -u root -p -e "CREATE DATABASE sky_booking;"

# 2. Import schema
mysql -u root -p sky_booking < database/migrations/dbtiketpesawat.sql

# 3. (Opsional) Import sample data
mysql -u root -p sky_booking < database/seeds/001_sample_data_mysql.sql
```

## Database Schema

### 📊 8 Tabel Utama

| No | Tabel | Kolom | Deskripsi |
|:--:|-------|-------|-----------|
| 1 | **users** | 17 | Akun pengguna (register/login) - Email, Password, NIK, Bio Data |
| 2 | **airlines** | 9 | Maskapai penerbangan - Kode, Nama, Logo, Jumlah Pesawat |
| 3 | **airports** | 9 | Bandara/Terminal - Kode IATA, Nama, Lokasi, Timezone |
| 4 | **flights** | 18 | Jadwal Penerbangan - Nomor, Rute, Waktu, Harga (Economy/Business/First Class) |
| 5 | **bookings** | 14 | Pemesanan Tiket - Booking Code, Status, Pembayaran, Total Harga |
| 6 | **passengers** | 11 | Data Penumpang - Nama, NIK, Paspor, Tipe Tiket, Check-in Status |
| 7 | **booking_passengers** | 10 | Relasi Booking ↔ Penumpang - Seat, Bagasi, Meal, Layanan Khusus |
| 8 | **reviews** | 9 | Review/Rating - Rating 1-5, Comment, Helpful Count |

### 🔑 Relationships

```
users (1) ──→ (many) bookings
bookings (1) ──→ (many) booking_passengers
passengers (many) ──← (1) booking_passengers
flights (1) ──→ (many) bookings
airlines (1) ──→ (many) flights
airports (1) ──→ (many) flights (departure)
airports (1) ──→ (many) flights (arrival)
flights (1) ──→ (many) reviews
```

## Konfigurasi Koneksi

File `.env` di root backend harus memiliki:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=            # (kosong jika tidak ada password)
DB_NAME=sky_booking
```

## Develop Database

### Update Schema
1. Edit file di `migrations/001_create_tables_mysql.sql`
2. Drop dan recreate database
3. Update `sky_booking_full.sql` dengan export baru

### Tambah Sample Data
Edit `seeds/001_sample_data_mysql.sql` untuk menambah data testing

## Backup Database

```bash
mysqldump -u root -p sky_booking > database/sky_booking_full.sql
```

## Reset Database

```bash
# Hard reset
mysql -u root -p -e "DROP DATABASE sky_booking; CREATE DATABASE sky_booking;"

# Reimport schema dan data
mysql -u root -p sky_booking < database/migrations/001_create_tables_mysql.sql
mysql -u root -p sky_booking < database/seeds/001_sample_data_mysql.sql
```
