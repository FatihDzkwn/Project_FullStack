-- ============================================================================
-- SkyBooking Database Schema (MySQL) - Production Version
-- ============================================================================
-- Database: sky_booking
-- Version: 1.0 (Production)
-- Updated: 2026-04-17
-- ============================================================================

-- ============================================================================
-- 1. USERS TABLE - Tabel Pengguna
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nik VARCHAR(16) UNIQUE,
  birth_date DATE,
  gender CHAR(1) COMMENT 'M=Male, F=Female',
  address TEXT,
  city VARCHAR(50),
  country VARCHAR(50),
  postal_code VARCHAR(10),
  nationality VARCHAR(50),
  role VARCHAR(20) DEFAULT 'user' COMMENT 'user, admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login DATETIME,
  INDEX idx_email (email),
  INDEX idx_nik (nik),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 2. AIRLINES TABLE - Tabel Maskapai Penerbangan
-- ============================================================================
CREATE TABLE IF NOT EXISTS airlines (
  airline_id INT AUTO_INCREMENT PRIMARY KEY,
  airline_code VARCHAR(3) UNIQUE NOT NULL COMMENT 'Kode maskapai (GA, BA, SQ)',
  airline_name VARCHAR(100) NOT NULL,
  logo_url VARCHAR(255),
  country VARCHAR(50),
  total_aircraft INT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_code (airline_code),
  INDEX idx_name (airline_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 3. AIRPORTS TABLE - Tabel Bandara
-- ============================================================================
CREATE TABLE IF NOT EXISTS airports (
  airport_id INT AUTO_INCREMENT PRIMARY KEY,
  airport_code VARCHAR(3) UNIQUE NOT NULL COMMENT 'IATA Code (CGK, DPS, JOG)',
  airport_name VARCHAR(100) NOT NULL,
  city VARCHAR(50) NOT NULL,
  country VARCHAR(50),
  timezone VARCHAR(10),
  phone VARCHAR(15),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_code (airport_code),
  INDEX idx_city (city),
  INDEX idx_country (country)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 4. FLIGHTS TABLE - Tabel Penerbangan
-- ============================================================================
CREATE TABLE IF NOT EXISTS flights (
  flight_id INT AUTO_INCREMENT PRIMARY KEY,
  flight_number VARCHAR(10) UNIQUE NOT NULL COMMENT 'Nomor penerbangan (GA101)',
  airline_id INT NOT NULL,
  departure_airport INT NOT NULL,
  arrival_airport INT NOT NULL,
  departure_time DATETIME NOT NULL,
  arrival_time DATETIME NOT NULL,
  duration_minutes INT COMMENT 'Durasi dalam menit',
  aircraft_type VARCHAR(50) COMMENT 'Boeing 777, Airbus A380, dll',
  total_seats INT DEFAULT 180,
  available_seats INT DEFAULT 180,
  economy_price DECIMAL(10,2) COMMENT 'Harga tiket ekonomi',
  business_price DECIMAL(10,2) COMMENT 'Harga tiket bisnis',
  first_class_price DECIMAL(10,2) COMMENT 'Harga tiket first class',
  status VARCHAR(20) DEFAULT 'scheduled' COMMENT 'scheduled, delayed, cancelled, completed',
  flight_date DATE NOT NULL,
  remarks TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (airline_id) REFERENCES airlines(airline_id),
  FOREIGN KEY (departure_airport) REFERENCES airports(airport_id),
  FOREIGN KEY (arrival_airport) REFERENCES airports(airport_id),
  INDEX idx_flight_number (flight_number),
  INDEX idx_airline_id (airline_id),
  INDEX idx_departure_airport (departure_airport),
  INDEX idx_arrival_airport (arrival_airport),
  INDEX idx_departure_time (departure_time),
  INDEX idx_flight_date (flight_date),
  INDEX idx_status (status),
  UNIQUE KEY unique_flight (flight_number, flight_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 5. BOOKINGS TABLE - Tabel Pemesanan
-- ============================================================================
CREATE TABLE IF NOT EXISTS bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  booking_code VARCHAR(10) UNIQUE NOT NULL COMMENT 'Kode booking (ABC123XYZ)',
  user_id INT NOT NULL,
  flight_id INT NOT NULL,
  total_passengers INT NOT NULL,
  total_price DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' COMMENT 'pending, confirmed, cancelled, completed',
  payment_status VARCHAR(20) DEFAULT 'pending' COMMENT 'pending, completed, failed, refunded',
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  payment_date DATETIME,
  payment_method VARCHAR(50) COMMENT 'credit_card, bank_transfer, e_wallet',
  transaction_id VARCHAR(100) UNIQUE COMMENT 'ID dari payment gateway',
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (flight_id) REFERENCES flights(flight_id),
  INDEX idx_booking_code (booking_code),
  INDEX idx_user_id (user_id),
  INDEX idx_flight_id (flight_id),
  INDEX idx_booking_date (booking_date),
  INDEX idx_status (status),
  INDEX idx_payment_status (payment_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 6. PASSENGERS TABLE - Tabel Penumpang
-- ============================================================================
CREATE TABLE IF NOT EXISTS passengers (
  passenger_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  nik VARCHAR(16) COMMENT 'Nomor Identitas (KTP)',
  gender CHAR(1) COMMENT 'M=Male, F=Female',
  birth_date DATE,
  nationality VARCHAR(50),
  passport_number VARCHAR(50),
  passport_expiry DATE,
  seat_number VARCHAR(5),
  ticket_type VARCHAR(20) NOT NULL COMMENT 'economy, business, first_class',
  has_checked_in TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_full_name (full_name),
  INDEX idx_nik (nik),
  INDEX idx_passport (passport_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 7. BOOKING_PASSENGERS TABLE - Relasi Booking & Penumpang (Junction)
-- ============================================================================
CREATE TABLE IF NOT EXISTS booking_passengers (
  booking_passenger_id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  passenger_id INT NOT NULL,
  seat_number VARCHAR(5) NOT NULL,
  baggage_type VARCHAR(20) DEFAULT 'standard' COMMENT 'none, standard, extra',
  baggage_count INT DEFAULT 1,
  baggage_price DECIMAL(10,2) DEFAULT 0,
  meal_included TINYINT(1) DEFAULT 0,
  special_services TEXT COMMENT 'wheelchair, unaccompanied minor, dll',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
  FOREIGN KEY (passenger_id) REFERENCES passengers(passenger_id) ON DELETE CASCADE,
  INDEX idx_booking_id (booking_id),
  INDEX idx_passenger_id (passenger_id),
  UNIQUE KEY unique_booking_passenger (booking_id, passenger_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 8. REVIEWS TABLE - Tabel Review/Rating Penerbangan
-- ============================================================================
CREATE TABLE IF NOT EXISTS reviews (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  flight_id INT NOT NULL,
  rating INT COMMENT 'Rating 1-5 bintang',
  comment TEXT,
  review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (flight_id) REFERENCES flights(flight_id),
  INDEX idx_user_id (user_id),
  INDEX idx_flight_id (flight_id),
  INDEX idx_rating (rating),
  CHECK (rating >= 1 AND rating <= 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
ALTER TABLE flights ADD INDEX idx_created_at (created_at);
ALTER TABLE bookings ADD INDEX idx_created_at (created_at);
ALTER TABLE booking_passengers ADD INDEX idx_created_at (created_at);

-- ============================================================================
-- Schema Setup Complete
-- ============================================================================
-- Total Tables: 8
-- Relationships: Foreign Keys dengan CASCADE delete untuk integritas data
-- Engine: InnoDB untuk transaction support
-- Charset: utf8mb4 untuk support emoji & character internasional
-- ============================================================================
