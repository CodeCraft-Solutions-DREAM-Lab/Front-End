import { propTypes } from "react-bootstrap/esm/Image";

// Icons
import stat_arrow_down from "src/assets/Admin/Dashboard/stat_arrow_down.svg";
import stat_arrow_up from "src/assets/Admin/Dashboard/stat_arrow_up.svg";
import stat_no_change from "src/assets/Admin/Dashboard/stat_no_change.svg";

// Estilos
import "./StatCard.css";

function StatCard({ nombre, valor, cambio }) {
    cambio = cambio.toFixed(1);
    if (cambio < 0) {
        cambio = `${cambio}`;
    } else if (cambio > 0) {
        cambio = `+${cambio}`;
    }

    let imagen = stat_no_change;
    if (cambio < 0) {
        imagen = stat_arrow_down;
    } else if (cambio > 0) {
        imagen = stat_arrow_up;
    }

    return (
        <div className="sc-card-container">
            <div>
                <h1 className="sc-card-header">{nombre}</h1>
            </div>
            <div className="sc-card-value-container">
                <span className="sc-card-value" data-cy="statCard-valor">{valor}</span>

                <div className="sc-card-value-change-container">
                    <div>
                        <span className="sc-card-value-change" data-cy="statCard-cambio">{cambio}%</span>
                    </div>
                    <img
                        src={imagen}
                        alt="arrow"
                        className="sc-card-image"
                        draggable="false"
                        data-cy="statCard-imagen"
                    />
                </div>
            </div>
        </div>
    );
}

StatCard.propTypes = {
    nombre: propTypes.string,
    valor: propTypes.number,
    cambio: propTypes.number,
};

export default StatCard;
