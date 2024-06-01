import { Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineClose } from "react-icons/ai"; // Import the close icon and file icon
import { FiFile, FiUpload } from "react-icons/fi";
import "./InfoExperiencia.css";

function InfoExperiencia() {
	const [caracteresRestantesNom, setCaracteresRestantesNom] = useState(30);
	const [nombre, setNombre] = useState("");
	const [tipoExperiencia, setTipoExperiencia] = useState("");
	const [file, setFile] = useState(null);

	function handleNombreChange(event) {
		setNombre(event.target.value);
		setCaracteresRestantesNom(30 - event.target.value.length);
	}

	function handleTipoExperienciaChange(event) {
		setTipoExperiencia(event.target.value);
	}

	const onDrop = useCallback((acceptedFiles) => {
		if (acceptedFiles.length > 0) {
			setFile(acceptedFiles[0]);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: "image/*,application/pdf,.doc,.docx",
		multiple: false, // Only allow one file
	});

	const removeFile = () => {
		setFile(null);
	};

	return (
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
			<div className="footer-input-crear-experiencia">
				({caracteresRestantesNom} caracteres restantes)
			</div>
			<p className="text-white">Tipo de experiencia</p>
			<Select
				className="mb-3"
				aria-label="Tipo de experiencia"
				placeholder="Selecciona un tipo"
				value={tipoExperiencia}
				onChange={handleTipoExperienciaChange}
				data-cy="selector-tipo-exp"
			>
				<SelectItem value="Autodirigida" key="Autodirigida">
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
					>
						<SelectItem value="UF1">UF1</SelectItem>
						<SelectItem value="UF2">UF2</SelectItem>
					</Select>
				</>
			)}

			{tipoExperiencia === "Autodirigida" && (
				<>
					<p className="text-white">Adjuntar instrucciones</p>
					{file ? (
						<div className="file-preview">
							<div className="file-details">
								<FiFile className="file-icon" />
								<div className="file-name-instrucciones">
									<p>{file.name}</p>
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
								height: "25%"
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

export default InfoExperiencia;
