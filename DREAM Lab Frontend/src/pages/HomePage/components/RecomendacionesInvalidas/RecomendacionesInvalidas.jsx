import "./RecomendacionesInvalidas.css";

function RecomendacionesInvalidas() {
    return (
        <div className="avisoRecomendacionesInvalidas">
            <div className="containerFondo">
                <img
                    src="/src/pages/Homepage/assets/images/nube_error.svg"
                    alt="Nube triste"
                    className="nubeError"
                />
                <p>
                    Lo sentimos, no pudimos encontrar ningún resultado. Intenta
                    otra búsqueda.
                </p>
            </div>
        </div>
    );
}

export default RecomendacionesInvalidas;
