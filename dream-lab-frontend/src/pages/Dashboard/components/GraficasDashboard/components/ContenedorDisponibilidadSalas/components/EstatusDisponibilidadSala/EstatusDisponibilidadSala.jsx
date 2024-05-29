// Imagenes
import GrayDot from "src/assets/Admin/Dashboard/gray_dot.svg";
import GreenDot from "src/assets/Admin/Dashboard/green_dot.svg";

// Propiedades
import propTypes from "prop-types";

// Estilos
import "./EstatusDisponibilidadSala.css";

function EstatusDisponibilidadSala({ bloqueada, sala }) {
    return (
        <div
            className="eds-contenedor"
            data-cy="estatus-disponibilidad-sala-contenedor"
        >
            <img
                src={bloqueada ? GrayDot : GreenDot}
                alt="Estatus de disponibilidad"
                className="eds-icono-estatus"
                data-cy="estatus-disponibilidad-sala-icono"
            />
            <p
                className="eds-nombre-sala"
                data-cy="estatus-disponibilidad-sala-nombre"
            >
                {sala}
            </p>
        </div>
    );
}

EstatusDisponibilidadSala.propTypes = {
    bloqueada: propTypes.bool.isRequired,
    sala: propTypes.string.isRequired,
};

export default EstatusDisponibilidadSala;
