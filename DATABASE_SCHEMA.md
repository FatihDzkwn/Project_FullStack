# 📊 SkyBooking Database Schema & ERD

## 1. Overview

Dokumentasi lengkap struktur database untuk aplikasi SkyBooking. Database ini dirancang untuk mendukung sistem booking tiket pesawat dengan fitur autentikasi, manajemen penerbangan, pemesanan, dan review.

**Database Type**: MySQL
**Tables**: 7 tabel utama
**Relationships**: One-to-Many dan Many-to-Many

---

## 2. Tabel-Tabel Utama

### 📌 **USERS** - Tabel Pengguna
Menyimpan data akun pengguna (customers & admins)

| Field | Type | Constraint | Deskripsi |
|-------|------|-----------|-----------|
| `user_id` | INT | PK, AUTO_INCREMENT | ID unik user |
| `name` | VARCHAR(100) | NOT NULL | Nama lengkap |
| `email` | VARCHAR(100) | UNIQUE, NOT NULL | Email (untuk login) |
| `phone` | VARCHAR(15) | NOT NULL | Nomor telepon |
| `password_hash` | VARCHAR(255) | NOT NULL | Password terenkripsi (bcrypt) |
| `nik` | VARCHAR(16) | UNIQUE | Nomor identitas (KTP) |
| `birth_date` | DATE | | Tanggal lahir |
| `gender` | ENUM('M','F') | | Jenis kelamin |
| `address` | TEXT | | Alamat lengkap |
| `city` | VARCHAR(50) | | Kota |
| `country` | VARCHAR(50) | | Negara |
| `postal_code` | VARCHAR(10) | | Kode pos |
| `nationality` | VARCHAR(50) | | Kebangsaan |
| `role` | ENUM('user','admin') | DEFAULT 'user' | Role user |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Waktu create |
| `updated_at` | TIMESTAMP | | Waktu update terakhir |
| `last_login` | DATETIME | | Login terakhir |

**Contoh Insert:**
```sql
INSERT INTO USERS (name, email, phone, password_hash, nik, birth_date, gender, nationality, role)
VALUES ('John Doe', 'john@example.com', '081234567890', '$2b$10$...', '1234567890123456', '1995-05-15', 'M', 'Indonesia', 'user');
```

---

### ✈️ **AIRLINES** - Tabel Maskapai
Menyimpan data maskapai penerbangan

| Field | Type | Constraint | Deskripsi |
|-------|------|-----------|-----------|
| `airline_id` | INT | PK, AUTO_INCREMENT | ID unik maskapai |
| `airline_code` | VARCHAR(3) | UNIQUE, NOT NULL | Kode maskapai (contoh: GA) |
| `airline_name` | VARCHAR(100) | NOT NULL | Nama maskapai |
| `logo_url` | VARCHAR(255) | | URL logo |
| `country` | VARCHAR(50) | | Negara asal |
| `total_aircraft` | INT | | Total pesawat |
| `description` | TEXT | | Deskripsi maskapai |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| `updated_at` | TIMESTAMP | | |

**Contoh Insert:**
```sql
INSERT INTO AIRLINES (airline_code, airline_name, country, total_aircraft)
VALUES 
('GA', 'Garuda Indonesia', 'Indonesia', 145),
('BA', 'British Airways', 'United Kingdom', 280),
('SQ', 'Singapore Airlines', 'Singapore', 150);
```

---

### 🛫 **AIRPORTS** - Tabel Bandara
Menyimpan data bandara

| Field | Type | Constraint | Deskripsi |
|-------|------|-----------|-----------|
| `airport_id` | INT | PK, AUTO_INCREMENT | ID unik bandara |
| `airport_code` | VARCHAR(3) | UNIQUE, NOT NULL | IATA Code (CGK, DPS, JOG) |
| `airport_name` | VARCHAR(100) | NOT NULL | Nama bandara lengkap |
| `city` | VARCHAR(50) | NOT NULL | Kota |
| `country` | VARCHAR(50) | | Negara |
| `timezone` | VARCHAR(10) | | Timezone (Asia/Jakarta) |
| `phone` | VARCHAR(15) | | Nomor telepon |
| `description` | TEXT | | Deskripsi |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| `updated_at` | TIMESTAMP | | |

**Contoh Insert:**
```sql
INSERT INTO AIRPORTS (airport_code, airport_name, city, country, timezone)
VALUES 
('CGK', 'Soekarno-Hatta International Airport', 'Jakarta', 'Indonesia', 'Asia/Jakarta'),
('DPS', 'Ngurah Rai International Airport', 'Bali', 'Indonesia', 'Asia/Jakarta'),
('JOG', 'Adisumarmo International Airport', 'Yogyakarta', 'Indonesia', 'Asia/Jakarta'),
('SIN', 'Singapore Changi Airport', 'Singapore', 'Singapore', 'Asia/Singapore');
```

