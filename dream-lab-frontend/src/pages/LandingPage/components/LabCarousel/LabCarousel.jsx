import React from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./LabCarousel.css";

// Import your images
import Logo from "src/assets/Logos/LogoDreamLab.png";
import SocialNetworking from "src/assets/LandingPage/social-networking.jpg";
import LegoRoom from "src/assets/LandingPage/lego-room.jpg";
import ElectricGarage from "src/assets/LandingPage/electric-garage.jpg";
import DimensionForge from "src/assets/LandingPage/dimension-forge.jpg";
import NewHorizons from "src/assets/LandingPage/new-horizons.jpg";
import DeepNet from "src/assets/LandingPage/deep-net.jpg";
import Graveyard from "src/assets/LandingPage/graveyard.jpg";

function LabCarousel() {
  // Array of swiper card information
  const swiperCards = [
    {
      title: "Social Networking Room",
      image: SocialNetworking,
      description: ["Espacio abierto", "Conoce personas", "Video Wall"],
    },
    {
      title: "Lego Room",
      image: LegoRoom,
      description: ["Experimentación", "Windows", "MacOS"],
    },
    {
      title: "Electric Garage",
      image: ElectricGarage,
      description: ["Electrónicos", "Sensores", "Medidores"],
    },
    {
      title: "Dimension Forge",
      image: DimensionForge,
      description: ["Tecnología para 3D", "Impresoras 3D", "Scanners"],
    },
    {
      title: "New Horizons",
      image: NewHorizons,
      description: ["Realidad virtual", "Realidad aumentada", "Holodeck"],
    },
    {
      title: "Deep Net",
      image: DeepNet,
      description: ["Redes", "Red Aislada", "Hacking"],
    },
    {
      title: "Graveyard",
      image: Graveyard,
      description: ["Cómputo viejo", "Software antiguo", "Reverse engineering"],
    },
    // Add more swiper card objects as needed
  ];

  return (
    <div className="landing-lab-carousel-component">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={true}
        longSwipes={false}
        grabCursor={true}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        style={{
          "--swiper-pagination-color": "#FFFFFF",
          "--swiper-pagination-bullet-inactive-color": "#D9D9D9",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
          "--swiper-pagination-bullet-size": "12px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
          "--swiper-navigation-color": "#FFFFFF",
          "--swiper-navigation-sides-offset": "4.7rem",
          "--swiper-pagination-bottom": "55px"
        }}
      >
        {swiperCards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="carousel-card-glass-card">
              <GlassCard>
                <div className="landing-carousel-card">
                  <img
                    className="landing-carousel-logo"
                    src={Logo}
                    alt="Logo"
                  />
                  <h3 className="landing-carousel-title">{card.title}</h3>
                  <img
                    className="landing-carousel-img"
                    src={card.image}
                    alt={card.title}
                  />
                  <ul className="landing-carousel-desc">
                    {card.description.map((item, idx) => (
                      <li key={idx} className="landing-list-element">{item}</li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default LabCarousel;
