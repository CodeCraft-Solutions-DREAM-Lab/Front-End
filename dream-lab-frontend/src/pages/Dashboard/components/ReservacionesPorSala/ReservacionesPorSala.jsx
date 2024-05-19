// Estilos
import "./ReservacionesPorSala.css";

import propTypes from "prop-types";

import {
    Card,
    CategoryBar,
    DeltaBar,
    MarkerBar,
    ProgressBar,
    BarList,
} from "@tremor/react";



function ReservacionesPorSala({ titulo, data }) {
    return (
        <div className="rps-contenedor">
            <h1 className="rps-titulo-grafica">{titulo}</h1>
            <div className="rps-contenedor-barras-outer">
                <div className="rps-contenedor-barras-inner">
                    <BarList data={data} showAnimation={true} />
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
