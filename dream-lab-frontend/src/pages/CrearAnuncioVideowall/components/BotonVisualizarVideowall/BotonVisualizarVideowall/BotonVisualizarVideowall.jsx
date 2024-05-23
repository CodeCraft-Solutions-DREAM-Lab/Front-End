import React from "react";
import "./BotonVisualizarVideowall.css";

function BotonVisualizarVideowall(props) {

    return (
        <div className="div-exterior-boton-visualizar-videowall" onClick={props.ruta} target="_blank" data-cy="boton-visualizar-videowall">
            <div className="contenedor-visualizar-videowall">
                <img className="logo-expandir-pantalla" src={props.imagenIzq} alt="Abrir pantalla" />
                <h1 className="texto-boton-visualizar-videowall">{props.frase}</h1>
                <img className="logo-flecha-siguiente" src={props.imagenDer} alt="Abrir pantalla" />
            </div>
        </div>
    );
}

export default BotonVisualizarVideowall;