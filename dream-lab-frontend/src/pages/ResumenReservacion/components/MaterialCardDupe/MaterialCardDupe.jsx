import "./MaterialCardDupe.css";
import PropTypes from "prop-types";
function MaterialCardDupe({ name, image, initialQuantity }) {
	return (
		<>
			<div className="card-dupe">
				<div className="nombre-material-dupe">
					<h1>{name}</h1>
				</div>
				<div className="material-image-dupe">
					<img src={image} alt="Imagen del material" />
				</div>
				<div className="icons-dupe">
					<p>{initialQuantity}</p>
				</div>
			</div>
		</>
	);
}

MaterialCardDupe.propTypes = {
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	initialQuantity: PropTypes.number
};

export default MaterialCardDupe;