import "./MaterialCard.css";
import { useState } from "react";
import PropTypes from "prop-types";
import plusIcon from "../../../../assets/SeleccionMaterial/plus-icon.svg";
import minusIcon from "../../../../assets/SeleccionMaterial/minus-icon.svg";

function MaterialCard({ materialId, name, image, hideQuantity, onQuantityUpdate, initialQuantity, maxQuantity, isRecommended }) {
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
    <div className={`card ${isRecommended ? "recommended-material" : ""}`}>
      {isRecommended && (
        <div className="recommended-label">
          RECOMENDADO
        </div>
      )}
      <div className="nombre-material" data-cy="material-name">
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
              src={minusIcon}
              alt="Menos"
              data-cy="minus-button"
            />
            <div className="quantity" data-cy="quantity">
              <p>{quantity}</p>
            </div>
            <img
              onClick={handlePlus}
              src={plusIcon}
              alt="Más"
              data-cy="plus-button"
            />
          </>
        )}
      </div>
    </div>
  );
}

MaterialCard.propTypes = {
  materialId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  hideQuantity: PropTypes.bool,
  onQuantityUpdate: PropTypes.func.isRequired,
  initialQuantity: PropTypes.number,
  maxQuantity: PropTypes.number.isRequired,
  isRecommended: PropTypes.bool.isRequired
};

export default MaterialCard;
