import Navbar from "src/GlobalComponents/NavBar/NavBar.jsx";
import "./LandingPage.css";
import Title from "./components/Title/Title";
import InfoCard from "./components/InfoCard/InfoCard";
import LabCarousel from "./components/LabCarousel/LabCarousel";
import Footer from "./components/Footer/Footer";

//import { ReactComponent as MySVG } from "src/assets/LandingPage/WavesLandingPage.svg";
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
        <img
          className="landing-image pcb"
          src="src/assets/LandingPage/pcb-landing-page.png"
        />
        <img
          className="landing-image blob"
          src="src/assets/LandingPage/blob-landing-page.png"
        />
        <img
          className="landing-image vr"
          src="src/assets/LandingPage/vr-landing-page.png"
        />
        <img
          className="landing-image moon"
          src="src/assets/LandingPage/moon-landing-page.png"
        />
        <img
          className="landing-image astronaut"
          src="src/assets/LandingPage/astronauta-landing-page.png"
        />
      </div>
      <div className="info-cards" ref={learnMoreRef}>
        <InfoCard
          title="¿Qué es el DREAM Lab?"
          image="src/assets/LandingPage/nube-landing-page.png"
          description="El DREAM Lab es ese espacio en donde podrás desatar por completo tu potencial. Tecnología de primer nivel en un paraíso moderno es lo que podrás encontrar."
        />
        <InfoCard
          title="Reservaciones Inteligentes con IA"
          image="src/assets/LandingPage/vr-blancos-landing-page.png"
          description="Nuestro sistema de reservaciones inteligentes utiliza lo último en inteligencia artificial para priorizar tus metas. "
        />
        <InfoCard
          title="Nuestras Instalaciones"
          image="src/assets/LandingPage/circuito-landing-page.png"
          description="Contamos con instalaciones de primer nivel, encuentra lo que necesitas en nuestros laboratorios."
        />
        <InfoCard
          title="Reconocimiento de voz"
          image="src/assets/LandingPage/cuarto-landing-page.png"
          description="Usa tu voz para obtener recomendaciones en base a lo que buscas gracias a la tecnología de reconocimiento de voz. Rápido, preciso y sin complicaciones."
        />
      </div>
      <h1 className="carousel-header">CONOCE EL DREAM LAB</h1>
      <LabCarousel />
      <Footer />
    </div>
  );
}

export default LandingPageDev;
