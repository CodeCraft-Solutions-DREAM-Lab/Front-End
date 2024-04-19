import React from "react";
import './BotonNodal.css'

function BotonNodal(props) {

    let claseBoton;

    if (props.tipoBoton === "Aceptar") {
        claseBoton = "boton-nodal-exterior-aceptar";
    } else if (props.tipoBoton === "Cancelar"){
        claseBoton = "boton-nodal-exterior-cancelar";
    }

    return (
        <div className={claseBoton} onClick={props.funcion}>
            <h1>{props.nombre}</h1>
        </div>
    );
}

export default BotonNodal;