import React from "react";
import './CancelarReservacion.css';
import errorLogo from "../Home/Images/errorLogo.png"
import correctLogo from "../Home/Images/correctLogo.png"
import infoLogo from "../Home/Images/infoLogo.png"

import BotonModal from "./BotonModal"

function CancelarReservacion(props){

    // Constantes para los nombres de clase que pueden ser modificados por props
    const blurSpaceClass = `blur-space-tipo2`;
    const modalBlancoClass = `modal-blanco-${props.type}`;
    const logoModalOutClass = `logo-modal-out-tipo2`;
    const logoModalClass = `logo-modal-tipo2`;
    const titulo1ModalClass = `titulo1-modal-${props.type}`;
    const titulo2ModalClass = `titulo2-modal-${props.type}`;
    const titulo3ModalClass = `titulo3-modal-${props.type}`;
    const titulo4ModalClass = `titulo4-modal-tipo2`;
    const botonesCancelacionClass = `botones-cancelacion-${props.type}`;
    let logo = errorLogo;

    if(props.modalClasificacion == 1){
        logo = infoLogo
    } else if (props.modalClasificacion == 2){
        logo = errorLogo
    } else if (props.modalClasificacion == 3){
        logo = correctLogo
    }

    return(
        <div className={blurSpaceClass}>
            <div className={modalBlancoClass}>
                <div className={logoModalOutClass}>
                    {props.modalClasificacion !== 4 && (
                        <div className={logoModalClass}><img src={logo} alt="Icono de notificación" /></div> 
                    )}
                </div>
                <h1 className={titulo1ModalClass}>{props.titulo1}</h1>
                <h1 className={titulo2ModalClass}>{props.titulo2}</h1>
                <h1 className={titulo3ModalClass}>{props.titulo3}</h1>
                {props.modalClasificacion !== 2 && (
                    <h1 className={titulo4ModalClass}>{props.titulo4}</h1>
                )}
                <div className={botonesCancelacionClass}>
                    {props.modalClasificacion !== 3 && (
                        <BotonModal tipoBoton="Cancelar" nombre={props.textoRojo} funcion={props.funcionRojo}/>
                    )}
                    <BotonModal tipoBoton="Aceptar" nombre={props.textoVerde} funcion={props.funcionVerde}/>
                </div>
            </div>
        </div>
    )
}

export default CancelarReservacion;
