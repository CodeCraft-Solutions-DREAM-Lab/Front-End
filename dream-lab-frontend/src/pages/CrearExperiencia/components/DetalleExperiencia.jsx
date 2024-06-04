import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";
import "./DetalleExperiencia.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { Textarea } from "@nextui-org/input";

function DetalleExperiencia({ onInfoChange }) {
	const [description, setDescription] = useState("");
	const [fechaInicio, setFechaInicio] = useState("");
	const [fechaFin, setFechaFin] = useState("");
	const [caracteresRestantesDes, setCaracteresRestantesDes] = useState(300);

	function handleFechaInicioChange(event) {
		setFechaInicio(event.target.value);
		onInfoChange({ fechaInicio: event.target.value });
	}

	function handleFechaFinChange(event) {
		setFechaFin(event.target.value);
		onInfoChange({ fechaFin: event.target.value });
	}

	function handleDescriptionChange(event) {
		setDescription(event.target.value);
		setCaracteresRestantesDes(300 - event.target.value.length);
		onInfoChange({ descripcion: event.target.value });
	}

	return (
		<>
			<GlassCard classes="descripcion-container-crear-experiencia">
				<p className="text-white">Descripción</p>
				<div className="flex flex-wrap md:flex-nowrap gap-4">
					<Textarea
						aria-label="Descripción de experiencia"
						placeholder="Añade una descripción"
						onChange={handleDescriptionChange}
						maxLength={300}
						value={description}
						autoResize // Enable auto resizing for text wrapping
						className="input-desc-exp"
						data-cy="input-dexc-exp"
					/>
				</div>
				<div className="footer-input-crear-experiencia">
					({caracteresRestantesDes} caracteres restantes)
				</div>
			</GlassCard>
		</>
	);
}

DetalleExperiencia.propTypes = {
	onInfoChange: PropTypes.func.isRequired,
};

export default DetalleExperiencia;
