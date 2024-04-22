import BotonRegresar from "./components/BotonRegresar/BotonRegresar";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";

function Confirmacion() {
    return (
        <>
            <BotonRegresar />
            <GlassCard padding="2rem">
                <h1 style={{ color: "white" }}>
                    Tu solicitud ha sido procesada exitosamente
                </h1>
            </GlassCard>
        </>
    );
}

export default Confirmacion;
