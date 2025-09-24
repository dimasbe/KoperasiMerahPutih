import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

interface Anggota {
  id: number;
  name: string;
}

const SimpananForm: React.FC = () => {
  const [anggotaId, setAnggotaId] = useState<number>(0);
  const [jumlah, setJumlah] = useState<number>(0);
  const [anggota, setAnggota] = useState<Anggota[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/anggota", { credentials: "include" })
      .then((res) => res.json())
      .then((data: Anggota[]) => setAnggota(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/simpanan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ anggota_id: anggotaId, jumlah }),
      credentials: "include",
    });
    alert("Simpanan berhasil ditambahkan");
    setJumlah(0);
    setAnggotaId(0);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Tambah Simpanan</h1>
          <form className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-md" onSubmit={handleSubmit}>
            <select
              value={anggotaId}
              onChange={(e) => setAnggotaId(Number(e.target.value))}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value={0}>Pilih Anggota</option>
              {anggota.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Jumlah"
              value={jumlah}
              onChange={(e) => setJumlah(Number(e.target.value))}
              className="w-full mb-4 p-2 border rounded"
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded">Simpan</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SimpananForm;
