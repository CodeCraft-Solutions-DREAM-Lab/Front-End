import "./InfoEvento.css";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";

function InfoEvento(props) {
    if (props.soloImagen) {
        return null; // No muestra nada si soloImagen es true
    }
    return (
        <div className="info-container">
            <GlassCard borderRadius="2vh" classes={"info-glasscard"}>
                <h1 className="info-title">{props.nombreEvento}</h1>
                <p className="info-sala">{props.nombreSala}</p>
                <p className="info-date">{props.fecha}</p>
            </GlassCard>
        </div>
    );
}

export default InfoEvento;