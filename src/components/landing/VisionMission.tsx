export default function VisionMission() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-800">
                    Visi, Misi & Tujuan
                </h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 shadow-lg rounded-lg bg-gray-50 hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-3 text-blue-600">Visi</h3>
                        <p className="text-gray-600">
                            Menjadi koperasi terdepan yang meningkatkan kualitas hidup anggota
                            dan berkontribusi bagi pembangunan nasional.
                        </p>
                    </div>
                    <div className="p-6 shadow-lg rounded-lg bg-gray-50 hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-3 text-blue-600">Misi</h3>
                        <p className="text-gray-600">
                            Memberdayakan anggota melalui layanan keuangan, pendidikan koperasi,
                            dan pengembangan usaha produktif berbasis komunitas.
                        </p>
                    </div>
                    <div className="p-6 shadow-lg rounded-lg bg-gray-50 hover:shadow-xl transition">
                        <h3 className="text-xl font-semibold mb-3 text-blue-600">Tujuan</h3>
                        <p className="text-gray-600">
                            Mewujudkan kemandirian ekonomi, meningkatkan kesejahteraan anggota,
                            serta membangun ekosistem usaha yang adil dan berkelanjutan.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
