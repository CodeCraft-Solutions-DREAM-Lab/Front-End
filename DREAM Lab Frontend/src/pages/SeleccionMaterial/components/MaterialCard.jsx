import "./MaterialCard.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
	updateMaterialQuantity,
	removeMaterial,
} from "../../../redux/Slices/selectedMaterialsSlice";
import PropTypes from "prop-types";

function MaterialCard({ materialId, name, image, hideQuantity }) {
	const [quantity, setQuantity] = useState(0);
	const dispatch = useDispatch();

	const handlePlus = () => {
		if (quantity >= 0) {
			setQuantity(quantity + 1);
			dispatch(updateMaterialQuantity(materialId, quantity + 1));
		}
	};

	const handleMinus = () => {
		if (quantity > 0) {
            setQuantity(quantity - 1);
			dispatch(updateMaterialQuantity(materialId, quantity - 1));
		} else {
			dispatch(removeMaterial(materialId)); // Remove if quantity reaches 0
		}
	};

	return (
		<>
			<div className="card">
				<div className="nombre-material">
					<h1>{name}</h1>
				</div>
				<div className="material-image">
					<img src={image} alt="Imagen del material" />
				</div>
				<div className="icons">
					{hideQuantity ? (
						<p>{quantity}</p>
					) : (
						<>
							<img
								onClick={handleMinus}
								src="\src\pages\SeleccionMaterial\assets\minus-icon.svg"
								alt="Menos"
							/>
							<div className="quantity">
								<p>{quantity}</p>
							</div>
							<img
								onClick={handlePlus}
								src="\src\pages\SeleccionMaterial\assets\plus-icon.svg"
								alt="Más"
							/>
						</>
					)}
				</div>
			</div>
		</>
	);
}

MaterialCard.propTypes = {
	materialId: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	hideQuantity: PropTypes.bool.isRequired,
};

export default MaterialCard;
