import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Table from "../components/Table";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// --- Data Dummy ---

interface Simpanan {
  id: number;
  anggota_name: string;
  jumlah: number;
  tanggal: string;
  jenis_simpanan: "pokok" | "wajib" | "sukarela";
}

interface Pinjaman {
  id: number;
  anggota_name: string;
  jumlah: number;
  status: "Lunas" | "Belum Lunas";
  tanggal_peminjaman: string;
}

const DUMMY_DATA_SIMPANAN: Simpanan[] = [
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
];

const DUMMY_DATA_PINJAMAN: Pinjaman[] = [
  { id: 1, anggota_name: "Budi Santoso", jumlah: 1500000, status: "Belum Lunas", tanggal_peminjaman: "2025-09-24" },
  { id: 2, anggota_name: "Citra Dewi", jumlah: 2500000, status: "Belum Lunas", tanggal_peminjaman: "2025-09-23" },
  { id: 3, anggota_name: "Agus Pratama", jumlah: 500000, status: "Lunas", tanggal_peminjaman: "2025-09-20" },
  { id: 4, anggota_name: "Siti Rahayu", jumlah: 1000000, status: "Belum Lunas", tanggal_peminjaman: "2025-09-15" },
  { id: 5, anggota_name: "Joko Susilo", jumlah: 3000000, status: "Belum Lunas", tanggal_peminjaman: "2025-09-10" },
  { id: 6, anggota_name: "Ani Wijaya", jumlah: 750000, status: "Lunas", tanggal_peminjaman: "2025-09-05" },
  { id: 7, anggota_name: "Bambang Kurniawan", jumlah: 1200000, status: "Belum Lunas", tanggal_peminjaman: "2025-09-01" },
];

const DUMMY_DATA_ANGGOTA = [
  { id: 1, name: "Budi Santoso" },
  { id: 2, name: "Citra Dewi" },
  { id: 3, name: "Agus Pratama" },
];

const Dashboard: React.FC = () => {
  const [totalSimpanan, setTotalSimpanan] = useState(0);
  const [totalPinjaman, setTotalPinjaman] = useState(0);
  const [totalAnggota, setTotalAnggota] = useState(0);

  const [simpananTerbaru, setSimpananTerbaru] = useState<Simpanan[]>([]);
  const [pinjamanTerbaru, setPinjamanTerbaru] = useState<Pinjaman[]>([]);

  useEffect(() => {
    // Hitung total dari data dummy
    const sumSimpanan = DUMMY_DATA_SIMPANAN.reduce((acc, curr) => acc + curr.jumlah, 0);
    const sumPinjaman = DUMMY_DATA_PINJAMAN.reduce((acc, curr) => acc + curr.jumlah, 0);

    setTotalSimpanan(sumSimpanan);
    setTotalPinjaman(sumPinjaman);
    setTotalAnggota(DUMMY_DATA_ANGGOTA.length);

    // Ambil 5 data terbaru (berdasarkan tanggal, urutkan dari yang terbaru)
    const sortedSimpanan = [...DUMMY_DATA_SIMPANAN].sort((a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime());
    setSimpananTerbaru(sortedSimpanan.slice(0, 5));

    const sortedPinjaman = [...DUMMY_DATA_PINJAMAN].sort((a, b) => new Date(b.tanggal_peminjaman).getTime() - new Date(a.tanggal_peminjaman).getTime());
    setPinjamanTerbaru(sortedPinjaman.slice(0, 5));
  }, []);

  // Logika untuk data grafik
  const getMonthlyData = (data: any[], dateKey: string) => {
    const monthlyTotals: { [key: string]: number } = {};
    data.forEach(item => {
      const month = item[dateKey].slice(0, 7);
      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }
      monthlyTotals[month] += item.jumlah;
    });
    return monthlyTotals;
  };

  const monthlySimpanan = getMonthlyData(DUMMY_DATA_SIMPANAN, 'tanggal');
  const monthlyPinjaman = getMonthlyData(DUMMY_DATA_PINJAMAN, 'tanggal_peminjaman');

  const allMonths = Array.from(new Set([...Object.keys(monthlySimpanan), ...Object.keys(monthlyPinjaman)])).sort();

  const chartData = {
    labels: allMonths,
    datasets: [
      {
        label: 'Total Simpanan',
        data: allMonths.map(month => monthlySimpanan[month] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Pinjaman',
        data: allMonths.map(month => monthlyPinjaman[month] || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Laporan Keuangan Bulanan',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Jumlah (Rp)'
        },
        ticks: {
          callback: function(value: string | number) {
            return `Rp ${Number(value).toLocaleString('id-ID')}`;
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Bulan'
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 font-poppins">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <Card
              title="Total Anggota"
              value={totalAnggota}
              icon="👥"
              bgColor="bg-blue-500"
            />
            <Card
              title="Total Simpanan"
              value={`Rp ${totalSimpanan.toLocaleString("id-ID")}`}
              icon="💰"
              bgColor="bg-green-500"
            />
            <Card
              title="Total Pinjaman"
              value={`Rp ${totalPinjaman.toLocaleString("id-ID")}`}
              icon="📉"
              bgColor="bg-red-500"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Laporan Keuangan Bulanan</h2>
            <Bar data={chartData} options={chartOptions as any} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 p-6">Simpanan Terbaru</h2>
              <Table
                columns={["Nama Anggota", "Jumlah", "Tanggal", "Jenis Simpanan"]}
                data={simpananTerbaru}
                renderRow={(item: Simpanan) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">{item.anggota_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">Rp {item.jumlah.toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">{item.tanggal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm capitalize text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">{item.jenis_simpanan}</td>
                  </tr>
                )}
              />
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 p-6">Pinjaman Terbaru</h2>
              <Table
                columns={["Nama Anggota", "Jumlah", "Tanggal Pinjam", "Status"]}
                data={pinjamanTerbaru}
                renderRow={(item: Pinjaman) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">{item.anggota_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">Rp {item.jumlah.toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">{item.tanggal_peminjaman}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 capitalize">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === "Lunas"
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                )}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;