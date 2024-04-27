import "./MaterialCard.css";
import { useDispatch } from "react-redux"; // Remove unused import
import { getFromSessionStorage, saveToSessionStorage } from "src/utils/Storage";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Imagenes
import minusIcon from "/src/assets/SeleccionMaterial/minus-icon.svg";
import plusIcon from "/src/assets/SeleccionMaterial/plus-icon.svg";

function MaterialCard({ materialId, name, image, hideQuantity }) {
    const [quantity, setQuantity] = useState(0);

    // Optimized storage key and retrieval logic
    const storageKey = "selectedMaterials"; // Single key for all materials

    const materialsFromStorage =
        JSON.parse(getFromSessionStorage(storageKey)) || [];

    // Find the material object based on ID in the array
    const currentMaterial = materialsFromStorage.find(
        (material) => material.id === materialId
    );

    useEffect(() => {
        if (currentMaterial) {
            setQuantity(currentMaterial.quantity || 0);
        } else {
            // Material not found in storage, initialize with 0
            setQuantity(0);
        }
    }, [materialId, materialsFromStorage, currentMaterial]);

    const handlePlus = () => {
        if (quantity >= 0) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);

            const updatedMaterials = materialsFromStorage.map((material) => {
                if (material.id === materialId) {
                    return { ...material, quantity: newQuantity }; // Update quantity for this material
                }
                return material; // Keep other materials unchanged
            });

            saveToSessionStorage(storageKey, updatedMaterials);
        }
    };

    const handleMinus = () => {
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);

            const updatedMaterials = materialsFromStorage.filter(
                (material) => material.id !== materialId
            ); // Remove material if quantity reaches 0
            if (newQuantity === 0) {
                updatedMaterials.splice(
                    updatedMaterials.indexOf(currentMaterial),
                    1
                ); // More efficient removal for specific object
            }

            saveToSessionStorage(storageKey, updatedMaterials);
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
                                src={minusIcon}
                                alt="Menos"
                            />
                            <div className="quantity">
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

MaterialCard.propTypes = {
    materialId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    hideQuantity: PropTypes.bool.isRequired,
};

export default MaterialCard;
