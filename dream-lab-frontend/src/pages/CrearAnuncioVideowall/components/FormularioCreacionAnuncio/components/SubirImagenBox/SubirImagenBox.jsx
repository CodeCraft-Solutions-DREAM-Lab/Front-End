import React from "react";
import "./SubirImagenBox.css";

function SubirImagenBox(props) {
    return (
        <div className="subir-imagen-box-div" onClick={props.funcion}>

            <div className="icono-sube-imagen-div"><img className="icono-sube-imagen" src={props.imagen} alt="" /></div>
            
            <div className="textos-subir-imagen-contenedor">
                <div className="titulo-sube-imagen"><h1>{props.titulo}</h1></div>
                <div className="advertencia-sube-imagen"><h1>{props.advertencia}</h1></div>
            </div>

        </div>
    );
}

export default SubirImagenBox;