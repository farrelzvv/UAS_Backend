// Import model Pasien untuk mengakses metode yang berhubungan dengan database
const Pasien = require("../models/Pasien");

// Definisi kelas controller untuk mengelola operasi terkait data pasien
class PasienController {
  
  // Metode untuk menampilkan semua data pasien
  async index(req, res) {
    try {
      const pasiens = await Pasien.all(); // Mengambil semua data pasien dari database
      res.json({ message: "Menampilkan data pasien", data: pasiens });
    } catch (error) {
      res.status(500).json({ message: "Error mendapatkan data pasien", error: error.message });
    }
  }

  // Metode untuk menampilkan data pasien berdasarkan ID
  async show(req, res) {
    const { id } = req.params; // Mendapatkan ID dari parameter URL
    try {
      const pasien = await Pasien.findById(id); // Mencari data pasien berdasarkan ID
      if (!pasien) {
        return res.status(404).json({ message: `Pasien dengan ID ${id} tidak ditemukan` });
      }
      res.json({ message: `Menampilkan data pasien dengan ID ${id}`, data: pasien });
    } catch (error) {
      res.status(500).json({ message: "Error mendapatkan data pasien", error: error.message });
    }
  }

  // Metode untuk menambahkan data pasien baru
  async store(req, res) {
    const { nama, nohp_pasien, alamat_pasien, status_pasien, tanggal_masuk, tanggal_keluar } = req.body;
    try {
      const pasienId = await Pasien.create({ nama, nohp_pasien, alamat_pasien, status_pasien, tanggal_masuk, tanggal_keluar }); // Menambahkan data ke database
      res.status(201).json({
        message: "Menambahkan data pasien baru",
        data: { id: pasienId, nama, nohp_pasien, alamat_pasien, status_pasien, tanggal_masuk, tanggal_keluar }
      });
    } catch (error) {
      res.status(500).json({ message: "Error menambahkan data pasien", error: error.message });
    }
  }

  // Metode untuk memperbarui data pasien berdasarkan ID
  async update(req, res) {
    const { id } = req.params; // Mendapatkan ID dari parameter URL
    const { nama, nohp_pasien, alamat_pasien, status_pasien, tanggal_masuk, tanggal_keluar } = req.body;
    try {
      const updated = await Pasien.update(id, { nama, nohp_pasien, alamat_pasien, status_pasien, tanggal_masuk, tanggal_keluar }); // Memperbarui data pasien
      if (!updated) {
        return res.status(404).json({ message: `Pasien dengan ID ${id} tidak ditemukan` });
      }
      res.json({
        message: `Memperbarui data pasien dengan ID ${id}`,
        data: { id, nama, nohp_pasien, alamat_pasien, status_pasien, tanggal_masuk, tanggal_keluar }
      });
    } catch (error) {
      res.status(500).json({ message: "Error memperbarui data pasien", error: error.message });
    }
  }

  // Metode untuk menghapus data pasien berdasarkan ID
  async destroy(req, res) {
    const { id } = req.params; // Mendapatkan ID dari parameter URL
    try {
      const deleted = await Pasien.delete(id); // Menghapus data pasien dari database
      if (!deleted) {
        return res.status(404).json({ message: `Pasien dengan ID ${id} tidak ditemukan` });
      }
      res.json({ message: `Menghapus data pasien dengan ID ${id}` });
    } catch (error) {
      res.status(500).json({ message: "Error menghapus data pasien", error: error.message });
    }
  }

  // Metode untuk mencari pasien berdasarkan nama
  async search(req, res) {
    const { name } = req.params; // Mendapatkan nama dari parameter URL
    try {
      const results = await Pasien.search(name); // Melakukan pencarian pasien berdasarkan nama
      res.json({ message: `Hasil pencarian pasien dengan nama '${name}'`, data: results });
    } catch (error) {
      res.status(500).json({ message: "Error pencarian data pasien", error: error.message });
    }
  }

  // Metode untuk mencari pasien berdasarkan status
  async findByStatus(req, res) {
    const { status } = req.params; // Mendapatkan status dari parameter URL
    try {
      const results = await Pasien.findByStatus(status); // Mengambil pasien berdasarkan status
      res.json({ message: `Menampilkan pasien dengan status '${status}'`, data: results });
    } catch (error) {
      res.status(500).json({ message: "Error mendapatkan data pasien", error: error.message });
    }
  }
}

// Mengekspor instance dari PasienController agar dapat digunakan di route
module.exports = new PasienController();
