// Estilos
import "./SeleccionMaterial.css";

// Navbars
import NavBar from "src/GlobalComponents/NavBar/NavBar";
import NavBarAdmin from "src/GlobalComponents/NavBarAdmin/NavBarAdmin";

// Componentes
import SearchBar from "./components/SearchBar/SearchBar";
import RoundedButton from "./components/Button/Button";
import MaterialCard from "./components/MaterialCard/MaterialCard";
import MiniMaterialCard from "./components/MiniMaterialCard/MiniMaterialCard";

// Global Components
import BotonBack from "src/GlobalComponents/BotonBack/BotonBack";

// NextUI
import { Badge } from "@nextui-org/react";

// Hooks
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WarningModal from "./components/WarningModal/WarningModal"; // Warning modal if recommended items haven't been selected 

// Storage
import {
    saveToSessionStorage,
    getFromSessionStorage,
    existsInSessionStorage,
} from "src/utils/Storage";

// ApiRequests
import { post } from "src/utils/ApiRequests";

function SeleccionMaterial() {
    const navigate = useNavigate();
    const [selectedMaterials, setSelectedMaterials] = useState(() => {
        if (
            existsInSessionStorage("materials") &&
            getFromSessionStorage("materials")
        ) {
            return JSON.parse(getFromSessionStorage("materials"));
        } else {
            return [];
        }
    });
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFirstReminderOpen, setIsFirstReminderOpen] = useState(false);

    let idExperiencia = 0;
    if (existsInSessionStorage("idExperiencia")) {
        idExperiencia = getFromSessionStorage("idExperiencia");
    }
    else {
        idExperiencia = 0;
    }

    useEffect(() => {
        const date = new Date(getFromSessionStorage("fecha"));
        console.log("idExperiencia: ",idExperiencia);

        // Parametros Stored Procedure
        const params = {
            idSala: getFromSessionStorage("idSala"),
            idExperiencia: idExperiencia,
            fecha: date.toISOString(),
            horaInicio: getFromSessionStorage("horaInicioIsoString"),
            duracion: parseInt(getFromSessionStorage("duration")),
        };

        post("materiales/recomendados", params)
            .then((result) => {
                setData(result);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        // Save selected materials to session storage whenever it changes
        saveToSessionStorage("materials", JSON.stringify(selectedMaterials));
    }, [selectedMaterials]);

    const handleQuantityUpdate = (materialId, newQuantity) => {
        // Create a copy of the selectedMaterials array
        let updatedSelectedMaterials = [...selectedMaterials];

        // Find the index of the material with the given materialId in the array
        const materialIndex = updatedSelectedMaterials.findIndex(
            (item) => item.materialId === materialId
        );

        // If the newQuantity is 0, remove the material from the array
        if (newQuantity === 0) {
            if (materialIndex !== -1) {
                updatedSelectedMaterials.splice(materialIndex, 1);
            }
        } else {
            // If the material exists in the array, update its quantity
            if (materialIndex !== -1) {
                updatedSelectedMaterials[materialIndex].quantity = newQuantity;
            } else {
                // If the material doesn't exist in the array, add it with the new quantity
                const materialToAdd = data.find((item) => item.id === materialId);
                if (materialToAdd) {
                    updatedSelectedMaterials.push({
                        materialId: materialId,
                        quantity: newQuantity,
                        image: materialToAdd.image, // Include the image property
                    });
                }
            }
        }

        // Update the state with the updated materials array
        setSelectedMaterials(updatedSelectedMaterials);

        // After adding the new item to the container
        const container = document.querySelector('.material-resumen-container');
        // Add a small delay to ensure the container has updated its layout
        setTimeout(() => {
            container.scrollLeft = container.scrollWidth - container.clientWidth;
        }, 100); // Adjust the delay time as needed
    };

    const handleSubmit = async () => {
        navigate("/reservacion/resumen");
    };

    const handleNextButtonClick = () => {
        const recommendedMaterials = data.filter(material => material.cantidadRecomendada > 0);
        const recommendedMaterialsNotSelected = recommendedMaterials.some(recommended => {
            const selectedMaterial = selectedMaterials.find(selected => selected.materialId === recommended.id);
            return !selectedMaterial || selectedMaterial.quantity < recommended.cantidadRecomendada;
        });

        if (recommendedMaterialsNotSelected) {
            setIsFirstReminderOpen(true);
        } else {
            handleSubmit();
        }
    };

    const handleWarningModalConfirm = () => {
        setIsFirstReminderOpen(false);
        handleSubmit();
    };

    const filteredData = data
        .filter(material =>
            material.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => b.cantidadRecomendada - a.cantidadRecomendada); // Sort by cantidadRecomendada

    return (
        <>
            {existsInSessionStorage("nombreReservacionAdmin") ? (
                <NavBarAdmin />
            ) : (
                <NavBar view="soloPerfil" autoHide={false} />
            )}

            <div className="main-container">
                <div className="top-section">
                    {/* Div to display selected materials */}
                    <div className="seleccion-material-boton-back">
                        <BotonBack ruta="/reservacion/sala/" />
                    </div>
                    <div className="material-resumen-container">
                        {selectedMaterials.map((selectedMaterial) => (
                            <Badge key={selectedMaterial.materialId} content={selectedMaterial.quantity} color="default" placement="top-left" data-cy="badge">
                                <MiniMaterialCard
                                    key={selectedMaterial.materialId}
                                    image={selectedMaterial.image}
                                />
                            </Badge>
                        ))}
                    </div>

                    {/* Search bar for filtering materials */}
                    <div className="search-bar-container">
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </div>
                </div>
                <div className="bottom-section">
                    {/* Below is the modal in case there are recommended items that should be selected but haven't been selected */}

                    <WarningModal
                        data-cy="primer-recordatorio-sala"
                        isOpen={isFirstReminderOpen}
                        size="2xl"
                        onClose={() => setIsFirstReminderOpen(false)}
                        onOk={handleWarningModalConfirm} // For the "Sí, continuar" button
                    />

                    {/* Div to display all selectable materials */}
                    <div className="card-container-wrapper">
                        <div className="card-container-sm" data-cy="card-container-sm">
                            {filteredData.map(material => (
                                <MaterialCard
                                    key={material.id}
                                    materialId={material.id}
                                    name={material.name}
                                    image={material.image}
                                    hideQuantity={false}
                                    onQuantityUpdate={handleQuantityUpdate}
                                    initialQuantity={
                                        selectedMaterials.find((m) => m.materialId === material.id)
                                            ?.quantity || 0
                                    }
                                    maxQuantity={material.cantidadDisponible}
                                    isRecommended={material.cantidadRecomendada > 0} // Pass the flag
                                    recommendedAmnt={material.cantidadRecomendada}
                                    data-cy={`material-card-${material.id}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="button-container-sm">
                        <RoundedButton text="ACEPTAR" onClick={handleNextButtonClick} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SeleccionMaterial;
