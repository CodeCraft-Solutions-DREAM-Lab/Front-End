// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "./CarouselReservaciones.css";

// import required modules
import { FreeMode, Mousewheel, Autoplay } from "swiper/modules";

import ReservationCard from "./components/ReservationCard";

function CarouselReservaciones() {
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
