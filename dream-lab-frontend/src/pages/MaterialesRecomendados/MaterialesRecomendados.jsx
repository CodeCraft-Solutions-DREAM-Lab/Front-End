import "./MaterialesRecomendados.css";
import NavBar from "../../GlobalComponents/NavBar/NavBar";
import SearchBar from "./components/SearchBar/SearchBar";
import MaterialCard from "./components/MaterialCard/MaterialCard";
import { Select, SelectItem} from "@nextui-org/react";
import { useEffect, useState } from "react";

import {
	saveToSessionStorage,
	getFromSessionStorage,
	existsInSessionStorage,
} from "../../utils/Storage";
import { get, post } from "../../utils/ApiRequests";

function MaterialesRecomendados() {
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
	const [searchTerm, setSearchTerm] = useState("");
	const [salasBD, setSalasBD] = useState([]);
	const [selectedRoom, setSelectedRoom] = useState(null);

	useEffect(() => {
		get(
            "salas",
            () => setIsLoading(false),
            () => setIsLoading(false)
        )
            .then((result) => {
                setSalasBD(result);
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
	}, []);


	useEffect(() => {
		if (salasBD.length > 0 && salasBD[selectedRoom]) {
			post("materiales/bySala", { idSala: salasBD[selectedRoom].idSala })
				.then((result) => {
					setData(result);
					setIsLoading(false);
				})
				.catch((error) => {
					console.error("An error occurred:", error);
					setIsLoading(false);
				});
		}
	}, [salasBD, selectedRoom]);


	useEffect(() => {
		// Save selected materials to session storage whenever it changes
		saveToSessionStorage("materialesExperiencia", JSON.stringify(selectedMaterials));
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
						image: materialToAdd.image // Include the image property
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

	const handleSelectedRoomUpdate = (event) => {
		const selectedRoomId = event.target.value;
		setSelectedRoom(selectedRoomId);
		saveToSessionStorage("idSala", selectedRoomId);
	};

	const filteredData = data.filter(material =>
        material.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

	return (
		<>
			<div className="matrec-main-container">
				<div className="matrec-top-section">
					{/* Div to display selected materials */}
					<div className="sala-dropdown-container">
						<p className="sala-dropdown-title">Seleccionar sala*</p>
						<div className="sala-dropdown">
							<div className="flex w-full flex-wrap md:flex-nowrap">
								<Select
									placeholder="Elige una sala"
									onChange={handleSelectedRoomUpdate}
									className="mb-3"
									aria-label="selector-sala"
									data-cy="selector-sala"
								>
									{salasBD.map((sala) => (
										<SelectItem key={sala.idSala} value={sala.idSala}>
											{sala.nombre}
										</SelectItem>
									))}
								</Select>
							</div>
						</div>
					</div>

					{/* Search bar for filtering materials */}
					<div className="matrec-search-bar-container">
						<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
					</div>
				</div>
				<div className="matrec-bottom-section">
					{/* Div to display all selectable materials */}
					<div className="matrec-card-container-wrapper">
						<div className="matrec-card-container-sm" data-cy="card-container-sm">
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
									data-cy={`material-card-${material.id}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MaterialesRecomendados;
