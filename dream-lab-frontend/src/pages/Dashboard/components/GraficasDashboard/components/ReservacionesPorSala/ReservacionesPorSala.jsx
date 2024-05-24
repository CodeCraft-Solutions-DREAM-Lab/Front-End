// Estilos
import "./ReservacionesPorSala.css";

import propTypes from "prop-types";

import { BarList } from "@tremor/react";

function ReservacionesPorSala({ titulo, data }) {
    return (
        <div className="rps-contenedor">
            <h1 className="rps-titulo-grafica">{titulo}</h1>
            <div className="rps-contenedor-barras-outer">
                <div className="rps-contenedor-barras-inner">
                    <BarList
                        data={data}
                        showAnimation={true}
                        id="rps-bar-list"
                        data-cy="rps-bar-list"
                    />
                </div>
            </div>
        </div>
    );
}

ReservacionesPorSala.propTypes = {
    titulo: propTypes.string.isRequired,
    data: propTypes.array.isRequired,
};

export default ReservacionesPorSala;
