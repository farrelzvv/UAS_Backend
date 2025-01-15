// Import express dan router
const express = require("express");
const router = require("./routes/api");  

// Buat objek express
const app = express();

// Menggunakan middleware untuk parsing JSON
app.use(express.json());

// Gunakan router
app.use("/api", router); 

// Tentukan port aplikasi
app.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});
