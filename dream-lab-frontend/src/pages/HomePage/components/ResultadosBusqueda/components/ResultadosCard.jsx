import "./ResultadosCard.css";
import PropTypes from "prop-types";

function ResultadosCard({id, idSala, salasBloqueadas, title, image, onClick}) {

    return (
        <div className="cardResultados">
            <img
            data-cy="image-resultados"
            className={`imageResultados ${
                                            salasBloqueadas.includes(idSala) ? "blocked" : ""
                                        }`}
            src={image}
            alt={title}
            onClick={() => onClick(id)}
            />
            {salasBloqueadas.includes(idSala) && (
                <div className="overlayCard">
                    <span>No <br></br> Disponible</span>
                </div>
            )}
            <p className="titleResultados">{title}</p>
        </div>
        
    );
}

ResultadosCard.propTypes = {
    id: PropTypes.number.isRequired,
    idSala: PropTypes.number.isRequired,
    salasBloqueadas: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ResultadosCard;

