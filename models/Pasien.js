// Mengimpor koneksi database dari file konfigurasi
const db = require("../config/database");

class Pasien {
  // Menentukan status pasien yang valid sebagai array
  static validStatuses = ["positif", "sembuh", "sembuh"]; // ENUM status_pasien

  // Metode untuk mengambil semua data pasien
  static all() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM pasien"; // Query untuk mengambil semua data dari tabel pasien
      db.query(query, (err, results) => {
        if (err) reject(err); // Jika terjadi error, reject promise
        resolve(results); // Jika berhasil, kembalikan hasil
      });
    });
  }

  // Metode untuk mencari pasien berdasarkan ID
  static findById(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM pasien WHERE id = ?"; // Query untuk mencari pasien berdasarkan ID
      db.query(query, [id], (err, results) => {
        if (err) reject(err); // Jika terjadi error, reject promise
        resolve(results[0]); // Mengembalikan pasien pertama yang ditemukan (ID unik)
      });
    });
  }

  // Metode untuk menambahkan data pasien baru ke database
  static create(data) {
    return new Promise((resolve, reject) => {
      // Memeriksa apakah status pasien valid
      if (!Pasien.validStatuses.includes(data.status_pasien)) {
        reject(new Error("Status pasien tidak valid")); // Jika status tidak valid, reject promise
      }
      const query = "INSERT INTO pasien SET ?"; // Query untuk menambahkan data pasien baru
      db.query(query, data, (err, result) => {
        if (err) reject(err); // Jika terjadi error, reject promise
        resolve(result.insertId); // Mengembalikan ID pasien yang baru ditambahkan
      });
    });
  }

  // Metode untuk memperbarui data pasien berdasarkan ID
  static update(id, data) {
    return new Promise((resolve, reject) => {
      // Memeriksa apakah status pasien valid jika diberikan
      if (data.status_pasien && !Pasien.validStatuses.includes(data.status_pasien)) {
        reject(new Error("Status pasien tidak valid")); // Jika status tidak valid, reject promise
      }
      const query = "UPDATE pasien SET ? WHERE id = ?"; // Query untuk memperbarui data pasien berdasarkan ID
      db.query(query, [data, id], (err, result) => {
        if (err) reject(err); // Jika terjadi error, reject promise
        resolve(result.affectedRows > 0); // Mengembalikan true jika data berhasil diperbarui
      });
    });
  }

  // Metode untuk menghapus data pasien berdasarkan ID
  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM pasien WHERE id = ?"; // Query untuk menghapus pasien berdasarkan ID
      db.query(query, [id], (err, result) => {
        if (err) reject(err); // Jika terjadi error, reject promise
        resolve(result.affectedRows > 0); // Mengembalikan true jika data berhasil dihapus
      });
    });
  }

  // Metode untuk mencari pasien berdasarkan nama
  static search(name) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM pasien WHERE nama LIKE ?"; // Query untuk mencari pasien berdasarkan nama
      db.query(query, [`%${name}%`], (err, results) => {
        if (err) reject(err); // Jika terjadi error, reject promise
        resolve(results); // Mengembalikan hasil pencarian pasien
      });
    });
  }

  // Metode untuk mencari pasien berdasarkan status
  static findByStatus(status) {
    return new Promise((resolve, reject) => {
      // Memeriksa apakah status yang diberikan valid
      if (!Pasien.validStatuses.includes(status)) {
        reject(new Error("Status pasien tidak valid")); // Jika status tidak valid, reject promise
      }
      const query = "SELECT * FROM pasien WHERE status_pasien = ?"; // Query untuk mencari pasien berdasarkan status
      db.query(query, [status], (err, results) => {
        if (err) reject(err); // Jika terjadi error, reject promise
        resolve(results); // Mengembalikan pasien yang ditemukan dengan status yang sesuai
      });
    });
  }
}

// Mengekspor model Pasien untuk digunakan di controller
module.exports = Pasien;
