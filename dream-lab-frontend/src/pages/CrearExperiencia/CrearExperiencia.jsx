import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "src/GlobalComponents/NavBar/NavBar";
import NavBarAdmin from "src/GlobalComponents/NavBarAdmin/NavBarAdmin";
import RoundedButton from "src/pages/SeleccionMaterial/components/Button/Button";
import "src/pages/CrearExperiencia/CrearExperiencia.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import InfoExperiencia from "src/pages/CrearExperiencia/components/InfoExperiencia";
import AgregarPortada from "./components/AgregarPortada";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DetalleExperiencia from "src/pages/CrearExperiencia/components/DetalleExperiencia";
import MaterialesRecomendados from "src/pages/MaterialesRecomendados/MaterialesRecomendados";
import { uploadFile } from "../../firebase/config";
import { getFromSessionStorage } from "../../utils/Storage";
import { post } from "src/utils/ApiRequests";
import { useNavigate } from "react-router-dom";
import { selectRol } from "src/redux/Slices/userSlice";

const steps = [
	"Crea tu experiencia",
	"Agrega detalles",
	"Recomienda materiales",
];

function CrearExperiencia() {
	const [page, setPage] = useState(0); // Manage the current page state
	const navigate = useNavigate();

    const rol = useSelector(selectRol);

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
		portadaFile: null, // Se trae de AgregarPortada
		materialesExperiencia: null,
	});

	const [alertOpen, setAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	const handleOpenSnackbar = (message) => {
		setAlertMessage(message);
		setAlertOpen(true);
	};

	// Callback function to update formValues state
	const handleInfoExperienciaChange = (updatedValues) => {
		console.log(updatedValues);
		setFormValues((prevFormValues) => ({
			...prevFormValues,
			...updatedValues,
		}));
		//console.log(formValues);
	};

	// Submit form
	async function handleSubmit() {
		try {
			const materialesExperiencia = getFromSessionStorage(
				"materialesExperiencia"
			);
			const idSala = sessionStorage.getItem("idSala");

			// Upload portadaFile
			const portadaURL = await uploadFile(formValues.portadaFile);
			var instruccionesURL = null;
			console.log(portadaURL);
			// Upload instruccionesFile
			if (!(formValues.instruccionesFile === null)) {
				instruccionesURL = await uploadFile(formValues.instruccionesFile);
				console.log(instruccionesURL);
			}

			if (formValues.tipoExperiencia === "Autodirigida") {
				formValues.esAutoDirigida = 1;
				formValues.esExclusivaUF = 0;
			} else {
				formValues.esAutoDirigida = 0;
				formValues.esExclusivaUF = 1;
			}

			// Update formValues with calculates values
			handleInfoExperienciaChange({
				portadaURL: portadaURL,
				instruccionesURL: instruccionesURL,
				idSala: idSala,
				materialesExperiencia: materialesExperiencia,
			});
			const formSend = {
				...formValues,
				portadaURL: portadaURL,
				instruccionesURL: instruccionesURL,
				idSala: idSala,
				materialesExperiencia: materialesExperiencia
			}
			console.log(formSend)
			// Post request to the Experiencias table
			await post("experiencias/crear", formSend);
			// Handle the response

			handleOpenSnackbar("Experiencia creada exitosamente!");
			navigate("/admin");
		} catch (error) {
			console.error("Error al subir archivos o crear experiencia:", error);
			handleOpenSnackbar("Error al subir archivos o crear experiencia.");
		}
	}

	// Callback function to move to the next page
	function handleSiguiente() {
		if (page < steps.length - 1) {
			// Check if required fields are filled before moving to the next page
			if (
				page === 0 &&
				(!formValues.nombre ||
					!formValues.tipoExperiencia ||
					!formValues.portadaFile)
			) {
				handleOpenSnackbar("Porfavor llena los campos requeridos.");
				return;
			}
			setPage((prevPage) => prevPage + 1); // Move to the next page
		} else {
			// Final action on the last page
			console.log("Submit");
			// Upload files
			handleSubmit();
		}
	}

	function handleStepClick(index) {
		setPage(index); // Move to the clicked step
	}

	return (
		<>
			{rol === 'Admin' ? <NavBarAdmin /> : <Navbar view="soloPerfil" autoHide={false}/>}

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
							<InfoExperiencia onInfoChange={handleInfoExperienciaChange} />
							<AgregarPortada onInfoChange={handleInfoExperienciaChange} />
						</div>
					</div>
					<div className={`page page-2 ${page === 1 ? "active" : "inactive"}`}>
						<div>
							<DetalleExperiencia onInfoChange={handleInfoExperienciaChange} />
						</div>
					</div>
					<div className={`page page-3 ${page === 2 ? "active" : "inactive"}`}>
						<div>
							<MaterialesRecomendados />
						</div>
					</div>
					<div className="button-container-crear-experiencia">
						<RoundedButton
							text={page === steps.length - 1 ? "PUBLICAR" : "CONTINUAR"}
							onClick={handleSiguiente}
						/>
					</div>
					<Snackbar
						open={alertOpen}
						autoHideDuration={6000}
						onClose={() => setAlertOpen(false)}
					>
						<MuiAlert
							onClose={() => setAlertOpen(false)}
							severity="info"
							sx={{
								width: "100%",
								backgroundColor: "#f8f8f8",
								color: "grey",
								borderRadius: "15px",
							}}
						>
							{alertMessage}
						</MuiAlert>
					</Snackbar>
				</div>
			</div>
		</>
	);
}

export default CrearExperiencia;
