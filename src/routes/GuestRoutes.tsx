import { Routes, Route } from "react-router-dom";
import NavbarGuest from "../components/NavbarGuest";

import LandingPage from "../pages/guest/LandingPage";
import AboutUs from "../pages/guest/AboutUs";

const GuestRoutes = () => {
    return (
        <>
            {/* Navbar selalu tampil */}
            <NavbarGuest />

            {/* Halaman guest */}
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/tentang" element={<AboutUs />} />
                <Route path="/bisnis" element={<div>Halaman Bisnis</div>} />
                <Route path="/berita" element={<div>Halaman Berita & Informasi</div>} />
                <Route path="/kontak" element={<div>Halaman Kontak</div>} />
            </Routes>
        </>
    );
};

export default GuestRoutes;
