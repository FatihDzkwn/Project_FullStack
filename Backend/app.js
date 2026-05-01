const express = require('express');
const app = express();
const cors = require('cors'); // Pastikan sudah install cors: npm install cors
const bookingRouter = require('./routers/bookingRoutes'); // Pastikan nama file di folder 'routers' sama

// Middleware
app.use(cors());
app.use(express.json()); // Supaya bisa baca data dari Postman/React

// Gunakan Router SkyBooking
app.use(bookingRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server SkyBooking jalan di port ${PORT}`);
});