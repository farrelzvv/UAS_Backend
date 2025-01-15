// Mengimpor controller Pasien untuk menghubungkan rute dengan logika yang sesuai
const PasienController = require("../controllers/PasienController");
// Mengimpor express untuk membuat routing
const express = require("express");
// Membuat router baru dari express
const router = express.Router();

// Rute untuk pasien
// Menampilkan daftar semua pasien
router.get("/patients", PasienController.index);

// Menampilkan detail pasien berdasarkan ID
router.get("/patients/:id", PasienController.show);

// Menambahkan data pasien baru
router.post("/patients", PasienController.store);

// Memperbarui data pasien berdasarkan ID
router.put("/patients/:id", PasienController.update);

// Menghapus data pasien berdasarkan ID
router.delete("/patients/:id", PasienController.destroy);

// Mencari pasien berdasarkan nama
router.get("/patients/search/:name", PasienController.search);

// Menampilkan pasien berdasarkan status (positif, sembuh, dll.)
router.get("/patients/status/:status", PasienController.findByStatus);

// Mengekspor router untuk digunakan di file utama (misalnya, app.js)
module.exports = router;
