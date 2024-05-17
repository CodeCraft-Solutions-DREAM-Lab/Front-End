import { propTypes } from "react-bootstrap/esm/Image";

// Icons
import stat_arrow_down from "src/assets/Admin/stat_arrow_down.svg";
import stat_arrow_up from "src/assets/Admin/stat_arrow_up.svg";
import stat_no_change from "src/assets/Admin/stat_no_change.svg";

// Estilos
import "./StatCard.css";

function StatCard({ nombre, valor, cambio }) {
    cambio = cambio < 0 ? cambio : `+${cambio}`;

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
                <span className="sc-card-value">{valor}</span>

                <div className="sc-card-value-change-container">
                    <div>
                        <span>{cambio}%</span>
                    </div>
                    <img src={imagen} alt="arrow" />
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
