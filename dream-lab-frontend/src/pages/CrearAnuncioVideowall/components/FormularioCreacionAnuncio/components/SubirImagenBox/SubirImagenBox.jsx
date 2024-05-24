import React, { useRef, useState } from "react";
import "./SubirImagenBox.css";

function SubirImagenBox(props) {
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [invalidFile, setInvalidFile] = useState(false);

    const handleBoxClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (isValidFileType(file)) {
                const imageUrl = URL.createObjectURL(file);
                setSelectedImage(imageUrl);
                props.onFileSelected(file);
                setInvalidFile(false);
                props.onInvalidFileChange(false); // Aquí pasamos false ya que el archivo es válido
            } else {
                setInvalidFile(true);
                props.onInvalidFileChange(true); // Aquí pasamos true ya que el archivo es inválido
            }
        }
    };

    const isValidFileType = (file) => {
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/gif",
        ];
        return allowedTypes.includes(file.type);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            if (isValidFileType(file)) {
                const imageUrl = URL.createObjectURL(file);
                setSelectedImage(imageUrl);
                props.onFileSelected(file);
                setInvalidFile(false);
                props.onInvalidFileChange(false); // Aquí pasamos false ya que el archivo es válido
            } else {
                setInvalidFile(true);
                setSelectedImage(false);
                props.onInvalidFileChange(true); // Aquí pasamos true ya que el archivo es inválido
            }
        }
    };

    return (
        <div
            className="subir-imagen-box-div"
            onClick={handleBoxClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <input
                type="file"
                accept=".jpg, .jpeg, .png, .webp, .gif"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                data-cy="subir-imagen-anuncio-personalizado"
            />
            <div className="image-container">
                {selectedImage && !invalidFile && (
                    <img
                        src={selectedImage}
                        alt="Foto"
                        className="imagen-seleccionada"
                    />
                )}
                <div className="placeholder">
                    <React.Fragment>
                        <div className="icono-sube-imagen-div">
                            <img
                                className="icono-sube-imagen"
                                src={props.imagen}
                                alt=""
                            />
                        </div>
                        <div className="textos-subir-imagen-contenedor">
                            <div className="titulo-sube-imagen">
                                <h1 data-cy="titulo-subir-foto-box-videowall">{props.titulo}</h1>
                            </div>
                            <div className="advertencia-sube-imagen">
                                <h1>{props.advertencia}</h1>
                            </div>
                        </div>
                    </React.Fragment>
                </div>
            </div>
        </div>
    );
}

export default SubirImagenBox;
