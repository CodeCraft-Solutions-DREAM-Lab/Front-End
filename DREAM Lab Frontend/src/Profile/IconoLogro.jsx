import React, { useState, useEffect, useRef } from "react";
import './IconoLogro.css'
import LogoBigDreamer from '../Home/Images/bigDreamer.png'
import LogoRobot from '../Home/Images/robot-icon.png'



function IconoLogro(props){
    return(

        <div className={props.logroDesbloqueado ? "div-logro-desbloqueado" : "div-logro-bloqueado"} style={props.logroDesbloqueado ? { backgroundColor: props.colorFondo } : null}>
            <img className="logo-logro" src={LogoBigDreamer} alt="Icono del logro"/>
        </div>
    )
}

export default IconoLogro;