import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function NavbarGuest() {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: "Beranda", path: "/" },
        { name: "Tentang Kami", path: "/tentang" },
        { name: "Bisnis", path: "/bisnis" },
        { name: "Berita & Informasi", path: "/berita" },
        { name: "Kontak", path: "/kontak" },
    ];

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-md fixed w-full top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-extrabold text-blue-600 tracking-wide hover:text-blue-700 transition"
                    >
                        Koperasi Merah Putih
                    </Link>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="text-gray-700 font-medium hover:text-blue-600 transition"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            to="/login"
                            className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md transition"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
                    <div className="flex flex-col space-y-3 p-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="text-gray-700 font-medium hover:text-blue-600 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md text-center transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
