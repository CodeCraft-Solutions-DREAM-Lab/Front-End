import "./InfoEvento.css";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";

function InfoEvento(props) {
    if (props.soloImagen) {
        return null; // No muestra nada si soloImagen es true
    }

    if(props.personalizado){
        return (
            <div className="info-container">
                <GlassCard borderRadius="2vh" classes={"info-glasscard"}>
                    <h1 className="info-title">{props.nombreSala}</h1>
                    <p className="info-descripcion">{props.descripcion}</p>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="info-container">
            <GlassCard borderRadius="2vh" classes={"info-glasscard"}>
                <h1 className="info-title">{props.nombreEvento}</h1>
                <p className="info-sala">{props.nombreSala}</p>
                <p className="info-date">{props.fecha} - ({props.horaInicio} a {props.horaFin})</p>
            </GlassCard>
        </div>
    );
}

export default InfoEvento;