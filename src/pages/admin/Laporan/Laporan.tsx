import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Laporan: React.FC = () => {
  const [allSimpananData, setAllSimpananData] = useState<Simpanan[]>([]);
  const [chartPeriod, setChartPeriod] = useState<"bulanan" | "tahunan">("bulanan");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const componentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setAllSimpananData(DUMMY_DATA);
    const today = new Date();
    setSelectedMonth(today.toISOString().slice(0, 7));
    setSelectedYear(today.getFullYear().toString());
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Laporan Simpanan Koperasi",
  });

  const processChartData = () => {
    let filteredData = allSimpananData;

    if (chartPeriod === "bulanan" && selectedMonth) {
      filteredData = filteredData.filter(item => item.tanggal.startsWith(selectedMonth));
    } else if (chartPeriod === "tahunan" && selectedYear) {
      filteredData = filteredData.filter(item => item.tanggal.startsWith(selectedYear));
    }

    const aggregatedData = filteredData.reduce((acc: { [key: string]: number }, curr) => {
      acc[curr.jenis_simpanan] = (acc[curr.jenis_simpanan] || 0) + curr.jumlah;
      return acc;
    }, {});

    return Object.entries(aggregatedData).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
  };

  const processTableData = () => {
    let filteredData = allSimpananData;

    if (chartPeriod === "bulanan" && selectedMonth) {
      filteredData = filteredData.filter(item => item.tanggal.startsWith(selectedMonth));
    } else if (chartPeriod === "tahunan" && selectedYear) {
      filteredData = filteredData.filter(item => item.tanggal.startsWith(selectedYear));
    }

    const aggregatedData = filteredData.reduce((acc: { [key: string]: number }, curr) => {
      acc[curr.anggota_name] = (acc[curr.anggota_name] || 0) + curr.jumlah;
      return acc;
    }, {});

    const totalSimpanan = Object.values(aggregatedData).reduce((sum, value) => sum + value, 0);

    return {
      tableData: Object.entries(aggregatedData).map(([name, value]) => ({
        anggota_name: name,
        total_simpanan: value,
      })),
      totalAccumulation: totalSimpanan,
    };
  };

  const chartData = processChartData();
  const { tableData, totalAccumulation } = processTableData();

  const uniqueMonths = Array.from(new Set(DUMMY_DATA.map(item => item.tanggal.slice(0, 7))))
    .sort()
    .reverse();
  const uniqueYears = Array.from(new Set(DUMMY_DATA.map(item => item.tanggal.slice(0, 4))))
    .sort()
    .reverse();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-300 rounded shadow-md text-sm">
          <p className="font-bold text-gray-800">{payload[0].name}</p>
          <p className="text-gray-700">Jumlah: <span className="font-semibold">Rp {payload[0].value.toLocaleString("id-ID")}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Laporan Simpanan</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrint}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <FaPrint />
                <span>Cetak</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end items-center mb-6 space-x-4">
            <div className="flex border border-gray-300 rounded-lg shadow-sm">
              <button
                onClick={() => setChartPeriod("bulanan")}
                className={`px-4 py-2 text-sm font-semibold rounded-l-lg transition-colors duration-200 ${chartPeriod === "bulanan"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                Bulanan
              </button>
              <button
                onClick={() => setChartPeriod("tahunan")}
                className={`px-4 py-2 text-sm font-semibold rounded-r-lg transition-colors duration-200 ${chartPeriod === "tahunan"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                Tahunan
              </button>
            </div>

            {chartPeriod === "bulanan" && (
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="p-2 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {uniqueMonths.map(month => (
                  <option key={month} value={month}>{new Date(month + '-01').toLocaleString('id-ID', { month: 'long', year: 'numeric' })}</option>
                ))}
              </select>
            )}

            {chartPeriod === "tahunan" && (
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="p-2 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {uniqueYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            )}
          </div>
          <hr className="my-6 border-gray-200" />

          <div ref={componentRef} className="p-4 bg-white rounded-lg shadow flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Distribusi Simpanan {chartPeriod === "bulanan" ? new Date(selectedMonth + '-01').toLocaleString('id-ID', { month: 'long', year: 'numeric' }) : selectedYear}
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            {chartData.length === 0 && (
              <p className="text-gray-500 text-center mt-4">Tidak ada data untuk periode ini.</p>
            )}

            <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">
              Total Simpanan per Anggota
            </h2>
            <div className="w-full overflow-x-auto">
              {tableData.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Anggota</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Simpanan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {tableData.map((data, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.anggota_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp {data.total_simpanan.toLocaleString("id-ID")}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-100 font-bold">
                    <tr>
                      <td className="px-6 py-4 text-left text-sm text-gray-900">Total Akumulasi</td>
                      <td className="px-6 py-4 text-left text-sm text-gray-900">Rp {totalAccumulation.toLocaleString("id-ID")}</td>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <p className="text-gray-500 text-center mt-4">Tidak ada data tabel untuk periode ini.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laporan;