---

### ✈️ **FLIGHTS** - Tabel Penerbangan
Menyimpan data penerbangan

| Field | Type | Constraint | Deskripsi |
|-------|------|-----------|-----------|
| `flight_id` | INT | PK, AUTO_INCREMENT | ID unik penerbangan |
| `flight_number` | VARCHAR(10) | UNIQUE, NOT NULL | Nomor penerbangan (GA101) |
| `airline_id` | INT | FK → AIRLINES | ID maskapai |
| `departure_airport` | INT | FK → AIRPORTS | ID bandara keberangkatan |
| `arrival_airport` | INT | FK → AIRPORTS | ID bandara kedatangan |
| `departure_time` | DATETIME | NOT NULL | Waktu keberangkatan |
| `arrival_time` | DATETIME | NOT NULL | Waktu tiba |
| `duration_minutes` | INT | | Durasi perjalanan (menit) |
| `aircraft_type` | VARCHAR(50) | | Jenis pesawat (Boeing 777) |
| `total_seats` | INT | | Total kursi |
| `available_seats` | INT | | Kursi tersedia |
| `economy_price` | DECIMAL(10,2) | | Harga ekonomi |
| `business_price` | DECIMAL(10,2) | | Harga bisnis |
| `first_class_price` | DECIMAL(10,2) | | Harga first class |
| `status` | ENUM('scheduled','delayed','cancelled','completed') | DEFAULT 'scheduled' | Status penerbangan |
| `flight_date` | DATE | NOT NULL | Tanggal penerbangan |
| `remarks` | TEXT | | Keterangan khusus |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| `updated_at` | TIMESTAMP | | |

**Contoh Insert:**
```sql
INSERT INTO FLIGHTS (flight_number, airline_id, departure_airport, arrival_airport, departure_time, arrival_time, duration_minutes, aircraft_type, total_seats, available_seats, economy_price, business_price, first_class_price, flight_date)
VALUES 
('GA101', 1, 1, 2, '2026-04-15 07:00:00', '2026-04-15 09:00:00', 120, 'Boeing 777', 350, 45, 1500000, 3500000, 5000000, '2026-04-15');
```

---

### 📦 **BOOKINGS** - Tabel Pemesanan
Menyimpan data pemesanan/transaksi

| Field | Type | Constraint | Deskripsi |
|-------|------|-----------|-----------|
| `booking_id` | INT | PK, AUTO_INCREMENT | ID unik booking |
| `booking_code` | VARCHAR(10) | UNIQUE, NOT NULL | Kode booking (ABC123XYZ) |
| `user_id` | INT | FK → USERS | ID user pembooking |
| `flight_id` | INT | FK → FLIGHTS | ID penerbangan |
| `total_passengers` | INT | NOT NULL | Jumlah penumpang |
| `total_price` | DECIMAL(12,2) | NOT NULL | Total harga |
| `status` | ENUM('pending','confirmed','cancelled','completed') | DEFAULT 'pending' | Status booking |
| `payment_status` | ENUM('pending','completed','failed','refunded') | DEFAULT 'pending' | Status pembayaran |
| `booking_date` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Tanggal booking |
| `payment_date` | DATETIME | | Tanggal pembayaran |
| `payment_method` | VARCHAR(50) | | Metode bayar (credit_card, bank_transfer, e_wallet) |
| `transaction_id` | VARCHAR(100) | UNIQUE | ID transaksi dari payment gateway |
| `special_requests` | TEXT | | Permintaan khusus |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| `updated_at` | TIMESTAMP | | |

**Contoh Insert:**
```sql
INSERT INTO BOOKINGS (booking_code, user_id, flight_id, total_passengers, total_price, payment_method)
VALUES 
('ABC123XYZ', 1, 1, 2, 3000000, 'credit_card');
```

---

### 👤 **PASSENGERS** - Tabel Penumpang
Menyimpan data penumpang per booking

