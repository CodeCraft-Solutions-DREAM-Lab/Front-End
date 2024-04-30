import "./MaterialCardDupe.css";
import { useState } from "react";
import PropTypes from "prop-types";
import plusIcon from "../../../../assets/SeleccionMaterial/plus-icon.svg"
import minusIcon from "../../../../assets/SeleccionMaterial/minus-icon.svg"

function MaterialCardDupe({ materialId, name, image, hideQuantity, onQuantityUpdate, initialQuantity, maxQuantity }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handlePlus = () => {
    if (quantity >= 0 && quantity < maxQuantity) {
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
			<div className="card-dupe">
				<div className="nombre-material-dupe">
					<h1>{name}</h1>
				</div>
				<div className="material-image-dupe">
					<img src={image} alt="Imagen del material" />
				</div>
				<div className="icons-dupe">
					{hideQuantity ? (
						<p>{quantity}</p>
					) : (
						<>
							<img
								onClick={handleMinus}
								src={minusIcon}
								alt="Menos"
							/>
							<div className="quantity-dupe">
								<p>{quantity}</p>
							</div>
							<img
								onClick={handlePlus}
								src={plusIcon}
								alt="Más"
							/>
						</>
					)}
				</div>
			</div>
		</>
	);
}

MaterialCardDupe.propTypes = {
	materialId: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	hideQuantity: PropTypes.bool,
	onQuantityUpdate: PropTypes.func.isRequired,
	initialQuantity: PropTypes.number,
	maxQuantity: PropTypes.number.isRequired
};

export default MaterialCardDupe;