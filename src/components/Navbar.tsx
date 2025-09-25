import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // hapus data login
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        // redirect ke halaman utama (guest)
        navigate("/");

        // opsional alert
        alert("Anda berhasil logout!");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/30 backdrop-blur-md text-gray-700 p-4 flex items-center justify-end shadow-md">
            {/* Tombol Logout */}
            <button
                onClick={handleLogout}
                className="text-gray-100 bg-gray-700 hover:bg-red-700 px-4 py-2 rounded-md font-medium transition-colors"
            >
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
