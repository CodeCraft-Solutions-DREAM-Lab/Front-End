import "./MaterialCard.css";
import { useState } from "react";
import PropTypes from "prop-types";

function MaterialCard({ materialId, name, image, hideQuantity, onQuantityUpdate, initialQuantity }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handlePlus = () => {
    if (quantity >= 0) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      // Call onQuantityUpdate prop to update in parent component
      onQuantityUpdate(materialId, newQuantity);
    }
  };

  const handleMinus = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityUpdate(materialId, newQuantity);
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
	hideQuantity: PropTypes.bool,
	onQuantityUpdate: PropTypes.func.isRequired,
	initialQuantity: PropTypes.number
};

export default MaterialCard;
