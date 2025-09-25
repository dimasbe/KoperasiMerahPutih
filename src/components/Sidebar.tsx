import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaCoins, FaHandshake, FaChartBar } from "react-icons/fa";

const Sidebar: React.FC = () => {
    const location = useLocation();

    const menu = [
        { name: "Beranda", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
        { name: "Anggota", path: "/admin/anggota", icon: <FaUsers /> },
        { name: "Simpanan", path: "/admin/simpanan", icon: <FaCoins /> },
        { name: "Pinjaman", path: "/admin/pinjaman", icon: <FaHandshake /> },
        { name: "Laporan", path: "/admin/laporan", icon: <FaChartBar /> },
    ];

    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-6">Koperasi Finance</h1>
            <ul className="space-y-3">
                {menu.map((item) => (
                    <li key={item.path}>
                        <Link
                            to={item.path}
                            className={`flex items-center px-3 py-2 rounded ${location.pathname === item.path ? "bg-gray-400" : "hover:bg-gray-700"
                                }`}
                        >
                            <div className="mr-3">{item.icon}</div>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;

