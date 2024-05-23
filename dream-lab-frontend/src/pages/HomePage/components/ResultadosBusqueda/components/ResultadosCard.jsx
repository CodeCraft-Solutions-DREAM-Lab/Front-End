import "./ResultadosCard.css";
import PropTypes from "prop-types";

function ResultadosCard({id, title, image, onClick}) {

    return (
        <div className="cardResultados">
            <img
            data-cy="image-resultados"
            className="imageResultados"
            src={image}
            alt={title}
            onClick={() => onClick(id)}
            />
            <p className="titleResultados">{title}</p>
        </div>
        
    );
}

ResultadosCard.propTypes = {
    id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ResultadosCard;

