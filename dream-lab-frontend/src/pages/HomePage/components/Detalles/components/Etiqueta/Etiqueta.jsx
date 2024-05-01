import React, { useState, useEffect } from "react";
import './Etiqueta.css';

function Etiqueta(props) {
    let color;
    if (props.tipo === "autodirigido") {
        color = "#0071B1"; 
    } else if (props.tipo === "exclusivo-uf") {
        color = "green"; 
    } else {
        color = "black"; 
    }

    return (
        <div data-cy="etiqueta-sala-experiencia" className="etiqueta-div" style={{ color: color }}>
            <p>{props.nombre}</p>
        </div>
    );
}


export default Etiqueta;