const express = require('express');
const cors = require('cors');
const { config, db } = require('./config'); 

const app = express();

// --- 1. MIDDLEWARE ---
app.use(cors());
app.use(express.json()); 

// --- 2. API ROUTES ---

// Health Check
app.get('/api/health', (req, res) => res.send(`Server ${config.APP_NAME} berjalan!`));

// --- AUTHENTICATION ---

// Registrasi User
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Data tidak lengkap!" });

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, password], (err, result) => {
        if (err) return res.status(500).json({ message: "Gagal simpan user", error: err.message });
        res.status(201).json({ message: "User terdaftar!", userId: result.insertId });
    });
});

// Login User
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT id, name, email FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ message: "Error server" });
        if (results.length > 0) res.json({ message: "Login Berhasil!", user: results[0] });
        else res.status(401).json({ message: "Email/Password salah!" });
    });
});

// Logout User
app.post('/api/auth/logout', (req, res) => res.json({ message: "Logout berhasil!" }));

// --- FLIGHTS ---

// Ambil Semua Penerbangan
app.get('/api/flights', (req, res) => {
    db.query("SELECT * FROM flights", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: results });
    });
});

// Cari Penerbangan (Berdasarkan Airport & Tanggal Opsional)
app.get('/api/flights/search', (req, res) => {
    const { from, to, date } = req.query;
    let query = "SELECT * FROM flights WHERE departure_airport = ? AND arrival_airport = ?";
    let params = [from, to];
    if (date) { query += " AND DATE(departure_time) = ?"; params.push(date); }

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: results.length > 0 ? "Ditemukan" : "Tidak tersedia", data: results });
    });
});

// Detail Penerbangan (ID Angka)
app.get('/api/flights/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM flights WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        results.length > 0 ? res.json({ data: results[0] }) : res.status(404).json({ message: "Tidak ditemukan" });
    });
});

// --- BOOKINGS ---

// Konfirmasi Pemesanan (Mendukung data Flight & Passengers sesuai Postman)
app.post('/api/bookings/confirm', (req, res) => {
    const { flight, passengers, contact, totalPrice } = req.body;

    if (!flight || !passengers || !contact) {
        return res.status(400).json({ message: "Data booking tidak lengkap!" });
    }

    const bookingCode = 'SKY' + Math.floor(100 + Math.random() * 900);
    const queryBooking = `
        INSERT INTO bookings 
        (booking_code, user_id, flight_id, total_price, status, contact_name, contact_email, contact_phone) 
        VALUES (?, ?, ?, ?, 'confirmed', ?, ?, ?)
    `;
    
    const valuesBooking = [bookingCode, 1, flight.id, totalPrice, contact.name, contact.email, contact.phone];

    db.query(queryBooking, valuesBooking, (err, result) => {
        if (err) return res.status(500).json({ message: "Gagal menyimpan booking", error: err.message });

        const bookingId = result.insertId;
        const queryPassenger = "INSERT INTO passengers (booking_id, name, email, phone, seat_number) VALUES ?";
        const passengerData = passengers.map(p => [bookingId, p.name, p.email, p.phone, p.seatNumber]);

        db.query(queryPassenger, [passengerData], (err) => {
            if (err) return res.status(201).json({ message: "Booking sukses, data penumpang gagal", bookingId });
            res.status(201).json({
                message: "Booking Berhasil Konfirmasi!",
                bookingCode: bookingCode,
                bookingId: bookingId
            });
        });
    });
});

// --- USERS ---

// Update Profile
app.put('/api/users/profile', (req, res) => {
    const { id, name, email, phone } = req.body;
    if (!id) return res.status(400).json({ message: "User ID wajib disertakan!" });

    const query = "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?";
    db.query(query, [name, email, phone, id], (err, result) => {
        if (err) return res.status(500).json({ message: "Gagal update profil", error: err.message });
        result.affectedRows > 0 ? res.json({ message: "Profil berhasil diperbarui!" }) : res.status(404).json({ message: "User tidak ditemukan" });
    });
});

// Change Password
app.put('/api/users/change-password', (req, res) => {
    const { id, oldPassword, newPassword } = req.body;
    if (!id || !oldPassword || !newPassword) return res.status(400).json({ message: "Data tidak lengkap!" });

    const checkQuery = "SELECT password FROM users WHERE id = ?";
    db.query(checkQuery, [id], (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });
        
        if (results.length > 0 && results[0].password === oldPassword) {
            const updateQuery = "UPDATE users SET password = ? WHERE id = ?";
            db.query(updateQuery, [newPassword, id], (err) => {
                if (err) return res.status(500).json({ message: "Gagal ganti password" });
                res.json({ message: "Password berhasil diganti!" });
            });
        } else {
            res.status(401).json({ message: "Password lama salah atau user tidak ditemukan!" });
        }
    });
});

// Tambahkan ini di bagian akhir sebelum app.listen
// Ini hanya untuk keperluan tes koneksi dari frontend (Vite)
app.get('/api/users', (req, res) => {
    db.query("SELECT id, name, email FROM users", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


// --- 3. JALANKAN SERVER ---
app.listen(config.PORT, () => {
    console.log(`Server ${config.APP_NAME} jalan di http://localhost:${config.PORT}`);
});
