//Estilos
import "./ContenedorDisponibilidadSalas.css";

// Componentes
import EstatusDisponibilidadSala from "./components/EstatusDisponibilidadSala/EstatusDisponibilidadSala";

import propTypes from "prop-types";

function ContenedorDisponibilidadSalas({ titulo, data }) {
    return (
        <div className="cds-contenedor">
            <h1 className="cds-titulo-contenedor">{titulo}</h1>
            <div className="cds-contenedor-disponibilidad-outer">
                <div className="cds-contenedor-disponibilidad-inner">
                    {data.map((sala, index) => (
                        <EstatusDisponibilidadSala
                            bloqueada={sala.bloqueada}
                            sala={sala.sala}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

ContenedorDisponibilidadSalas.propTypes = {
    titulo: propTypes.string.isRequired,
    data: propTypes.array.isRequired,
};

export default ContenedorDisponibilidadSalas;
