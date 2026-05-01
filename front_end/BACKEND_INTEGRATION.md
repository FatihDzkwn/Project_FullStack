# 📚 Dokumentasi Integrasi Backend

## SkyBooking - Flight Booking Website

Website booking tiket pesawat yang dibangun dengan React.js dan Bulma CSS. 
Document ini dibuat untuk memudahkan tim backend melakukan integrasi.

**Status**: ✅ Frontend sudah selesai, siap untuk integrasi backend.

---

## 🛠️ Tech Stack

### Frontend (Sudah dibuat)
- **Framework**: React 18.3.1 (via Vite)
- **CSS Framework**: Bulma 1.0.4
- **Routing**: react-router-dom 7.13.1
- **State Management**: React Context API

### Backend (Yang Diperlukan)
- **Rekomendasi**: Node.js + Express atau Laravel
- **Database**: MySQL / PostgreSQL / MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: bcrypt

---

## 📁 File Penting untuk Backend

```
front_end/src/
├── config/index.js      ⚠️ UBAH API_BASE_URL & USE_MOCK_DATA
├── services/api.js      ⚠️ Semua API calls, hapus mock handler
├── context/AuthContext.jsx  🔍 Lihat flow autentikasi
└── utils/security.js    ℹ️ Validasi & sanitasi
```

---

## ⚙️ Cara Integrasi

### Langkah 1: Update Config

```javascript
// src/config/index.js

// UBAH INI:
API_BASE_URL: 'http://localhost:5000',  // URL backend kamu
USE_MOCK_DATA: false,                    // ⚠️ WAJIB false!
```

### Langkah 2: Hapus Mock Handler

Di `src/services/api.js`, hapus fungsi `handleMockRequest()` dan block:
```javascript
// HAPUS block ini di apiRequest():
if (config.USE_MOCK_DATA) {
  // ... simulasi
  return handleMockRequest(endpoint, options);
}
```

---

## 🔌 API Endpoints yang Diperlukan

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | ❌ | Register user baru |
| POST | /api/auth/login | ❌ | Login user |
| GET | /api/auth/me | ✅ | Get current user |
| POST | /api/auth/logout | ✅ | Logout |

### Flights
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/flights | ❌ | List dengan filter |
| GET | /api/flights/:id | ❌ | Detail penerbangan |
| GET | /api/airports | ❌ | List bandara |
| GET | /api/airlines | ❌ | List maskapai |

### Bookings
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/bookings | ✅ | Buat booking |
| GET | /api/bookings | ✅ | List booking user |
| GET | /api/bookings/:id | ✅ | Detail booking |
| DELETE | /api/bookings/:id | ✅ | Cancel booking |

---

## 📝 Request & Response Format

### 1. POST /api/auth/register

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "081234567890"
}
```

**Response (201):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "Email sudah terdaftar"
}
```

---

### 2. POST /api/auth/login

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### 3. GET /api/auth/me

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 4. GET /api/flights

**Query Parameters:**
```
?from=CGK&to=DPS&date=2024-01-20&passengers=2&class=economy
```

| Param | Type | Required | Example |
|-------|------|----------|---------|
| from | string | ✅ | CGK |
| to | string | ✅ | DPS |
| date | string | ✅ | 2024-01-20 |
| passengers | number | ✅ | 2 |
| class | string | ❌ | economy |

**Response (200):**
```json
{
  "success": true,
  "flights": [
    {
      "id": "FL001",
      "airline": {
        "code": "GA",
        "name": "Garuda Indonesia",
        "logo": "https://..."
      },
      "flightNumber": "GA-123",
      "departure": {
        "airport": "CGK",
        "city": "Jakarta",
        "time": "08:00",
        "terminal": "3"
      },
      "arrival": {
        "airport": "DPS",
        "city": "Bali",
        "time": "10:45",
        "terminal": "D"
      },
      "duration": "2j 45m",
      "price": 1500000,
      "class": "economy",
      "seatsAvailable": 45,
      "amenities": ["wifi", "meals", "entertainment"]
    }
  ]
}
```

---

### 5. GET /api/flights/:id

**Response (200):**
```json
{
  "success": true,
  "flight": {
    "id": "FL001",
    "airline": { "code": "GA", "name": "Garuda Indonesia", "logo": "..." },
    "flightNumber": "GA-123",
    "departure": { "airport": "CGK", "city": "Jakarta", "time": "08:00" },
    "arrival": { "airport": "DPS", "city": "Bali", "time": "10:45" },
    "duration": "2j 45m",
    "price": 1500000,
    "class": "economy",
    "seatsAvailable": 45,
    "amenities": ["wifi", "meals", "entertainment"],
    "aircraft": "Boeing 737-800",
    "baggage": { "cabin": "7 kg", "checked": "20 kg" },
    "refundable": true,
    "reschedule": true
  }
}
```

---

