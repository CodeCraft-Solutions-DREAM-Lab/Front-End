import { useState } from "react";
import Navbar from "src/GlobalComponents/NavBar/NavBar";
import NavBarAdmin from "src/GlobalComponents/NavBarAdmin/NavBarAdmin";
import RoundedButton from "src/pages/SeleccionMaterial/components/Button/Button";
import "./CrearExperiencia.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";
import SubirImagenBox from "src/pages/CrearAnuncioVideowall/components/FormularioCreacionAnuncio/components/SubirImagenBox/SubirImagenBox";
import AgregarImagen from "src/assets/CrearAnuncioVideowall/agregarImagen.webp";
import AgregarImagenError from "src/assets/CrearAnuncioVideowall/subirArchivoErroneo.png";
import InfoExperiencia from "./components/InfoExperiencia";

const steps = [
	"Crea tu experiencia",
	"Agrega detalles",
	"Recomienda materiales",
];

function CrearExperiencia() {
	const [page, setPage] = useState(0); // Manage the current page state

	const [formValues, setFormValues] = useState({
		idUF: null,
		idSala: null,
		nombre: "",
		descripcion: "",
		esAutoDirigida: null,
		esExclusivaUF: null,
		portadaURL: "",
		fechaInicio: null,
		fechaFin: null,
		instruccionesURL: "",
		tipoExperiencia: null,
		instruccionesFile: null,
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
							<GlassCard classes="subir-portada-container-crear-experiencia">
								<p className="titulo-portada-crear-exp">Portada</p>
								Subir imagen
							</GlassCard>
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
