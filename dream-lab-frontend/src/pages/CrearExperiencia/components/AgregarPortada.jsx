import { useState, useCallback } from "react";
import GlassCard from "src/GlobalComponents/GlassCard/GlassCard";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { AiOutlineClose } from "react-icons/ai";
import AgregarImagen from "src/assets/CrearAnuncioVideowall/agregarImagen.webp";
import AgregarImagenError from "src/assets/CrearAnuncioVideowall/subirArchivoErroneo.png";

import "./AgregarPortada.css";

function AgregarPortada({ onInfoChange }) {
	const [portada, setPortada] = useState(null);
	const [portadaUrl, setPortadaUrl] = useState(null);
	const [error, setError] = useState("");

	const onDrop = useCallback(
		(acceptedFiles, rejectedFiles) => {
			if (rejectedFiles.length > 0) {
				setError("Solo se pueden subir imágenes");
			} else if (acceptedFiles.length > 0) {
				const file = acceptedFiles[0];
				if (file.type.startsWith("image/")) {
					const imageUrl = URL.createObjectURL(file);
					setPortada(file);
					setPortadaUrl(imageUrl);
					setError("");
					onInfoChange({ portadaFile: file });
				} else {
					setError("Archivo inválido");
				}
			}
		},
		[onInfoChange]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: "image/*",
		multiple: false,
	});

	const removeFile = () => {
		setPortada(null);
		setPortadaUrl(null);
		onInfoChange({ portadaFile: null });
	};

	return (
		<GlassCard classes="subir-portada-container-crear-experiencia">
			<p className="titulo-portada-crear-exp">Portada*</p>
			{portada ? (
				<div className="file-preview-portada">
					<img
						src={portadaUrl}
						alt="Portada"
						className="imagen-seleccionada-portada"
					/>
					<AiOutlineClose
						className="remove-icon-portada"
						onClick={removeFile}
					/>
				</div>
			) : (
				<div
					{...getRootProps({ className: "dropzone-portada" })}
					style={{
						padding: "15%",
						border: "2px dashed #ccc",
						borderRadius: "10px",
						textAlign: "center",
						cursor: "pointer",
						color: "white",
						display: "flex",
                        flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: "10px",
						height: "90%",
						width: "80%",
						backgroundColor: "rgba(0, 0, 0, 0.228)",
					}}
				>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p>Suelta tu imagen aquí...</p>
					) : (
						<>
							<div className="upload-icon-portada">
								<img src={AgregarImagen} />
							</div>
							<div className="upload-icon-portada-texto">
								<p>Subir imagen</p>
							</div>
						</>
					)}
				</div>
			)}
			{error && (
				<div className="error-message-portada">
					<img
						src={AgregarImagenError}
						alt="Error"
						className="error-icon-portada"
					/>
					<p>{error}</p>
				</div>
			)}
		</GlassCard>
	);
}

AgregarPortada.propTypes = {
	onInfoChange: PropTypes.func.isRequired,
};

export default AgregarPortada;
