import Navbar from "src/GlobalComponents/NavBar/NavBar.jsx"; // Import the Navbar component
import "./LandingPage.css";
import Title from "./components/Title/Title";
import InfoCard from "./components/InfoCard/InfoCard";
import LabCarousel from "./components/LabCarousel/LabCarousel";
import Footer from "./components/Footer/Footer";
//import { ReactComponent as MySVG } from "/LandingPage/WavesLandingPage.svg";
import { useRef } from "react";

// Imagenes
import pcbLandingPage from "src/assets/LandingPage/pcb-landing-page.png";
import blobLandingPage from "src/assets/LandingPage/blob-landing-page.png";
import vrLandingPage from "src/assets/LandingPage/vr-landing-page.png";
import moonLandingPage from "src/assets/LandingPage/moon-landing-page.png";
import astronautLandingPage from "src/assets/LandingPage/astronauta-landing-page.png";
import nubeLandingPage from "src/assets/LandingPage/nube-landing-page.png";
import vrBlancosLandingPage from "src/assets/LandingPage/vr-blancos-landing-page.png";
import circuitoLandingPage from "src/assets/LandingPage/circuito-landing-page.png";
import cuartoLandingPage from "src/assets/LandingPage/cuarto-landing-page.png";

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
                <img className="pcb" src={pcbLandingPage} />
                <img className="blob" src={blobLandingPage} />
                <img className="vr" src={vrLandingPage} />
                <img className="moon" src={moonLandingPage} />
                <img className="astronaut" src={astronautLandingPage} />
            </div>
            <div className="info-cards" ref={learnMoreRef}>
                <InfoCard
                    title="¿Qué es el DREAM Lab?"
                    image={nubeLandingPage}
                    description="El DREAM Lab es ese espacio en donde podrás desatar por completo tu potencial. Tecnología de primer nivel en un paraíso moderno es lo que podrás encontrar."
                />
                <InfoCard
                    title="Reservaciones Inteligentes con IA"
                    image={vrBlancosLandingPage}
                    description="Nuestro sistema de reservaciones inteligentes utiliza lo último en inteligencia artificial para priorizar tus metas. "
                />
                <InfoCard
                    title="Nuestras Instalaciones"
                    image={circuitoLandingPage}
                    description="Contamos con instalaciones de primer nivel, encuentra lo que necesitas en nuestros laboratorios."
                />
                <InfoCard
                    title="Visualización 3D"
                    image={cuartoLandingPage}
                    description="Escoge tu lugar de trabajo mediante un mapa trdimensional y completamente interactivo."
                />
            </div>
            <h1 className="carousel-header">CONOCE EL DREAM LAB</h1>
            <Footer />
        </div>
    );
}

export default LandingPageDev;
