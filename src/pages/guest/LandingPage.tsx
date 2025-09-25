import Hero from "../../components/landing/Hero";
import About from "../../components/landing/About";
import VisionMission from "../../components/landing/VisionMission";
import CallToAction from "../../components/landing/CallToAction";

export default function LandingPage() {
    return (
        <div className="pt-16">
            <Hero />
            <About />
            <VisionMission />
            <CallToAction />
        </div>
    );
}
