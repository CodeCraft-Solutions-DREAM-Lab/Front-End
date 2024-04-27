import Navbar from "src/GlobalComponents/NavBar/NavBar.jsx"; // Import the Navbar component
import "./LandingPage.css";
import Title from "./components/Title/Title";
import InfoCard from "./components/InfoCard/InfoCard";
import LabCarousel from "./components/LabCarousel/LabCarousel";
import Footer from "./components/Footer/Footer";
//import { ReactComponent as MySVG } from "/LandingPage/WavesLandingPage.svg";
import { useRef } from "react";

function LandingPageDev() {
    const learnMoreRef = useRef(null);

    const scrollToLearnMore = () => {
        // Calculate the Y position of the target element
        const yOffset =
            learnMoreRef.current.getBoundingClientRect().top + window.scrollY;

        // Smoothly scroll to the target element
        window.scrollTo({ top: yOffset, behavior: "smooth" });
    };

    return (
        <div className="landing-page-container">
            <Navbar view="landingPage" autoHide={true} />
            <Title scroll={scrollToLearnMore} />
            <div className="landing-images">
                <img className="pcb" src="/LandingPage/pcb-landing-page.png" />
                <img
                    className="blob"
                    src="/LandingPage/blob-landing-page.png"
                />
                <img className="vr" src="/LandingPage/vr-landing-page.png" />
                <img
                    className="moon"
                    src="/LandingPage/moon-landing-page.png"
                />
                <img
                    className="astronaut"
                    src="/LandingPage/astronauta-landing-page.png"
                />
            </div>
            <div className="info-cards" ref={learnMoreRef}>
                <InfoCard
                    title="¿Qué es el DREAM Lab?"
                    image="/LandingPage/nube-landing-page.png"
                    description="El DREAM Lab es ese espacio en donde podrás desatar por completo tu potencial. Tecnología de primer nivel en un paraíso moderno es lo que podrás encontrar."
                />
                <InfoCard
                    title="Reservaciones Inteligentes con IA"
                    image="/LandingPage/vr-blancos-landing-page.png"
                    description="Nuestro sistema de reservaciones inteligentes utiliza lo último en inteligencia artificial para priorizar tus metas. "
                />
                <InfoCard
                    title="Nuestras Instalaciones"
                    image="/LandingPage/circuito-landing-page.png"
                    description="Contamos con instalaciones de primer nivel, encuentra lo que necesitas en nuestros laboratorios."
                />
                <InfoCard
                    title="Visualización 3D"
                    image="/LandingPage/cuarto-landing-page.png"
                    description="Escoge tu lugar de trabajo mediante un mapa trdimensional y completamente interactivo."
                />
            </div>
            <h1 className="carousel-header">CONOCE EL DREAM LAB</h1>
            <Footer />
        </div>
    );
}

export default LandingPageDev;
