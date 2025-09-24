import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Table from "../../components/Table";
import { FaChevronLeft, FaChevronRight, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface Pinjaman {
  id: number;
  anggota_name: string;
  jumlah: number;
  status: "Lunas" | "Belum Lunas";
  tanggal_peminjaman: string;
}

const DUMMY_DATA_PINJAMAN: Pinjaman[] = [
  { id: 1, anggota_name: "Budi Santoso", jumlah: 1500000, status: "Belum Lunas", tanggal_peminjaman: "2025-09-24" },
  { id: 2, anggota_name: "Citra Dewi", jumlah: 2500000, status: "Belum Lunas", tanggal_peminjaman: "2025-09-23" },
  { id: 3, anggota_name: "Agus Pratama", jumlah: 500000, status: "Lunas", tanggal_peminjaman: "2025-09-20" },
  { id: 4, anggota_name: "Siti Rahayu", jumlah: 1000000, status: "Belum Lunas", tanggal_peminjaman: "2025-09-15" },
  { id: 5, anggota_name: "Joko Susilo", jumlah: 3000000, status: "Belum Lunas", tanggal_peminjaman: "2025-09-10" },
  { id: 6, anggota_name: "Ani Wijaya", jumlah: 750000, status: "Lunas", tanggal_peminjaman: "2025-09-05" },
  { id: 7, anggota_name: "Bambang Kurniawan", jumlah: 1200000, status: "Belum Lunas", tanggal_peminjaman: "2025-09-01" },
  { id: 8, anggota_name: "Dewi Puspita", jumlah: 900000, status: "Lunas", tanggal_peminjaman: "2025-08-28" },
  { id: 9, anggota_name: "Hadi Nugroho", jumlah: 2000000, status: "Belum Lunas", tanggal_peminjaman: "2025-08-25" },
  { id: 10, anggota_name: "Eka Setiawan", jumlah: 450000, status: "Lunas", tanggal_peminjaman: "2025-08-20" },
  { id: 11, anggota_name: "Rina Kartika", jumlah: 1800000, status: "Belum Lunas", tanggal_peminjaman: "2025-08-15" },
  { id: 12, anggota_name: "Fajar Maulana", jumlah: 600000, status: "Lunas", tanggal_peminjaman: "2025-08-10" },
  { id: 13, anggota_name: "Gita Lestari", jumlah: 2200000, status: "Belum Lunas", tanggal_peminjaman: "2025-08-05" },
  { id: 14, anggota_name: "Indra Permana", jumlah: 1100000, status: "Belum Lunas", tanggal_peminjaman: "2025-08-01" },
  { id: 15, anggota_name: "Kartika Sari", jumlah: 850000, status: "Lunas", tanggal_peminjaman: "2025-07-28" },
  { id: 16, anggota_name: "Lucky Pratama", jumlah: 2500000, status: "Belum Lunas", tanggal_peminjaman: "2025-07-25" },
  { id: 17, anggota_name: "Winda Agustina", jumlah: 1500000, status: "Belum Lunas", tanggal_peminjaman: "2025-07-20" },
  { id: 18, anggota_name: "Faisal Rahman", jumlah: 500000, status: "Lunas", tanggal_peminjaman: "2025-07-15" },
  { id: 19, anggota_name: "Nurul Hidayah", jumlah: 1000000, status: "Belum Lunas", tanggal_peminjaman: "2025-07-10" },
  { id: 20, anggota_name: "Yoga Saputra", jumlah: 3000000, status: "Lunas", tanggal_peminjaman: "2025-07-05" },
  { id: 21, anggota_name: "Sinta Maharani", jumlah: 750000, status: "Belum Lunas", tanggal_peminjaman: "2025-07-01" },
  { id: 22, anggota_name: "Wahyu Setiawan", jumlah: 1200000, status: "Belum Lunas", tanggal_peminjaman: "2025-06-28" },
  { id: 23, anggota_name: "Dian Permata", jumlah: 900000, status: "Lunas", tanggal_peminjaman: "2025-06-25" },
];

const ITEMS_PER_PAGE = 10;

const PinjamanList: React.FC = () => {
  const [pinjaman, setPinjaman] = useState<Pinjaman[]>([]);
  const [filteredPinjaman, setFilteredPinjaman] = useState<Pinjaman[]>([]);
  const [activeStatus, setActiveStatus] = useState<string>("all");
  const [activePeriod, setActivePeriod] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Pinjaman | null>(null);
  const [formData, setFormData] = useState({
    anggota_name: "",
    jumlah: 0,
    status: "Belum Lunas",
  });

  const today = new Date().toISOString().slice(0, 10);
  const currentMonth = today.slice(0, 7);
  const currentYear = today.slice(0, 4);

  useEffect(() => {
    setPinjaman(DUMMY_DATA_PINJAMAN);
  }, []);

  useEffect(() => {
    let filteredData = pinjaman;

    if (activeStatus !== "all") {
      filteredData = filteredData.filter((item) => item.status === activeStatus);
    }

    if (activePeriod === "harian") {
      filteredData = filteredData.filter((item) => item.tanggal_peminjaman === today);
    } else if (activePeriod === "bulanan") {
      filteredData = filteredData.filter((item) => item.tanggal_peminjaman.slice(0, 7) === currentMonth);
    } else if (activePeriod === "tahunan") {
      filteredData = filteredData.filter((item) => item.tanggal_peminjaman.slice(0, 4) === currentYear);
    }

    setFilteredPinjaman(filteredData);
    setCurrentPage(1);
  }, [activeStatus, activePeriod, pinjaman, today, currentMonth, currentYear]);

  useEffect(() => {
    if (editItem) {
      setFormData({
        anggota_name: editItem.anggota_name,
        jumlah: editItem.jumlah,
        status: editItem.status,
      });
      setShowForm(true);
    } else {
      setFormData({
        anggota_name: "",
        jumlah: 0,
        status: "Belum Lunas",
      });
    }
  }, [editItem]);

  // CRUD Functions
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      // Update existing item
      setPinjaman(
        pinjaman.map((item) =>
          item.id === editItem.id ? { ...item, ...formData, status: formData.status as "Lunas" | "Belum Lunas" } : item
        )
      );
    } else {
      // Add new item
      const newPinjaman: Pinjaman = {
        id: pinjaman.length > 0 ? Math.max(...pinjaman.map((s) => s.id)) + 1 : 1,
        anggota_name: formData.anggota_name,
        jumlah: formData.jumlah,
        tanggal_peminjaman: today,
        status: formData.status as "Lunas" | "Belum Lunas",
      };
      setPinjaman([newPinjaman, ...pinjaman]);
    }
    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item: Pinjaman) => {
    setEditItem(item);
  };

  const handleDelete = (id: number) => {
    setPinjaman(pinjaman.filter((item) => item.id !== id));
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredPinjaman.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredPinjaman.slice(startIndex, endIndex);

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
          className={`h-8 w-8 rounded-full text-sm font-semibold transition-colors duration-200 ${
            i === currentPage
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
              {/* Grup Tombol untuk Status Pinjaman */}
              <div className="flex border border-gray-300 rounded-lg shadow-sm">
                <button
                  onClick={() => setActiveStatus("all")}
                  className={`px-4 py-2 text-sm font-semibold rounded-l-lg transition-colors duration-200 ${
                    activeStatus === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setActiveStatus("Belum Lunas")}
                  className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                    activeStatus === "Belum Lunas"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Belum Lunas
                </button>
                <button
                  onClick={() => setActiveStatus("Lunas")}
                  className={`px-4 py-2 text-sm font-semibold rounded-r-lg transition-colors duration-200 ${
                    activeStatus === "Lunas"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Lunas
                </button>
              </div>

              {/* Dropdown untuk Filter Waktu */}
              <select
                value={activePeriod}
                onChange={(e) => setActivePeriod(e.target.value)}
                className="p-2 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">Semua Waktu</option>
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
              <h2 className="text-2xl font-bold mb-4">{editItem ? "Edit Data Pinjaman" : "Tambah Data Pinjaman Baru"}</h2>
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
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="Belum Lunas">Belum Lunas</option>
                    <option value="Lunas">Lunas</option>
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
              {filteredPinjaman.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <p>Tidak ada data pinjaman untuk periode ini.</p>
                </div>
              ) : (
                <Table
                  columns={["No.", "Nama Anggota", "Jumlah", "Tanggal Pinjam", "Status", "Aksi"]}
                  data={currentItems}
                  renderRow={(item, idx) => {
                    const itemIndex = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
                    return (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-r border-gray-200">{itemIndex}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-b border-r border-gray-200">{item.anggota_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-b border-r border-gray-200">
                          <span className="font-bold text-red-600">Rp {item.jumlah.toLocaleString("id-ID")}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-b border-r border-gray-200">{item.tanggal_peminjaman}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize border-b border-r border-gray-200">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.status === "Lunas"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {item.status}
                          </span>
                        </td>
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
              )}
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

export default PinjamanList;