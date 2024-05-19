import React, { useRef, useState } from "react";
import "./SubirImagenBox.css";
import { uploadFile } from "../../../../../../firebase/config";

function SubirImagenBox(props) {
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleBoxClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            props.onFileSelected(file); // Llamar a la función de devolución de llamada para pasar el archivo al padre
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
                // onChange={console.log(e.target.files[0])}
            />
            <div className="image-container">
                {selectedImage && (
                    <img src={selectedImage} alt="Foto" className="imagen-seleccionada" />
                )}
                {!selectedImage && (
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
