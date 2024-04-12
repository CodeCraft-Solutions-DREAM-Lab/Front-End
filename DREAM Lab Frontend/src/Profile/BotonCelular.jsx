import React, { useState, useEffect, useRef } from "react";
import './BotonCelular.css'
import { button } from "@nextui-org/react";
import ImagenEstrella from "../Home/Images/estrella.jpg"
import ImagenFlecha from "../Home/Images/flecha.png"
import ImagenCalendario from "../Home/Images/calendario2.png"


function BotonCelular(props){

    return(
        <div className="boton-celular">
            <img className="imagen-boton" src={props.imagen === "logros" ? ImagenEstrella : ImagenCalendario} alt="Imagen de botón" />
            <h1 className="texto-boton">{props.texto}</h1>
            <img className="imagen-flecha" src={ImagenFlecha} alt="Imagen de flecha" />
        </div>
    )
}

export default BotonCelular;