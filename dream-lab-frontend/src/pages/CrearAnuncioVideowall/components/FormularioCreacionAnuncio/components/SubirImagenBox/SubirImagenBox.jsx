import React, { useRef, useState } from "react";
import "./SubirImagenBox.css";

function SubirImagenBox(props) {
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleBoxClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // URL de la imagen seleccionada
            setSelectedImage(imageUrl); // Actualizar el estado con la URL de la imagen
            //props.onFileSelected(file); // Pasar el archivo seleccionado al componente padre si es necesario
        }
    };

    return (
        <div className="subir-imagen-box-div" onClick={handleBoxClick}>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <div className="image-container">
                {selectedImage && (
                    <img src={selectedImage} alt="Foto" className="imagen-seleccionada" /> // Mostrar la imagen seleccionada
                )}
                {!selectedImage && (
                    // Mostrar el contenido predeterminado si no se ha seleccionado una foto
                    <div className="placeholder">
                        <div className="icono-sube-imagen-div">
                            <img className="icono-sube-imagen" src={props.imagen} alt="" />
                        </div>
                        <div className="textos-subir-imagen-contenedor">
                            <div className="titulo-sube-imagen">
                                <h1>{props.titulo}</h1>
                            </div>
                            <div className="advertencia-sube-imagen">
                                <h1>{props.advertencia}</h1>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SubirImagenBox;
