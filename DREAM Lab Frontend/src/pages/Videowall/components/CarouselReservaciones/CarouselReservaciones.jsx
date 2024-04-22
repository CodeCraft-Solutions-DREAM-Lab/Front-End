import "./CarouselReservaciones.css";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";

function CarouselReservaciones() {
    return (
        <div className="cr-container">
            <div className="cr-title-container">
                <GlassCard classes={"cr-glasscard"}>
                    <h1 className="cr-title">Reservaciones</h1>
                </GlassCard>
            </div>
        </div>
    );
}

export default CarouselReservaciones;