| Field | Type | Constraint | Deskripsi |
|-------|------|-----------|-----------|
| `passenger_id` | INT | PK, AUTO_INCREMENT | ID unik penumpang |
| `full_name` | VARCHAR(100) | NOT NULL | Nama lengkap penumpang |
| `nik` | VARCHAR(16) | | Nomor identitas (KTP) |
| `gender` | ENUM('M','F') | | Jenis kelamin |
| `birth_date` | DATE | | Tanggal lahir |
| `nationality` | VARCHAR(50) | | Kebangsaan |
| `passport_number` | VARCHAR(50) | | Nomor paspor (untuk int'l flight) |
| `passport_expiry` | DATE | | Tanggal kadaluarsa paspor |
| `seat_number` | VARCHAR(5) | | Nomor kursi |
| `ticket_type` | ENUM('economy','business','first_class') | NOT NULL | Tipe tiket |
| `has_checked_in` | BOOLEAN | DEFAULT FALSE | Sudah check-in? |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |

**Contoh Insert:**
```sql
INSERT INTO PASSENGERS (full_name, nik, gender, birth_date, nationality, seat_number, ticket_type)
VALUES 
('John Doe', '1234567890123456', 'M', '1995-05-15', 'Indonesia', '12A', 'economy'),
('Jane Smith', '2345678901234567', 'F', '1998-03-20', 'Indonesia', '12B', 'economy');
```

---

### 🛄 **BOOKING_PASSENGERS** - Tabel Relasi Booking & Passengers
Junction table untuk relasi many-to-many antara bookings dan passengers (serta data tambahan seperti bagasi)

| Field | Type | Constraint | Deskripsi |
|-------|------|-----------|-----------|
| `booking_passenger_id` | INT | PK, AUTO_INCREMENT | ID unik |
| `booking_id` | INT | FK → BOOKINGS | ID booking |
| `passenger_id` | INT | FK → PASSENGERS | ID penumpang |
| `seat_number` | VARCHAR(5) | NOT NULL | Nomor kursi |
| `baggage_type` | ENUM('none','standard','extra') | DEFAULT 'standard' | Tipe bagasi |
| `baggage_count` | INT | DEFAULT 1 | Jumlah bagasi |
| `baggage_price` | DECIMAL(10,2) | DEFAULT 0 | Biaya bagasi tambahan |
| `meal_included` | BOOLEAN | DEFAULT FALSE | Termasuk meal? |
| `special_services` | TEXT | | Layanan khusus (wheelchair, unaccompanied minor) |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |

**Contoh Insert:**
```sql
INSERT INTO BOOKING_PASSENGERS (booking_id, passenger_id, seat_number, baggage_type, baggage_count, meal_included)
VALUES 
(1, 1, '12A', 'standard', 1, TRUE),
(1, 2, '12B', 'extra', 2, TRUE);
```

---

### ⭐ **REVIEWS** - Tabel Review (Optional)
Menyimpan review/rating penerbangan dari user

| Field | Type | Constraint | Deskripsi |
|-------|------|-----------|-----------|
| `review_id` | INT | PK, AUTO_INCREMENT | ID unik review |
| `user_id` | INT | FK → USERS | ID user pemberi review |
| `flight_id` | INT | FK → FLIGHTS | ID penerbangan |
| `rating` | INT | CHECK (rating BETWEEN 1 AND 5) | Rating 1-5 bintang |
| `comment` | TEXT | | Komentar |
| `review_date` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Tanggal review |
| `helpful_count` | INT | DEFAULT 0 | Berapa orang yang anggap helpful |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | |
| `updated_at` | TIMESTAMP | | |

**Contoh Insert:**
```sql
INSERT INTO REVIEWS (user_id, flight_id, rating, comment)
VALUES 
(1, 1, 5, 'Penerbangan tepat waktu, crew profesional!');
```

---

## 3. Relationships (Hubungan Tabel)

```
USERS
  ├─→ 1 user MEMBUAT BANYAK bookings (1:*)
  └─→ 1 user MENULIS BANYAK reviews (1:*)

AIRLINES
  └─→ 1 maskapai MENGOPERASIKAN BANYAK flights (1:*)

AIRPORTS
  └─→ 1 bandara MENJADI berangkat/tiba untuk BANYAK flights (1:*)

FLIGHTS
  ├─→ 1 penerbangan DIPESAN dalam BANYAK bookings (1:*)
  └─→ 1 penerbangan MENERIMA BANYAK reviews (1:*)

BOOKINGS
  ├─→ 1 booking MEMILIKI BANYAK booking_passengers (1:*)
  └─→ 1 booking BERISI penerbangan dari FLIGHTS (FK)

PASSENGERS
  └─→ 1 penumpang DIIKUTSERTAKAN dalam BANYAK bookings (melalui booking_passengers) (*:*)

BOOKING_PASSENGERS
  ├─→ FK ke BOOKINGS (many)
  └─→ FK ke PASSENGERS (many)
```

---

## 4. Create Table SQL

### PostgreSQL Version

```sql
-- AIRLINES
CREATE TABLE AIRLINES (
    airline_id SERIAL PRIMARY KEY,
    airline_code VARCHAR(3) UNIQUE NOT NULL,
    airline_name VARCHAR(100) NOT NULL,
    logo_url VARCHAR(255),
    country VARCHAR(50),
    total_aircraft INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- AIRPORTS
CREATE TABLE AIRPORTS (
    airport_id SERIAL PRIMARY KEY,
    airport_code VARCHAR(3) UNIQUE NOT NULL,
    airport_name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    country VARCHAR(50),
    timezone VARCHAR(10),
    phone VARCHAR(15),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- USERS
CREATE TABLE USERS (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nik VARCHAR(16) UNIQUE,
    birth_date DATE,
    gender CHAR(1),
    address TEXT,
    city VARCHAR(50),
    country VARCHAR(50),
    postal_code VARCHAR(10),
    nationality VARCHAR(50),
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    last_login TIMESTAMP
);

-- FLIGHTS
CREATE TABLE FLIGHTS (
    flight_id SERIAL PRIMARY KEY,
    flight_number VARCHAR(10) UNIQUE NOT NULL,
    airline_id INT NOT NULL,
    departure_airport INT NOT NULL,
    arrival_airport INT NOT NULL,
    departure_time TIMESTAMP NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    duration_minutes INT,
    aircraft_type VARCHAR(50),
    total_seats INT,
    available_seats INT,
    economy_price DECIMAL(10,2),
    business_price DECIMAL(10,2),
    first_class_price DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'scheduled',
    flight_date DATE NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (airline_id) REFERENCES AIRLINES(airline_id),
    FOREIGN KEY (departure_airport) REFERENCES AIRPORTS(airport_id),
    FOREIGN KEY (arrival_airport) REFERENCES AIRPORTS(airport_id)
);

-- BOOKINGS
CREATE TABLE BOOKINGS (
    booking_id SERIAL PRIMARY KEY,
    booking_code VARCHAR(10) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    flight_id INT NOT NULL,
    total_passengers INT NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    payment_status VARCHAR(20) DEFAULT 'pending',
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_date TIMESTAMP,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100) UNIQUE,
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id),
    FOREIGN KEY (flight_id) REFERENCES FLIGHTS(flight_id)
);

-- PASSENGERS
CREATE TABLE PASSENGERS (
    passenger_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    nik VARCHAR(16),
    gender CHAR(1),
    birth_date DATE,
    nationality VARCHAR(50),
    passport_number VARCHAR(50),
    passport_expiry DATE,
    seat_number VARCHAR(5),
    ticket_type VARCHAR(20) NOT NULL,
    has_checked_in BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BOOKING_PASSENGERS
CREATE TABLE BOOKING_PASSENGERS (
    booking_passenger_id SERIAL PRIMARY KEY,
    booking_id INT NOT NULL,
    passenger_id INT NOT NULL,
    seat_number VARCHAR(5) NOT NULL,
    baggage_type VARCHAR(20) DEFAULT 'standard',
    baggage_count INT DEFAULT 1,
    baggage_price DECIMAL(10,2) DEFAULT 0,
    meal_included BOOLEAN DEFAULT FALSE,
    special_services TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES BOOKINGS(booking_id),
    FOREIGN KEY (passenger_id) REFERENCES PASSENGERS(passenger_id),
    UNIQUE(booking_id, passenger_id)
);

-- REVIEWS
CREATE TABLE REVIEWS (
    review_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    flight_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id),
    FOREIGN KEY (flight_id) REFERENCES FLIGHTS(flight_id)
);

-- CREATE INDEXES
CREATE INDEX idx_bookings_user_id ON BOOKINGS(user_id);
CREATE INDEX idx_bookings_flight_id ON BOOKINGS(flight_id);
CREATE INDEX idx_bookings_booking_code ON BOOKINGS(booking_code);
CREATE INDEX idx_flights_flight_date ON FLIGHTS(flight_date);
CREATE INDEX idx_flights_departure_arrival ON FLIGHTS(departure_airport, arrival_airport);
CREATE INDEX idx_reviews_user_id ON REVIEWS(user_id);
CREATE INDEX idx_reviews_flight_id ON REVIEWS(flight_id);
```

---

## 5. Key Constraints & Business Rules

### Primary Keys (PK)
- Setiap tabel memiliki auto-increment INT primary key

### Unique Keys (UK)
- `USERS.email` - Email harus unik untuk login
- `AIRLINES.airline_code` - Kode maskapai unik (GA, BA, SQ)
- `AIRPORTS.airport_code` - Kode bandara unik (IATA Code)
- `FLIGHTS.flight_number` - Nomor penerbangan unik
- `BOOKINGS.booking_code` - Kode booking unik (untuk tracking)
- `BOOKINGS.transaction_id` - Transaction ID dari payment gateway
- `BOOKING_PASSENGERS(booking_id, passenger_id)` - Composite unique

### Foreign Keys (FK)
- `FLIGHTS.airline_id` → `AIRLINES.airline_id`
- `FLIGHTS.departure_airport` → `AIRPORTS.airport_id`
- `FLIGHTS.arrival_airport` → `AIRPORTS.airport_id`
- `BOOKINGS.user_id` → `USERS.user_id`
- `BOOKINGS.flight_id` → `FLIGHTS.flight_id`
- `BOOKING_PASSENGERS.booking_id` → `BOOKINGS.booking_id`
- `BOOKING_PASSENGERS.passenger_id` → `PASSENGERS.passenger_id`
- `REVIEWS.user_id` → `USERS.user_id`
- `REVIEWS.flight_id` → `FLIGHTS.flight_id`

### Enums
- `USERS.role`: 'user' | 'admin'
- `FLIGHTS.status`: 'scheduled' | 'delayed' | 'cancelled' | 'completed'
- `BOOKINGS.status`: 'pending' | 'confirmed' | 'cancelled' | 'completed'
- `BOOKINGS.payment_status`: 'pending' | 'completed' | 'failed' | 'refunded'
- `PASSENGERS.ticket_type`: 'economy' | 'business' | 'first_class'
- `BOOKING_PASSENGERS.baggage_type`: 'none' | 'standard' | 'extra'

### Business Rules
1. **Booking hanya bisa dibuat jika user sudah login** (user_id required)
2. **Kursi penerbangan harus valid** (available_seats >= total_passengers)
3. **Total price dihitung dari**: ticket_type × quantity + baggage_price
4. **Payment baru confirm setelah pembayaran sukses**
5. **Booking bisa di-cancel sebelum departure_time minus 24 jam**
6. **Penumpang usia < 18 tahun perlu unaccompanied_minor service**
7. **Passport harus berlaku 6 bulan** untuk international flights

---

## 6. Sample Query Contoh

```sql
-- 1. Cari flights dari Jakarta ke Bali pada tanggal tertentu
SELECT f.flight_number, al.airline_name, f.departure_time, f.arrival_time, 
       f.available_seats, f.economy_price
FROM FLIGHTS f
JOIN AIRLINES al ON f.airline_id = al.airline_id
WHERE f.departure_airport = (SELECT airport_id FROM AIRPORTS WHERE airport_code = 'CGK')
  AND f.arrival_airport = (SELECT airport_id FROM AIRPORTS WHERE airport_code = 'DPS')
  AND DATE(f.departure_time) = '2026-04-15'
ORDER BY f.departure_time;

-- 2. Lihat riwayat booking user
SELECT b.booking_code, f.flight_number, al.airline_name, 
       b.booking_date, b.status, b.total_price
FROM BOOKINGS b
JOIN FLIGHTS f ON b.flight_id = f.flight_id
JOIN AIRLINES al ON f.airline_id = al.airline_id
WHERE b.user_id = 1
ORDER BY b.booking_date DESC;

-- 3. Lihat penumpang per booking
SELECT b.booking_code, p.full_name, p.seat_number, bp.baggage_type, bp.meal_included
FROM BOOKINGS b
JOIN BOOKING_PASSENGERS bp ON b.booking_id = bp.booking_id
JOIN PASSENGERS p ON bp.passenger_id = p.passenger_id
WHERE b.booking_code = 'ABC123XYZ'
ORDER BY p.full_name;

-- 4. Average rating per airline
SELECT al.airline_name, AVG(r.rating) as avg_rating, COUNT(r.review_id) as total_reviews
FROM REVIEWS r
JOIN FLIGHTS f ON r.flight_id = f.flight_id
JOIN AIRLINES al ON f.airline_id = al.airline_id
GROUP BY al.airline_id, al.airline_name
HAVING COUNT(r.review_id) > 0
ORDER BY avg_rating DESC;

-- 5. Update available seats setelah booking
UPDATE FLIGHTS 
SET available_seats = available_seats - 2
WHERE flight_id = 1;
```

---

## 7. Future Enhancements

- **Seat Map Table**: Untuk tracking seat status real-time
- **Promo/Coupon Table**: Discount management
- **Refund/Issue Table**: Penanganan komplain dan refund
- **Notification Table**: History email/SMS notification
- **API Log Table**: Audit trail untuk API calls

---

