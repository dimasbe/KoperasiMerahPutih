import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import { FaChevronLeft, FaChevronRight, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface Simpanan {
  id: number;
  anggota_name: string;
  jumlah: number;
  tanggal: string;
  jenis_simpanan: "pokok" | "wajib" | "sukarela";
}

const DUMMY_DATA: Simpanan[] = [
  { id: 1, anggota_name: "Budi Santoso", jumlah: 300000, tanggal: "2025-09-24", jenis_simpanan: "pokok" },
  { id: 2, anggota_name: "Citra Dewi", jumlah: 100000, tanggal: "2025-09-24", jenis_simpanan: "wajib" },
  { id: 3, anggota_name: "Agus Pratama", jumlah: 50000, tanggal: "2025-09-23", jenis_simpanan: "sukarela" },
  { id: 4, anggota_name: "Budi Santoso", jumlah: 100000, tanggal: "2025-09-20", jenis_simpanan: "wajib" },
  { id: 5, anggota_name: "Citra Dewi", jumlah: 25000, tanggal: "2025-09-15", jenis_simpanan: "sukarela" },
  { id: 6, anggota_name: "Agus Pratama", jumlah: 100000, tanggal: "2025-08-10", jenis_simpanan: "wajib" },
  { id: 7, anggota_name: "Budi Santoso", jumlah: 75000, tanggal: "2025-07-28", jenis_simpanan: "sukarela" },
  { id: 8, anggota_name: "Citra Dewi", jumlah: 100000, tanggal: "2024-09-01", jenis_simpanan: "wajib" },
  { id: 9, anggota_name: "Agus Pratama", jumlah: 100000, tanggal: "2024-08-20", jenis_simpanan: "wajib" },
  { id: 10, anggota_name: "Budi Santoso", jumlah: 50000, tanggal: "2024-07-11", jenis_simpanan: "sukarela" },
  { id: 11, anggota_name: "Siti Rahayu", jumlah: 100000, tanggal: "2025-09-24", jenis_simpanan: "wajib" },
  { id: 12, anggota_name: "Joko Susilo", jumlah: 20000, tanggal: "2025-09-23", jenis_simpanan: "sukarela" },
  { id: 13, anggota_name: "Ani Wijaya", jumlah: 100000, tanggal: "2025-09-20", jenis_simpanan: "wajib" },
  { id: 14, anggota_name: "Bambang Kurniawan", jumlah: 100000, tanggal: "2025-09-15", jenis_simpanan: "wajib" },
  { id: 15, anggota_name: "Dewi Puspita", jumlah: 45000, tanggal: "2025-09-10", jenis_simpanan: "sukarela" },
  { id: 16, anggota_name: "Hadi Nugroho", jumlah: 100000, tanggal: "2025-09-05", jenis_simpanan: "wajib" },
  { id: 17, anggota_name: "Eka Setiawan", jumlah: 15000, tanggal: "2025-09-01", jenis_simpanan: "sukarela" },
  { id: 18, anggota_name: "Rina Kartika", jumlah: 100000, tanggal: "2025-08-28", jenis_simpanan: "wajib" },
  { id: 19, anggota_name: "Fajar Maulana", jumlah: 30000, tanggal: "2025-08-25", jenis_simpanan: "sukarela" },
  { id: 20, anggota_name: "Gita Lestari", jumlah: 100000, tanggal: "2025-08-20", jenis_simpanan: "wajib" },
  { id: 21, anggota_name: "Indra Permana", jumlah: 100000, tanggal: "2025-08-15", jenis_simpanan: "wajib" },
  { id: 22, anggota_name: "Kartika Sari", jumlah: 25000, tanggal: "2025-08-10", jenis_simpanan: "sukarela" },
  { id: 23, anggota_name: "Lucky Pratama", jumlah: 100000, tanggal: "2025-08-05", jenis_simpanan: "wajib" },
];

const ITEMS_PER_PAGE = 10;

const SimpananList: React.FC = () => {
  const [simpanan, setSimpanan] = useState<Simpanan[]>([]);
  const [filteredSimpanan, setFilteredSimpanan] = useState<Simpanan[]>([]);
  const [activeType, setActiveType] = useState<string>("all");
  const [activePeriod, setActivePeriod] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Simpanan | null>(null);
  const [formData, setFormData] = useState({
    anggota_name: "",
    jumlah: 0,
    jenis_simpanan: "wajib",
  });

  const today = new Date().toISOString().slice(0, 10);
  const currentMonth = today.slice(0, 7);
  const currentYear = today.slice(0, 4);

  useEffect(() => {
    setSimpanan(DUMMY_DATA);
  }, []);

  useEffect(() => {
    let filteredData = simpanan;

    if (activeType !== "all") {
      filteredData = filteredData.filter((item) => item.jenis_simpanan === activeType);
    }

    if (activePeriod === "harian") {
      filteredData = filteredData.filter((item) => item.tanggal === today);
    } else if (activePeriod === "bulanan") {
      filteredData = filteredData.filter((item) => item.tanggal.slice(0, 7) === currentMonth);
    } else if (activePeriod === "tahunan") {
      filteredData = filteredData.filter((item) => item.tanggal.slice(0, 4) === currentYear);
    }

    setFilteredSimpanan(filteredData);
    setCurrentPage(1);
  }, [activeType, activePeriod, simpanan, today, currentMonth, currentYear]);

  // Handle Edit/Update
  useEffect(() => {
    if (editItem) {
      setFormData({
        anggota_name: editItem.anggota_name,
        jumlah: editItem.jumlah,
        jenis_simpanan: editItem.jenis_simpanan,
      });
      setShowForm(true);
    } else {
      setFormData({
        anggota_name: "",
        jumlah: 0,
        jenis_simpanan: "wajib",
      });
    }
  }, [editItem]);

  // CRUD Functions
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      // Update existing item
      setSimpanan(
        simpanan.map((item) =>
          item.id === editItem.id ? { ...item, ...formData, jenis_simpanan: formData.jenis_simpanan as "pokok" | "wajib" | "sukarela" } : item
        )
      );
    } else {
      // Add new item
      const newSimpanan: Simpanan = {
        id: simpanan.length > 0 ? Math.max(...simpanan.map((s) => s.id)) + 1 : 1,
        anggota_name: formData.anggota_name,
        jumlah: formData.jumlah,
        tanggal: today,
        jenis_simpanan: formData.jenis_simpanan as "pokok" | "wajib" | "sukarela", // Add type assertion here
      };
      setSimpanan([newSimpanan, ...simpanan]);
    }
    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item: Simpanan) => {
    setEditItem(item);
  };

  const handleDelete = (id: number) => {
    setSimpanan(simpanan.filter((item) => item.id !== id));
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredSimpanan.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredSimpanan.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`h-8 w-8 rounded-full text-sm font-semibold transition-colors duration-200 ${i === currentPage
            ? "bg-blue-600 text-white"
            : "bg-transparent text-gray-700 hover:bg-gray-200"
            }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              {/* Grup Tombol untuk Jenis Simpanan */}
              <div className="flex border border-gray-300 rounded-lg shadow-sm">
                <button
                  onClick={() => setActiveType("all")}
                  className={`px-4 py-2 text-sm font-semibold rounded-l-lg transition-colors duration-200 ${activeType === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setActiveType("pokok")}
                  className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${activeType === "pokok"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  Pokok
                </button>
                <button
                  onClick={() => setActiveType("wajib")}
                  className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${activeType === "wajib"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  Wajib
                </button>
                <button
                  onClick={() => setActiveType("sukarela")}
                  className={`px-4 py-2 text-sm font-semibold rounded-r-lg transition-colors duration-200 ${activeType === "sukarela"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  Sukarela
                </button>
              </div>

              {/* Dropdown untuk Filter Waktu */}
              <select
                value={activePeriod}
                onChange={(e) => setActivePeriod(e.target.value)}
                className="p-2 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">Semua</option>
                <option value="harian">Harian</option>
                <option value="bulanan">Bulanan</option>
                <option value="tahunan">Tahunan</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditItem(null);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <FaPlus />
                <span>Tambah Data</span>
              </button>
            </div>
          </div>

          {showForm && (
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
              <h2 className="text-2xl font-bold mb-4">{editItem ? "Edit Data Simpanan" : "Tambah Data Simpanan Baru"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama Anggota</label>
                  <input
                    type="text"
                    required
                    value={formData.anggota_name}
                    onChange={(e) => setFormData({ ...formData, anggota_name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Jumlah (Rp)</label>
                  <input
                    type="number"
                    required
                    value={formData.jumlah}
                    onChange={(e) => setFormData({ ...formData, jumlah: parseInt(e.target.value) || 0 })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Jenis Simpanan</label>
                  <select
                    value={formData.jenis_simpanan}
                    onChange={(e) => setFormData({ ...formData, jenis_simpanan: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="pokok">Pokok</option>
                    <option value="wajib">Wajib</option>
                    <option value="sukarela">Sukarela</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditItem(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700"
                  >
                    {editItem ? "Update" : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200">
            <div className="overflow-x-auto">
              <Table
                columns={["No.", "Nama Anggota", "Jumlah", "Tanggal", "Jenis Simpanan", "Aksi"]}
                data={currentItems}
                renderRow={(item, idx) => {
                  const itemIndex = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-r border-gray-200">{itemIndex}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-b border-r border-gray-200">{item.anggota_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-b border-r border-gray-200">
                        <span className="font-bold text-green-600">Rp {item.jumlah.toLocaleString("id-ID")}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-b border-r border-gray-200">{item.tanggal}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize border-b border-r border-gray-200">{item.jenis_simpanan}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-600 hover:text-blue-900"
                            aria-label="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-900"
                            aria-label="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }}
              />
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 flex justify-end items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Halaman sebelumnya"
                >
                  <FaChevronLeft />
                </button>

                {renderPageNumbers()}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Halaman berikutnya"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpananList;