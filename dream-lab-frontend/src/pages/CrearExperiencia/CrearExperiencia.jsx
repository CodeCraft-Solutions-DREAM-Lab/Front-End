import { useState } from "react";
import Navbar from "../../GlobalComponents/NavBar/NavBar";
import NavBarAdmin from "../../GlobalComponents/NavBarAdmin/NavBarAdmin";
import RoundedButton from "../SeleccionMaterial/components/Button/Button";
import "./CrearExperiencia.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import GlassCard from "../../GlobalComponents/GlassCard/GlassCard";
import { DatePicker, Select, SelectItem } from "@nextui-org/react";
import SubirImagenBox from "../CrearAnuncioVideowall/components/FormularioCreacionAnuncio/components/SubirImagenBox/SubirImagenBox";
import AgregarImagen from "src/assets/CrearAnuncioVideowall/agregarImagen.webp";
import AgregarImagenError from "src/assets/CrearAnuncioVideowall/subirArchivoErroneo.png";
import { Input } from "@nextui-org/react";

const steps = [
	"Crea tu experiencia",
	"Agrega detalles",
	"Recomienda materiales",
];

function CrearExperiencia() {
	const [page, setPage] = useState(0); // Manage the current page state
	const [fileSeleccionado, setFileSeleccionado] = useState(null);
	const [isInvalidFile, setIsInvalidFile] = useState(false);
	const [caracteresRestantesNom, setCaracteresRestantesNom] = useState(30);
	const [nombre, setNombre] = useState("");

	function handleSiguiente() {
		if (page < steps.length - 1) {
			setPage((prevPage) => prevPage + 1); // Move to the next page
		} else {
			// Final action on the last page
			console.log("Final action");
		}
	}

	function handleStepClick(index) {
		setPage(index); // Move to the clicked step
	}

	function handleNombreChange() {
		setNombre(event.target.value);
		setCaracteresRestantesNom(30 - event.target.value.length);
	}

	const handleInvalidFileChange = (invalid) => {
		setIsInvalidFile(invalid);
	};

	const handleFileSelected = (file) => {
		// Manejar el archivo seleccionado aquí, por ejemplo, almacenarlo en el estado del formulario
		setFileSeleccionado(file);
		console.log("Archivo seleccionado:", file);
	};

	return (
		<>
			<NavBarAdmin />
			<Navbar />
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
							<GlassCard classes="dropdowns-container-crear-experiencia">
								<p className="text-white">Nombre de la experiencia</p>
								<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
									<Input
										type="text"
										aria-label="Nombre de experiencia"
										placeholder="Nombre de experiencia"
										onChange={handleNombreChange}
										maxLength={30}
										value={nombre}
										data-cy="input-nombre-exp"
									/>
								</div>
								<div className="footer-input-formulario-anuncio">
									({caracteresRestantesNom} caracteres restantes)
								</div>
								<p className="text-white">Tipo de experiencia</p>
								<Select
									className="mb-3 "
									aria-label="Tipo de experiencia"
									placeholder="Selecciona un tipo"
									data-cy="selector-tipo-exp"
								>
									<SelectItem>Autodirigida</SelectItem>
									<SelectItem>Unidad de Formación</SelectItem>
								</Select>
							</GlassCard>
							<GlassCard classes="subir-portada-container-crear-experiencia">
								<p className="titulo-portada-crear-exp">Portada</p>
								<SubirImagenBox
									imagen={isInvalidFile ? AgregarImagenError : AgregarImagen}
									titulo={
										isInvalidFile ? "Archivo inválido" : "Sube una imagen"
									}
									advertencia={
										isInvalidFile
											? "Formatos aceptados = " +
											  "jpg / jpeg / png / webp / gif"
											: "Resolución recomendada: 2880 x 2160"
									}
									onFileSelected={handleFileSelected} // Asegúrate de que handleFileSelected sea una función definida en el componente padre
									onInvalidFileChange={handleInvalidFileChange}
								/>
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
