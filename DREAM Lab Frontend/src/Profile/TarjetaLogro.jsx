import React, { useState, useEffect, useRef } from "react";
import './TarjetaLogro.css'
import LogoBigDreamer from '../Home/Images/bigDreamer.png'
import BarraProgreso from "./BarraProgreso";
import IconoLogro from "./IconoLogro";



function TarjetaLogro(props){{

    const logroObtenido = props.progresoLogro >= '1' ? true : false

    return(
        <div className="div-exterior-logro">
            
            <div className="icono-logro">
                <IconoLogro icono={props.iconoUtilizado} logroDesbloqueado={logroObtenido} colorFondo={props.colorFondo}/>
            </div>

            <div className="div-info-logro">
                <h1 className= {logroObtenido ? "nombre-logro-desbloqueado" : "nombre-logro-bloqueado"}>{props.nombreLogro}</h1>
                <h2 className="descripcion-logro">{props.descripcion}</h2>

                <BarraProgreso progresoActual={props.progresoLogro}/>

            </div>
            
            

        </div>
    )
}}  

export default TarjetaLogro;