// Estilos
import "./NameCard.css";

// Tipos de datos de props
import propTypes from "prop-types";

// Components
import BotonLogroPerfil from "./components/BotonLogroPerfil/BotonLogroPerfil";

function NameCard({ nombre, apodo }) {
    return (
        <div className="div-exterior">
            <BotonLogroPerfil />
            <div className="div-usuario">
                <h1 className="nombre-usuario">
                    {nombre}Efraín Martínez Garza
                </h1>
                <h2 className="apodo">{apodo}Robot Expert</h2>
            </div>
        </div>
    );
}

NameCard.propTypes = {
    nombre: propTypes.string,
    apodo: propTypes.string,
};

export default NameCard;
