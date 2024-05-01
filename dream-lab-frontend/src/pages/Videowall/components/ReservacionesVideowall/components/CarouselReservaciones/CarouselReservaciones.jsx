// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Autoplay } from "swiper/modules";
import "swiper/css";

// Estilos
import "./CarouselReservaciones.css";

// Componentes
import ReservationCard from "./components/ReservationCard";

// Hooks
import { useEffect, useState } from "react";

// API Requests
import { get } from "src/utils/ApiRequests";

function CarouselReservaciones() {
    const [reservaciones, setReservaciones] = useState([]);

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
        get("videowall/reservaciones").then((res) => {
            console.log(res);
            res = res.map((item) => {
                let horaInicioDate = new Date(item.horaInicio);
                let horaFinDate = new Date(item.horaInicio);
                horaFinDate.setUTCHours(
                    horaInicioDate.getUTCHours() + item.duracion
                );

                let horaInicio = `${horaInicioDate.getUTCHours()}:${horaInicioDate
                    .getUTCMinutes()
                    .toString()
                    .padStart(2, "0")}`;
                let horaFin = `${horaFinDate.getUTCHours()}:${horaFinDate
                    .getUTCMinutes()
                    .toString()
                    .padStart(2, "0")}`;

                return { ...item, horaInicio, horaFin };
            });
            console.log(res);
            setReservaciones(res);
        });
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
                {reservaciones.map((reservacion, index) => (
                    <SwiperSlide key={index}>
                        <ReservationCard
                            nombre={reservacion.nombre_usuario}
                            horaInicio={reservacion.horaInicio}
                            horaFin={reservacion.horaFin}
                            sala={reservacion.nombre_sala}
                            icono={reservacion.iconoURL}
                            colorPreferido={reservacion.colorPreferido}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default CarouselReservaciones;
