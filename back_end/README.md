# 📦 SkyBooking Backend API

## 🛠️ Setup Backend

### 1. Install Dependencies
```bash
cd back_end
npm install
```

### 2. Setup Environment Variables
```bash
cp .env.example .env
```

Edit `.env` dan ubah konfigurasi sesuai kebutuhan:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=sky_booking

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
```

### 3. Setup Database (MySQL)

#### Install MySQL (jika belum ada)
- **Windows**: Download dari [mysql.com](https://dev.mysql.com/downloads/mysql/)
- **macOS**: `brew install mysql`
- **Linux**: `sudo apt-get install mysql-server`

#### CreateDatabase & Import Schema

```bash
# Buat database kosong
mysql -u root -p
> CREATE DATABASE sky_booking;
> EXIT;

# Import schema (MySQL version)
mysql -u root -p sky_booking < database/migrations/001_create_tables_mysql.sql

# Import sample data
mysql -u root -p sky_booking < database/seeds/001_sample_data_mysql.sql
```

### 4. Run Backend Server

**Development Mode** (dengan auto-reload):
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Server akan berjalan di `http://localhost:5000`

---

## 📁 Folder Structure

```
back_end/
├── src/
│   ├── config/              # Konfigurasi (database, env)
│   │   ├── database.js      # MySQL connection pool
│   │   └── index.js         # Config centralized
│   ├── controllers/         # Business logic
│   │   └── authController.js
│   ├── models/              # Database operations
│   │   ├── User.js
│   │   ├── Flight.js
│   │   ├── Airline.js
│   │   └── Airport.js
│   ├── routes/              # API endpoints
│   │   └── authRoutes.js
│   ├── middleware/          # Express middleware
│   │   ├── auth.js          # JWT authentication
│   │   ├── errorHandler.js  # Global error handling
│   │   └── cors.js          # CORS configuration
│   └── utils/               # Helper functions
│       ├── jwt.js           # JWT utilities
│       ├── bcrypt.js        # Password hashing
│       ├── validation.js    # Input validation
│       └── response.js      # Response formatting
├── database/
│   ├── migrations/          # Database schema (MySQL)
│   │   └── 001_create_tables_mysql.sql
│   └── seeds/               # Sample data
│       └── 001_sample_data_mysql.sql
├── server.js                # Main server entry
├── package.json             # Dependencies
├── .env.example             # Environment template
└── .gitignore
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register user baru |
| POST | `/api/auth/login` | ❌ | Login user |
| GET | `/api/auth/me` | ✅ | Get current user |
| PUT | `/api/auth/profile` | ✅ | Update profile |
| POST | `/api/auth/logout` | ✅ | Logout |

### Flights (To be implemented)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/flights` | ❌ | List flights dengan filter |
| GET | `/api/flights/:id` | ❌ | Detail penerbangan |
| GET | `/api/airports` | ❌ | List airports |
| GET | `/api/airlines` | ❌ | List airlines |

### Bookings (To be implemented)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/bookings` | ✅ | Create booking |
| GET | `/api/bookings` | ✅ | List user's bookings |
| GET | `/api/bookings/:id` | ✅ | Booking details |
| DELETE | `/api/bookings/:id` | ✅ | Cancel booking |

---

## 📝 Example Request & Response

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "081234567890",
  "password": "Password123",
  "password_confirm": "Password123",
  "nik": "1234567890123456",
  "birth_date": "1995-05-15",
  "gender": "M",
  "nationality": "Indonesia"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "user_id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "081234567890",
      "nik": "1234567890123456",
      "birth_date": "1995-05-15",
      "gender": "M",
      "nationality": "Indonesia",
      "created_at": "2026-04-17T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcxMzM2MDYwMCwiZXhwIjoxNzEzOTY1NDAwfQ.mV3dC2bQ5kL8nP9wR6sT7uV8xY9z0aB1cD2eF3gH4i"
  }
}
```

### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "user_id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "081234567890",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User
```bash
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "User profile retrieved",
  "data": {
    "user_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "081234567890",
    "address": null,
    "city": null,
    "country": null,
    "postal_code": null,
    "nationality": "Indonesia",
    "role": "user",
    "created_at": "2026-04-17T10:30:00.000Z"
  }
}
```

---

## 🔐 Authentication Flow

Semua protected endpoints memerlukan JWT token di Authorization header:

```
Authorization: Bearer <token>
```

Jika token tidak valid atau expired, akan return 401 Unauthorized.

---

## ⚙️ Tech Stack

- **Express.js** - Web framework
- **MySQL** - Database
- **mysql2** - MySQL driver
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

---

## 🚀 Saat Integrasi Frontend

1. Update `front_end/src/config/index.js`:
   ```javascript
   API_BASE_URL: 'http://localhost:5000',
   USE_MOCK_DATA: false,
   ```

2. Frontend akan otomatis menggunakan API backend

3. Token akan di-store di localStorage dan di-kirim di setiap request

---

## 📌 Next Steps

- [ ] Implement Flights endpoints
- [ ] Implement Bookings endpoints
- [ ] Add input validation middleware
- [ ] Add database migrations
- [ ] Add unit tests
- [ ] Setup logging system
- [ ] Add rate limiting
- [ ] Setup payment gateway integration

---
