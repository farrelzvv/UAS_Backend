// Import express dan router
const express = require("express");
const router = require("./routes/api");  // Pastikan path ini sesuai dengan struktur folder Anda

// Buat objek express
const app = express();

// Gunakan middleware untuk parsing JSON
app.use(express.json());

// Gunakan router
app.use("/api", router);  // Pastikan Anda menambahkan prefix '/api'

// Tentukan port aplikasi
app.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});
