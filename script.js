async function simpanData(event) {
    event.preventDefault(); // Supaya halaman tidak refresh

    const dataUser = {
        nama: document.getElementById('nama').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataUser) // Mengirim data ke backend
        });

        const hasil = await response.json();
        alert(hasil.message); // Muncul notif "User berhasil didaftarkan!"
    } catch (err) {
        console.error("Error:", err);
    }
}