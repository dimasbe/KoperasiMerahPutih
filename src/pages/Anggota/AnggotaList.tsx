import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { FaEdit, FaTrash, FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Anggota {
  id: number;
  name: string;
  alamat: string;
  gender: string;
}

const DUMMY_ANGGOTA_DATA: Anggota[] = [
  { id: 1, name: "Budi Santoso", alamat: "Jl. Merdeka No. 10, Jakarta", gender: "Laki-laki" },
  { id: 2, name: "Citra Dewi", alamat: "Jl. Sudirman No. 25, Bandung", gender: "Perempuan" },
  { id: 3, name: "Agus Pratama", alamat: "Jl. Diponegoro No. 5, Surabaya", gender: "Laki-laki" },
  { id: 4, name: "Siti Rahayu", alamat: "Jl. Gajah Mada No. 12, Yogyakarta", gender: "Perempuan" },
  { id: 5, name: "Joko Susilo", alamat: "Jl. Veteran No. 8, Semarang", gender: "Laki-laki" },
  { id: 6, name: "Ani Wijaya", alamat: "Jl. Pahlawan No. 33, Malang", gender: "Perempuan" },
  { id: 7, name: "Bambang Kurniawan", alamat: "Jl. Gatot Subroto No. 45, Jakarta", gender: "Laki-laki" },
  { id: 8, name: "Dewi Puspita", alamat: "Jl. Thamrin No. 20, Bandung", gender: "Perempuan" },
  { id: 9, name: "Hadi Nugroho", alamat: "Jl. Brawijaya No. 1, Surabaya", gender: "Laki-laki" },
  { id: 10, name: "Eka Setiawan", alamat: "Jl. Malioboro No. 7, Yogyakarta", gender: "Laki-laki" },
  { id: 11, name: "Fajar Maulana", alamat: "Jl. A. Yani No. 100, Makassar", gender: "Laki-laki" },
  { id: 12, name: "Gita Lestari", alamat: "Jl. Hayam Wuruk No. 50, Denpasar", gender: "Perempuan" },
  { id: 13, name: "Indra Permana", alamat: "Jl. Imam Bonjol No. 22, Medan", gender: "Laki-laki" },
  { id: 14, name: "Kartika Sari", alamat: "Jl. Sudirman No. 77, Palembang", gender: "Perempuan" },
  { id: 15, name: "Lucky Pratama", alamat: "Jl. Sisingamangaraja No. 88, Medan", gender: "Laki-laki" },
];

const ITEMS_PER_PAGE = 10;

const AnggotaList: React.FC = () => {
  const [anggota, setAnggota] = useState<Anggota[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setAnggota(DUMMY_ANGGOTA_DATA);
  }, []);

  // Logika Paginasi
  const totalPages = Math.ceil(anggota.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = anggota.slice(startIndex, endIndex);

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

  const handleDelete = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
      setAnggota(anggota.filter(item => item.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    // Logika untuk mengedit data
    console.log(`Mengedit anggota dengan ID: ${id}`);
    // Contoh: navigate(`/anggota-form/${id}`);
  };

  const handleAdd = () => {
    navigate("/anggota-form");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Daftar Anggota</h1>
            <button
              onClick={handleAdd}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
              <FaPlus className="mr-2" /> Tambah Anggota
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">No.</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Alamat</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Gender</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((item, idx) => {
                  const itemIndex = startIndex + idx + 1;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{itemIndex}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.alamat}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                          aria-label={`Edit ${item.name}`}
                        >
                          <FaEdit size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                          aria-label={`Hapus ${item.name}`}
                        >
                          <FaTrash size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
  );
};

export default AnggotaList;