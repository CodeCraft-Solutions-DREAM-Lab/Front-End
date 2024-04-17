import { Card, Button } from "@nextui-org/react";
import { Grid } from "@mui/material";
import FechaFormulario from "./components/FechaFormulario";
import PrimerRecordatorio from "./components/PrimerRecordatorio";
import TextoFecha from "./components/TextoFecha";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Reservaciones/SelectorSala.css";
import NavBar from "../components/general/NavBar";
import Slider from "./Slider";
import imagePlaceholder from "./components/3D-model-placeholder.png";

import { getFromSessionStorage } from "../Global/Storage";

function SelectorSala(props) {
	let navigate = useNavigate();

	const [isFirstReminderOpen, setIsFirstReminderOpen] = useState(false);
	const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		if (
			!getFromSessionStorage("fecha") ||
			!getFromSessionStorage("horaInicio") ||
			!getFromSessionStorage("duration")
		) {
			setIsNextButtonDisabled(true);
		} else {
			setIsNextButtonDisabled(false);
		}
	}, [update]);

	return (
		<div>
            <NavBar view="soloPerfil" autoHide={false} />
			<div className="container">
				{/* Contenedor principal */}
				<div className="card-container">
					{/* Sección de la izquierda */}

                    {/* Nombre de la sala */}
					<div>
						<h1>Nombre de la sala</h1>
					</div>
                    <Slider minimo="1" maximo="8"/>
                    <img src={imagePlaceholder} ></img> {/* Placeholder del modelo 3D */}
				</div>
				<div className="form-container">
					{" "}
					{/* Sección de la derecha */}
					<PrimerRecordatorio
						isOpen={isFirstReminderOpen}
						size="lg"
						onClose={() => {
							setIsFirstReminderOpen(false);
						}}
						onOk={() => {
							setIsFirstReminderOpen(false);
							navigate("/reservacion/resumen");
						}}
					/>
					<FechaFormulario update={update} setUpdate={setUpdate} />
					<TextoFecha update={update} />
					<div className="button-container">
						{" "}
						{/* Button container div */}
						<Button
							className="mt-4 px-2 justify-self-center"
							onClick={() => {
								setIsFirstReminderOpen(true);
							}}
							disabled={isNextButtonDisabled}
						>
							Aceptar
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SelectorSala;
