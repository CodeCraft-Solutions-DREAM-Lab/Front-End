import "./IconoLogro.css";
import propTypes from "prop-types";
import loading from "src/assets/Profile/loading.webp";

// Hooks
import { useEffect, useState } from "react";

function IconoLogro({ icono, colorFondo, opacidad }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (icono) {
            const img = new window.Image();
            img.src = icono;
            img.onload = () => setLoaded(true);
        }
    }, [icono]);

    return (
        <div
            className={`ic-contenedor-logro`}
            style={{ "--color-fondo": colorFondo, "--opacidad": opacidad }}
            data-cy="contenedor-icono-logro"
        >
            {loaded ? (
                <img
                    className="ic-icono-logro"
                    src={icono}
                    alt="Icono del logro"
                    data-cy="icono-logro"
                />
            ) : (
                <img
                    className="ic-icono-logro"
                    src={loading}
                    alt="Icono del logro"
                    data-cy="icono-logro"
                />
            )}
        </div>
    );
}

IconoLogro.propTypes = {
    icono: propTypes.string,
    colorFondo: propTypes.string,
};

export default IconoLogro;
