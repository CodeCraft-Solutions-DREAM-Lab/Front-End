//Estilos
import "./ContenedorDisponibilidadSalas.css";

// Componentes
import EstatusDisponibilidadSala from "./components/EstatusDisponibilidadSala/EstatusDisponibilidadSala";

import propTypes from "prop-types";

function ContenedorDisponibilidadSalas({ titulo }) {
    return (
        <div className="cds-contenedor">
            <h1 className="cds-titulo-contenedor">{titulo}</h1>
            <div className="cds-contenedor-disponibilidad-outer">
                <div className="cds-contenedor-disponibilidad-inner">
                    <EstatusDisponibilidadSala
                        estaDisponible={true}
                        sala="Biometrics Flexible Hall"
                    />
                    <EstatusDisponibilidadSala
                        estaDisponible={false}
                        sala="Electric Garage"
                    />
                    <EstatusDisponibilidadSala
                        estaDisponible={true}
                        sala="Electric Garage"
                    />
                    <EstatusDisponibilidadSala
                        estaDisponible={false}
                        sala="Electric Garage"
                    />
                    <EstatusDisponibilidadSala
                        estaDisponible={true}
                        sala="Electric Garage"
                    />
                    <EstatusDisponibilidadSala
                        estaDisponible={false}
                        sala="Electric Garage"
                    />
                    <EstatusDisponibilidadSala
                        estaDisponible={true}
                        sala="Electric Garage"
                    />
                    <EstatusDisponibilidadSala
                        estaDisponible={false}
                        sala="Electric Garage"
                    />
                    <EstatusDisponibilidadSala
                        estaDisponible={true}
                        sala="Electric Garage"
                    />
                    <EstatusDisponibilidadSala
                        estaDisponible={false}
                        sala="Electric Garage"
                    />
                </div>
            </div>
        </div>
    );
}

ContenedorDisponibilidadSalas.propTypes = {
    titulo: propTypes.string.isRequired,
};

export default ContenedorDisponibilidadSalas;
