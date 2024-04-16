import React from "react";
import './CancelarReservacion.css';
import errorLogo from "../Home/Images/errorLogo.png"
import correctLogo from "../Home/Images/correctLogo.png"
import infoLogo from "../Home/Images/infoLogo.png"

import BotonNodal from "./BotonNodal"

function CancelarReservacion(props){

    // Constantes para los nombres de clase que pueden ser modificados por props
    const blurSpaceClass = `blur-space-tipo2`;
    const nodalBlancoClass = `nodal-blanco-${props.type}`;
    const logoNodalOutClass = `logo-nodal-out-tipo2`;
    const logoNodalClass = `logo-nodal-tipo2`;
    const titulo1NodalClass = `titulo1-nodal-${props.type}`;
    const titulo2NodalClass = `titulo2-nodal-${props.type}`;
    const titulo3NodalClass = `titulo3-nodal-${props.type}`;
    const titulo4NodalClass = `titulo4-nodal-tipo2`;
    const botonesCancelacionClass = `botones-cancelacion-${props.type}`;
    let logo = errorLogo;

    if(props.nodalClasificacion == 1){
        logo = infoLogo
    } else if (props.nodalClasificacion == 2){
        logo = errorLogo
    } else if (props.nodalClasificacion == 3){
        logo = correctLogo
    }

    return(
        <div className={blurSpaceClass}>
            <div className={nodalBlancoClass}>
                <div className={logoNodalOutClass}>
                    {props.nodalClasificacion !== 4 && (
                        <div className={logoNodalClass}><img src={logo} alt="Icono de notificación" /></div> 
                    )}
                </div>
                <h1 className={titulo1NodalClass}>{props.titulo1}</h1>
                <h1 className={titulo2NodalClass}>{props.titulo2}</h1>
                <h1 className={titulo3NodalClass}>{props.titulo3}</h1>
                {props.nodalClasificacion !== 2 && (
                    <h1 className={titulo4NodalClass}>{props.titulo4}</h1>
                )}
                <div className={botonesCancelacionClass}>
                    {props.nodalClasificacion !== 3 && (
                        <BotonNodal tipoBoton="Cancelar" nombre={props.textoRojo} funcion={props.funcionRojo}/>
                    )}
                    <BotonNodal tipoBoton="Aceptar" nombre={props.textoVerde} funcion={props.funcionVerde}/>
                </div>
            </div>
        </div>
    )
}

export default CancelarReservacion;
