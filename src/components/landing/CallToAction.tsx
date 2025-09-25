import { Link } from "react-router-dom";

export default function CallToAction() {
    return (
        <section className="py-20 bg-gradient-to-r from-indigo-700 to-blue-600 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
                Saatnya Bergabung dengan Koperasi Merah Putih
            </h2>
            <Link
                to="/register"
                className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
                Gabung Jadi Anggota
            </Link>
        </section>
    );
}
