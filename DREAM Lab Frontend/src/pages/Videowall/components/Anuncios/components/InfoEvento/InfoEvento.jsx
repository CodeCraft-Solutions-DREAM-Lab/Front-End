import "./InfoEvento.css";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";

function InfoEvento() {
    return (
        <div className="info-container">
            <GlassCard borderRadius="2vh" classes={"info-glasscard"}>
                <h1 className="info-title">Taller de impresión 3D</h1>
                <p className="info-sala">Dimension Forge</p>
                <p className="info-date">Lunes 15 de Febrero 3:00pm a 5:00pm</p>
            </GlassCard>
        </div>
    );
}

export default InfoEvento;