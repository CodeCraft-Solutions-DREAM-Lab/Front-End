import "./SeleccionMaterial.css";
import NavBar from "../../GlobalComponents/NavBar/NavBar";
import SearchBar from "./components/SearchBar";
import RoundedButton from "./components/Button";
import MaterialCard from "./components/MaterialCard.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import CircularProgress from "@mui/material/CircularProgress";

import {
	saveToSessionStorage,
	getFromSessionStorage,
	existsInSessionStorage,
} from "../../utils/Storage";
import { post, get } from "../../utils/ApiRequests";

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
		id: 4,
		name: "Material A",
		image: "https://via.placeholder.com/100x100", // Placeholder image
	},
	{
		id: 5,
		name: "Material B",
		image: "https://via.placeholder.com/100x100", // Placeholder image
	},
	{
		id: 6,
		name: "Material C",
		image: "https://via.placeholder.com/90x90", // Placeholder image
	},
	{
		id: 7,
		name: "Material A",
		image: "https://via.placeholder.com/100x100", // Placeholder image
	},
	{
		id: 8,
		name: "Material B",
		image: "https://via.placeholder.com/100x100", // Placeholder image
	},
	{
		id: 9,
		name: "Material C",
		image: "https://via.placeholder.com/100x100", // Placeholder image
	},
];

function SeleccionMaterial() {
	const navigate = useNavigate();
	const [selectedMaterials, setSelectedMaterials] = useState(() => {
		if (
			existsInSessionStorage("materials") &&
			getFromSessionStorage("materials")
		) {
			console.log(JSON.parse(getFromSessionStorage("materials")));
			return JSON.parse(getFromSessionStorage("materials"));
		} else {
			return [];
		}
	});
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const date = new Date(getFromSessionStorage("fecha"));

		// Parametros Stored Procedure
		const params = {
			idSala: getFromSessionStorage("idSala"), 
			fecha: date.toISOString(), 
			horaInicio: getFromSessionStorage("horaInicioIsoString"), 
			duracion: parseInt(getFromSessionStorage("duration")), 
		};

		post("materiales", params)
			.then((result) => {
				setData(result);
				setIsLoading(false);
				console.log(data);
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
		// Retrieve the materials array from session storage
		let materialsArray = JSON.parse(getFromSessionStorage("materials")) || [];

		// Find the index of the material with the given materialId in the array
		const materialIndex = materialsArray.findIndex(
			(item) => item.materialId === materialId
		);

		// If the newQuantity is 0, remove the material from the array
		if (newQuantity === 0) {
			if (materialIndex !== -1) {
				materialsArray.splice(materialIndex, 1);
			}
		} else {
			// If the material exists in the array, update its quantity
			if (materialIndex !== -1) {
				materialsArray[materialIndex].quantity = newQuantity;
			} else {
				// If the material doesn't exist in the array, add it with the new quantity
				materialsArray.push({ materialId, quantity: newQuantity });
			}
		}

		// Save the updated materials array back to session storage
		saveToSessionStorage("materials", JSON.stringify(materialsArray));
		//console.log(selectedMaterials);
	};

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
							{data.map((material) => (
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
								/>
							))}
						</div>
					</div>
					<div className="button-container-sm">
						<RoundedButton text="ACEPTAR" onClick={handleSubmit} />
					</div>
				</div>
			</div>
		</>
	);
}

export default SeleccionMaterial;
