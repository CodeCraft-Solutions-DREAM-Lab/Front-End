import GrayDot from "src/assets/Admin/Dashboard/gray_dot.svg";
import GreenDot from "src/assets/Admin/Dashboard/green_dot.svg";

import propTypes from "prop-types";

function EstatusDisponibilidadSala({ estaDisponible, sala }) {
    return (
        <div className="flex flex-row w-full items-center">
            <img
                src={estaDisponible ? GreenDot : GrayDot}
                alt="Estatus de disponibilidad"
                className="w-4 h-4 mr-2"
            />
            <p className="text-sm">{sala}</p>
        </div>
    );
}

EstatusDisponibilidadSala.propTypes = {
    estaDisponible: propTypes.bool.isRequired,
    sala: propTypes.string.isRequired,
};

export default EstatusDisponibilidadSala;
