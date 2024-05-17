import "./ResultadosCard.css";
import PropTypes from "prop-types";

function ResultadosCard({title, image}) {

    return (
        <div className="cardResultados">
            <img
            data-cy="image-resultados"
            className="imageResultados"
            src={image}
            alt={title}
            />
            <p className="titleResultados">{title}</p>
        </div>
        
    );
}

ResultadosCard.propTypes = {
	title: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired
};

export default ResultadosCard;

