import "./InfoEvento.css";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";

function InfoEvento(props) {
    return (
        <div className="info-container">
            <GlassCard borderRadius="2vh" classes={"info-glasscard"}>
                <h1 className="info-title">{props.title}</h1>
                <p className="info-sala">{props.sala}</p>
                <p className="info-date">{props.date}</p>
            </GlassCard>
        </div>
    );
}

export default InfoEvento;