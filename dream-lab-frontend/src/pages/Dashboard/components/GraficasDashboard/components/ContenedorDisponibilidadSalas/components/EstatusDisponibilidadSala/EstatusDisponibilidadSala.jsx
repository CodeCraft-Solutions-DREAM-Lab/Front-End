// Imagenes
import GrayDot from "src/assets/Admin/Dashboard/gray_dot.svg";
import GreenDot from "src/assets/Admin/Dashboard/green_dot.svg";

// Propiedades
import propTypes from "prop-types";

// Estilos
import "./EstatusDisponibilidadSala.css";

function EstatusDisponibilidadSala({ bloqueada, sala }) {
    return (
        <div className="eds-contenedor">
            <img
                src={bloqueada ? GrayDot : GreenDot}
                alt="Estatus de disponibilidad"
                className="eds-icono-estatus"
            />
            <p className="eds-nombre-sala">{sala}</p>
        </div>
    );
}

EstatusDisponibilidadSala.propTypes = {
    estaDisponible: propTypes.bool.isRequired,
    sala: propTypes.string.isRequired,
};

export default EstatusDisponibilidadSala;
