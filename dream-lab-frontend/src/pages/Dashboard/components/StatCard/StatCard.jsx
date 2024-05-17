import { propTypes } from "react-bootstrap/esm/Image";

// Icons
import stat_arrow_down from "src/assets/Admin/stat_arrow_down.svg";
import stat_arrow_up from "src/assets/Admin/stat_arrow_up.svg";

// Estilos
import "./StatCard.css";

function StatCard({ nombre, valor, cambio }) {
    return (
        <div className="sc-card-container">
            <div className="sc-card-header">
                <h1>{nombre}</h1>
            </div>
            <div className="flex flex-row justify-between">
                <span>{valor}</span>

                {cambio < 0 ? (
                    <div className="flex flex-row">
                        <span>{cambio}%</span>
                        <img src={stat_arrow_down} alt="arrow down" />
                    </div>
                ) : (
                    <div className="flex flex-row">
                        <span>+{cambio}%</span>
                        <img src={stat_arrow_up} alt="arrow up" />
                    </div>
                )}
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
