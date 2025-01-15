// Import modul MySQL untuk membuat koneksi ke database
const mysql = require("mysql");

// Import modul dotenv untuk mengakses variabel lingkungan dari file .env
require("dotenv").config();

// Ambil nilai dari variabel lingkungan (environment variables) yang disimpan di file .env
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

// Konfigurasi koneksi ke database menggunakan informasi dari variabel lingkungan
const db = mysql.createConnection({
  host: DB_HOST,       // Host database (contoh: localhost atau alamat server database)
  user: DB_USERNAME,   // Nama pengguna database
  password: DB_PASSWORD, // Kata sandi pengguna database
  database: DB_NAME,   // Nama database yang akan digunakan
});

// Membuat koneksi ke database
db.connect((err) => {
  if (err) {
    // Jika terjadi error saat koneksi, tampilkan pesan error
    console.log("Error connecting " + err.stack);
    return;
  } else {
    // Jika berhasil terhubung, tampilkan pesan sukses
    console.log("Connected to database");
    return;
  }
});

// Ekspor objek db agar dapat digunakan di file lain dalam aplikasi
module.exports = db;
