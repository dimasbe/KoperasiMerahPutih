import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Koperasi Merah Putih
                </h1>
                <p className="text-lg md:text-xl mb-6">
                    Bersama membangun kesejahteraan dan kemandirian ekonomi.
                </p>
                <Link
                    to="/register"
                    className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                    Join Now
                </Link>
            </div>
        </section>
    );
}
