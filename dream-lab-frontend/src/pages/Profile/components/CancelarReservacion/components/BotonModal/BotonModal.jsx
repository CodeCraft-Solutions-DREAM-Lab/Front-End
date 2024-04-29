import React from "react";
import "./BotonModal.css";

function BotonModal(props) {
    let claseBoton;

    if (props.tipoBoton === "Aceptar") {
        claseBoton = "boton-modal-exterior-aceptar";
    } else if (props.tipoBoton === "Cancelar") {
        claseBoton = "boton-modal-exterior-cancelar";
    }

    return (
        <div className={claseBoton} onClick={props.funcion}>
            <h1>{props.nombre}</h1>
        </div>
    );
}

export default BotonModal;
