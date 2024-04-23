// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "./CarouselReservaciones.css";

// import required modules
import { FreeMode, Mousewheel, Autoplay } from "swiper/modules";
import GlassCard from "../../../../../../GlobalComponents/GlassCard/GlassCard";

export default function App() {
    return (
        <>
            <Swiper
                modules={[FreeMode, Mousewheel, Autoplay]}
                slidesPerView={3}
                spaceBetween={100}
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
                    <GlassCard width="80%" height="80%">
                        Hola
                    </GlassCard>
                </SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
        </>
    );
}

// import React, { useRef, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";

// import "./styles.css";

// export default function App() {
//   return (
//     <>
//       <Swiper className="mySwiper">
//         <SwiperSlide>Slide 1</SwiperSlide>
//         <SwiperSlide>Slide 2</SwiperSlide>
//         <SwiperSlide>Slide 3</SwiperSlide>
//         <SwiperSlide>Slide 4</SwiperSlide>
//         <SwiperSlide>Slide 5</SwiperSlide>
//         <SwiperSlide>Slide 6</SwiperSlide>
//         <SwiperSlide>Slide 7</SwiperSlide>
//         <SwiperSlide>Slide 8</SwiperSlide>
//         <SwiperSlide>Slide 9</SwiperSlide>
//       </Swiper>
//     </>
//   );
// }
