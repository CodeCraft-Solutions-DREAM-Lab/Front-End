// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Autoplay } from "swiper/modules";
import "swiper/css";

// Estilos
import "./CarouselReservaciones.css";

// Componentes
import ReservationCard from "./components/ReservationCard";

// Hooks
import { useEffect } from "react";

// API Requests
import { get } from "src/utils/ApiRequests";

function CarouselReservaciones() {
    // Detener el autoplay al hacer hover
    useEffect(() => {
        const swiper = document.querySelector(".mySwiper");
        swiper.addEventListener("mouseenter", () => {
            swiper.swiper.autoplay.stop();
        });
        swiper.addEventListener("mouseleave", () => {
            swiper.swiper.autoplay.start();
        });
    }, []);

    // Obtener los datos para las tarjetas de reservaciones
    useEffect(() => {
        // get("videowall/reservaciones").then((res) => {
        //     console.log(res);
        // });
    }, []);

    return (
        <div className="cr-swiper-container">
            <div className="top-blur"></div>
            <div className="bottom-blur"></div>
            <Swiper
                modules={[FreeMode, Mousewheel, Autoplay]}
                slidesPerView={5}
                spaceBetween={0}
                mousewheel={true}
                direction="vertical"
                loop={true}
                freeMode={true}
                speed={5000}
                autoplay={{
                    delay: 1,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
            >
                <SwiperSlide>
                    <ReservationCard />
                </SwiperSlide>
                <SwiperSlide>
                    <ReservationCard />
                </SwiperSlide>
                <SwiperSlide>
                    <ReservationCard />
                </SwiperSlide>
                <SwiperSlide>
                    <ReservationCard />
                </SwiperSlide>
                <SwiperSlide>
                    <ReservationCard />
                </SwiperSlide>
                <SwiperSlide>
                    <ReservationCard />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default CarouselReservaciones;
