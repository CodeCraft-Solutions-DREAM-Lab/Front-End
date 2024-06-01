import { useState } from "react";
import Navbar from "src/GlobalComponents/NavBar/NavBar";
import NavBarAdmin from "src/GlobalComponents/NavBarAdmin/NavBarAdmin";
import RoundedButton from "src/pages/SeleccionMaterial/components/Button/Button";
import "src/pages/CrearExperiencia/CrearExperiencia.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import InfoExperiencia from "src/pages/CrearExperiencia/components/InfoExperiencia";
import AgregarPortada from "./components/AgregarPortada";

const steps = [
	"Crea tu experiencia",
	"Agrega detalles",
	"Recomienda materiales",
];

function CrearExperiencia() {
	const [page, setPage] = useState(0); // Manage the current page state

	const [formValues, setFormValues] = useState({
		idUF: null, // Se trae de InfoExperiencia
		idSala: null,
		nombre: "", // Se trae de InfoExperiencia
		descripcion: "",
		esAutoDirigida: null, // Se debe calcular en base a tipoExperiencia
		esExclusivaUF: null, // Se debe calcular en base a tipoExperiencia
		portadaURL: "",
		fechaInicio: null,
		fechaFin: null,
		instruccionesURL: "",
		tipoExperiencia: null, // Se trae de InfoExperiencia
		instruccionesFile: null, // Se trae de InfoExperiencia
		portadaFile: null, 
	});

	// Callback function to update formValues state
	const handleInfoExperienciaChange = (updatedValues) => {
		setFormValues((prevFormValues) => ({
			...prevFormValues,
			...updatedValues,
		}));
		console.log(formValues);
	};

	function handleSiguiente() {
		if (page < steps.length - 1) {
			setPage((prevPage) => prevPage + 1); // Move to the next page
		} else {
			// Final action on the last page
			console.log("Submit");
		}
	}

	function handleStepClick(index) {
		setPage(index); // Move to the clicked step
	}

	return (
		<>
			<NavBarAdmin />
			<Navbar view="soloPerfil"/>
			<div className="contenedor-principal-crear-experiencia">
				<div className="contenido-crear-experiencia">
					<Stepper
						activeStep={page}
						alternativeLabel
						className="custom-stepper"
					>
						{steps.map((label, index) => (
							<Step
								key={index}
								onClick={() => handleStepClick(index)}
								className={`custom-step ${page == index ? "completed" : ""}`}
							>
								<StepLabel className="custom-step-label">{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<div className={`page page-1 ${page === 0 ? "active" : "inactive"}`}>
						{" "}
						{/* Página 1 */}
						<div className="portada-tipo-selector-crear-experiencia">
							<InfoExperiencia onInfoChange={handleInfoExperienciaChange}/>
							<AgregarPortada onInfoChange={handleInfoExperienciaChange}/>
						</div>
					</div>
					<div className={`page page-2 ${page === 1 ? "active" : "inactive"}`}>
						<div>Page 2 Content</div>
					</div>
					<div className={`page page-3 ${page === 2 ? "active" : "inactive"}`}>
						<div>Page 3 Content</div>
					</div>
					<div className="button-container-crear-experiencia">
						<RoundedButton
							text={page === steps.length - 1 ? "PUBLICAR" : "CONTINUAR"}
							onClick={handleSiguiente}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default CrearExperiencia;
