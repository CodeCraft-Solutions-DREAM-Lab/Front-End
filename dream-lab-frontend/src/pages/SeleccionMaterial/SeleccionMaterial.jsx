import "./SeleccionMaterial.css";
import NavBar from "src/GlobalComponents/NavBar/NavBar";
import SearchBar from "./components/SearchBar/SearchBar";
import RoundedButton from "./components/Button/Button";
import MaterialCard from "./components/MaterialCard/MaterialCard.jsx";
import { Provider } from "react-redux";
import store from "src/redux/store";
import { getFromSessionStorage, saveToSessionStorage } from "src/utils/Storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const materials = [
    {
        id: 1,
        name: "Material A",
        image: "https://via.placeholder.com/90x90", // Placeholder image
    },
    {
        id: 2,
        name: "Material B",
        image: "https://via.placeholder.com/100x100", // Placeholder image
    },
    {
        id: 3,
        name: "Material C",
        image: "https://via.placeholder.com/100x100", // Placeholder image
    },
    {
        id: 1,
        name: "Material A",
        image: "https://via.placeholder.com/100x100", // Placeholder image
    },
    {
        id: 2,
        name: "Material B",
        image: "https://via.placeholder.com/100x100", // Placeholder image
    },
    {
        id: 3,
        name: "Material C",
        image: "https://via.placeholder.com/90x90", // Placeholder image
    },
    {
        id: 1,
        name: "Material A",
        image: "https://via.placeholder.com/100x100", // Placeholder image
    },
    {
        id: 2,
        name: "Material B",
        image: "https://via.placeholder.com/100x100", // Placeholder image
    },
    {
        id: 3,
        name: "Material C",
        image: "https://via.placeholder.com/100x100", // Placeholder image
    },
];

function SeleccionMaterial() {
    let navigate = useNavigate();
    saveToSessionStorage("material", []);

    const handleSubmit = async () => {
        navigate("/reservacion/resumen");
    };
    return (
        <>
            <NavBar view="soloPerfil" autoHide={false} />

            <div className="main-container">
                <div className="top-section">
                    {/* Aquí irá el resumen y la search bar */}
                    <div className="search-bar-container">
                        <SearchBar />
                    </div>
                </div>
                <div className="bottom-section">
                    {/* Aquí van las tarjetas con los materiales */}
                    <div className="card-container-wrapper">
                        <div className="card-container-sm">
                            {materials.map((material) => (
                                <>
                                    <Provider store={store}>
                                        <MaterialCard
                                            key={material.id}
                                            materialId={material.id}
                                            name={material.name}
                                            image={material.image}
                                        />
                                    </Provider>
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="button-container">
                        <RoundedButton text="ACEPTAR" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SeleccionMaterial;
