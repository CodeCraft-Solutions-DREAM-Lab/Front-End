import "./RecomendacionesInvalidas.css";

import nubeError from "src/assets/HomePage/nube_error.svg";

function RecomendacionesInvalidas() {
    return (
        <div className="avisoRecomendacionesInvalidas" data-cy="aviso-recomendaciones-invalidas">
            <div className="containerFondo">
                <img src={nubeError} alt="Nube triste" className="nubeError" />
                <p>
                    Lo sentimos, no pudimos encontrar ningún resultado. Intenta
                    otra búsqueda.
                </p>
            </div>
        </div>
    );
}

export default RecomendacionesInvalidas;