### 6. POST /api/bookings

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "flightId": "FL001",
  "passengers": [
    {
      "title": "Mr",
      "firstName": "John",
      "lastName": "Doe",
      "idNumber": "3201234567890001",
      "idType": "ktp"
    }
  ],
  "contactInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "081234567890"
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "booking": {
    "id": "BK1705312200000",
    "bookingCode": "ABC123",
    "userId": "user-uuid",
    "flight": { "..." },
    "passengers": [ "..." ],
    "contactInfo": { "..." },
    "totalPrice": 1500000,
    "status": "confirmed",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 7. GET /api/bookings

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "bookings": [
    {
      "id": "BK1705312200000",
      "bookingCode": "ABC123",
      "flight": {
        "flightNumber": "GA-123",
        "departure": { "city": "Jakarta", "time": "08:00" },
        "arrival": { "city": "Bali", "time": "10:45" }
      },
      "totalPrice": 1500000,
      "status": "confirmed",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### 8. GET /api/airports

**Response (200):**
```json
{
  "success": true,
  "airports": [
    { "code": "CGK", "city": "Jakarta", "name": "Soekarno-Hatta" },
    { "code": "DPS", "city": "Bali", "name": "Ngurah Rai" },
    { "code": "SUB", "city": "Surabaya", "name": "Juanda" }
  ]
}
```

---

### 9. GET /api/airlines

**Response (200):**
```json
{
  "success": true,
  "airlines": [
    { "code": "GA", "name": "Garuda Indonesia", "logo": "..." },
    { "code": "JT", "name": "Lion Air", "logo": "..." },
    { "code": "QG", "name": "Citilink", "logo": "..." }
  ]
}
```

---

## 🔐 Security Checklist

### WAJIB Implement di Backend:

- [ ] **Password Hashing** dengan bcrypt (salt rounds: 10+)
- [ ] **JWT Token** dengan expiry 7 hari
- [ ] **Input Validation** untuk semua endpoint
- [ ] **SQL Injection Prevention** dengan parameterized queries
- [ ] **Rate Limiting** max 5 login attempts per 15 menit
- [ ] **CORS** set allowed origins
- [ ] **HTTPS** di production

### Contoh bcrypt (Node.js):
```javascript
const bcrypt = require('bcrypt');

// Register - hash password
const hashedPassword = await bcrypt.hash(password, 10);

// Login - verify password
const isValid = await bcrypt.compare(password, hashedPassword);
```

### Contoh JWT (Node.js):
```javascript
const jwt = require('jsonwebtoken');

// Generate token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verify token (middleware)
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

---

## 🗄️ Database Schema

### users
```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### airports
```sql
CREATE TABLE airports (
  code VARCHAR(3) PRIMARY KEY,
  city VARCHAR(100) NOT NULL,
  name VARCHAR(200) NOT NULL
);
```

### airlines
```sql
CREATE TABLE airlines (
  code VARCHAR(3) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  logo VARCHAR(500)
);
```

### flights
```sql
CREATE TABLE flights (
  id VARCHAR(36) PRIMARY KEY,
  airline_code VARCHAR(3) REFERENCES airlines(code),
  flight_number VARCHAR(10) NOT NULL,
  departure_airport VARCHAR(3) REFERENCES airports(code),
  arrival_airport VARCHAR(3) REFERENCES airports(code),
  departure_time TIME NOT NULL,
  arrival_time TIME NOT NULL,
  duration VARCHAR(20),
  price DECIMAL(12, 2) NOT NULL,
  class ENUM('economy', 'business') DEFAULT 'economy',
  seats_available INT DEFAULT 0,
  aircraft VARCHAR(50),
  amenities JSON
);
```

### bookings
```sql
CREATE TABLE bookings (
  id VARCHAR(36) PRIMARY KEY,
  booking_code VARCHAR(6) UNIQUE NOT NULL,
  user_id VARCHAR(36) REFERENCES users(id),
  flight_id VARCHAR(36) REFERENCES flights(id),
  total_price DECIMAL(12, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  contact_name VARCHAR(100),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### passengers
```sql
CREATE TABLE passengers (
  id VARCHAR(36) PRIMARY KEY,
  booking_id VARCHAR(36) REFERENCES bookings(id) ON DELETE CASCADE,
  title ENUM('Mr', 'Mrs', 'Ms') NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  id_number VARCHAR(20) NOT NULL,
  id_type ENUM('ktp', 'passport') DEFAULT 'ktp'
);
```

---

## 🚀 Cara Test

### 1. Jalankan Backend
```bash
# Contoh Node.js
npm start
# Server running di http://localhost:5000
```

### 2. Update Frontend Config
```javascript
// src/config/index.js
API_BASE_URL: 'http://localhost:5000',
USE_MOCK_DATA: false,
```

### 3. Jalankan Frontend
```bash
npm run dev
```

### 4. Test Flow
1. Register user baru
2. Login dengan user tersebut
3. Search penerbangan
4. Pilih penerbangan → Booking
5. Cek My Bookings

---

## ❓ FAQ

**Q: Kok format response berbeda?**
A: Pastikan response selalu punya `success: boolean` dan data sesuai format di atas.

**Q: Token dikirim kemana?**
A: Frontend akan kirim di header `Authorization: Bearer <token>` untuk endpoint yang butuh auth.

**Q: Error handling?**
A: Return `{ success: false, message: "..." }` dengan HTTP status code yang sesuai.

---

## 📞 Kontak

Ada pertanyaan? Hubungi frontend developer:
- Baca kode di `src/services/api.js` untuk melihat endpoint yang dipanggil
- Cek `src/config/index.js` untuk konfigurasi

---

**Last Updated**: Dokumen ini dibuat untuk memudahkan integrasi tim backend.
