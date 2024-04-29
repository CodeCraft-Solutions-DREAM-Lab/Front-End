import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./LabCarousel.css";

function LabSwiper() {
  // const swiper = useSwiper();

  return (
    <div className="landing-lab-carousel-component">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop="true"
        autoplay={true}
        longSwipes="false"
        grabCursor="true"
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        style={{
          "--swiper-pagination-color": "#FFFFFF",
          "--swiper-pagination-bullet-inactive-color": "#D9D9D9",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
          "--swiper-pagination-bullet-size": "12px",
          "--swiper-pagination-bullet-horizontal-gap": "6px",
          "--swiper-navigation-color": "#FFFFFF",
          "--swiper-navigation-sides-offset": "5.2rem",
        }}
      >
        <SwiperSlide>
          <GlassCard margin="4rem" padding="4rem">
            <div className="landing-carousel-card">
              <img
                className="landing-carousel-logo"
                src="src/images/LogoDreamLab.png"
              />
              <h3 className="landing-carousel-title">Social Networking Room</h3>
              <img
                className="landing-carousel-img"
                src="src/pages/LandingPage/assets/images/social-networking.jpg"
              />
              <ul className="landing-carousel-desc">
                <li className="landing-list-element">Espacio abierto</li>
                <li className="landing-list-element">Conoce personas</li>
                <li className="landing-list-element">Video Wall</li>
              </ul>
            </div>
          </GlassCard>
        </SwiperSlide>
        <SwiperSlide>
          <GlassCard margin="4rem" padding="4rem">
            <div className="landing-carousel-card">
              <img
                className="landing-carousel-logo"
                src="src/images/LogoDreamLab.png"
              />
              <h3 className="landing-carousel-title">Lego Room</h3>
              <img
                className="landing-carousel-img"
                src="src/pages/LandingPage/assets/images/lego-room.jpg"
              />
              <ul className="landing-carousel-desc">
                <li className="landing-list-element">Experimentación</li>
                <li className="landing-list-element">Windows</li>
                <li className="landing-list-element">MacOS</li>
              </ul>
            </div>
          </GlassCard>
        </SwiperSlide>
        <SwiperSlide>
          <GlassCard margin="4rem" padding="4rem">
            <div className="landing-carousel-card">
              <img
                className="landing-carousel-logo"
                src="src/images/LogoDreamLab.png"
              />
              <h3 className="landing-carousel-title">Electric Garage</h3>
              <img
                className="landing-carousel-img"
                src="src/pages/LandingPage/assets/images/electric-garage.jpg"
              />
              <ul className="landing-carousel-desc">
                <li className="landing-list-element">Electrónicos</li>
                <li className="landing-list-element">Sensores</li>
                <li className="landing-list-element">Medidores</li>
              </ul>
            </div>
          </GlassCard>
        </SwiperSlide>
        <SwiperSlide>
          <GlassCard margin="4rem" padding="4rem">
            <div className="landing-carousel-card">
              <img
                className="landing-carousel-logo"
                src="src/images/LogoDreamLab.png"
              />
              <h3 className="landing-carousel-title">Dimension Forge</h3>
              <img
                className="landing-carousel-img"
                src="src/pages/LandingPage/assets/images/dimension-forge.jpg"
              />
              <ul className="landing-carousel-desc">
                <li className="landing-list-element">Tecnología para 3D</li>
                <li className="landing-list-element">Impresoras 3D</li>
                <li className="landing-list-element">Scanners</li>
              </ul>
            </div>
          </GlassCard>
        </SwiperSlide>
        <SwiperSlide>
          <GlassCard margin="4rem" padding="4rem">
            <div className="landing-carousel-card">
              <img
                className="landing-carousel-logo"
                src="src/images/LogoDreamLab.png"
              />
              <h3 className="landing-carousel-title">New Horizons</h3>
              <img
                className="landing-carousel-img"
                src="src/pages/LandingPage/assets/images/new-horizons.jpg"
              />
              <ul className="landing-carousel-desc">
                <li className="landing-list-element">Realidad virtual</li>
                <li className="landing-list-element">Realidad aumentada</li>
                <li className="landing-list-element">Holodeck</li>
              </ul>
            </div>
          </GlassCard>
        </SwiperSlide>
        <SwiperSlide>
          <GlassCard margin="4rem" padding="4rem">
            <div className="landing-carousel-card">
              <img
                className="landing-carousel-logo"
                src="src/images/LogoDreamLab.png"
              />
              <h3 className="landing-carousel-title">Deep Net</h3>
              <img
                className="landing-carousel-img"
                src="src/pages/LandingPage/assets/images/deep-net.jpg"
              />
              <ul className="landing-carousel-desc">
                <li className="landing-list-element">Redes</li>
                <li className="landing-list-element">Red Aislada</li>
                <li className="landing-list-element">Hacking</li>
              </ul>
            </div>
          </GlassCard>
        </SwiperSlide>
        <SwiperSlide>
          <GlassCard margin="4rem" padding="4rem">
            <div className="landing-carousel-card">
              <img
                className="landing-carousel-logo"
                src="src/images/LogoDreamLab.png"
              />
              <h3 className="landing-carousel-title">Graveyard</h3>
              <img
                className="landing-carousel-img"
                src="src/pages/LandingPage/assets/images/graveyard.jpg"
              />
              <ul className="landing-carousel-desc">
                <li className="landing-list-element">Cómputo viejo</li>
                <li className="landing-list-element">Software antiguo</li>
                <li className="landing-list-element">Reverse engineering</li>
              </ul>
            </div>
          </GlassCard>
        </SwiperSlide>
        ...
      </Swiper>
    </div>
  );
}

export default LabSwiper;
