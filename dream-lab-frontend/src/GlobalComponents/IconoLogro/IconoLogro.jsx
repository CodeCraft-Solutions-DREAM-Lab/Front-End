import "./IconoLogro.css";
import propTypes from "prop-types";

function IconoLogro({ icono, colorFondo, opacidad }) {
    return (
        <div
            className={`ic-contenedor-logro`}
            style={{ "--color-fondo": colorFondo, "--opacidad": opacidad }}
            data-cy="contenedor-icono-logro"
        >
            <img
                className="ic-icono-logro"
                src={icono}
                alt="Icono del logro"
                data-cy="icono-logro"
            />
        </div>
    );
}

IconoLogro.propTypes = {
    icono: propTypes.string,
    colorFondo: propTypes.string,
};

export default IconoLogro;
