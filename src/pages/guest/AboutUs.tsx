export default function AboutUs() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                    Tentang Kami
                </h2>

                {/* Sejarah */}
                <div className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                        Sejarah Koperasi
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        Koperasi Merah Putih didirikan sebagai wadah kebersamaan dan
                        gotong royong untuk meningkatkan kesejahteraan anggota.
                        Berawal dari semangat persatuan, koperasi ini tumbuh menjadi
                        lembaga ekonomi yang mandiri, profesional, dan berdaya saing
                        tinggi di tengah masyarakat.
                    </p>
                </div>

                {/* Struktur Organisasi */}
                <div className="mb-12">
                    <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                        Struktur Organisasi & Pengurus
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Koperasi Merah Putih dipimpin oleh pengurus yang dipilih secara
                        demokratis oleh anggota. Struktur organisasi terdiri dari:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Rapat Anggota sebagai pemegang kekuasaan tertinggi</li>
                        <li>Pengurus Koperasi sebagai pelaksana kebijakan</li>
                        <li>Pengawas Koperasi sebagai pengendali dan pengawas jalannya organisasi</li>
                    </ul>
                </div>

                {/* Legalitas */}
                <div>
                    <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                        Legalitas & Dasar Hukum
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        Koperasi Merah Putih berlandaskan Undang-Undang Nomor 25 Tahun 1992
                        tentang Perkoperasian serta terdaftar secara resmi sesuai dengan
                        peraturan perundang-undangan yang berlaku.
                        Dengan legalitas yang jelas, koperasi berkomitmen untuk memberikan
                        layanan yang transparan, akuntabel, dan berkelanjutan.
                    </p>
                </div>
            </div>
        </section>
    );
}
