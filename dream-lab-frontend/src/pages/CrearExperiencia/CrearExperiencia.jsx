import { useState } from "react";
import Navbar from "../../GlobalComponents/NavBar/NavBar";
import NavBarAdmin from "../../GlobalComponents/NavBarAdmin/NavBarAdmin";
import RoundedButton from "../SeleccionMaterial/components/Button/Button";
import "./CrearExperiencia.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Crea tu experiencia", "Agrega detalles", "Recomienda materiales"];

function CrearExperiencia() {
	const [page, setPage] = useState(0); // Manage the current page state
    

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

	return (
		<>
			<NavBarAdmin />
			<Navbar />
			<div className="contenedor-principal-crear-experiencia">
				<div className="contenido-crear-experiencia">
					<Stepper activeStep={page} alternativeLabel className="custom-stepper">
						{steps.map((label, index) => (
							<Step key={index} onClick={() => handleStepClick(index)}>
								<StepLabel className="custom-step-label">{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<div className={`page page-1 ${page === 0 ? "active" : "inactive"}`}>
						<div>Page 1 Content</div>
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
