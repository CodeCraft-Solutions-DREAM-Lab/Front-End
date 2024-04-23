import "./Hora.css";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";

function Hora() {
    return (
        <div className="hora-container">
            <GlassCard borderRadius="2vh" classes={"hora-glasscard"}>
                <h1 className="hora-text">12:57 pm</h1>
            </GlassCard>
        </div>
    );
}

export default Hora;

