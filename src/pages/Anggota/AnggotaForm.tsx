import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { FaArrowLeft } from "react-icons/fa";

const AnggotaForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    no_hp: "",
    simpanan_pokok: "",
    simpanan_wajib: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/anggota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        alert("Anggota berhasil ditambahkan");
        setFormData({
          nama: "",
          alamat: "",
          no_hp: "",
          simpanan_pokok: "",
          simpanan_wajib: "",
        });
        navigate("/anggota");
      } else {
        alert("Gagal menambahkan anggota. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menghubungi server.");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Header halaman dengan tombol kembali di kiri */}
          <div className="max-w-4xl mx-auto flex items-center mb-6">
            <button
              onClick={handleGoBack}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
              aria-label="Kembali ke halaman sebelumnya"
            >
              <FaArrowLeft className="mr-2" />
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900 ml-4">Formulir Anggota Baru</h1>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10">
            <p className="text-gray-600 text-center mb-8">
              Lengkapi informasi berikut untuk menambahkan anggota baru ke dalam sistem koperasi.
            </p>
            <form onSubmit={handleSubmit}>
              {/* Layout 2 kolom untuk input formulir */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {/* Kolom Pertama */}
                <div>
                  {/* Input Nama */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nama">Nama Lengkap</label>
                    <input
                      type="text"
                      id="nama"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required
                    />
                  </div>
                  {/* Input Alamat */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="alamat">Alamat Tinggal</label>
                    <input
                      type="text"
                      id="alamat"
                      name="alamat"
                      value={formData.alamat}
                      onChange={handleChange}
                      placeholder="Contoh: Jl. Merdeka No. 123"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required
                    />
                  </div>
                  {/* Input No. HP */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="no_hp">Nomor HP</label>
                    <input
                      type="tel"
                      id="no_hp"
                      name="no_hp"
                      value={formData.no_hp}
                      onChange={handleChange}
                      placeholder="Contoh: 081234567890"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Kolom Kedua */}
                <div>
                  {/* Input Simpanan Pokok */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="simpanan_pokok">Simpanan Pokok (Rp)</label>
                    <input
                      type="number"
                      id="simpanan_pokok"
                      name="simpanan_pokok"
                      value={formData.simpanan_pokok}
                      onChange={handleChange}
                      placeholder="Contoh: 300000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required
                    />
                  </div>
                  {/* Input Simpanan Wajib */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="simpanan_wajib">Simpanan Wajib (Rp)</label>
                    <input
                      type="number"
                      id="simpanan_wajib"
                      name="simpanan_wajib"
                      value={formData.simpanan_wajib}
                      onChange={handleChange}
                      placeholder="Contoh: 100000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Tombol Simpan */}
              <div className="flex justify-end pt-8">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 shadow-lg"
                >
                  Simpan Data Anggota
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnggotaForm;