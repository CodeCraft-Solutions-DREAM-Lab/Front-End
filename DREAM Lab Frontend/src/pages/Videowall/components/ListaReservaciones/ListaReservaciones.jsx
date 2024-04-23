import "./CarouselReservaciones.css";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";

import InfiniteMovingCards from "./components/infinite-moving-cards";

function CarouselReservaciones() {
    return (
        <div className="cr-container">
            <div className="cr-title-container">
                <GlassCard borderRadius="2vh" classes={"cr-glasscard"}>
                    <h1 className="cr-title">Reservaciones</h1>
                </GlassCard>
            </div>
            <div className="cr-carousel-container">
                <InfiniteMovingCards />
            </div>
        </div>
    );
}

export default CarouselReservaciones;
