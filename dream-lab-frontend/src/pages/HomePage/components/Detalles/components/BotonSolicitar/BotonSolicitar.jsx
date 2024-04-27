import React, { useState, useEffect } from "react";
import "./BotonSolicitar.css";


function BotonSolicitar(props){
    return(
        <button className="boton-solicitar" onClick={props.onClick}>
            {props.nombreBoton}
        </button>
    )
}

export default BotonSolicitar;