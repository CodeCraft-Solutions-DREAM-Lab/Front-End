import React from "react";
import "./BotonModal.css";

function BotonModal(props) {
    let claseBoton, cypressBoton;

    if (props.tipoBoton === "Aceptar") {
        claseBoton = "boton-modal-exterior-aceptar";
        cypressBoton = "boton-aceptar-modal-cancelacion";
    } else if (props.tipoBoton === "Cancelar") {
        claseBoton = "boton-modal-exterior-cancelar";
        cypressBoton = "boton-cancelar-modal-cancelacion";
    } else if (props.tipoBoton === "CancelarFinal") {
        claseBoton = "boton-modal-exterior-cancelar-final";
        cypressBoton = "boton-cancelar-final-modal-cancelacion";
    }

    return (
        <div className={claseBoton} onClick={props.funcion} data-cy={cypressBoton}>
            <h1>{props.nombre}</h1>
        </div>
    );
}

export default BotonModal;
