import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";

const PinjamanAjukan: React.FC = () => {
  const [jumlah, setJumlah] = useState<number>(0);

  const handleAjukan = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/pinjaman/ajukan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jumlah }),
      credentials: "include",
    });
    alert("Pinjaman diajukan");
    setJumlah(0);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Ajukan Pinjaman</h1>
          <form className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-md" onSubmit={handleAjukan}>
            <input
              type="number"
              placeholder="Jumlah Pinjaman"
              value={jumlah}
              onChange={(e) => setJumlah(Number(e.target.value))}
              className="w-full mb-4 p-2 border rounded"
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded">Ajukan</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PinjamanAjukan;
