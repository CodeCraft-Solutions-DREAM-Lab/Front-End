import "./NuevoIconoLogro.css";
import propTypes from "prop-types";

function NuevoIconoLogro({ icono, colorFondo }) {
    return (
        <div
            className={`ic-contenedor-logro`}
            style={{ "--color-fondo": colorFondo }}
        >
            <img className="ic-icono-logro" src={icono} alt="Icono del logro" />
        </div>
    );
}

NuevoIconoLogro.propTypes = {
    icono: propTypes.string,
    colorFondo: propTypes.string,
};

export default NuevoIconoLogro;
