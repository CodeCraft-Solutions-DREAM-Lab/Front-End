import BotonRegresar from "../components/general/BotonRegresar";
import GlassCard from "../components/general/GlassCard";

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
