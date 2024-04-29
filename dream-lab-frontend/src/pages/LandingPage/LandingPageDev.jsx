import Navbar from "src/GlobalComponents/NavBar/NavBar.jsx";
import "./LandingPage.css";
import Title from "./components/Title/Title";
import InfoCard from "./components/InfoCard/InfoCard";
import LabCarousel from "./components/LabCarousel/LabCarousel";
import Footer from "./components/Footer/Footer";

import Pcb from "src/assets/LandingPage/pcb-landing-page.png";
import Blob from "src/assets/LandingPage/blob-landing-page.png";
import Vr from "src/assets/LandingPage/vr-landing-page.png";
import Moon from "src/assets/LandingPage/moon-landing-page.png";
import Astronaut from "src/assets/LandingPage/astronauta-landing-page.png";
import Nube from "src/assets/LandingPage/nube-landing-page.png";
import VrBlancos from "src/assets/LandingPage/vr-blancos-landing-page.png";
import Circuito from "src/assets/LandingPage/circuito-landing-page.png";
import Cuarto from "src/assets/LandingPage/cuarto-landing-page.png";

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
          src={Pcb}
        />
        <img
          className="landing-image blob"
          src={Blob}
        />
        <img
          className="landing-image vr"
          src={Vr}
        />
        <img
          className="landing-image moon"
          src={Moon}
        />
        <img
          className="landing-image astronaut"
          src={Astronaut}
        />
      </div>
      <div className="info-cards" ref={learnMoreRef}>
        <InfoCard
          title="¿Qué es el DREAM Lab?"
          image={Nube}
          description="El DREAM Lab es ese espacio en donde podrás desatar por completo tu potencial. Tecnología de primer nivel en un paraíso moderno es lo que podrás encontrar."
        />
        <InfoCard
          title="Reservaciones Inteligentes con IA"
          image={VrBlancos}
          description="Nuestro sistema de reservaciones inteligentes utiliza lo último en inteligencia artificial para priorizar tus metas. "
        />
        <InfoCard
          title="Nuestras Instalaciones"
          image={Circuito}
          description="Contamos con instalaciones de primer nivel, encuentra lo que necesitas en nuestros laboratorios."
        />
        <InfoCard
          title="Reconocimiento de voz"
          image={Cuarto}
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
