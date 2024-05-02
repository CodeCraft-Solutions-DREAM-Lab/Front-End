import React, { useState, useEffect } from "react";
import "./BotonSolicitar.css";


function BotonSolicitar(props){
    return(
        <button data-cy="boton-solicitar-detalles" className="boton-solicitar" onClick={props.onClick}>
            {props.nombreBoton}
        </button>
    )
}

export default BotonSolicitar;