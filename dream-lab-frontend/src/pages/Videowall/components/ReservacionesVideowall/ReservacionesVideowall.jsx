import "./ReservacionesVideowall.css";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";

import CarouselReservaciones from "./components/CarouselReservaciones/CarouselReservaciones";
import MensajeBienvenida from "../MensajeBienvenida/MensajeBienvenida";

function ReservacionesVideowall() {
    return (
        <div className="cr-container">
            <div className="cr-title-container">
                <GlassCard borderRadius="2vh" classes={"cr-glasscard"}>
                    <h1 className="cr-title">Reservaciones</h1>
                </GlassCard>
            </div>
            <div className="cr-carousel-container">
                <CarouselReservaciones />
            </div>
            <div className="container-mensaje-bienvenida">
                <MensajeBienvenida 
                error={false}/>
            </div>
        </div>
    );
}

export default ReservacionesVideowall;
