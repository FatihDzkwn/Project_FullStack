app.use(express.json()); // Wajib ada agar backend bisa baca kiriman dari React
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
        // Jika token ada, lanjut ke Controller
        next(); 
    } else {
        // Jika tidak ada, stop di sini & kirim error
        res.status(401).json({ message: "Kamu belum login!" });
    }
};