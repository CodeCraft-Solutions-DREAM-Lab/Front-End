// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Autoplay } from "swiper/modules";
import "swiper/css";

// Estilos
import "./CarouselReservaciones.css";

// Componentes
import ReservationCard from "./components/ReservationCard";

// Hooks
// Hooks
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// API Requests
import { get } from "src/utils/ApiRequests";

import HiddenInputLogger from "../../../HiddenInputLogger/HiddenInputLogger";
import MensajeBienvenida from "../../../MensajeBienvenida/MensajeBienvenida";

function CarouselReservaciones({ enviarReservaciones }) {
    const [reservaciones, setReservaciones] = useState([]);

    // Detener el autoplay al hacer hover
    // useEffect(() => {
    //     const swiper = document.querySelector(".mySwiper");
    //     swiper.addEventListener("mouseenter", () => {
    //         swiper.swiper.autoplay.stop();
    //     });
    //     swiper.addEventListener("mouseleave", () => {
    //         swiper.swiper.autoplay.start();
    //     });
    // }, []);

    const [searchParams, setSearchParams] = useSearchParams();
    // Obtener el intervalo de refresco de las reservaciones, si no se
    // especifica se toma 1 hora por defecto
    let refresh_interval = searchParams.get("interval")
        ? searchParams.get("interval")
        : 3600;
    refresh_interval = parseInt(refresh_interval) * 1000;

    // Obtener los datos para las tarjetas de reservaciones
    const [rawReservaciones, setRawReservaciones] = useState(null);

    useEffect(() => {
        const fetchReservations = () => {
            console.log("Fetching reservations");
            get("videowall/reservaciones").then((res) => {
                console.log(res);
                if (JSON.stringify(res) !== JSON.stringify(rawReservaciones)) {
                    setRawReservaciones(res);
                    const processedRes = res.map((item) => {
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
                    setReservaciones(processedRes);
                    enviarReservaciones(processedRes);
                }
            });
        };

        // Run the function once at the start
        fetchReservations();

        // Then run it every minute
        const intervalId = setInterval(fetchReservations, refresh_interval);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [rawReservaciones]);

    const [swiper, setSwiper] = useState();

    useEffect(() => {
        if (
            swiper &&
            swiper.slides &&
            reservaciones &&
            swiper.slides.length > 1
        ) {
            if (swiper.activeIndex > 1) {
                swiper.slideTo(swiper.activeIndex, 500);
            } else {
                swiper.slideTo(1, 500);
            }
        }
    }, [reservaciones, swiper]);

    return (
        <div className="cr-swiper-container">
            <div className="top-blur"></div>
            <div className="bottom-blur"></div>
            <Swiper
                modules={[FreeMode, Mousewheel, Autoplay]}
                slidesPerView={5}
                spaceBetween={0}
                // mousewheel={true}
                direction="vertical"
                loop={true}
                freeMode={true}
                speed={5000}
                autoplay={{
                    delay: 1,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
                onSwiper={(swiper) => setSwiper(swiper)}
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
            <HiddenInputLogger reservaciones={reservaciones} />
        </div>
    );
}

export default CarouselReservaciones;
