import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineClose } from "react-icons/ai"; // Import the close icon and file icon
import { FiFile, FiUpload } from "react-icons/fi";
import PropTypes from "prop-types";
import { get } from "src/utils/ApiRequests";

import "./InfoExperiencia.css";

const mockUFs = {
	data: [
		{
			idUF: 1,
			nombreUF: "Unidad de Fomento 1",
		},
		{
			idUF: 2,
			nombreUF: "Unidad de Fomento 2",
		},
		{
			idUF: 3,
			nombreUF: "Unidad de Fomento 3",
		},
		{
			idUF: 4,
			nombreUF: "Unidad de Fomento 4",
		},
		{
			idUF: 5,
			nombreUF: "Unidad de Fomento 5",
		},
	],
};

function InfoExperiencia({ onInfoChange }) {
	const [caracteresRestantesNom, setCaracteresRestantesNom] = useState(30);
	const [nombre, setNombre] = useState("");
	const [tipoExperiencia, setTipoExperiencia] = useState("");
	const [instrucciones, setInstrucciones] = useState(null);
	const [UF, setUF] = useState(null);
	const [ufs, setUfs] = useState([]); // State to store fetched UFs

	// useEffect to fetch UFs
	useEffect(() => {
        get("ufs")
            .then((result) => {
                setUfs(result);
            })
            .catch((error) => {
                console.error("Error fetchign ufs:", error);
            });
    }, []);

	// Function to handle changes in nombre
	function handleNombreChange(event) {
		setNombre(event.target.value);
		setCaracteresRestantesNom(30 - event.target.value.length);
		// Call the callback function with updated nombre
		onInfoChange({ nombre: event.target.value });
	}
	// Function to handle changes in UF
	function handleUFChange(event) {
		setUF(event.target.value)
		onInfoChange({
			idUF: event.target.value,
		});
	}

	// Function to handle changes in tipoExperiencia
	function handleTipoExperienciaChange(event) {
		setTipoExperiencia(event.target.value);
		// Call the callback function with updated tipoExperiencia
		onInfoChange({ tipoExperiencia: event.target.value, idUF: null });
	}

	// Function to handle file drop
	const onDrop = useCallback(
		(acceptedFiles) => {
			if (acceptedFiles.length > 0) {
				const file = acceptedFiles[0];
				// Call the callback function with the file
				setInstrucciones(file);
				onInfoChange({ instruccionesFile: file });
			}
		},
		[onInfoChange]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: "image/*,application/pdf,.doc,.docx",
		multiple: false, // Only allow one file
	});

	const removeFile = () => {
		setInstrucciones(null);
		onInfoChange({ instruccionesFile: null });
	};

	return (
		<GlassCard classes="dropdowns-container-crear-experiencia">
			<p className="text-white">Nombre de la experiencia*</p>
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
			<div className="footer-input-crear-experiencia">
				({caracteresRestantesNom} caracteres restantes)
			</div>
			<p className="text-white">Tipo de experiencia*</p>
			<Select
				className="mb-3"
				aria-label="Tipo de experiencia"
				placeholder="Selecciona un tipo"
				value={tipoExperiencia}
				onChange={handleTipoExperienciaChange}
				data-cy="selector-tipo-exp"
			>
				<SelectItem value="Autodirigida" key="Autodirigida" data-cy="input-tipo-exp">
					Autodirigida
				</SelectItem>
				<SelectItem value="Unidad de Formación" key="Unidad de Formación">
					Unidad de Formación
				</SelectItem>
			</Select>

			{tipoExperiencia === "Unidad de Formación" && (
				<>
					<p className="text-white">Unidad de Formación</p>
					<Select
						className="mb-3"
						aria-label="Unidad de Formación"
						placeholder="Selecciona una UF"
						data-cy="selector-uf-exp"
						onChange={handleUFChange}
						value={UF}
					>
						{ufs.map((uf) => (
							<SelectItem key={uf.idUF} value={uf.idUF}>
								{uf.nombre}
							</SelectItem>
						))}
					</Select>
				</>
			)}

			{tipoExperiencia === "Autodirigida" && (
				<>
					<p className="text-white">Adjuntar instrucciones</p>
					{instrucciones ? (
						<div className="file-preview">
							<div className="file-details">
								<FiFile className="file-icon" />
								<div className="file-name-instrucciones">
									<p>{instrucciones.name}</p>
								</div>
							</div>
							<AiOutlineClose className="remove-icon" onClick={removeFile} />
						</div>
					) : (
						<div
							{...getRootProps({ className: "dropzone" })}
							style={{
								padding: "15px",
								border: "2px dashed #ccc",
								borderRadius: "10px",
								textAlign: "center",
								cursor: "pointer",
								color: "white",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "10px",
								height: "25%",
							}}
						>
							<input {...getInputProps()} />
							{isDragActive ? (
								<p>Suelta tu archivo aquí...</p>
							) : (
								<>
									<FiUpload className="upload-icon" />
									<p>
										Arrastra y suelta tu archivo aquí, o haz clic para
										seleccionarlo
									</p>
								</>
							)}
						</div>
					)}
				</>
			)}
		</GlassCard>
	);
}

InfoExperiencia.propTypes = {
	onInfoChange: PropTypes.func.isRequired,
};

export default InfoExperiencia;
