import "./MiniMaterialCard.css";
import PropTypes from "prop-types";

function MiniMaterialCard({ image }) {

    console.log("MiniMaterialCard: ", image);

	return (
		<>
			<div className="mini-card">
				<img src={image} alt="Imagen del material" className="mini-material-image"/>
			</div>
		</>
	);
}

MiniMaterialCard.propTypes = {
	image: PropTypes.string.isRequired,
};

export default MiniMaterialCard;