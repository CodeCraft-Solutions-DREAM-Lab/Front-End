import React, { useState, useEffect, useRef } from "react";
import './CancelarReservacion.css';
import errorLogo from "../Home/Images/errorLogo.png"
import BotonNodal from "./BotonNodal"

function CancelarReservacion(props){
    return(
        <div className="blur-space">
            <div className="nodal-blanco">

                <div className="logo-nodal-out"><div className="logo-nodal"><img src={errorLogo} alt="Icono de notificación" /></div></div>
                <h1 className="titulo1-nodal">{props.titulo1}</h1>
                <h1 className="titulo2-nodal">{props.titulo2}</h1>
                <h1 className="titulo3-nodal">{props.titulo3}</h1>
                <h1 className="titulo4-nodal">{props.titulo4}</h1>
                
                <div className="botones-cancelacion">
                    <BotonNodal tipoBoton="Cancelar" nombre="Si, cancelar" funcion={props.funcionRojo}/>
                    <BotonNodal tipoBoton="Aceptar" nombre="No" funcion={props.funcionVerde}/>
                </div>

            </div>
        </div>
    )
}

export default CancelarReservacion;