import React from "react";
import "./BotonAgregar.css";


function BotonAgregar(props) {
    return (
        <div className="boton-agregar-div" onClick={props.funcion}>
            <h1 className="boton-agregar-texto">{props.texto}Agregar</h1>
        </div>
    );
}

export default BotonAgregar;